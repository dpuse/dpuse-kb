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
copyDir(SRC, DEST, ['connectors']); // connectors/ has its own pipeline below
console.log(`Transformed docs from ${SRC} → ${DEST}`);

generateIndex(DEST);
console.log(`Generated guide/index.md`);

const CONNECTORS_SRC = path.resolve(import.meta.dirname, '../../docs/connectors');
const CONNECTORS_DEST = path.resolve(import.meta.dirname, '../connectors');

const CONNECTOR_CATEGORY_LABELS: Record<string, string> = {
    application: 'Application',
    curatedDataset: 'Curated Dataset',
    database: 'Database',
    fileStore: 'File Store'
};

const CONNECTOR_CATEGORY_SLUGS: Record<string, string> = {
    application: 'application',
    curatedDataset: 'curated-dataset',
    database: 'database',
    fileStore: 'file-store'
};

if (fs.existsSync(CONNECTORS_SRC)) {
    fs.rmSync(CONNECTORS_DEST, { recursive: true, force: true });
    copyDir(CONNECTORS_SRC, CONNECTORS_DEST);
    console.log(`Transformed connectors from ${CONNECTORS_SRC} → ${CONNECTORS_DEST}`);
}

generateConnectorCategories();
console.log(`Generated connector category pages`);

generateConnectorsIndex();
console.log(`Generated connectors index`);

generateContextAreas();
console.log(`Generated context area pages`);

// ── Connectors Index ──────────────────────────────────────────────────────

function generateConnectorsIndex(): void {
    if (!fs.existsSync(CONNECTORS_DEST)) return;

    const connectors: { title: string; file: string; category: string }[] = [];

    for (const f of fs.readdirSync(CONNECTORS_DEST)) {
        if (!f.endsWith('.md') || f === 'index.md') continue;
        const content = fs.readFileSync(path.join(CONNECTORS_DEST, f), 'utf-8');
        const fm = extractFrontmatter(content);
        const categoryId = fm['category'] ?? '';
        connectors.push({
            title: fm['title'] ?? f.replace('.md', ''),
            file: f.replace('.md', ''),
            category: CONNECTOR_CATEGORY_LABELS[categoryId] ?? categoryId
        });
    }

    connectors.sort((a, b) => a.title.localeCompare(b.title));

    const intro = fs.readFileSync(path.join(CONNECTORS_SRC, 'index.md'), 'utf-8');
    const introBody = intro.replace(/^---[\s\S]*?---\n/, '').trimStart();

    const lines = [
        `---`,
        `title: Connectors`,
        `section: connectors`,
        `---`,
        ``,
        introBody.trimEnd(),
        ``,
        `## All Connectors`,
        ``,
        `| Connector | Category |`,
        `| --------- | -------- |`,
        ...connectors.map((c) => `| [${c.title}](/connectors/${c.file}) | ${c.category} |`),
        ``
    ];

    fs.writeFileSync(path.join(CONNECTORS_DEST, 'index.md'), lines.join('\n'));
}

// ── Connector Categories ──────────────────────────────────────────────────

function generateConnectorCategories(): void {
    if (!fs.existsSync(CONNECTORS_DEST)) return;

    const groups = new Map<string, { title: string; file: string; description: string }[]>();

    for (const f of fs.readdirSync(CONNECTORS_DEST)) {
        if (!f.endsWith('.md') || f === 'index.md') continue;
        const content = fs.readFileSync(path.join(CONNECTORS_DEST, f), 'utf-8');
        const fm = extractFrontmatter(content);
        const categoryId = fm['category'] ?? '';
        if (!categoryId || !(categoryId in CONNECTOR_CATEGORY_SLUGS)) continue;

        const body = content.slice(content.indexOf('---', 3) + 3);
        const description =
            body
                .split(/\n\n+/)
                .map((p) => p.trim())
                .find((p) => p && !p.startsWith('#') && !p.startsWith('<') && !p.startsWith('|')) ?? '';

        const items = groups.get(categoryId) ?? [];
        items.push({ title: fm['title'] ?? f.replace('.md', ''), file: f.replace('.md', ''), description });
        groups.set(categoryId, items);
    }

    for (const [categoryId, connectors] of groups) {
        const label = CONNECTOR_CATEGORY_LABELS[categoryId] ?? categoryId;
        const slug = CONNECTOR_CATEGORY_SLUGS[categoryId]!;
        const dir = path.join(CONNECTORS_DEST, slug);
        fs.mkdirSync(dir, { recursive: true });

        connectors.sort((a, b) => a.title.localeCompare(b.title));

        const lines = [
            `---`,
            `title: ${label} Connectors`,
            `section: connectors`,
            `---`,
            ``,
            `# ${label} Connectors`,
            ``,
            ...connectors.map((c) => `- [${c.title}](/connectors/${c.file})${c.description ? ` — ${c.description}` : ''}`),
            ``
        ];

        fs.writeFileSync(path.join(dir, 'index.md'), lines.join('\n'));
    }
}

// ── Context Areas ─────────────────────────────────────────────────────────────

interface ContextModel {
    id: string;
    label: string;
    description: string;
}

interface ContextArea {
    id: string;
    label: string;
    description: string;
    models: ContextModel[];
}

function generateContextAreas(): void {
    const jsonPath = path.resolve(import.meta.dirname, 'defaultContext.json');
    if (!fs.existsSync(jsonPath)) return;

    const { areas }: { areas: ContextArea[] } = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const dest = path.resolve(import.meta.dirname, '../context');
    fs.mkdirSync(dest, { recursive: true });

    for (const area of areas) {
        const areaLines = [
            `---`,
            `title: ${area.label}`,
            `---`,
            ``,
            `# ${area.label}`,
            ``
        ];

        if (area.description) areaLines.push(area.description, ``);

        if (area.models.length > 0) {
            areaLines.push(`## Models`, ``);
            areaLines.push(`| Model | Description |`);
            areaLines.push(`| --- | --- |`);
            for (const model of area.models) {
                const desc = model.description || '';
                areaLines.push(`| [${model.label}](./${area.id}/${model.id}) | ${desc} |`);
            }
            areaLines.push(``);
        }

        fs.writeFileSync(path.join(dest, `${area.id}.md`), areaLines.join('\n'));

        for (const model of area.models) {
            const modelDir = path.join(dest, area.id);
            fs.mkdirSync(modelDir, { recursive: true });

            const modelLines = [
                `---`,
                `title: ${model.label}`,
                `---`,
                ``,
                `# ${model.label}`,
                ``
            ];

            if (model.description) modelLines.push(model.description, ``);

            fs.writeFileSync(path.join(modelDir, `${model.id}.md`), modelLines.join('\n'));
        }
    }
}
