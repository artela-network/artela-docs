import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '4c8'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', 'b8d'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '6b5'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'ed4'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '479'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', 'c08'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '0bb'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', 'd64'),
    exact: true
  },
  {
    path: '/develop',
    component: ComponentCreator('/develop', '7c2'),
    routes: [
      {
        path: '/develop',
        component: ComponentCreator('/develop', 'e83'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/asolc-guide',
        component: ComponentCreator('/develop/asolc-guide', 'd2b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/aspect-examples',
        component: ComponentCreator('/develop/aspect-examples', 'b80'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/aspect-examples/schedular-aspect',
        component: ComponentCreator('/develop/aspect-examples/schedular-aspect', '396'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/aspect-examples/security-aspect',
        component: ComponentCreator('/develop/aspect-examples/security-aspect', 'd14'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/aspect-tools',
        component: ComponentCreator('/develop/aspect-tools', '512'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/aspect-tools/aspect-docs',
        component: ComponentCreator('/develop/aspect-tools/aspect-docs', '6c9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/aspect-tools/aspect-tools-guide',
        component: ComponentCreator('/develop/aspect-tools/aspect-tools-guide', '475'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/quick-start',
        component: ComponentCreator('/develop/quick-start', '415'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/quick-start/access-devnet',
        component: ComponentCreator('/develop/quick-start/access-devnet', 'f00'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/quick-start/develop-a-smart-contract',
        component: ComponentCreator('/develop/quick-start/develop-a-smart-contract', 'ca0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/quick-start/develop-an-aspect',
        component: ComponentCreator('/develop/quick-start/develop-an-aspect', '0a4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/resources',
        component: ComponentCreator('/develop/resources', '260'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/resources/faucet',
        component: ComponentCreator('/develop/resources/faucet', 'd36'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/resources/write-smart-contract',
        component: ComponentCreator('/develop/resources/write-smart-contract', '180'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/start-a-local-node',
        component: ComponentCreator('/develop/start-a-local-node', '489'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/web3js-guide',
        component: ComponentCreator('/develop/web3js-guide', 'de5'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'be8'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'bd3'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/main',
    component: ComponentCreator('/main', 'e48'),
    routes: [
      {
        path: '/main',
        component: ComponentCreator('/main', 'd02'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/main/Artela-Blockchain',
        component: ComponentCreator('/main/Artela-Blockchain', '68e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/main/Aspect-Programming',
        component: ComponentCreator('/main/Aspect-Programming', 'a5a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/main/Aspect-Programming/Aspect',
        component: ComponentCreator('/main/Aspect-Programming/Aspect', '7c2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/main/Aspect-Programming/Native-Extension',
        component: ComponentCreator('/main/Aspect-Programming/Native-Extension', '562'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/main/Build-on-Artela/Lite-DApp',
        component: ComponentCreator('/main/Build-on-Artela/Lite-DApp', '210'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/main/Build-on-Artela/Public-Service',
        component: ComponentCreator('/main/Build-on-Artela/Public-Service', '7f2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/main/Build-on-Artela/Rich-DApp',
        component: ComponentCreator('/main/Build-on-Artela/Rich-DApp', '669'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/main/Resources/FAQ',
        component: ComponentCreator('/main/Resources/FAQ', '3a1'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '871'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
