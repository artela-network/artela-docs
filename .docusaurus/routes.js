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
    component: ComponentCreator('/develop', 'f76'),
    routes: [
      {
        path: '/develop',
        component: ComponentCreator('/develop', '553'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/art-development',
        component: ComponentCreator('/develop/art-development', 'de5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/art-development/access-testnet',
        component: ComponentCreator('/develop/art-development/access-testnet', 'd2b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/art-development/get-started',
        component: ComponentCreator('/develop/art-development/get-started', '6f1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/art-development/start-a-local-node',
        component: ComponentCreator('/develop/art-development/start-a-local-node', '11d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/aspect-doc',
        component: ComponentCreator('/develop/aspect-doc', '0d7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/aspect-doc/aspect-tools',
        component: ComponentCreator('/develop/aspect-doc/aspect-tools', 'c9b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/aspect-doc/system-call',
        component: ComponentCreator('/develop/aspect-doc/system-call', 'ec3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/client/artela-web3.js',
        component: ComponentCreator('/develop/client/artela-web3.js', '680'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/client/cosmos-apis',
        component: ComponentCreator('/develop/client/cosmos-apis', '2e9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/client/Ethereum Clients Support/deploy-call-contract',
        component: ComponentCreator('/develop/client/Ethereum Clients Support/deploy-call-contract', 'c56'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/client/Ethereum Clients Support/ethereum-tx',
        component: ComponentCreator('/develop/client/Ethereum Clients Support/ethereum-tx', '719'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/client/evm-compatible-apis',
        component: ComponentCreator('/develop/client/evm-compatible-apis', 'cab'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/core-concepts/arch',
        component: ComponentCreator('/develop/core-concepts/arch', '251'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/core-concepts/asolc',
        component: ComponentCreator('/develop/core-concepts/asolc', '1bb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/core-concepts/aspect',
        component: ComponentCreator('/develop/core-concepts/aspect', '41b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/core-concepts/aspect-programming',
        component: ComponentCreator('/develop/core-concepts/aspect-programming', '652'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/core-concepts/aspect-runtime',
        component: ComponentCreator('/develop/core-concepts/aspect-runtime', 'fa7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/core-concepts/binding',
        component: ComponentCreator('/develop/core-concepts/binding', '48c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/core-concepts/communication',
        component: ComponentCreator('/develop/core-concepts/communication', 'a79'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/core-concepts/evm-compatibility',
        component: ComponentCreator('/develop/core-concepts/evm-compatibility', '6eb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/core-concepts/foundational',
        component: ComponentCreator('/develop/core-concepts/foundational', 'f1e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/core-concepts/jit-call',
        component: ComponentCreator('/develop/core-concepts/jit-call', 'dd8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/core-concepts/join-point',
        component: ComponentCreator('/develop/core-concepts/join-point', 'bad'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/core-concepts/lifecycle',
        component: ComponentCreator('/develop/core-concepts/lifecycle', '82c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/core-concepts/runtime-api',
        component: ComponentCreator('/develop/core-concepts/runtime-api', '141'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/core-concepts/system-call',
        component: ComponentCreator('/develop/core-concepts/system-call', 'bd7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/core-concepts/wasm-assemblyscript',
        component: ComponentCreator('/develop/core-concepts/wasm-assemblyscript', '5a4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/guides',
        component: ComponentCreator('/develop/guides', 'e14'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/guides/reentrancy-guard',
        component: ComponentCreator('/develop/guides/reentrancy-guard', '545'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/node/full-node-setup',
        component: ComponentCreator('/develop/node/full-node-setup', '8b7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/node/testnet-setup',
        component: ComponentCreator('/develop/node/testnet-setup', 'c7f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/old/asolc-guide',
        component: ComponentCreator('/develop/old/asolc-guide', 'b87'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/old/aspect-examples',
        component: ComponentCreator('/develop/old/aspect-examples', '8fb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/old/aspect-examples/schedular-aspect',
        component: ComponentCreator('/develop/old/aspect-examples/schedular-aspect', '6e9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/old/aspect-examples/security-aspect',
        component: ComponentCreator('/develop/old/aspect-examples/security-aspect', 'a26'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/old/aspect-in-depth',
        component: ComponentCreator('/develop/old/aspect-in-depth', 'b89'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/old/aspect-in-depth/aspect-dd',
        component: ComponentCreator('/develop/old/aspect-in-depth/aspect-dd', 'a19'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/old/aspect-in-depth/aspect-tools',
        component: ComponentCreator('/develop/old/aspect-in-depth/aspect-tools', '4e6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/old/quick-start',
        component: ComponentCreator('/develop/old/quick-start', '62f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/old/quick-start/access-testnet',
        component: ComponentCreator('/develop/old/quick-start/access-testnet', '961'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/old/quick-start/develop-a-smart-contract',
        component: ComponentCreator('/develop/old/quick-start/develop-a-smart-contract', '2b6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/old/quick-start/develop-an-aspect',
        component: ComponentCreator('/develop/old/quick-start/develop-an-aspect', '008'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/old/resources',
        component: ComponentCreator('/develop/old/resources', '95d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/old/resources/faucet',
        component: ComponentCreator('/develop/old/resources/faucet', 'c19'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/old/resources/write-smart-contract',
        component: ComponentCreator('/develop/old/resources/write-smart-contract', '627'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/old/start-a-local-node',
        component: ComponentCreator('/develop/old/start-a-local-node', '533'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/old/web3js-guide',
        component: ComponentCreator('/develop/old/web3js-guide', 'b12'),
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
