---
sidebar_position: 2
---

# Aspect Tools Guide

# Installation

To get started, install `aspect-tool` with this command:

```bash
# install aspect-tool
npm install -g @artela/aspect-tool
```

# Project Initialization

Next, you can initialize your project with `aspect-tool` , set it up using the following commands:

```bash
# Create a new directory and navigate into it
mkdir my-first-aspect && cd my-first-aspect

# Initialize a new npm project
npm init -y

# initialize the given npm project with aspect-tool 
aspect-tool init

# Install required dependencies
npm install
```

Your project directory will have this structure:

```
.
├── README.md
├── asconfig.json
├── assembly
│   ├── aspect                 <-- your aspect here
│   │   └── aspect.ts          <-- entry functions of aspect
│   └── index.ts
├── contracts                  <-- your smart contract here
├── node_modules
│   ├── @artela
│   │   ├── aspect-libs        <-- library of aspect
│   │   ├── aspect-tool        <-- aspect-tool, utils of aspect
│   │   ├── web3               <--│
│   │   ├── web3-atl           <--│
│   │   ├── web3-atl-aspect    <--│
│   │   ├── web3-core          <--├── artela.web3js, artela web3 client.
│   │   ├── web3-core-method   <--│
│   │   ├── web3-eth-contract  <--│
│   │   └── web3-utils         <--│
│   ├── @assemblyscript        <-- aseemblyscript libs
...
├── package.json
├── project.config.json
├── scripts                    <-- scripts for depolying & binding smart contract, e.g. "npm run contract:deploy"
│   ├── aspect-deploy.cjs
│   ├── bind.cjs
│   ├── contract-call.cjs
│   └── contract-deploy.cjs
├── tests
└── tsconfig.json
```

## Develop a Smart Contract

### 1. Add a Smart Contract

Create your smart contract source files,  name as `*.sol`, in the project’s `contracts` directory.

For example, we create a file called `Counter.sol` and implement a simple smart contract as the following:

```tsx
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Counter {
	
    uint256 private counter;

    // The aspect specification should give overriding the isOwner method.
    function isOwner(address user) external view returns (bool result) {
	      return true;
    }

    function count(uint256 number) public {
        counter = counter + number;
    }
}
```

This smart contract has a function `count`, which takes a number and adds the number to an on-chain state variable `counter`. We will use this smart contract later with our Aspect.

### 2. Compile a Smart Contract

Compile your smart contract with this command:

```bash
npm run contract:build 
```

If successful, you'll find `Counter.abi` and `Counter.bin` in `build/contract`  folder.

### 3. Deploy a Smart Contract

Modify `project.config.json` in the project root folder to set the network configurations (assuming we are using Artela Test Node, if you are using your own node, please change the config accordingly):

```tsx
{
  "node": "https://artela-devnet-rpc1.artela.network"
}
```

Then, use the provided script `scripts/contract-deploy.js` to deploy your contract, with the following command (e.g. deploying `Counter` contract with the script):

```bash
npm run contract:deploy --  --sender {account-address} \
														--abi ./build/contract/Counter.abi \
														--bytecode ./build/contract/Counter.bin \
														--gasPrice 100000000 \
													  --gas  200000 
```
Upon successful deployment of the contract, the **contract address** will be displayed in the terminal.

> 💡 Note
> 
> 
> If constructor of your contract requires input parameters, include an additional argument `--args` when using `contract:deploy`, the `--args` should be in a JSON array format. For example: `--args '[1, "a"]'`.
> If the provided script does not fulfill your requirements for deploying a smart contract, feel free to modify it according to your specific needs.
> 

## Develop an Aspect

### 1. Implement an Aspect

The source files of Aspect is located in `assembly/aspect/aspect.ts`.

For example, let’s add some logic before the smart contract execution. Open the file `assembly/aspect/aspect.ts`, find the `postTxExecute` function, and add the following lines of code:

```tsx

//...

    postTxExecute(ctx: PostTxExecuteCtx): void {
    // Write your logic

    }

//...
```
:::note
To learn more details, refer to [Aspect Doc](https://docs.artela.network/develop/aspect-tools/aspect-docs). 
:::
### 2. Access Smart Contract State Changes in Aspect

Suppose we want to implement an Aspect for the `Counter` contract that allows only even numbers to be counted. To achieve this, we need to access and check the state of the `Counter` contract within our Aspect.

First, generate the necessary state tracing code for the `Counter` contract by running the following command:

```shell
npm run aspect:gen
```

This command generates a file named `counter-storage.ts` in your `assembly/aspect` folder. This file provides a user-friendly way to interact with the underlying state-tracing data of the smart contract.

Now, we can use this file in our Aspect. Here's how to access and check the state of the `Counter` contract within your Aspect:

```tsx
    // Import the state tracer generated with aspect:gen
    import { CounterState } from './counter-storage'; 

    //...
    preContractCall(ctx: PreContractCallCtx): void {
        // Instantiate a state tracer for the 'counter' variable on the transaction callee.
        const counter = new CounterState.counter(ctx.trace, ctx.tx.content.to);
    
        // Retrieve the latest value of the 'counter' variable.
        const lastCount = counter.current();
    
        // Check whether the latest value of the 'counter' is an even number.
        // If it's not, notify the Aspect runtime with a false result and an error message.
        if (lastCount != null && lastCount.modInt(2) != 0) {
            vm.revert("count is not even number!");
        }
    }
   
```

:::note
If you are interested in how it functions and want a deeper understanding, refer to [Aspect Doc](https://docs.artela.network/develop/aspect-tools/aspect-docs).
:::

### 3. Build an Aspect

Compile your Aspect:

```shell
npm run aspect:build 
```

The resulting artifacts will be stored in the `build` folder. `release.wasm` contains the WebAssembly (WASM) bytecode necessary for the subsequent deployment process

### 4. Deploy an Aspect

Deploy your Aspect:

```bash
npm run aspect:deploy -- --sender {account-address} \
												 --gasPrice 100000000 \
												 --gas  200000 \
												 --wasm ./build/release.wasm
```

### 5. Bind Smart Contract with Aspect

Deploying an Aspect alone won't activate it automatically. You need to establish a binding relationship with a smart contract. 

Use the following command to bind your contract and Aspect:

```bash
npm run contract:bind --  --sender {account-address}  \
												  --contract {smart-contract-address} \
											    --aspectId {aspect-Id} \
                          --gasPrice 100000000 \
												  --gas  200000 
```

### 6. Invoke Smart Contract with Aspect

After the binding operation, your `Counter` contract is now 'protected' by the Aspect from processing odd numbers. 

To test if it's working correctly, you can invoke your smart contract using the `scripts/contract-call.cjs` script

```bash
npm run contract:call -- --contract {smart-contract-address} \
                         --abi ./build/contract/Counter.abi \
										     --sender {account-address} \
                         --method count \
                         --args '[55]'  \
												 --gasPrice 100000000 \
												 --gas  200000 
```

After the transaction is finalized, you will notice that the status of the transaction receipt is `false`. This indicates that the Aspect successfully prevented the contract from processing an odd number by reverting the transaction.

To further test, you can replace the `55` in the previous command with some even numbers. In this case, the status of the transaction receipt should be `true`, signifying that the transaction was allowed to proceed.

# Summary

Now you have learnt some basics about how to develop an Aspect, if you want to dig deeper, please check out our [Aspect Doc](https://docs.artela.network/develop/aspect-tools/aspect-docs) for more details.

Now you've learned the basics of developing an Aspect. If you're interested in delving deeper, refer to [Aspect Doc](https://docs.artela.network/develop/aspect-tools/aspect-docs) for more details.