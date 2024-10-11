---
sidebar_position: 10
---

# ASOLC

## What is ASOLC?

ASOLC stands as a cornerstone in the Artela ecosystem, designed to bridge the gap between the Ethereum Virtual Machine (EVM) and Aspect's ability to interpret runtime events. We've crafted Artela EVM, an extended version of EVM, capable of capturing runtime stack traces and storage changes during transaction execution.

You might question the necessity of Artela EVM, given that Ethereum's built-in tracer already tracks data like storage slot changes. While this is partially true, the challenge lies in the fact that key changes are hashed, rendering them unprocessable by the code. For instance, consider a variable `a` of type `mapping(string => string)`. When `a["key"]` is altered, the tracer only reveals a modified storage slot, say `0xabcedf12354566.....`, without any direct linkage to the state variable `a` and the specific key `key`.

To resolve this, Artela EVM introduces additional opcodes, enabling the connection of hashed information to human-readable source code. In parallel, ASOLC was developed to generate corresponding state tracing Intermediate Representations (IRs) that synergize with Artela EVM. Thus, **ASOLC** can be viewed as an enhanced version of `SOLC`, maintaining full compatibility with SOLC while introducing groundbreaking features.

## How ASOLC Works

Below is a diagram illustrating the workings of ASOLC:

![ASOLC](asolc.svg)

The process unfolds through these steps:

1. ASOLC scrutinizes the Solidity smart contract source file, pinpointing expressions that access or alter storage.
2. It generates supplementary Yul IR methods that forge links between state variables and storage slots, leveraging Artela EVM's extra opcodes.
3. The resulting IR is then compiled into EVM bytecode, poised for deployment on the Artela EVM.

This augmented information layer empowers the Artela EVM to decipher connections between storage slots and state variables. As a result, it can trace the contract's state changes, enabling Aspect to access information using state variable names, bypassing the complexity of hashed storage slots.

## SOLC or ASOLC?

### TLDR;

- **Opt for SOLC if:**
  - Maximum gas efficiency is your dApp's top priority.
  - Your dApp doesn't necessitate state tracing and you have no plans to integrate this feature.

- **Choose ASOLC if:**
  - State tracing capabilities are crucial for your dApp.
  - You're willing to compromise a bit on gas efficiency for the sake of advanced security and functionalities, particularly state tracing in Aspect.

It's noteworthy that ASOLC, with its state tracing opcodes, tends to produce marginally bulkier artifacts than traditional SOLC, leading to slightly increased gas usage.

Moreover, it's crucial to remember that ASOLC artifacts aren't compatible with standard EVMs. Therefore, if your deployment destination is Ethereum, compiling with the conventional SOLC is a must.

## ASOLC Releases

Check out the latest ASOLC releases [here](https://github.com/artela-network/solidity/releases/tag/v0.8.21-atl). Choose the version that aligns with your system (e.g., for macOS, opt for `macos.tar.gz`).
