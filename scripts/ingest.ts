import { readdir, readFile } from 'node:fs/promises';
import { join, relative, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const ACCOUNT_ID = process.env['CLOUDFLARE_ACCOUNT_ID'];
const API_TOKEN = process.env['CLOUDFLARE_AI_SEARCH_TOKEN'];
const INSTANCE_ID = process.env['CLOUDFLARE_AI_SEARCH_INSTANCE_ID'];

if (!ACCOUNT_ID || !API_TOKEN || !INSTANCE_ID) {
    console.error('Missing required environment variables: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, AI_SEARCH_INSTANCE_ID');
    process.exit(1);
}

const DOCS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs');
const ITEMS_URL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai-search/instances/${INSTANCE_ID}/items`;

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

async function upload(filePath: string): Promise<void> {
    const raw = await readFile(filePath, 'utf-8');
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
        headers: { Authorization: `Bearer ${API_TOKEN}` },
        body: form
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`${res.status} — ${body}`);
    }
}

const files = await findMarkdownFiles(DOCS_DIR);
console.log(`Found ${files.length} markdown files\n`);

let failed = 0;
for (const file of files) {
    const slug = toSlug(file);
    try {
        await upload(file);
        console.log(`uploaded: ${slug}`);
    } catch (err) {
        console.error(`failed:   ${slug} — ${err instanceof Error ? err.message : err}`);
        failed++;
    }
}

console.log(`\nDone: ${files.length - failed} uploaded, ${failed} failed`);
if (failed > 0) process.exit(1);
