---
sidebar_position: 2
---

# Quick Start
Welcome to the Artela Quick Start Guide! This section guides you in creating dApps on Artela with aspect-oriented functionality. It intercepts and identifies specific transactions while enabling additional business logic injection. For instance, if a transaction tries to modify a state variable (e.g., 'Count') with certain conditions, like being an even number, the current transaction is rolled back.

:::note
 This document is currently in public preview and may undergo significant changes as we gather feedback from readers like you. 
 
 Your insights are invaluable in helping us improve Artela. If you encounter issues or have suggestions, reach out to us!
 
 To provide feedback, please click the "Edit this page" button at the bottom of this document or join the Artela community to share your feedback.
:::

The additional knowledge required for this guide includes:
* [Node.js](https://nodejs.org/)
* [asloc](https://docs.artela.network/develop/asolc-guide)


# Setting up a new project
Make sure that a recent version of [Node.js](https://nodejs.org/) and its package manager npm (that comes with Node.js) are installed,
Start by installing the `aspect-tool`:

```bash
npm install -g @artela/aspect-tool
```


## Project Initialization

To kick off your project with `aspect-tool`, follow these steps:

```bash
# Create a new directory and navigate into it
mkdir my-first-aspect && cd my-first-aspect

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
  owner = msg.sender;
 }
 function isOwner(address user) external view returns (bool result) {
  return user == owner;
 }
 function add(uint256 number) public {
  counter = counter + number;
 }
 function get() external view returns (uint256 result)  {
  return counter;
 }
}
```

This smart contract introduces a `add` function that increments an on-chain `counter` variable. We'll later integrate this smart contract with our Aspect.

### 2. Compile the Smart Contract

Compile your contract using:

```bash
npm run contract:build 
```

Successful compilation will generate `Counter.abi` and `Counter.bin` files in the `build/contract` directory.

### 3. Deploy the Smart Contract

#### 3.1 Update the `project.config.json` in the root directory with the appropriate network configuration:
```json
{
  "node": "https://testnet-rpc1.artela.network"
}
```
more development environment setup, please refer to [artela devnet](/develop/get-started/access-testnet)

#### 3.2 Create a blockchain account (optional). 

Execute the following command under the `my-first-aspect` folder to create an account if you don't already have one.

```bash
npm run account:create -- --pkfile {privateKey-path}
```

> * --pkfile : privateKey path for sender. (optional,default value `./privateKey.txt`).

Also, if you don't have a test coin in your account, please join [our discard](https://discord.com/invite/artela)，require testnet faucet。.


#### 3.3  Set up the contract compilation environment `asolc`.(optional).

Execute the following command in shell. more details see [What is ASOLC](/develop/advanced-concepts/asolc)
```shell
$ export PATH= {your asolc path}:$PATH
```

#### 3.4  Deploy your contract 

Execute the following command below the `my-first-aspect` folder, with the provided script:

```bash
npm run contract:deploy -- --pkfile {privateKey-path} \                        
                           --abi ./build/contract/Counter.abi \                          
                           --bytecode ./build/contract/Counter.bin \     
                           --args [..] \                     
                           --gas 200000 
                           
```
> * --pkfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
> * --abi : contract abi path.
> * --bytecode:  contract bytecode path.
> * --args : If your contract's constructor requires input parameters, like `--args '[1, "a"]'` (optional).
> * --gas : like `200000`,(optional,default value `7000000`).

Upon successful deployment, the terminal will display the contract address.


## Add and compile your Aspect

### 1. Implement an Aspect

You'll find the Aspect source files in `assembly/aspect/aspect.ts`.

For example, to add logic after a smart contract call execution, open `aspect.ts`, locate the `postContractCall` function, and insert your logic:

```typescript
 postContractCall(ctx: PostContractCallCtx): void {
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
    import {  sys } from '@artela/aspect-libs';

    postContractCall(ctx: PostContractCallCtx): void {
        const counter = new CounterState.counter(ctx.trace, ctx.tx.content.unwrap().to);
        const lastCount = counter.current();

        // Revert the transaction if the 'counter' value is odd
        if (lastCount && lastCount.modInt(2) !== 0) {
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

npm run aspect:deploy -- --pkfile {privateKey-path} \                                                
                         --wasm ./build/release.wasm \
                         --gas 200000  
```
> * --pkfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
> * --wasm : wasm path.
> * --gas : like `200000`,(optional,default value `7000000`).


### 5. Bind the Smart Contract and Aspect

Deploying the Aspect doesn't automatically activate it. To make it functional, bind it to a smart contract:

```bash
npm run contract:bind -- --pkfile {privateKey-path} \                          
                         --contract {smart-contract-address} \
                         --abi ./build/contract/Counter.abi \                        
                         --aspectId {aspect-Id} \                          
                         --gas 200000 
```
> * --pkfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
> * --abi : contract abi path.
> * --contract:  smart contract address.
> * --aspectId:  aspect id.
> * --gas : like `200000`,(optional,default value `7000000`).

### 6. Test the Smart Contract and Aspect Integration

Now that the `Counter` contract and Aspect are bound, test the setup:

 1. send `add`
```bash
npm run contract:send -- --pkfile {privateKey-path}    \     
                         --contract {smart-contract-address}  \                         
                         --abi ./build/contract/Counter.abi   \                                    
                         --method add  \                        
                         --args '[55]' \                         
                         --gas 200000 
```
> * --pkfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
> * --contract:  smart contract address.
> * --abi : contract abi path.
> * --method:  method name .
> * --args : if your contract's constructor requires input parameters, like `--args '[1, "a"]'` (optional).
> * --gas : like `200000`,(optional,default value `7000000`).

If the Aspect functions correctly, the transaction will revert for odd numbers and proceed for even ones.

 2. call `get` 

```bash
npm run contract:call -- --pkfile {privateKey-path}    \     
                         --contract {smart-contract-address}  \                         
                         --abi ./build/contract/Counter.abi   \                                    
                         --method get  \   
                         --gas 200000 
```
> * --pkfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
> * --contract:  smart contract address.
> * --abi : contract abi path.
> * --method:  method name .
> * --args : if your contract's constructor requires input parameters, like `--args '[1, "a"]'` (optional).
> * --gas : like `200000`,(optional,default value `7000000`).


## Summary

You've now learnt the basics of Aspect development . For a deeper dive, refer to our comprehensive [Aspect Doc](https://docs.artela.network/develop/aspect-tools/aspect-docs).
