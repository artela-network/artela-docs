---
sidebar_position: 2
---

# Aspect Structure

[Aspect](/develop/core-concepts/aspect), executed on the [Aspect-Runtime](/develop/core-concepts/aspect-runtime)
platform, follow a specific development pattern that utilizes WebAssembly (Wasm) syntax for coding, subsequently
compiling it into WebAssembly modules.  
This guide offers an overview of Aspect structure using a simple example, providing insights into the fundamental
components of Aspects.

## A simple Aspect

Paving the way to your first Aspect module.

### 1. Init a new [AssemblyScript](https://assemblyscript.bootcss.com/getting-started.html#setting-up-a-new-project) project

Make sure that a recent version of [Node.js](https://nodejs.org/en) and its package manager npm are installed, then
switch to a new directory and initialize a new Node.js module as usual:

```shell
mkdir -p apsect-demo && cd apsect-demo

npm init -y

npm install --save-dev assemblyscript

npx asinit .
```

The asinit command automatically creates the recommended directory structure and configuration files.

```shell
.
├── asconfig.json
├── assembly                    // <-- your aspect here, directory holding the AssemblyScript sources being compiled to WebAssembly.
│   ├── index.ts          // entry file being compiled to WebAssembly to get you started.
│   └── tsconfig.json
├── build
├── index.html
├── package-lock.json
├── package.json
└── tests
    └── index.js
```

### 2. Create a Aspect

Add `@artela/aspect-libs` dependencies

```shell
npm install @artela/aspect-libs 
```

Within the `./assembly` directory of your project, create your aspect files with a `.ts` extension.
For example, create a `HelloWorld.ts` file:

```typescript
import {
    FilterTxCtx,
    IAspectTransaction,
    PostContractCallCtx,
    PostTxCommitCtx,
    PostTxExecuteCtx,
    PreContractCallCtx,
    PreTxExecuteCtx,
    sys
} from "@artela/aspect-libs";

export class HelloWorldAspect implements IAspectTransaction {

    isOwner(sender: string): bool {
        let value = sys.aspect.property.get<string>("owner")
        return !!value.includes(sender);
    }

    onContractBinding(contractAddr: string): bool {
        let value = sys.aspect.property.get<string>("binding");
        return !!value.includes(contractAddr);
    }

    filterTx(ctx: FilterTxCtx): bool {
        return true;
    }

    // implement preTxExecute Join point
    preTxExecute(ctx: PreTxExecuteCtx): void {
        // add test data
        ctx.aspect.transientStorage<string>("k1").set<string>("v1");
        sys.aspect.mutableState(ctx).get<string>("k2").set<string>("v2")

        // add hostapi return data
        const k1 = ctx.aspect.transientStorage<string>("k1").unwrap()
        const k2 = sys.aspect.readonlyState(ctx).get<string>("k2").unwrap();
        sys.require(k1 == "v1" && k2 == "v2", "get fail")
    }

    preContractCall(ctx: PreContractCallCtx): void {
    }

    postContractCall(ctx: PostContractCallCtx): void {
    }

    postTxExecute(ctx: PostTxExecuteCtx): void {
    }

    postTxCommit(ctx: PostTxCommitCtx): void {
    }
}
```

Aspect-runtime supports three types of Aspect:

* Transaction Level Aspect： the class implements IAspectTransaction
* Block Level Aspect： the class implements IBlockTransaction
* Operation Aspect：the class implements IAspectOperation

### 3. Export entrypoint

When the message is sent to the Aspect-Runtime, a function called "entry point" is called. Aspect have a couple corresponding to different message types: execute,
isBlockLevel, isTransactionLevel, allocate.

To modify `assembly/index.ts`, we will go with four basic entry points:

* `execute`: The entry point for the execution of the tangent
* `isBlockLevel`：Check if it's a block-level Aspect
* `isTransactionLevel`: Check if it's a transaction-level Aspect
* `allocate`：Used to allocate a specific size of memory space on the WebAssembly linear memory heap to store data.

```typescript
// The entry file of your WebAssembly module.

import {Entry} from "@artela/aspect-libs";
import {HelloWorldAspect} from "./HelloWorld";

// new Entry
let helloAspect = new HelloWorldAspect();
let entry = new Entry(null, helloAspect, null);


// export execute、isBlockLevel、isTransactionLevel、allocate 
export function execute(methodPtr: i32, argPtr: i32): i32 {
    return entry.execute(methodPtr, argPtr);
}

export function isBlockLevel(): i32 {
    return entry.isBlockLevel();
}

export function isTransactionLevel(): i32 {
    return entry.isTransactionLevel();
}

export function allocate(size: i32): i32 {
    return heap.alloc(size);
}
```

### 4. Compile

The assembly directory, which contains the AssemblyScript sources compiled into WebAssembly, can now be transformed into
WebAssembly by executing the build command found in assembly/index.ts.

```shell
npm run asbuild
```
Doing so will emit the compiled binaries, bindings and definition files to the `build/` directory.

```shell
├── build
│   ├── debug.d.ts  // debug TypeScript declaration file
│   ├── debug.js    // debug JavaScript declaration file
│   ├── debug.wasm   //debug WebAssembly bytecode file
│   ├── debug.wasm.map  //debug WebAssembly output source map file
│   ├── debug.wat      // debug WebAssembly text output file
│   ├── release.d.ts    // release TypeScript declaration file
│   ├── release.js      // release JavaScript declaration file
│   ├── release.wasm    //release WebAssembly bytecode file
│   ├── release.wasm.map //release WebAssembly output source map file
│   └── release.wat    // release WebAssembly text output file

```

## Summary

* Currently only provides the Aspect development package based on the AssemblyScript language
* The protocol supports three types of Aspect
    * Block
    * Transaction
    * Operation
* After developing the Aspect, you need to export the Entrypoint.
* Compile to check the Aspect for errors, and get the WebAssembly bytecode file.
* Since the [AssemblyScript](https://assemblyscript.bootcss.com/getting-started.html#setting-up-a-new-project) project
  does not provide features such as Aspect deployment, binding, calls, etc., you need to use additional tools such
  as [web3.js](/develop/client/artela-web3.js) to communicate with Artela Blockchain. We recommend that you
  use [@artela/aspect-tool](/develop/reference/aspect-tool/overview). The tool offers functionality to create Aspect
  development scaffolding and seamlessly integrates with the Artela Blockchain.


