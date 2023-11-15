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

### Components

#### Core `sys` Namespace
* [sys](/develop/reference/aspect-lib/components/sys/sys)
* [sys.hostApi](/develop/reference/aspect-lib/components/sys/sys-hostapi)
* [sys.aspect](/develop/reference/aspect-lib/components/sys/sys-aspect)
* [sys.evm](/develop/reference/aspect-lib/components/sys/call)
* [sys.context](/develop/reference/aspect-lib/components/sys/context)

#### Authorized Access Relationship
* [access authorization table between Components & Join Point](/develop/reference/aspect-lib/components/access)

#### Common
* [ethereum namespace](/develop/reference/aspect-lib/components/common/ethereum)
* [Trace Context Enhancements](/develop/reference/aspect-lib/components/common/trace-plus)
