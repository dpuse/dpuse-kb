/* eslint-disable security/detect-non-literal-fs-filename -- Paths are found by walking this repository's own docs folder. */
import matter from 'gray-matter';
import path from 'node:path';
import { readdir, readFile } from 'node:fs/promises';

const isKVOnly = process.argv.includes('--kv-only');

const ACCOUNT_ID = process.env['CLOUDFLARE_ACCOUNT_ID'];
const AI_SEARCH_TOKEN = process.env['CLOUDFLARE_AI_SEARCH_TOKEN'];
const INSTANCE_ID = process.env['CLOUDFLARE_AI_SEARCH_INSTANCE_ID'];
if (!isKVOnly && (!ACCOUNT_ID || !AI_SEARCH_TOKEN || !INSTANCE_ID)) {
    console.error('Missing required environment variables: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_AI_SEARCH_TOKEN, CLOUDFLARE_AI_SEARCH_INSTANCE_ID');
    process.exit(1);
}

const KV_TOKEN = process.env['CLOUDFLARE_API_TOKEN'];
if (!ACCOUNT_ID || !KV_TOKEN) {
    console.error('Missing required environment variables: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN');
    process.exit(1);
}

const DOCS_DIRECTORY = path.join(import.meta.dirname, '..', 'docs');
const KV_NAMESPACE_ID = '374cdb590edf445da6bcb0db59694d64'; // The 'KB' namespace dpuse-api reads. An id, not a secret.
const ITEMS_URL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai-search/instances/${INSTANCE_ID ?? ''}/items`;
const KV_BASE_URL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${KV_NAMESPACE_ID}/values`;

// ── File Discovery ────────────────────────────────────────────────────────────────────────────────────────────────────

async function findMarkdownFiles(directory: string): Promise<string[]> {
    const entries = await readdir(directory, { withFileTypes: true });
    const files: string[] = [];
    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);
        if (entry.isDirectory()) {
            files.push(...(await findMarkdownFiles(fullPath)));
        } else if (entry.isFile() && path.extname(entry.name) === '.md') {
            files.push(fullPath);
        }
    }
    return files;
}

function toSlug(filePath: string): string {
    return path.relative(DOCS_DIRECTORY, filePath).replace(/\.md$/, '');
}

// ── AI Search Upload ──────────────────────────────────────────────────────────────────────────────────────────────────

async function uploadToAISearch(filePath: string, raw: string): Promise<void> {
    const { data } = matter(raw);
    const slug = toSlug(filePath);

    const form = new FormData();
    form.append('file', new Blob([raw], { type: 'text/plain' }), path.basename(filePath));

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

    const response = await fetch(ITEMS_URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${AI_SEARCH_TOKEN ?? ''}` },
        body: form
    });

    if (response.ok) return;
    const body = await response.text();
    throw new Error(`${String(response.status)} — ${body}`);
}

// ── KV Writes ─────────────────────────────────────────────────────────────────────────────────────────────────────────

async function writeKV(key: string, value: string): Promise<void> {
    const response = await fetch(`${KV_BASE_URL}/${encodeURIComponent(key)}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${KV_TOKEN ?? ''}`,
            'Content-Type': 'text/plain'
        },
        body: value
    });

    if (response.ok) return;
    const body = await response.text();
    throw new Error(`${String(response.status)} — ${body}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────────────────────────────────────────────

interface NavEntry {
    slug: string;
    title: string;
    section: string;
    order: number;
}

const files = await findMarkdownFiles(DOCS_DIRECTORY);
console.log(`Found ${String(files.length)} markdown files\n`);

// Phase 1: read files (+ AI Search upload if not --kv-only)
if (isKVOnly) {
    console.log('── AI Search upload skipped (--kv-only) ──\n');
} else {
    console.log('── AI Search upload ──');
}
let aiSearchFailed = 0;
const navEntries: NavEntry[] = [];
const documentContents = new Map<string, string>();

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
    documentContents.set(slug, content.trim());

    if (!isKVOnly) {
        try {
            await uploadToAISearch(file, raw);
            console.log(`uploaded: ${slug}`);
        } catch (error) {
            console.error(`failed:   ${slug} — ${error instanceof Error ? error.message : String(error)}`);
            aiSearchFailed++;
        }
    }
}

if (!isKVOnly) console.log(`\nAI Search: ${String(files.length - aiSearchFailed)} uploaded, ${String(aiSearchFailed)} failed\n`);

// Phase 2: write to KV
console.log('── KV write ──');
let kvFailed = 0;

// nav/index — sorted by section, then order, then title
navEntries.sort((a, b) => {
    if (a.section !== b.section) return a.section.localeCompare(b.section);
    return a.order === b.order ? a.title.localeCompare(b.title) : a.order - b.order;
});

try {
    await writeKV('nav/index', JSON.stringify(navEntries));
    console.log(`written:  nav/index (${String(navEntries.length)} entries)`);
} catch (error) {
    console.error(`failed:   nav/index — ${error instanceof Error ? error.message : String(error)}`);
    kvFailed++;
}

for (const [slug, content] of documentContents) {
    try {
        await writeKV(`docs/${slug}`, content);
        console.log(`written:  docs/${slug}`);
    } catch (error) {
        console.error(`failed:   docs/${slug} — ${error instanceof Error ? error.message : String(error)}`);
        kvFailed++;
    }
}

const kvTotal = 1 + documentContents.size;
console.log(`\nKV: ${String(kvTotal - kvFailed)} written, ${String(kvFailed)} failed`);

if ((!isKVOnly && aiSearchFailed > 0) || kvFailed > 0) process.exit(1);
/* eslint-enable security/detect-non-literal-fs-filename -- Paths are found by walking this repository's own docs folder. */
