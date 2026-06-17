import { defineConfig } from 'vitepress';

export default defineConfig({
    title: 'DPUse',
    description: 'Data positioning for modern applications.',
    srcDir: '.',
    outDir: '.vitepress/dist',
    ignoreDeadLinks: true, // KB docs contain internal app links; transform script will rewrite these

    themeConfig: {
        nav: [
            { text: 'Guides', link: '/guides/' },
            { text: 'Connectors', link: '/connectors/' },
            { text: 'Context', link: '/context/' },
            { text: 'Presenters', link: '/presenters/' },
            { text: 'Tutorials', link: '/tutorials/' },
            { text: 'Docs', link: '/docs/' },
            { text: 'KB', link: '/kb/' },
            { text: 'Blog', link: '/blog/' }
        ],

        sidebar: {
            '/guides/': [
                {
                    text: 'Guides',
                    items: [
                        { text: 'Introduction', link: '/guides/' },
                        { text: 'Data Privacy & Security', link: '/guides/dataPrivacySecurity' },
                        { text: 'Curated List', link: '/guides/curatedList' },
                        { text: 'Visualisation Libraries', link: '/guides/visualisationLibraries' },
                        { text: 'Visualisation Types', link: '/guides/visualisationTypes' }
                    ]
                }
            ],
            '/connectors/': [
                {
                    text: 'Connectors',
                    items: [{ text: 'Introduction', link: '/connectors/' }]
                }
            ],
            '/context/': [
                {
                    text: 'Context',
                    items: [{ text: 'Introduction', link: '/context/' }]
                }
            ],
            '/presenters/': [
                {
                    text: 'Presenters',
                    items: [{ text: 'Introduction', link: '/presenters/' }]
                }
            ],
            '/tutorials/': [
                {
                    text: 'Tutorials',
                    items: [{ text: 'Introduction', link: '/tutorials/' }]
                }
            ],
            '/docs/': [
                {
                    text: 'Documentation',
                    items: [{ text: 'Introduction', link: '/docs/' }]
                }
            ],
            '/kb/': [
                {
                    text: 'Getting Started',
                    items: [
                        { text: 'What is DPUse?', link: '/kb/getting-started/what-is-dpuse' },
                        { text: 'Quick Start', link: '/kb/getting-started/quick-start' },
                        { text: 'Account Setup', link: '/kb/getting-started/account-setup' }
                    ]
                },
                {
                    text: 'Concepts',
                    items: [
                        { text: 'App Architecture', link: '/kb/concepts/app-architecture' },
                        { text: 'Data Positioning', link: '/kb/concepts/data-positioning' },
                        { text: 'Dimensions & Events', link: '/kb/concepts/dimensions-and-events' },
                        { text: 'Connectors vs Connections', link: '/kb/concepts/connectors-vs-connections' },
                        { text: 'Plugins', link: '/kb/concepts/plugins' },
                        { text: 'Glossary', link: '/kb/concepts/glossary' }
                    ]
                },
                {
                    text: 'Plugins',
                    items: [
                        { text: 'Connector Plugin', link: '/kb/plugins/connector-plugin' },
                        { text: 'Presenter Plugin', link: '/kb/plugins/presenter-plugin' },
                        { text: 'Tutorial Plugin', link: '/kb/plugins/tutorial-plugin' }
                    ]
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
