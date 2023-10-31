---
sidebar_position: 10
---

# ASOLC

## What is ASOLC?

Like Ethereum, Artela also supports EVM smart contracts. However, Artela introduces a modified version of the EVM that is fully compatible with traditional Solidity, while offering additional features like `state` and `callstack` tracing.

To accomplish this, Artela employs an advanced version of **SOLC**, referred to as **ASOLC**. ASOLC enhances the compilation process of smart contracts by including instruction instrumentation, enabling the aforementioned features.

## How ASOLC Works

Below is a diagram illustrating the workings of ASOLC:

![ASOLC](asolc.svg)

In essence, the process involves these steps:

1. ASOLC processes the Solidity smart contract source file, identifying all expressions that access or modify storage.
2. It then generates additional Yul IR methods. These methods establish the connection between state variables and storage slots, utilizing extra opcodes provided by the Artela EVM.
3. The generated IR is subsequently compiled into EVM bytecode, ready for deployment on the Artela EVM.

This added layer of information allows the Artela EVM to understand the links between storage slots and state variables. Consequently, it can trace the contract's state changes, enabling Aspect to query information using state variable names instead of dealing with hashed storage slots.

## SOLC or ASOLC?

### TLDR;
- **Use SOLC if:**
    - Your dApp prioritizes extreme gas efficiency.
    - Your dApp doesn't require state tracing, nor do you plan to use this feature in the future.

- **Use ASOLC if:**
    - Your dApp requires state tracing capabilities.
    - You are prepared to trade some gas efficiency for enhanced security and functionality, particularly with state tracing in Aspect.

It's important to note that ASOLC, due to its state tracing opcodes, produces slightly larger artifacts compared to legacy SOLC. This also results in marginally higher gas consumption.

Additionally, bear in mind that ASOLC artifacts are incompatible with legacy EVMs. Thus, if you plan to deploy your contract on Ethereum, it is necessary to compile it with the traditional SOLC.

## ASOLC Releases

You can find the latest releases of ASOLC [here](https://github.com/artela-network/solidity/releases/tag/v0.8.21-atl). Select the version that matches your system (e.g., for macOS, download `macos.tar.gz`).
