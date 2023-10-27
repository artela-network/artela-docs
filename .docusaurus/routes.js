import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '6df'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', 'e21'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '7f9'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '567'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '538'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '981'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '87f'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', 'e9d'),
    exact: true
  },
  {
    path: '/develop',
    component: ComponentCreator('/develop', '68b'),
    routes: [
      {
        path: '/develop',
        component: ComponentCreator('/develop', '553'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/advanced-concepts',
        component: ComponentCreator('/develop/advanced-concepts', '65d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/advanced-concepts/account-abstraction',
        component: ComponentCreator('/develop/advanced-concepts/account-abstraction', '2ab'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/advanced-concepts/asolc',
        component: ComponentCreator('/develop/advanced-concepts/asolc', 'd15'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/advanced-concepts/communication',
        component: ComponentCreator('/develop/advanced-concepts/communication', 'f70'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/advanced-concepts/jit-call',
        component: ComponentCreator('/develop/advanced-concepts/jit-call', 'd97'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/advanced-concepts/join-point',
        component: ComponentCreator('/develop/advanced-concepts/join-point', '7e3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/advanced-concepts/jpm',
        component: ComponentCreator('/develop/advanced-concepts/jpm', '3c3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/advanced-concepts/lifecycle',
        component: ComponentCreator('/develop/advanced-concepts/lifecycle', '42f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/advanced-concepts/runtime-api',
        component: ComponentCreator('/develop/advanced-concepts/runtime-api', '5dc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/advanced-concepts/system-call',
        component: ComponentCreator('/develop/advanced-concepts/system-call', '198'),
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
        path: '/develop/client',
        component: ComponentCreator('/develop/client', '464'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/client/cosmos-grpc',
        component: ComponentCreator('/develop/client/cosmos-grpc', '37c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/client/ethereum-json-rpc',
        component: ComponentCreator('/develop/client/ethereum-json-rpc', '972'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/client/examples/deploy-call-contract',
        component: ComponentCreator('/develop/client/examples/deploy-call-contract', '101'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/client/examples/ethereum-tx',
        component: ComponentCreator('/develop/client/examples/ethereum-tx', 'e9b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/client/tendermint-rpc',
        component: ComponentCreator('/develop/client/tendermint-rpc', 'ebf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/core-concepts',
        component: ComponentCreator('/develop/core-concepts', 'd53'),
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
        path: '/develop/node',
        component: ComponentCreator('/develop/node', 'b02'),
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
      },
      {
        path: '/develop/writing-aspect',
        component: ComponentCreator('/develop/writing-aspect', 'c8a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/writing-aspect/aspect-tools',
        component: ComponentCreator('/develop/writing-aspect/aspect-tools', '3c1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/develop/writing-aspect/system-call',
        component: ComponentCreator('/develop/writing-aspect/system-call', '9f4'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '90b'),
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
    component: ComponentCreator('/main', 'df5'),
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
    component: ComponentCreator('/', '3f0'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
