// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');


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
      ...options,
    }),
  ];
}

const SECTIONS = [
  defineSection('intro'),
  defineSection('develop'),
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
          to: '/intro',
        },
        {
          position: 'left',
          label: 'Develop',
          to: '/develop',
        },

        {
          position: 'right',
          label: 'Website',
          to: 'https://artela.network/',
        },
        {
          position: 'right',
          label: 'Community',
          to: 'https://t.me/artela_official',
        },
        {
          position: 'right',
          label: 'Network',
          to: 'https://artela.network/',
        },
        {
          position: 'right',
          label: 'Blog',
          to: 'https://medium.com/@artela_network',
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
              label: 'Build a dApp',
              to: '/develop/quick-start',
            },
            {
              label: 'Intro to Artela',
              // to: '/use',
              to: 'intro',
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
              label: "Telegram",
              href: "https://t.me/artela_official",
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'https://medium.com/@artela_network',
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
    },
   
    algolia: {
      appId: "QLS2QSP47E",
      apiKey: "4d9feeb481e3cfef8f91bbc63e090042",
      indexName: "artela_docs",
      contextualSearch: true,
      searchParameters: {},
    },
  }),
};

module.exports = config;


// /** @type {import('@docusaurus/types').Config} */
// const config = {
//   title: 'Artela Network',
//   favicon: 'img/favicon.ico',

//   // Set the production url of your site here
//   url: 'https://artela.network',
//   // Set the /<baseUrl>/ pathname under which your site is served
//   // For GitHub pages deployment, it is often '/<projectName>/'
//   baseUrl: '/',

//   // GitHub pages deployment config.
//   // If you aren't using GitHub pages, you don't need these.
//   organizationName: 'Artela', // Usually your GitHub org/user name.
//   projectName: 'Artela', // Usually your repo name.

//   onBrokenLinks: 'throw',
//   onBrokenMarkdownLinks: 'warn',
//   trailingSlash: false,

//   // Even if you don't use internalization, you can use this field to set useful
//   // metadata like html lang. For example, if your site is Chinese, you may want
//   // to replace "en" with "zh-Hans".
//   i18n: {
//     defaultLocale: 'en',
//     locales: ['en'],
//   },

//   presets: [
//     [
//       'classic',
//       /** @type {import('@docusaurus/preset-classic').Options} */
//       ({
//         docs: {
//           sidebarPath: require.resolve('./sidebars.js'),
//           routeBasePath: "/",
//           sidebarCollapsible: false,
//         },
//         theme: {
//           customCss: require.resolve('./src/css/custom.css'),
//         },
//       }),
//     ],
//   ],

//   themeConfig:
//     /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
//     ({
//       // Replace with your project's social card
//       image: 'img/artela.png',
//       navbar: {
//         logo: {
//           alt: 'Artela Network',
//           src: 'img/artela.png',
//           srcDark: 'img/artelaD.png',
//         },
//         items: [
//           {
//             type: 'doc',
//             docId: 'main',
//             position: 'left',
//             label: 'Documentation',
//           },
//           {
//             href: 'https://github.com',
//             label: 'GitHub',
//             position: 'right',
//           },
//         ],
//       },
//       footer: {
//         style: 'dark',
//         links: [
//           {
//             title: 'Documentation',
//             items: [
//               {
//                 label: "Intro to Artela",
//                 href: "https://docs.artela.network/main",
//               },
//               {
//                 label: "Artela Blockchain",
//                 href: "https://docs.artela.network/Artela-Blockchain",
//               },
//               {
//                 label: "Aspect Programming",
//                 href: "https://docs.artela.network/Aspect-Programming",
//               },
//             ],
//           },
//           {
//             title: 'Social',
//             items: [
//               {
//                 label: "Website",
//                 href: "https://www.artela.network",
//               },
//               {
//                 label: "Twitter",
//                 href: "https://twitter.com/Artela_Network",
//               },
//               {
//                 label: "Medium",
//                 href: "https://medium.com/@artela_network",
//               },
//             ],
//           },
//         ],
//         copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Artela Team.`,
//       },
//       prism: {
//         theme: lightCodeTheme,
//         darkTheme: darkCodeTheme,
//         additionalLanguages: ["protobuf", "go-module"], // https://prismjs.com/#supported-languages
//       },
//       algolia: {
//         appId: "QLS2QSP47E",
//         apiKey: "4d9feeb481e3cfef8f91bbc63e090042",
//         indexName: "cosmos_network",
//         contextualSearch: false,
//       },
//     }),
// };

// module.exports = config;

