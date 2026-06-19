// ── External Dependencies & Registrations
import { defineConfig } from 'vitepress';
import fs from 'node:fs';
import path from 'node:path';

// ── VitePress Configuration ──────────────────────────────────────────────────────────────────────────────────────────

export default defineConfig({
    head: [['link', { rel: 'icon', href: '/images/favicon.ico' }]],
    title: 'DPUse',
    description: 'Data positioning for modern applications.',
    srcDir: '.',
    outDir: '.vitepress/dist',
    ignoreDeadLinks: true, // KB docs contain internal app links; transform script will rewrite these.

    themeConfig: {
        externalLinkIcon: true, // Adds an arrow icon next to external links automatically.
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2026-present Jonathan Terrell'
        },
        logo: '/images/favicon.svg',
        // siteTitle: 'DPUse',

        nav: [
            { text: 'Guide', link: '/guide/' },
            { text: 'Connectors', link: '/connectors/' },
            { text: 'Context', link: '/context/' },
            { text: 'Presenters', link: '/presenters/' },
            { text: 'Cookbook', link: '/cookbook/' },
            { text: 'Blog', link: '/blog/' }
        ],

        outline: [2, 3], // Shows heading levels H2 and H3 in the right-side table of contents.

        sidebar: {
            '/guide/': [
                {
                    text: 'Introduction',
                    items: [
                        { text: 'What is DPUse?', link: '/guide/getting-started/what-is-dpuse' },
                        { text: 'Getting Started', link: '' },
                        { text: 'Quick Start', link: '/guide/getting-started/quick-start' },
                        { text: 'Account Setup', link: '/guide/getting-started/account-setup' }
                    ]
                },
                {
                    text: 'Concepts',
                    items: [
                        { text: 'App Architecture', link: '/guide/concepts/app-architecture' },
                        { text: 'Data Positioning', link: '/guide/concepts/data-positioning' },
                        { text: 'Dimensions & Events', link: '/guide/concepts/dimensions-and-events' },
                        { text: 'Connectors vs Connections', link: '/guide/concepts/connectors-vs-connections' },
                        { text: 'Plugins', link: '/guide/concepts/plugins' },
                        { text: 'Glossary', link: '/guide/concepts/glossary' },
                        { text: 'Data Privacy & Security', link: '/guide/concepts/dataPrivacySecurity' }
                    ]
                },
                {
                    text: 'Using the Workbench',
                    items: [{ text: 'Placeholder', link: '' }]
                },
                {
                    text: 'Using AI',
                    items: [{ text: 'Placeholder', link: '' }]
                },
                {
                    text: 'Managing your Account',
                    items: [{ text: 'Placeholder', link: '' }]
                },
                {
                    text: 'Plugins',
                    items: [
                        { text: 'Connector Plugin', link: '/guide/plugins/connector-plugin' },
                        { text: 'Presenter Plugin', link: '/guide/plugins/presenter-plugin' },
                        { text: 'Tutorial Plugin', link: '/guide/plugins/tutorial-plugin' }
                    ]
                },
                {
                    text: 'Work in Progress',
                    items: [
                        { text: 'Curated List', link: '/guide/workInProgress/curatedList' },
                        { text: 'Visualisation Libraries', link: '/guide/workInProgress/visualisationLibraries' },
                        { text: 'Visualisation Types', link: '/guide/workInProgress/visualisationTypes' }
                    ]
                }
            ],
            '/connectors/': [{ text: 'Introduction', items: [{ text: 'What is a Connector?', link: '/connectors/' }] }, ...buildConnectorsSidebar()],
            '/context/': [
                {
                    text: 'Introduction',
                    items: [{ text: 'What is the Context?', link: '/context/' }]
                },
                {
                    text: 'Areas',
                    items: buildContextAreasSidebar()
                },
                {
                    text: 'Indexes',
                    items: [
                        { text: 'Characteristics', link: '' },
                        { text: 'Measures', link: '' },
                        { text: 'Dimensions', link: '' },
                        { text: 'Entities', link: '' },
                        { text: 'Events', link: '' },
                        { text: 'Models', link: '' }
                    ]
                }
            ],
            '/presenters/': [
                {
                    text: 'Introduction',
                    items: [{ text: 'What is a Presenter?', link: '/presenters/' }]
                }
            ],
            '/cookbook/': [
                {
                    text: 'Introduction',
                    items: [{ text: 'What is a Recipe?', link: '/cookbook/' }]
                }
            ],
            '/blog/': [
                {
                    text: 'Blog',
                    items: [
                        { text: 'All Posts', link: '/blog/' },
                        { text: 'The Entity/Event Model', link: '/blog/the-entity-event-model' },
                        { text: 'Local First & Data without SaaS', link: '/blog/local-first-data-without-saas' },
                        { text: 'A Choice of Technologies', link: '/blog/a-choice-of-technologies' },
                        { text: 'Bring your own API Key', link: '/blog/bring-your-own-api-key' }
                    ]
                }
            ]
        },

        socialLinks: [{ icon: 'github', link: 'https://github.com/dpuse' }]
    }
});

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

function buildContextAreasSidebar(): { text: string; link: string; items?: { text: string; link: string }[] }[] {
    const jsonPath = path.resolve(import.meta.dirname, '../scripts/defaultContext.json');
    if (!fs.existsSync(jsonPath)) return [];
    const { areas } = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    return areas.map((area: { id: string; label: string; models: { id: string; label: string }[] }) => ({
        text: area.label,
        link: `/context/${area.id}`,
        ...(area.models?.length > 0 && {
            collapsed: true,
            items: area.models.map((model) => ({
                text: model.label,
                link: `/context/${area.id}/${model.id}`
            }))
        })
    }));
}

function buildConnectorsSidebar(): { text: string; items: { text: string; link: string }[] }[] {
    const CONNECTOR_CATEGORIES: Record<string, string> = {
        application: 'Application',
        curatedDataset: 'Curated Dataset',
        database: 'Database',
        fileStore: 'File Store'
    };
    const CATEGORY_ORDER = ['Application', 'Curated Dataset', 'Database', 'File Store'];

    const dir = path.resolve(import.meta.dirname, '../connectors');
    if (!fs.existsSync(dir)) return [];

    const groups = new Map<string, { text: string; link: string }[]>();
    for (const cat of CATEGORY_ORDER) groups.set(cat, []);

    for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.md') && f !== 'index.md')) {
        const content = fs.readFileSync(path.join(dir, f), 'utf-8');
        const titleMatch = content.match(/^title:\s*(.+)$/m);
        const tagsMatch = content.match(/^tags:\s*\[([^\]]+)\]/m);
        const text = titleMatch ? titleMatch[1]!.trim() : f.replace('.md', '');
        const tags = tagsMatch ? tagsMatch[1]!.split(',').map((t) => t.trim()) : [];
        const categoryKey = tags.find((t) => t in CONNECTOR_CATEGORIES) ?? 'application';
        const category = CONNECTOR_CATEGORIES[categoryKey]!;
        groups.get(category)!.push({ text, link: `/connectors/${f.replace('.md', '')}` });
    }

    for (const items of groups.values()) items.sort((a, b) => a.text.localeCompare(b.text));

    return CATEGORY_ORDER.filter((cat) => groups.get(cat)!.length > 0).map((cat) => ({
        text: cat,
        items: groups.get(cat)!
    }));
}
