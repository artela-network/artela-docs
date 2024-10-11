// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');

function defineSection(section, options = {}) {
  return [
    '@docusaurus/plugin-content-docs',
    /** @type {import('@docusaurus/plugin-content-docs').Options} */
    ({
      path: `docs/${section}`,
      routeBasePath: section,
      id: section,
      sidebarPath: require.resolve('./sidebars.js'),
      breadcrumbs: true,
      editUrl: 'https://github.com/artela-network/artela-docs/tree/main/',
      remarkPlugins: [math],
      rehypePlugins: [katex],
      ...options,
    }),
  ];
}

const SECTIONS = [
  defineSection('main')
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Artela Docs',
  tagline: 'Build on Artela',
  url: 'https://artela.network/',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'artela', // Usually your GitHub org/user name.
  projectName: 'artela-docs', // Usually your repo name.

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
          path: 'docs/home',
          sidebarPath: require.resolve('./sidebars.js'),
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  plugins: [
    ...SECTIONS,
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 80,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/artela.png',
      navbar: {
        logo: {
          href: 'https://artela.network/',
          alt: 'Artela Network',
          src: 'img/artela.png',
          srcDark: 'img/artelaD.png',
        },
        items: [
          {
            position: 'left',
            label: 'Introduction',
            to: '/main',
            className: 'hidden-label-item',
          },

          {
            position: 'right',
            label: 'Website',
            to: 'https://artela.network/',
          },
          {
            position: 'right',
            label: 'Community',
            to: 'https://discord.com/invite/artelanetwork',
          },
          {
            position: 'right',
            label: 'Network',
            to: 'https://artela.network/build/developer-portal',
          },
          {
            position: 'right',
            label: 'Blog',
            to: 'https://artela.network/blog',
          },
          {
            href: 'https://github.com/artela-network',
            className: 'pseudo-icon github-icon',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Build on Artela',
                to: '/main/developers-guid/get-started/art-dev-intro',
              },
              {
                label: 'Intro to Artela',
                // to: '/use',
                to: '/main/intro-to-artela',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: "Website",
                href: "https://www.artela.network",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/Artela_Network",
              },
              {
                label: "Discord",
                href: "https://discord.com/invite/artelanetwork",
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: 'https://artela.network/blog',
              },
              {
                label: 'Artela GitHub',
                href: 'https://github.com/artela-network',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()}, Built with ❤️ by Artela.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['solidity'],
      },

      algolia: {
        // The application ID provided by Algolia
        appId: 'T94HPZBQ0X',

        // Public API key: it is safe to commit it
        apiKey: '246f1243d1997feb4487bbf15aca6930',

        indexName: 'artela',

        // Optional: see doc section below
        contextualSearch: true,

        // externalUrlRegex: 'external\\.com|domain\\.com',

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: '/docs/', // or as RegExp: /\/docs\//
          to: '/',
        },
        // searchParameters: {},

        searchParameters: {
          facetFilters: ['language:en', ['filter1', 'filter2'], 'filter3'],
        },

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',

        // insights: false,

      },
    }),
};

module.exports = config;
