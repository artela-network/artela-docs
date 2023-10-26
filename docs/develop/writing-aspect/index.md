---
sidebar_position: 8
---

# Writing Aspect

Welcome to the Aspect Tool Guide. This guide will walk you through all functionalities of `aspect-tool` with an example. This example including the process of how to use `aspect-tool` to install, initialize, and generate code for your projects.

## Installation

Start by installing the `aspect-tool`:

```bash
npm install -g @artela/aspect-tool
```

## Project Initialization

To kick off your project with `aspect-tool`, follow these steps:

```bash
# Create a new directory and navigate into it
mkdir my-first-aspect && cd my-first-aspect

# Initialize a new npm project
npm init -y

# Set up the npm project with aspect-tool 
aspect-tool init

# Install the necessary dependencies
npm install
```

This will create a project directory with the following structure:

```
.
├── README.md
├── asconfig.json
├── assembly
│   ├── aspect                 <-- Your aspect code resides here
│   │   └── aspect.ts          <-- Entry functions for the aspect
│   └── index.ts
├── contracts                  <-- Place your smart contracts here
├── scripts                    <-- Utilitity scripts, including deploying, binding and etc.
│   ├── aspect-deploy.cjs
│   ├── bind.cjs
│   ├── contract-call.cjs
│   └── contract-deploy.cjs
... [other directories and files]
```

## Add and compile your smart contract(s)

### 1. Add a Smart Contract

Within the `contracts` directory of your project, create your smart contract source files with a `.sol` extension.

For demonstration, we'll create a `Counter.sol` file and implement a simple `Counter` smart contract:

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Counter {
    uint256 private counter;
    
    address private owner;
    
    constructor() {
        this.owner = msg.sender;
    }

    function isOwner(address user) external view returns (bool result) {
        return user == this.owner;
    }

    function count(uint256 number) public {
        counter += number;
    }
}
```

This smart contract introduces a `count` function that increments an on-chain `counter` variable. We'll later integrate this smart contract with our Aspect.

### 2. Compile the Smart Contract

Compile your contract using:

```bash
npm run contract:build 
```

Successful compilation will generate `Counter.abi` and `Counter.bin` files in the `build/contract` directory.

### 3. Deploy the Smart Contract

Update the `project.config.json` in the root directory with the appropriate network configuration:

```json
{
  "node": "https://artela-devnet-rpc1.artela.network"
}
```

Then, deploy your contract with the provided script:

```bash
npm run contract:deploy -- --sender {account-address}                           
                           --abi ./build/contract/Counter.abi                           
                           --bytecode ./build/contract/Counter.bin                           
                           --gasPrice 100000000                           
                           --gas 200000 
```

Upon successful deployment, the terminal will display the contract address.

:::note
💡 **Note**: If your contract's constructor requires input parameters, use the `--args` argument in a JSON array format, like `--args '[1, "a"]'`.
:::

## Add and compile your Aspect

### 1. Implement an Aspect

You'll find the Aspect source files in `assembly/aspect/aspect.ts`.

For example, to add logic after a smart contract call execution, open `aspect.ts`, locate the `postTxExecute` function, and insert your logic:

```typescript
postTxExecute(ctx: PostTxExecuteCtx): void {
    // Insert your logic here
}
```

:::note
💡 **Note**: For detailed instructions, refer to the [Aspect Doc](https://docs.artela.network/develop/aspect-tools/aspect-docs).
:::

### 2. Access State Changes of Smart Contract in Aspect

To integrate the state trace of `Counter` contract with our Aspect, ensuring only even numbers are processed, follow these steps:

1. Generate the required state tracing code:

```bash
npm run aspect:gen
```

2. This will produce a `counter-storage.ts` file in `assembly/aspect`. Use this file in your Aspect to check the state of the `Counter` contract:

```typescript
    // Import the generated state tracer
    import { CounterState } from './counter-storage';
    import { PreContractCallCtx, sys } from '@artela/aspect-libs';

    preContractCall(ctx: PreContractCallCtx): void {
        const counter = new CounterState.counter(ctx.trace, ctx.tx.content.to);
        const lastCount = counter.current();

        // Revert the transaction if the 'counter' value is odd
        if (lastCount.modInt(2) !== 0) {
            sys.revert("The count value is not even!");
        }
    }
```

:::note
💡 **Note**: For an in-depth understanding, refer to the [Aspect Doc](https://docs.artela.network/develop/aspect-tools/aspect-docs).
:::

### 3. Compile the Aspect

Build your Aspect:

```bash
npm run aspect:build 
```

The resulting `release.wasm` in the `build` folder contains the necessary WASM bytecode.

### 4. Deploy the Aspect

Deploy your compiled Aspect:

```bash
npm run aspect:deploy -- --sender {account-address}                          
                         --gasPrice 100000000                          
                         --gas 200000                          
                         --wasm ./build/release.wasm
```

### 5. Bind the Smart Contract and Aspect

Deploying the Aspect doesn't automatically activate it. To make it functional, bind it to a smart contract:

```bash
npm run contract:bind -- --sender {account-address}                          
                         --contract {smart-contract-address}                         
                         --aspectId {aspect-Id}                          
                         --gasPrice 100000000                          
                         --gas 200000 
```

### 6. Test the Smart Contract and Aspect Integration

Now that the `Counter` contract and Aspect are bound, test the setup:

```bash
npm run contract:call -- --contract {smart-contract-address}                          
                         --abi ./build/contract/Counter.abi                          
                         --sender {account-address}                          
                         --method count                          
                         --args '[55]'                          
                         --gasPrice 100000000                          
                         --gas 200000 
```

If the Aspect functions correctly, the transaction will revert for odd numbers and proceed for even ones.

## Summary

You've now learnt the basics of Aspect development with `aspect-tool`. For a deeper dive, refer to our comprehensive [Aspect Doc](https://docs.artela.network/develop/aspect-tools/aspect-docs).

