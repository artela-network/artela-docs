---
sidebar_position: 2
---

# Aspect Deep Dive

Welcome to the deep dive of Aspect. This guide will introduce you some concepts and functionalities of Aspects in depth.

## What is Aspect

Aspect is a native extension within Artela, designed to enhance security, composability, and functionality. It oversees the entire transaction lifecycle and interacts seamlessly with the base processing context. This allows Aspects to tailor the transaction processing steps, making them instrumental in crafting high-quality aspect-oriented code.

Running within a secure sandboxed environment (WASM runtime), Aspects operate in complete isolation from the base layer, ensuring they don't compromise its security and availability. Moreover, Aspects are mutually isolated, guaranteeing that the execution of one does not influence another.

A standout feature of Aspect is its composability. By integrating smart contracts with Aspects, additional functionalities can be unlocked. Transactions that involve smart contracts interact with Aspects, granting them extended processing capabilities. This means that Aspects can be seamlessly paired with multiple smart contracts, providing developers with a versatile and potent tool.

In essence, Aspect is a noteworthy enhancement to the Artela Network, empowering developers to generate high-quality aspect-oriented code with advanced features like lifecycle management, security isolation, and without losing composability.

## Aspect Runtime

Aspects run in the WebAssembly (WASM) runtime. Developers can utilize any language that WASM supports to develop an Aspect.

Currently, [AssemblyScript](https://www.assemblyscript.org/getting-started.html)(a subset of TypeScript) is the first language supported for Aspect development.

## Join Points

Join Points represent specific stages in the transaction processing lifecycle where an Aspect can be invoked. Artela specifies a range of Join Points to dictate when and where Aspects are executed during transaction processing. These are:

![ninety_p](./img/join-points.svg)

- `filterTx`

  This is triggered upon receiving transaction data from a broadcast. If it returns false, the transaction is dropped in memPool.

- `onBlockInitialize`

  Initiates at the start of a new block, setting the stage for initialization activities and state preparations for that block.

- `preTxExecute`

  Activates before a transaction is executed.

- `preContractCall`

  Activates prior to a contract call, enabling tracking of state changes for the current transaction cached in the EVM.

- `postContractCall`

  Kicks in after a contract call, facilitating state change monitoring for both the transaction and the contract call.

- `postTxExecute`

  Activates after a transaction's execution, allowing post-transaction data retrieval to either initiate an inherent transaction or reverse the current one.

- `postTxCommit`

  Activates once a transaction has been successfully executed and committed.

- `onBlockFinalize`

  Executes after a block has been finalized.

## Additional Methods

If you look closely into the Aspect interface, you will find there are three extra methods are defined:

- `isOwner`
- `onContractBinding`
- `opertaion`

The method `isOwner` plays a pivotal role in managing Aspect. Operations like `upgrade`, `configuration` is only allowed to be executed by the owner of the Aspect. Aspect core will check the sender's address against `isOwner`, the operation is only allowed if this method returns `true`. In another word, if you want to make your Aspect immutable (non-upgradable), you can always return `false` in this method.

`onContractBinding` method will be invoked when a smart contract is trying to bind with an Aspect. The Aspect is able to choose whether it wants to be bound to a smart contract or not. If the developer wants to build a private Aspect specifically for his/her own dApp(s), return `false` to any smart contract not in whitelist is an option.

The method `opertaion` is a maintenance interface that allows Aspect maintainers to update or query the Aspect state through transaction. If there are sensitive data in the Aspect, make sure you have implemented proper authorization checks before actually modify the state. At current stage, the `operation` method is still in a `bytes in bytes out` manner, which means developers should handle the encoding/decoding/routing themselves for now. We will provide a better solution in a later version.

## Understanding Contexts in Aspect

You may notice that the contexts of each join-point are different, it is because at different consensus lifecycle stage, there will be some differences between the base layer contexts. For example, you will not be able to access `Receipt` in the context at the join-point `preContractCall`, since the transaction execution has not been finished, receipt has not been generated yet.  

The following is a diagram shows the methods/contexts you can access at each join point:

![Functionalities Image](./img/2.png)

### Available Context Keys

> WIP

### Message Passing via Aspect Context

> WIP

## System Components

The subsequent sections provide detailed insights of system components available in Aspect. By utilizing the functionalities of different components, Aspect can 

### Scheduler

Scheduler is an on-chain module that allows developer to automatically generate transaction(s) at a given schedule. The scheduler operates as the following:

![Scheduler Image](./img/3.png)

### Account Abstraction Entrypoint

> WIP

### Just-In-Time Caller

> WIP

### EVM State/CallStack Tracer

> WIP
