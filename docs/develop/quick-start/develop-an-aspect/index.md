---
sidebar_position: 2
---

# Develop an Aspect

Aspect is a dynamic stateful extension that utilizes Web Assembly (WASM). It adds extra functionalities to the lifecycles of blocks or transactions for specific smart contracts. In the following sections, we'll guide you through building a simple Aspect with AssemblyScript(a subset of TypeScript) step by step.

### 1. Set Up the Development Environment

We've created a command-line tool called `aspect-tool` to boost Aspect development. It's recommended to install it on your system before proceeding. Execute the following command to install it:
```shell
# install aspect-tool
npm install -g @artela/aspect-tool
```

### 2. Initialize Your Project

Next, you can initialize your project using `aspect-tool`. Execute the following commands to set up your project:
```shell
# create a new directory and enter it
mkdir my-first-aspect && cd my-first-aspect

# Initialize a new npm project
npm init -y

# Initialize the npm project with aspect
aspect-tool init

# Install required dependencies
npm install
```

### 3. Implement Your Aspect

Open the file `assembly/aspect/aspect.ts`, find the `postTxExecute` function, and add the following lines of code:

```tsx
//...
postTxExecute(ctx: PostTxExecuteCtx): void {
    // to do something
}
```

:::tip
To learn more details, please refer to [Aspect Doc](https://docs.artela.network/develop/aspect-tools/aspect-docs).
:::

Now that you've written your first Aspect, let's compile it with the following command:

```bash
npm run aspect:build
```
This will generate the Aspect artifacts in the `build` folder, with `release.wasm` containing the WASM bytecode for later deployment.


### 4. Deploy Your Aspect

After completing the development steps for your Aspect, it's time to deploy the `release.wasm` bytecode onto Artela. 

For guidance on deploying an Aspect using`@artela/web3.js`, refers to [here](https://docs.artela.network/develop/web3js-guide).


:::note
Ensure proper control of deployment permissions. If the `isOwner` function in your Aspect code returns `false`, the deployment process will not succeed.
:::

### 5. Binding to a Smart Contract

- In the case of a **block-level Aspect**, it's invoked at the beginning and end of each block.
- In the case of a **transaction-level Aspect**, it's invoked by binding it to a smart contract that is being invoked.

For instructions on binding your Aspect to a contract using `@artela/web3.js`, refers to [here](https://docs.artela.network/develop/web3js-guide).
    
:::note
Pay attention to the control of binding permissions. If the return value within the `onContractBinding` function in your Aspect code is `false`, the binding process will not be successful.
:::


### 6. Invoke Your Aspect
Finally, you can invoke your Aspect by invoking the bound smart contract. To learn how to invoke your contract using `@artela/web3.js` refers to [here](https://docs.artela.network/develop/web3js-guide).

