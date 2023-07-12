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
    path: '/blog',
    component: ComponentCreator('/blog', 'ffc'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '860'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post', 'fbf'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post', 'fcc'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post', '736'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '726'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', '32d'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', 'ae5'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', '6c8'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola', '54d'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', '6e3'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', 'd64'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '871'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '184'),
    routes: [
      {
        path: '/Artela-Blockchain',
        component: ComponentCreator('/Artela-Blockchain', 'b6c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/Aspect-Programming',
        component: ComponentCreator('/Aspect-Programming', '4c0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/Aspect-Programming/Aspect',
        component: ComponentCreator('/Aspect-Programming/Aspect', '1f1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/Aspect-Programming/Native-Extension',
        component: ComponentCreator('/Aspect-Programming/Native-Extension', 'a35'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/Build-on-Artela/Lite-DApp',
        component: ComponentCreator('/Build-on-Artela/Lite-DApp', 'ddc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/Build-on-Artela/Public-Service',
        component: ComponentCreator('/Build-on-Artela/Public-Service', '53f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/Build-on-Artela/Rich-DApp',
        component: ComponentCreator('/Build-on-Artela/Rich-DApp', '570'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/main',
        component: ComponentCreator('/main', '1e9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/Resources/FAQ',
        component: ComponentCreator('/Resources/FAQ', '52d'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
