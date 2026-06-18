import { readdir, readFile } from 'node:fs/promises';
import { join, relative, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const kvOnly = process.argv.includes('--kv-only');

const ACCOUNT_ID = process.env['CLOUDFLARE_ACCOUNT_ID'];
const AI_SEARCH_TOKEN = process.env['CLOUDFLARE_AI_SEARCH_TOKEN'];
const INSTANCE_ID = process.env['CLOUDFLARE_AI_SEARCH_INSTANCE_ID'];
const KV_TOKEN = process.env['CLOUDFLARE_API_TOKEN'];
const KV_NAMESPACE_ID = process.env['CLOUDFLARE_KV_NAMESPACE_ID'];

if (!kvOnly && (!ACCOUNT_ID || !AI_SEARCH_TOKEN || !INSTANCE_ID)) {
    console.error('Missing required environment variables: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_AI_SEARCH_TOKEN, CLOUDFLARE_AI_SEARCH_INSTANCE_ID');
    process.exit(1);
}

if (!ACCOUNT_ID || !KV_TOKEN || !KV_NAMESPACE_ID) {
    console.error('Missing required environment variables: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, CLOUDFLARE_KV_NAMESPACE_ID');
    process.exit(1);
}

const DOCS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs');
const ITEMS_URL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai-search/instances/${INSTANCE_ID}/items`;
const KV_BASE_URL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${KV_NAMESPACE_ID}/values`;

// ── File Discovery ────────────────────────────────────────────────────────────────────────────────────────────────────

async function findMarkdownFiles(dir: string): Promise<string[]> {
    const entries = await readdir(dir, { withFileTypes: true });
    const files: string[] = [];
    for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...(await findMarkdownFiles(fullPath)));
        } else if (entry.isFile() && extname(entry.name) === '.md') {
            files.push(fullPath);
        }
    }
    return files;
}

function toSlug(filePath: string): string {
    return relative(DOCS_DIR, filePath).replace(/\.md$/, '');
}

// ── AI Search Upload ──────────────────────────────────────────────────────────────────────────────────────────────────

async function uploadToAISearch(filePath: string, raw: string): Promise<void> {
    const { data } = matter(raw);
    const slug = toSlug(filePath);

    const form = new FormData();
    form.append('file', new Blob([raw], { type: 'text/plain' }), basename(filePath));

    // NOTE: metadata field format is not fully documented by Cloudflare.
    // If uploads succeed but metadata is missing, check the Items API reference
    // for the correct field name and structure.
    form.append(
        'metadata',
        JSON.stringify({
            slug,
            title: String(data['title'] ?? ''),
            section: String(data['section'] ?? ''),
            audience: String(data['audience'] ?? ''),
            tags: Array.isArray(data['tags']) ? data['tags'].join(', ') : ''
        })
    );

    const res = await fetch(ITEMS_URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${AI_SEARCH_TOKEN}` },
        body: form
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`${res.status} — ${body}`);
    }
}

// ── KV Writes ─────────────────────────────────────────────────────────────────────────────────────────────────────────

async function writeKV(key: string, value: string): Promise<void> {
    const res = await fetch(`${KV_BASE_URL}/${encodeURIComponent(key)}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${KV_TOKEN}`,
            'Content-Type': 'text/plain'
        },
        body: value
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`${res.status} — ${body}`);
    }
}

// ── Main ──────────────────────────────────────────────────────────────────────────────────────────────────────────────

interface NavEntry {
    slug: string;
    title: string;
    section: string;
    order: number;
}

const files = await findMarkdownFiles(DOCS_DIR);
console.log(`Found ${files.length} markdown files\n`);

// Phase 1: read files (+ AI Search upload if not --kv-only)
if (kvOnly) {
    console.log('── AI Search upload skipped (--kv-only) ──\n');
} else {
    console.log('── AI Search upload ──');
}
let aiSearchFailed = 0;
const navEntries: NavEntry[] = [];
const docContents: Map<string, string> = new Map();

for (const file of files) {
    const slug = toSlug(file);
    const raw = await readFile(file, 'utf-8');
    const { data, content } = matter(raw);

    navEntries.push({
        slug,
        title: String(data['title'] ?? slug),
        section: String(data['section'] ?? ''),
        order: typeof data['order'] === 'number' ? data['order'] : 0
    });
    docContents.set(slug, content.trim());

    if (!kvOnly) {
        try {
            await uploadToAISearch(file, raw);
            console.log(`uploaded: ${slug}`);
        } catch (err) {
            console.error(`failed:   ${slug} — ${err instanceof Error ? err.message : err}`);
            aiSearchFailed++;
        }
    }
}

if (!kvOnly) console.log(`\nAI Search: ${files.length - aiSearchFailed} uploaded, ${aiSearchFailed} failed\n`);

// Phase 2: write to KV
console.log('── KV write ──');
let kvFailed = 0;

// nav/index — sorted by section, then order, then title
navEntries.sort((a, b) => {
    if (a.section !== b.section) return a.section.localeCompare(b.section);
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
});

try {
    await writeKV('nav/index', JSON.stringify(navEntries));
    console.log(`written:  nav/index (${navEntries.length} entries)`);
} catch (err) {
    console.error(`failed:   nav/index — ${err instanceof Error ? err.message : err}`);
    kvFailed++;
}

for (const [slug, content] of docContents) {
    try {
        await writeKV(`docs/${slug}`, content);
        console.log(`written:  docs/${slug}`);
    } catch (err) {
        console.error(`failed:   docs/${slug} — ${err instanceof Error ? err.message : err}`);
        kvFailed++;
    }
}

const kvTotal = 1 + docContents.size;
console.log(`\nKV: ${kvTotal - kvFailed} written, ${kvFailed} failed`);

if ((!kvOnly && aiSearchFailed > 0) || kvFailed > 0) process.exit(1);
