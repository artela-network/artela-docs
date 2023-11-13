---
sidebar_position: 2
---

# Creating a new Aspect project


## Requirements

* [Node.js](https://nodejs.org/en/download/) version 18.0 or above (which can be checked by running node -v). You can use [nvm](https://github.com/nvm-sh/nvm) for managing multiple Node versions on a single machine installed.
When installing Node.js, you are recommended to check all checkboxes related to dependencies.

* Confirm that Node.js has been installed correctly by running
```shell
node --version
```
* [sloc](https://docs.soliditylang.org/en/latest/installing-solidity.html) 
* 

## 1.Create a new directory for your Aspect project:

```shell
mkdir my-first-aspect && cd  my-first-aspect
```

## 2. Init project:

```shell
npx @artela/aspect-tool init
```


## 3. Project Architecture

```shell
.
├── README.md
├── asconfig.json
├── assembly
│   ├── aspect                     <-- your aspect here
│   └── index.ts
├── contracts                            <-- your contract here
├── package.json
├── project.config.json                  <-- project profile
├── scripts                              <-- project deployment scripts
│   ├── aspect-deploy.cjs         
│   ├── bind.cjs                   <-- contract bind aspect script
│   ├── contract-call.cjs         
│   ├── contract-deploy.cjs
│   ├── contract-send.cjs
│   └── create-account.cjs
├── tests
└── tsconfig.json

```

