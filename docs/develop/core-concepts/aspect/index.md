---
sidebar_position: 4
---

# Aspect

Aspect introduces a dynamic mechanism to implement system-level features on a blockchain. Simply put, an Aspect is akin to a system extension, executed in WASM, which can be bound to any smart contract. It offers the flexibility to either augment the capabilities of the target contract or monitor its activities and initiate specific actions when predefined conditions align.

## How does Aspect work?

The power of Aspect stems from Web Assembly (Wasm). On Artela, we've engineered a dedicated Wasm runtime, [Aspect-Runtime](https://github.com/artela-network/aspect-runtime), precisely for executing Aspect on the platform. The Aspect Runtime facilitates interactions between the Aspect and the fundamental blockchain modules via a suite of pre-determined host APIs. This equips the Aspect with abilities such as reading the blockchain state, initiating calls to smart contracts, managing its own state, and more.

## What can Aspect do?

For those familiar with web development, the concept of "middleware" might resonate. For the uninitiated, let's delve into it.

Middleware is essentially code that can be integrated into a web server, extending its functionalities. Imagine employing middleware to infuse authentication or logging capabilities into a web server, as illustrated below:

![Middleware](middleware.svg)

Upon receipt of an HTTP request, the web server's middleware mechanism empowers developers to craft modules that can process this incoming request, either before or after its main handling. For instance, an authentication middleware can validate a user's credentials before the request delves into the core logic. Such a design pattern allows for the decentralization of functionalities like authentication and logging, ensuring a more modular approach.

This middleware setup also supports a shared context, fostering communication between various middlewares or route handlers. For instance, after authenticating a user, the relevant middleware can store user data in the shared context. Subsequent middleware or route handlers can then access this data without reloading it.

Drawing parallels, one can envision Aspect as a smart contract's middleware. Envision developing a decentralized exchange on Artela and integrating Aspects:

![Aspect](aspect.svg)

Just as middlewares enhance web frameworks, Aspects amplify your blockchain applications. They enable modularization and foster inter-module communication via a shared context.

## Why use Aspect?

You may wonder why use Aspects instead of using the traditional proxy pattern to chain up the smart contracts. Here are compelling reasons to adopt Aspect:

1. **Cost Efficiency**: Cost concerns are paramount in blockchain operations. Being hosted in a WASM virtual machine, Aspects are significantly more economical than EVM. For similar operations, WASM can curtail gas costs to roughly 1/10 of EVM's.
2. **Complex Code Execution**: Solidity's simplicity is both an advantage and a limitation. Tasks like JSON string deserialization are cumbersome in Solidity. In contrast, any language that compiles to WASM can easily handle such tasks, making Aspect a preferable choice.
3. **Near-native Development Experience**: WASM programming offers a native-like development experience. You have the liberty to pick any programming language for Aspect development, provided it compiles to WASM bytecode.
4. **Enhanced On-chain Context Access**: EVM offers limited access to system-level blockchain data. While this might suffice for basic dApps, more intricate applications might require deeper insights, like the EVM call stack or state variable changes. Aspect grants these accesses effortlessly.
5. **Beyond Transactions**: Unlike EVM, which is restricted to executing code upon transaction receipt, Aspect can also be invoked when a block is generated. This paves the way for purely on-chain dApps without off-chain network dependencies.
6. **Easier Management**: Using proxy patterns with smart contracts can be cumbersome. If you want to change the order of your smart contracts chain or upgrade it, it could be a nightmare. Aspect offers a more streamlined approach. Aspect is upgradable, so upgrading Aspect code will be much easier than the proxy pattern. Also like the middleware in a web framework, Aspect can be easily added / removed / reordered to a smart contract.

## More to know

The first version of Artela Aspect is built with [Assembly Script](/)(a sub set of TypeScript, strictly typed). To support easier Aspect development, we have also built the [Aspect Lib](/) for developers to interact with our lower level WASM host APIs.  
