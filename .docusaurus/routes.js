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
    component: ComponentCreator('/develop', '3e0'),
    routes: [
      {
        path: '/develop',
        component: ComponentCreator('/develop', 'e83'),
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
        path: '/develop/start-a-local-node',
        component: ComponentCreator('/develop/start-a-local-node', '489'),
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
    path: '/intro',
    component: ComponentCreator('/intro', 'e10'),
    routes: [
      {
        path: '/intro',
        component: ComponentCreator('/intro', '78e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/intro/Artela-Blockchain',
        component: ComponentCreator('/intro/Artela-Blockchain', '5e5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/intro/Aspect-Programming',
        component: ComponentCreator('/intro/Aspect-Programming', '57c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/intro/Aspect-Programming/Aspect',
        component: ComponentCreator('/intro/Aspect-Programming/Aspect', '912'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/intro/Aspect-Programming/Native-Extension',
        component: ComponentCreator('/intro/Aspect-Programming/Native-Extension', 'cb8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/intro/Build-on-Artela/Lite-DApp',
        component: ComponentCreator('/intro/Build-on-Artela/Lite-DApp', '3a7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/intro/Build-on-Artela/Public-Service',
        component: ComponentCreator('/intro/Build-on-Artela/Public-Service', '925'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/intro/Build-on-Artela/Rich-DApp',
        component: ComponentCreator('/intro/Build-on-Artela/Rich-DApp', '0bd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/intro/Resources/FAQ',
        component: ComponentCreator('/intro/Resources/FAQ', 'b7f'),
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
