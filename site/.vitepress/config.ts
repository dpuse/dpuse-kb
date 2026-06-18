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
            { text: 'Connect', link: '/connect/' },
            { text: 'Contextualise', link: '/contextualise/' },
            { text: 'Present', link: '/present/' },
            { text: 'Cookbook', link: '/cookbook/' },
            { text: 'Blog', link: '/blog/' }
        ],

        sidebar: {
            '/guide/': [
                {
                    text: 'Getting Started',
                    items: [
                        { text: 'What is DPUse?', link: '/guide/getting-started/what-is-dpuse' },
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
            '/connect/': [
                {
                    text: 'Connect',
                    items: [{ text: 'Introduction', link: '/connect/' }, ...buildConnectorsSidebar()]
                }
            ],
            '/contextualise/': [
                {
                    text: 'Contextualise',
                    items: [{ text: 'Introduction', link: '/contextualise/' }]
                }
            ],
            '/present/': [
                {
                    text: 'Present',
                    items: [{ text: 'Introduction', link: '/present/' }]
                }
            ],
            '/cookbook/': [
                {
                    text: 'Cookbook',
                    items: [{ text: 'Introduction', link: '/cookbook/' }]
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

function buildConnectorsSidebar(): { text: string; link: string }[] {
    const dir = path.resolve(import.meta.dirname, '../connect');
    if (!fs.existsSync(dir)) return [];
    return fs
        .readdirSync(dir)
        .filter((f) => f.endsWith('.md') && f !== 'index.md')
        .map((f) => {
            const content = fs.readFileSync(path.join(dir, f), 'utf-8');
            const match = content.match(/^title:\s*(.+)$/m);
            const text = match ? match[1]!.trim() : f.replace('.md', '');
            return { text, link: `/connect/${f.replace('.md', '')}` };
        })
        .sort((a, b) => a.text.localeCompare(b.text));
}
