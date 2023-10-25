---
sidebar_position: 2
---

# Develop an Aspect

An Aspect is a dynamic, stateful extension that leverages Web Assembly (WASM) to introduce additional functionalities into the lifecycles of blocks or transactions specific to smart contracts. This guide will walk you through the process of building a basic Aspect using AssemblyScript (a subset of TypeScript).

### 1. Setting Up Your Development Environment

To streamline Aspect development, we've crafted a command-line utility named `aspect-tool`. It's recommended to have this tool installed on your system before moving forward. Use the following command to install it:

```shell
# Install the aspect-tool
npm install -g @artela/aspect-tool
```

### 2. Initializing Your Project

Once you've set up the `aspect-tool`, you can proceed to initialize your project. Follow the steps below:

```shell
# Create a new directory and navigate into it
mkdir my-first-aspect && cd my-first-aspect

# Set up a new npm project
npm init -y

# Configure the npm project for aspect development
aspect-tool init

# Install the necessary dependencies
npm install
```

### 3. Crafting Your Aspect

Navigate to `assembly/aspect/aspect.ts` and locate the `postTxExecute` function. Incorporate the following code snippet:

```tsx
//...
postTxExecute(ctx: PostTxExecuteCtx): void {
    // Implement your logics here
}
```

:::tip
For an in-depth understanding, consult the [Aspect Documentation](../../aspect-in-depth/aspect-dd).
:::

Having constructed your initial Aspect, compile it using:

```bash
npm run aspect:build
```
This command produces Aspect artifacts inside the `build` directory. The `release.wasm` file holds the WASM bytecode, prepped for deployment.

### 4. Deploying Your Aspect

Upon finalizing your Aspect's development, you're set to deploy the `release.wasm` bytecode onto Artela.

For detailed steps on deploying an Aspect via `@artela/web3.js`, refer [here](../../../develop/web3js-guide).

:::note
Be vigilant about Aspect permissions. If the `isOwner` function within your Aspect code yields `false`, you won't be able to upgrade/config your Aspect.
:::

### 5. Binding to a Smart Contract

- For a **block-level Aspect**, it gets triggered at both the beginning and ending of each block.
- A **transaction-level Aspect** is activated when it's linked to a smart contract undergoing invocation.

To understand how to tether your Aspect to a contract using `@artela/web3.js`, visit [this link](../../../develop/web3js-guide).

:::note
Please be careful regarding the binding permissions. If the `onContractBinding` function within your Aspect code delivers a `false` outcome, the binding operation will fail.
:::

### 6. Executing Your Aspect

To round things off, you can activate your Aspect by calling the associated smart contract. For guidance on invoking your contract via `@artela/web3.js`, check [this guide](../../../develop/web3js-guide).
