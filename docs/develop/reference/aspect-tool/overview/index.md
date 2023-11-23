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

1. Init a aspect project in a directory.
```shell
USAGE
  $ aspect-tool init [-d <value>]
FLAGS
  -d, --dir=<value>  [default: The current folder directory]
```

2. Generate state tracing code for Aspect.
```shell
USAGE
  $ aspect-tool generate [-i <value>] [-o <value>]
FLAGS
  -i, --in=<value>
  -o, --out=<value>
```

## Tool Guide

* Init project
* Configuration
* Create a account
* Build contract
* Deploy contract
* Contract call
* Send transaction
* Build Aspect
* Deploy Aspect
* Aspect operation

## Advanced

* Generate State tracing class
