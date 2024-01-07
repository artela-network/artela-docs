---
sidebar_position: 2
---

# Aspect Structure

[Aspect](/develop/core-concepts/aspect), executed on the [Aspect-Runtime](/develop/core-concepts/aspect-runtime), follow a specific development pattern that utilizes WebAssembly (Wasm) syntax for coding, subsequently
compiling it into WebAssembly modules.  
This guide offers an overview of Aspect structure using a simple example, providing insights into the fundamental
components of Aspects.

## A simple Aspect

Paving the way to your first Aspect module.

### 1. Init a new project

Make sure that a recent version of [Node.js](https://nodejs.org/en) and its package manager npm are installed, then
switch to a new directory and initialize a new Node.js module as usual:

```shell
npm install -g @artela/aspect-tool

mkdir -p apsect-demo && cd apsect-demo

aspect-tool init 
```

The init command automatically creates the recommended directory structure and configuration files.

```shell
.
├── README.md
├── asconfig.json
├── aspect                   <-- Your aspect code resides here
│   └── index.ts       <-- Entry functions for the aspect
├── contracts                <-- Place your smart contracts here
├── package.json
├── project.config.json
├── scripts                  <-- Utilitity scripts, including deploying, binding and etc.
│   ├── aspect-deploy.cjs
│   ├── bind.cjs
│   ├── contract-call.cjs
│   ├── contract-deploy.cjs
│   ├── contract-send.cjs
│   └── create-account.cjs
├── tests
└── tsconfig.json
```

### 2. Create a Aspect

Within the `./aspect` directory of your project, create your aspect files with a `.ts` extension.
For example, create a `HelloWorld.ts` file:

```typescript
import {
  allocate,
  entryPoint,
  execute,
  IPostContractCallJP,
  IPostTxExecuteJP,
  PostContractCallInput,
  PostTxExecuteInput,
  sys,
  uint8ArrayToHex,
} from "@artela/aspect-libs";

/**
 * Please describe what functionality this aspect needs to implement.
 *
 * About the concept of Aspect @see [join-point](https://docs.artela.network/develop/core-concepts/join-point)
 * How to develop an Aspect  @see [Aspect Structure](https://docs.artela.network/develop/reference/aspect-lib/aspect-structure)
 */
class HelloWorldAspect implements IPostContractCallJP, IPostTxExecuteJP {
  postTxExecute(input: PostTxExecuteInput): void {
    throw new Error("Method not implemented.");
  }
  /**
   * isOwner is the governance account implemented by the Aspect, when any of the governance operation
   * (including upgrade, config, destroy) is made, isOwner method will be invoked to check
   * against the initiator's account to make sure it has the permission.
   *
   * @param sender address of the transaction
   * @return true if check success, false if check fail
   */
  isOwner(sender: Uint8Array): bool {
    return true;
  }

  /**
   * postContractCall is a join-point which will be invoked after a contract call has finished.
   *
   * @param input input to the current join point
   */
  postContractCall(input: PostContractCallInput): void {
    let txData = uint8ArrayToHex(input.call!.data);

    // if call `world` function then revert, 30b67baa is method signature of `world`
    if (txData.startsWith("30b67baa")) {
      sys.revert("the function `world` not available");
    }
  }
}

// 2.register aspect Instance
const aspect = new HelloWorldAspect();
entryPoint.setAspect(aspect);

// 3.must export it
export {execute, allocate};

```

Only a Class that has implemented `join points` can be referred to as an Aspect. An Aspect implementing the `Operation interface` can be invoked by the Entity of Aspect (EoA). 

Join points

* [ITransactionVerifier](/develop/reference/aspect-lib/join-points/verify-aspect)
* [IPreTxExecuteJP](/develop/reference/aspect-lib/join-points/pre-tx-execute)
* [IPoreTxExecuteJP](/develop/reference/aspect-lib/join-points/post-tx-execute)
* [IPreContractCallJP](/develop/reference/aspect-lib/join-points/pre-contract-call)
* [IPostContractCallJP](/develop/reference/aspect-lib/join-points/post-contract-call)

Operation interface

* IAspectOperation

After implementing the Aspect class, it is necessary to register the Aspect instance into the entryPoint.

```typescript

const aspect = new HelloWorldAspect();
// register join point
entryPoint.setAspect(aspect);

// register Operation, if the class implements the Operation interface
entryPoint.setOperationAspect(aspect);
```

### 3. Export Entry Point

When the message is sent to the Aspect-Runtime, a function called "entry point" is called. Aspect have a couple corresponding to different message types: `execute`, `allocate`.

```shell
export {execute, allocate};
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
* To implement an Aspect, it is required to define and implement "join points." Additionally, by implementing the "Operation interface," the Aspect becomes invokable by the Entity of Aspect (EoA).
* After developing the Aspect, it is necessary to register the join points with the Entrypoint and then export the Entrypoint.
* Compile to check the Aspect for errors, and get the WebAssembly bytecode file.
* Since the [AssemblyScript](https://assemblyscript.bootcss.com/getting-started.html#setting-up-a-new-project) project
  does not provide features such as Aspect deployment, binding, calls, etc., you need to use additional tools such
  as [web3.js](/develop/client/artela-web3.js) to communicate with Artela Blockchain. We recommend that you
  use [@artela/aspect-tool](/develop/reference/aspect-tool/overview). The tool offers functionality to create Aspect
  development scaffolding and seamlessly integrates with the Artela Blockchain.

  