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

### 1. Adding a Smart Contract

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

### 2. Compiling a Smart Contract

Compile your smart contract with this command:

```bash
npm run contract:build 
```

If successful, you'll find `Counter.abi` and `Counter.bin` in `build/contract`  folder.

### 3. Deploying a Smart Contract

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

**One more thing:  [Develop a Smart Contract Integration with `hardhat`](https://www.notion.so/Develop-a-Smart-Contract-Integration-with-hardhat-8124367c1ee1490198abadd2d53fe92d?pvs=21)**

## Develop an Aspect

### 1. Implement an Aspect

The source files of Aspect is located in `assembly/aspect/aspect.ts`.

For example, let’s add some logic before the smart contract execution. Open the file `assembly/aspect/aspect.ts`, find the `postTxExecute` function, and add the following lines of code:

```tsx

//...

postTxExecute(ctx: PostTxExecuteCtx): AspectOutput {

      // Write your logic

			// return a successful result and let tx continue to execution
      return new AspectOutput(true);
  }
//...
```
:::note
To learn more details, refer to [Aspect Doc](https://www.notion.so/Aspect-Doc-acefd64b222d47b5a9da64c68133f2fa?pvs=21). 
:::
### 2. Accessing Smart Contract State Changes in Aspect

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

postTxExecute(ctx: PostTxExecuteCtx): AspectOutput {
        // Retrieve the state change of count after transaction execution finished.
        // Instantiate a state tracer for the 'counter' variable on the transaction callee.
        const counter = new CounterState.counter(ctx, ctx.tx!.to);

        // Retrieve the latest value of the 'counter' variable.
        const lastCount = counter.current();

        // Check whether the latest value of the 'counter' is an even number.
        // If it's not, notify the Aspect runtime with a false result and an error message.
        if (lastCount != null && lastCount.value.modInt(2) != 0) {
            return new AspectOutput(false, "count is not even number!");
        }

        // Otherwise, the check passes, return a true result to allow the transaction to continue.
        return new AspectOutput(true);
    }
```

:::note
If you are interested in how it functions and want a deeper understanding, refer to [Aspect Doc](https://www.notion.so/Aspect-Doc-acefd64b222d47b5a9da64c68133f2fa?pvs=21).
:::

### 3. Build an Aspect

Compile your Aspect:

```shell
npm run aspect:build 
```

The resulting artifacts will be stored in the `build` folder. `release.wasm` contains the WebAssembly (WASM) bytecode necessary for the subsequent deployment process

## 4. Deploy an Aspect

Deploy your Aspect:

```bash
npm run aspect:deploy -- --sender {account-address} \
												 --gasPrice 100000000 \
												 --gas  200000 \
												 --wasm ./build/release.wasm
```

## 5. Bind Smart Contract with Aspect

Deploying an Aspect alone won't activate it automatically. You need to establish a binding relationship with a smart contract. 

Use the following command to bind your contract and Aspect:

```bash
npm run contract:bind --  --sender {account-address}  \
												  --contract {smart-contract-address} \
											    --aspectId {aspect-Id} \
                          --gasPrice 100000000 \
												  --gas  200000 
```

## 6. Invoke Smart Contract with Aspect

Finally, after the binding operation, now our `Counter` contract has been “protected” by the Aspect from the odd numbers. We can invoke our smart contract with the following call to check whether it is working or not. 

This call can be made with the `scripts/contract-call.cjs` script:

```bash
npm run contract:call -- --contract {smart-contract-address} \
                         --abi ./build/contract/Counter.abi \
										     --sender {account-address} \
                         --method count \
                         --args '[55]'  \
												 --gasPrice 100000000 \
												 --gas  200000 
```

After the transaction has been finalized, we can see that the status of the transaction receipt is `false` ,  which means the Aspect has stopped contract from counting an odd number by reverting the transaction. You can also try with some even numbers by replacing the `55` in the above command, the status of transaction receipt should be `true`.

# Summary

Now you have learnt some basics about how to develop an Aspect, if you want to dig deeper, please check out our [Aspect Doc](https://www.notion.so/Aspect-Doc-acefd64b222d47b5a9da64c68133f2fa?pvs=21) for more details.