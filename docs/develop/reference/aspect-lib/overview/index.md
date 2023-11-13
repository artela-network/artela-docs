---
sidebar_position: 2
---

# Aspect Library

A library for writing aspect to be deployed to Artela，The `aspect-libs` provides Host APIs to interact with the Aspect
runtime, with this set of APIs, you can access blockchain data, smart
contracts, cryptographic functions, invoking system calls and more.

## Installation

```sh
npm install --dev @artela/aspect-libs # NPM
yarn add --dev @artela/aspect-libs    # Yarn
```

## Usage

Once installed, You can use aspect-libs for the following features:
### Entry

* [Aspect Entry](/develop/reference/aspect-lib/entry)

### Implement Aspect

* [Transaction Level Aspect](/develop/reference/aspect-lib/tx-level-aspect/overview)
* [Block Level Aspect](/develop/reference/aspect-lib/block-level-aspect/overview)
* [Operation Aspect](/develop/reference/aspect-lib/operation-aspect)

### Api Reference

* sys
* sys.aspect
* sys.evm
* sys.hostApi
* sys.context