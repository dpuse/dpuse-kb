import fs from 'fs';
import path from 'path';

const SRC = path.resolve(import.meta.dirname, '../../docs');
const DEST = path.resolve(import.meta.dirname, '../guide');

function copyDir(src: string, dest: string, exclude: string[] = []) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        if (exclude.includes(entry.name)) continue;
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else if (entry.name.endsWith('.md')) {
            const content = fs.readFileSync(srcPath, 'utf-8');
            fs.writeFileSync(destPath, transform(content));
        }
    }
}

function transform(content: string): string {
    // Minimal pass-through — add transformations here as needed
    return content;
}

function extractFrontmatter(content: string): Record<string, string> {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return {};
    return Object.fromEntries(
        match[1]!.split('\n').flatMap((line) => {
            const [key, ...rest] = line.split(':');
            return key && rest.length ? [[key.trim(), rest.join(':').trim()]] : [];
        })
    );
}

function generateIndex(dest: string): void {
    const sections = new Map<string, { title: string; link: string }[]>();

    function walk(dir: string) {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                walk(fullPath);
            } else if (entry.name.endsWith('.md') && entry.name !== 'index.md') {
                const content = fs.readFileSync(fullPath, 'utf-8');
                const fm = extractFrontmatter(content);
                const title = fm['title'] ?? entry.name.replace('.md', '');
                const section = fm['section'] ?? 'Other';
                const rel = path.relative(dest, fullPath).replace(/\\/g, '/').replace('.md', '');
                const items = sections.get(section) ?? [];
                items.push({ title, link: rel });
                sections.set(section, items);
            }
        }
    }

    walk(dest);

    const lines = ['# Guide', ''];
    for (const [section, items] of sections) {
        lines.push(`## ${section}`, '');
        for (const { title, link } of items) {
            lines.push(`- [${title}](${link})`);
        }
        lines.push('');
    }

    fs.writeFileSync(path.join(dest, 'index.md'), lines.join('\n'));
}

fs.rmSync(DEST, { recursive: true, force: true });
copyDir(SRC, DEST, ['connect']); // connect/ has its own pipeline below
console.log(`Transformed docs from ${SRC} → ${DEST}`);

generateIndex(DEST);
console.log(`Generated guide/index.md`);

const CONNECTORS_SRC = path.resolve(import.meta.dirname, '../../docs/connect');
const CONNECTORS_DEST = path.resolve(import.meta.dirname, '../connectors');

if (fs.existsSync(CONNECTORS_SRC)) {
    fs.rmSync(CONNECTORS_DEST, { recursive: true, force: true });
    copyDir(CONNECTORS_SRC, CONNECTORS_DEST);
    console.log(`Transformed connect from ${CONNECTORS_SRC} → ${CONNECTORS_DEST}`);
}
