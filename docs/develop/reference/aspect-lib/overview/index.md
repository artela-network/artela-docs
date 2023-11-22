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
```sh
npm install --dev @artela/aspect-libs # NPM
yarn add --dev @artela/aspect-libs    # Yarn
```

## Usage
---

### Structure

* [Aspect Structure](/develop/reference/aspect-lib/aspect-structure)

### Join-Points
* [Transaction Level Join-Point](/develop/reference/aspect-lib/tx-level-aspect/overview)
* [Block Level Join-Point](/develop/reference/aspect-lib/block-level-aspect/overview)
* [Call Level Join-Point](/develop/reference/aspect-lib/operation-aspect)

### API references
* [sys](/develop/reference/aspect-lib/components/sys/sys)
* [sys.hostApi](/develop/reference/aspect-lib/components/sys/sys-hostapi)
* [sys.aspect](/develop/reference/aspect-lib/components/sys/sys-aspect)
* [sys.evm](/develop/reference/aspect-lib/components/sys/call)
* [sys.context](/develop/reference/aspect-lib/components/sys/context)
* [ethereum](/develop/reference/aspect-lib/components/common/ethereum)

## Versions

The apiVersion in the subgraph manifest specifies the mapping API version which is run by Graph Node for a given
subgraph.

| Version | Artela Version | 	Release notes                                                                            |
|:--------|:---------------|:------------------------------------------------------------------------------------------|
| 0.0.24  | v0.4.1-beta    | The first beta is available, where the Transaction Level Aspect feature has been released |


