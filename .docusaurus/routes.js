import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', 'e12'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '0c1'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '116'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'd08'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '3f7'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '995'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '700'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', '181'),
    exact: true
  },
  {
    path: '/develop',
    component: ComponentCreator('/develop', 'ec6'),
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
        path: '/develop/aspect-in-depth',
        component: ComponentCreator('/develop/aspect-in-depth', '2e4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/aspect-in-depth/aspect-dd',
        component: ComponentCreator('/develop/aspect-in-depth/aspect-dd', 'f50'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/aspect-in-depth/aspect-tools',
        component: ComponentCreator('/develop/aspect-in-depth/aspect-tools', '8c2'),
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
        path: '/develop/quick-start/access-testnet',
        component: ComponentCreator('/develop/quick-start/access-testnet', 'ac4'),
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
    component: ComponentCreator('/docs', '3df'),
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
    component: ComponentCreator('/main', 'bf4'),
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
    component: ComponentCreator('/', '6e7'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
