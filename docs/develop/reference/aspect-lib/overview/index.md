---
sidebar_position: 2
---

# Aspect Library

## Introduction

A [AssemblyScript](https://assemblyscript.bootcss.com/) library for writing aspect to be deployed to
Artela，The `aspect-libs` provides Host APIs to interact with the Aspect
runtime, with this set of APIs, you can access blockchain data, smart
contracts, cryptographic functions, invoking system calls and more.


## Installation

The aspect-libs library provides APIs to access the Artela Node store, blockchain data, smart contracts, cryptographic
functions and more. To use it, all you have to do is add a dependency on it:

* If you're using npm install
```shell
npm install --dev @artela/aspect-libs # NPM

```
* If you're using yarn install
```shell
yarn add --dev @artela/aspect-libs    # Yarn
```


## Usage
---

### Structure

* [Aspect Structure](/develop/reference/aspect-lib/aspect-structure)

### Join-Points
* [VerifyTx](/develop/reference/aspect-lib/verify-aspect)
* [PreTxExecute](/develop/reference/aspect-lib/tx-level-aspect/pre-tx-execute)
* [PreContractCall](/develop/reference/aspect-lib/tx-level-aspect/pre-contract-call)
* [PostContractCall](/develop/reference/aspect-lib/tx-level-aspect/post-contract-call)
* [PostTxExecute](/develop/reference/aspect-lib/tx-level-aspect/post-tx-execute)

### Operation Interface
* [Operation](/develop/reference/aspect-lib/operation-aspect)

### API references
* [sys](/develop/reference/aspect-lib/components/sys)
* [sys.hostApi](/develop/reference/aspect-lib/components/sys-hostapi)
* [sys.aspect](/develop/reference/aspect-lib/components/sys-aspect)
* [ethereum](/develop/reference/aspect-lib/components/ethereum)
* [helper](/develop/reference/aspect-lib/components/helper)

## Versions

The Version in the subgraph manifest specifies the mapping Aspect-lib version which is run by Artela Blockchain Node for a given
Version.

| Version | Artela Version | 	Release notes                                                                            |
|:--------|:---------------|:------------------------------------------------------------------------------------------|
| 0.0.33  | v0.4.7-rc6     | The first beta is available, where the Transaction Level Aspect feature has been released |


