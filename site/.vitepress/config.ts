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
    ignoreDeadLinks: true, // KB docs contain internal app links; transform script will rewrite these

    themeConfig: {
        externalLinkIcon: true,
        footer: {
            copyright: 'Released under the MIT License.'
        },
        logo: '/images/favicon.svg',

        nav: [
            { text: 'Guide', link: '/guide/' },
            { text: 'Connectors', link: '/connectors/' },
            { text: 'Context', link: '/context/' },
            { text: 'Presenters', link: '/presenters/' },
            { text: 'Cookbook', link: '/cookbook/' },
            { text: 'Blog', link: '/blog/' }
        ],

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
            '/connectors/': [{ text: 'What is a Connector?', items: [{ text: 'Introduction', link: '/connectors/' }] }, ...buildConnectorsSidebar()],
            '/context/': [
                {
                    text: 'Introduction',
                    items: [{ text: 'What is the Context?', link: '/context/' }]
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
                    items: [{ text: 'All Posts', link: '/blog/' }]
                }
            ]
        },

        socialLinks: [{ icon: 'github', link: 'https://github.com/dpuse' }]
    }
});

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

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
