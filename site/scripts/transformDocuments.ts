/* eslint-disable security/detect-non-literal-fs-filename -- Paths are this repository's own docs and site folders. */
import fs from 'node:fs';
import path from 'node:path';

const SOURCE_DIRECTORY = path.resolve(import.meta.dirname, '../../docs');
const GUIDE_DIRECTORY = path.resolve(import.meta.dirname, '../guide');

function copyDirectory(sourceDirectory: string, destinationDirectory: string, excludedNames: string[] = []) {
    fs.mkdirSync(destinationDirectory, { recursive: true });
    const entries = fs.readdirSync(sourceDirectory, { withFileTypes: true });
    for (const entry of entries) {
        if (excludedNames.includes(entry.name)) continue;
        const sourcePath = path.join(sourceDirectory, entry.name);
        const destinationPath = path.join(destinationDirectory, entry.name);
        if (entry.isDirectory()) {
            copyDirectory(sourcePath, destinationPath);
        } else if (entry.name.endsWith('.md')) {
            const content = fs.readFileSync(sourcePath, 'utf-8');
            fs.writeFileSync(destinationPath, transform(content));
        }
    }
}

function transform(content: string): string {
    // Minimal pass-through — add transformations here as needed
    return content;
}

function extractFrontmatter(content: string): Record<string, string> {
    const match = /^---\n([\s\S]*?)\n---/.exec(content);
    if (!match) return {};
    return Object.fromEntries(
        match[1].split('\n').flatMap((line) => {
            const [key, ...rest] = line.split(':');
            return key && rest.length > 0 ? [[key.trim(), rest.join(':').trim()]] : [];
        })
    );
}

function generateIndex(destinationDirectory: string): void {
    const sections = new Map<string, { title: string; link: string }[]>();

    function walk(directory: string) {
        const entries = fs.readdirSync(directory, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(directory, entry.name);
            if (entry.isDirectory()) {
                walk(fullPath);
            } else if (entry.name.endsWith('.md') && entry.name !== 'index.md') {
                const content = fs.readFileSync(fullPath, 'utf-8');
                const fm = extractFrontmatter(content);
                const title = fm['title'] ?? entry.name.replace('.md', '');
                const section = fm['section'] ?? 'Other';
                const relativeLink = path.relative(destinationDirectory, fullPath).replaceAll('\\', '/').replace('.md', '');
                const items = sections.get(section) ?? [];
                items.push({ title, link: relativeLink });
                sections.set(section, items);
            }
        }
    }

    walk(destinationDirectory);

    const lines = ['# Guide', ''];
    for (const [section, items] of sections) {
        lines.push(`## ${section}`, '');
        for (const { title, link } of items) {
            lines.push(`- [${title}](${link})`);
        }
        lines.push('');
    }

    fs.writeFileSync(path.join(destinationDirectory, 'index.md'), lines.join('\n'));
}

fs.rmSync(GUIDE_DIRECTORY, { recursive: true, force: true });
copyDirectory(SOURCE_DIRECTORY, GUIDE_DIRECTORY, ['connectors']); // connectors/ has its own pipeline below
console.log(`Transformed docs from ${SOURCE_DIRECTORY} → ${GUIDE_DIRECTORY}`);

generateIndex(GUIDE_DIRECTORY);
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
    copyDirectory(CONNECTORS_SRC, CONNECTORS_DEST);
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
        if (f === 'index.md' || !f.endsWith('.md')) continue;
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
        if (f === 'index.md' || !f.endsWith('.md')) continue;
        const content = fs.readFileSync(path.join(CONNECTORS_DEST, f), 'utf-8');
        const fm = extractFrontmatter(content);
        const categoryId = fm['category'] ?? '';
        if (!categoryId || !Object.hasOwn(CONNECTOR_CATEGORY_SLUGS, categoryId)) continue;

        const body = content.slice(content.indexOf('---', 3) + 3);
        const description =
            body
                .split(/\n{2,}/)
                .map((p) => p.trim())
                .find((p) => p && !p.startsWith('#') && !p.startsWith('<') && !p.startsWith('|')) ?? '';

        const items = groups.get(categoryId) ?? [];
        items.push({ title: fm['title'] ?? f.replace('.md', ''), file: f.replace('.md', ''), description });
        groups.set(categoryId, items);
    }

    for (const [categoryId, connectors] of groups) {
        const label = CONNECTOR_CATEGORY_LABELS[categoryId] ?? categoryId;
        const slug = CONNECTOR_CATEGORY_SLUGS[categoryId];
        const categoryDirectory = path.join(CONNECTORS_DEST, slug);
        fs.mkdirSync(categoryDirectory, { recursive: true });

        connectors.sort((a, b) => a.title.localeCompare(b.title));

        const lines = [
            `---`,
            `title: ${label} Connectors`,
            `section: connectors`,
            `---`,
            ``,
            `# ${label} Connectors`,
            ``,
            ...connectors.map((c) => {
                const descriptionSuffix = c.description ? ` — ${c.description}` : '';
                return `- [${c.title}](/connectors/${c.file})${descriptionSuffix}`;
            }),
            ``
        ];

        fs.writeFileSync(path.join(categoryDirectory, 'index.md'), lines.join('\n'));
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

    const { areas } = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) as { areas: ContextArea[] };
    const contextDirectory = path.resolve(import.meta.dirname, '../context');
    fs.mkdirSync(contextDirectory, { recursive: true });

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
            areaLines.push(`## Models`, ``, `| Model | Description |`, `| --- | --- |`);
            for (const model of area.models) {
                const desc = model.description || '';
                areaLines.push(`| [${model.label}](./${area.id}/${model.id}) | ${desc} |`);
            }
            areaLines.push(``);
        }

        fs.writeFileSync(path.join(contextDirectory, `${area.id}.md`), areaLines.join('\n'));

        for (const model of area.models) {
            const modelDirectory = path.join(contextDirectory, area.id);
            fs.mkdirSync(modelDirectory, { recursive: true });

            const modelLines = [
                `---`,
                `title: ${model.label}`,
                `---`,
                ``,
                `# ${model.label}`,
                ``
            ];

            if (model.description) modelLines.push(model.description, ``);

            fs.writeFileSync(path.join(modelDirectory, `${model.id}.md`), modelLines.join('\n'));
        }
    }
}
/* eslint-enable security/detect-non-literal-fs-filename -- Paths are this repository's own docs and site folders. */
