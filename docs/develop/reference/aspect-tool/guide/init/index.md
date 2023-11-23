---
sidebar_position: 2
---

# Init Project

## Introduce

The `@artela/aspect-tool init ` command helps developers generate a scaffold for Aspect project development based on the
AssemblyScript language. This scaffold comes with dependencies from the Artela library, including essential development
libraries and common scripts. It supports operations such as compiling, testing, and deploying smart contracts and
WebAssembly, thereby enhancing efficiency in blockchain development.  
This guide outlines the process of initiating an Aspect development project


## Init Project

```shell

mkdir my-first-aspect && cd  my-first-aspect

npx @artela/aspect-tool init
```

## Project Structure

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

The command automatically creates the recommended directory structure and configuration files:

* `./assembly`  Directory holding the AssemblyScript sources being compiled to WebAssembly.

* `./assembly/aspect` Directory used to store the aspect you wrote.

* `./assembly/index.ts` Default entry file being compiled to WebAssembly to get you started.

* `./scripts/*.cjs` Aspects and contract compilation, deployment, binding, and other scripts.
