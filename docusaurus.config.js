// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Artela Network',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://artela.network',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Artela', // Usually your GitHub org/user name.
  projectName: 'Artela', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: "/",
          sidebarCollapsible: false,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/artela.png',
      navbar: {
        logo: {
          alt: 'Artela Network',
          src: 'img/artela.png',
          srcDark: 'img/artelaD.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'main',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: "Artela Network",
                href: "https://docs.artela.network/main",
              },
              {
                label: "Chain-Native Pattern",
                href: "https://docs.artela.network/Core-Concepts/Chain-Native-Pattern",
              },
              {
                label: "Aspect Programming",
                href: "https://docs.artela.network/Core-Concepts/Aspect-Programming",
              },
            ],
          },
          {
            title: 'Social',
            items: [
              {
                label: "Twitter",
                href: "https://twitter.com",
              },
              {
                label: "Telegram",
                href: "https://t.me",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Artela Team.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["protobuf", "go-module"], // https://prismjs.com/#supported-languages
      },
      algolia: {
        appId: "QLS2QSP47E",
        apiKey: "4d9feeb481e3cfef8f91bbc63e090042",
        indexName: "cosmos_network",
        contextualSearch: false,
      },
    }),
};

module.exports = config;

