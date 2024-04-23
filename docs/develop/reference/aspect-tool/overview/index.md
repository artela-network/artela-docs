---
sidebar_position: 2
---

# Aspect Tool

Aspect Tool is a development tool built in AssemblyScript, designed to assist developers in seamlessly managing Aspect
development. The tool offers functionality to create Aspect development scaffolding and seamlessly integrates with the
Artela Blockchain. Developers can leverage Aspect Tool for tasks such as compiling, testing, and deploying smart
contracts and WebAssembly, enhancing efficiency in blockchain development.
This tool published in the [npm repository](https://www.npmjs.com/package/@artela/aspect-tool).

## Requirements

1. [Node.js](https://nodejs.org/en/download/) version 18.0 or above (which can be checked by running node -v). You can
   use [nvm](https://github.com/nvm-sh/nvm) for managing multiple Node versions on a single machine installed.
   When installing Node.js, you are recommended to check all checkboxes related to dependencies.

* Confirm that Node.js has been installed correctly by running

```shell
node --version
```

2. [Assemblyscript](https://assemblyscript.bootcss.com/introduction.html)  is a programming language built on the
   foundation of TypeScript, designed specifically for WebAssembly (Wasm).

3. [sloc](https://docs.soliditylang.org/en/latest/installing-solidity.html)  Installing the Solidity Compiler.

## Install

```shell
npm install @artela/aspect-tool
```

## Commands

This tool contains two commands:

1. Init a aspect project in a directory.

```jsx
USAGE
$
aspect - tool
init [-d < value >]
FLAGS
- d, --dir = <value> [default: The current folder directory]
```

2. Generate state tracing code for Aspect.

```jsx
USAGE
$
aspect - tool
generate [-i < value >] [-o < value >]
FLAGS
- i, -- in = <value>
    -o, --out=
    <value>
```

## Tool Guide

* [Init project](/develop/reference/aspect-tool/init)
* [Configuration](/develop/reference/aspect-tool/config)
* [Create an account](/develop/reference/aspect-tool/create-account)
* [Build contract](/develop/reference/aspect-tool/build-contract)
* [Deploy contract](/develop/reference/aspect-tool/deploy-contract)
* [Build Aspect](/develop/reference/aspect-tool/build-aspect)
* [Deploy Aspect](/develop/reference/aspect-tool/deploy-aspect)
* [Contract bind Aspect](/develop/reference/aspect-tool/bind-aspect)
* [Contract unbind Aspect](/develop/reference/aspect-tool/unbind-aspect)
* [Contract call](/develop/reference/aspect-tool/contract-call)
* [Send transaction](/develop/reference/aspect-tool/send-tx)
* [Operation Call/Send](/develop/reference/aspect-tool/operation)
* [Get bound Accounts](/develop/reference/aspect-tool/bound-contract)
* [Get bound Aspects](/develop/reference/aspect-tool/bound-aspect)

## Advanced

* [State Access Wrapper](/develop/reference/aspect-tool/advanced/generate)

## Versions

The Version in the subgraph manifest specifies release notes.

| Version | 	Release notes                                                     |
|:--------|:-------------------------------------------------------------------|
| 0.0.57  | Add unbind、operation、get bound aspect、get bound accounts Commands. |
| 0.0.56  | The first beta is available.                                       |
