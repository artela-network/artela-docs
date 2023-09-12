---
sidebar_position: 1
---

# Artela Devnet
Welcome to Artela Devnet playground!
Looking to build a dApp on Artela Devnet? 
Follow this guide to learn how to access Artela Devnet, build an Aspect, deploy and bind it to a smart contract.


## What Artela is Building?
Artela is a dual-VM blockchain developed for building the most powerful decentralized applications. DApps on Artela enjoy an order of magnitude improvement in functionality, efficiency, and security. While most blockchains mainly focus on scalability, we believe that the lack of killer apps, not blockspace, is the key to mass adoption. Therefore, Artela is designed for building feature-rich applications. Whether it’s building the onchain version of Binance, or bringing telegram trading bots onchain, or preventing exploits such as re-entrance attacks, Artela makes all of this possible with an EVM + WASM VM architecture.

In short, Artela allows project teams to easily build secure dApps that are customized to their needs, and yet composable with other applications. In the realm of Defi, Artela offers a universal and more powerful framework for applications to extend their functionalities through the addition of hooks. While Uni v4 hooks are application-specific (ie. Only for Uniswap), Artela supports chain-native level hook design that is cheaper, computationally more powerful, provides runtime context access, and supports the major programming languages, allowing the flourishing of hooks that can be created by anyone and attached to any application.

## Artela Devnet Overview

Artela Devnet is an alpha version for developers. We have built the following: 

- `artelad`, the validator node which only supported running standalone in the Devnet stage.
- `ArtEVM`, the enhanced evm. It will provide runtime information for Aspect, such as the whole call stack of transactions and all contracts’ state changes.
- `asolc`, the fork version of `solc`. It injects additional instructions into bytecodes, allowing smart contracts to be traced by `ArtEVM`.
- `ArtWASM`, the WASM runtime for Aspect.
- `Aspect-tool`,  the tool to develop, compile and deploy Aspect.

By Artela Devnet, you can 

- Explore what is Aspect Programming by code
- Implement some interesting ideas for Aspect Programming
- Develop proof of concept for your project
- Research how Aspect can enhance DeFi, NFT, Full-chain Game, and so on
- Collaborate with the core team to build killer use cases
- Contribute to Artela

Explore more:

- Try your first Aspect through a [quick start guide](https://docs.artela.network/develop/quick-start)
- Explore [development document](https://docs.artela.network/develop)
- Artela's vision [**here**](https://medium.com/@artela_network/artela-enhance-dapp-functionality-through-aspect-programming-41717e4bac5b)

