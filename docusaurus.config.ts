import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
    title: "AsMuin's Website",
    tagline: '互联网的海洋广阔无边，感谢你能在这个小小的地方驻足停留',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://AsMuin.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/AsMuin_WebSite/',
    staticDirectories: ['static'],
    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'AsMuin', // Usually your GitHub org/user name.
    projectName: 'AsMuin_WebSite', // Usually your repo name.
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    deploymentBranch: 'development',
    trailingSlash: false,
    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'zh-Hans',
        locales: ['zh-Hans']
    },
    plugins: ['docusaurus-plugin-sass'],
    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/'
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ['rss', 'atom'],
                        xslt: true
                    },
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                    // Useful options to enforce blogging best practices
                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                    onUntruncatedBlogPosts: 'warn'
                },
                theme: {
                    customCss: './src/css/custom.css'
                }
            } satisfies Preset.Options
        ]
    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        navbar: {
            title: "AsMuin's Website",
            logo: {
                alt: "AsMuin's Website Logo",
                src: 'img/logo.svg'
            },
            items: [
                { to: '/introduction', label: '介绍', position: 'left' },
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'left',
                    label: '知识文档'
                },
                { to: '/blog', label: '个人记录', position: 'left' },
                {
                    href: 'https://github.com/AsMuin',
                    label: 'GitHub',
                    position: 'right'
                }
            ]
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: '文档',
                    items: [
                        {
                            label: '导言',
                            to: '/docs/introduce'
                        }
                    ]
                },
                {
                    title: 'Blog',
                    items: [
                        {
                            label: 'Blog',
                            to: '/blog'
                        }
                    ]
                },
                // {
                //     title: 'Community',
                //     items: [
                //         {
                //             label: 'Stack Overflow',
                //             href: 'https://stackoverflow.com/questions/tagged/docusaurus'
                //         },
                //         {
                //             label: 'Discord',
                //             href: 'https://discordapp.com/invite/docusaurus'
                //         },
                //         {
                //             label: 'Twitter',
                //             href: 'https://twitter.com/docusaurus'
                //         }
                //     ]
                // },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'GitHub',
                            href: 'https://github.com/facebook/docusaurus'
                        },
                        {
                            label: 'Email',
                            href: 'mailto:asmuins@foxmail.com'
                        }
                    ]
                }
            ],
            copyright: `Copyright © ${new Date().getFullYear()} AsMuin_WebSite, Inc. Built with Docusaurus.`
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula
        }
    } satisfies Preset.ThemeConfig
};

export default config;
