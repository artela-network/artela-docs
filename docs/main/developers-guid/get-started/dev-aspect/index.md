---
sidebar_position: 2
---

# Develop an Aspect

This section guides you in building a dApp on Artela with a sample Aspect.
This Aspect functions as a native extension, co-process with smart contract, and can be injected throughout the
transaction lifecycle. In this example, we'll show how Aspect can identify and revert a specific transaction.

**Pre-requisites:**

* [Node.js](https://nodejs.org/)
* [solc](https://docs.soliditylang.org/en/v0.8.20/installing-solidity.html)

## 1. Setting up a new project

Make sure you have a recent version of [Node.js](https://nodejs.org/) and npm installed,
Start by installing the `aspect-tool`:

```bash
npm install -g @artela/aspect-tool
```

**Project Initialization**, to kick off your project with `aspect-tool`, follow these steps:

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
├── aspect                   <-- Your aspect code resides here
│   └── index.ts       <-- Entry functions for the aspect
├── contracts                <-- Place your smart contracts here
├── package.json
├── project.config.json
├── scripts                  <-- Utility scripts, including deploying, binding and etc.
│   ├── aspect-deploy.cjs
│   ├── bind.cjs
│   ├── contract-call.cjs
│   ├── contract-deploy.cjs
│   ├── contract-send.cjs
│   └── create-account.cjs
├── tests
└── tsconfig.json

```

## 2. Deploy a smart contract

### 2.1. Add a Smart Contract

Within the `contracts` directory of your project, create your smart contract source files with a `.sol` extension.

For example, create a `HelloWorld.sol` file:

<!-- @formatter:off -->
```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract HelloWorld {
    address private owner;
    constructor() {
        owner = msg.sender;
    }
    function isOwner(address user) external view returns (bool result) {
        return user == owner;
    }

    // print hello message
    function hello() public pure returns (string memory) {
        return "hello world";
    }
}
```
<!-- @formatter:on -->

### 2.2. Compile the Smart Contract

This step relies on `solc`, first check if [solc](https://docs.soliditylang.org/en/v0.8.20/installing-solidity.html) is
installed correctly

```bash
solc --version
```

Compile your contract using:

```bash
npm run contract:build
```

> ✅ Successful compilation will generate `HelloWorld.abi` and `HelloWorld.bin` files in the `build/contract` directory.

### 2.3. Deploy the Smart Contract

#### 2.3.1 Update project.config.json

Update the `project.config.json` in the root directory with the appropriate network configuration:

```json
{
  "node": "https://betanet-rpc1.artela.network"
}
```

:::note 💡
For more details regarding testnet environment setup, please refer to [artela testnet](/develop/node/access-testnet).
If you are using a local node, please use `http://localhost:8545` instead.
:::

#### 2.3.2 Create a blockchain account (optional).

:::info 💡
If you already have an account, you can skip this step. You can just create a file named `privateKey.txt` in the root directory and paste the hex format (with 0x prefix) private key to the file.
:::

Execute the following command under the `my-first-aspect` folder to create an account if you haven't already done so:

```bash
npm run account:create
```

> ✅ If an account gets created successfully, its private key will be dumped as `privateKey.txt` in the current directory.

:::note 💡
For more detailed usage information about this command, please
refer to the [create-account command](/develop/reference/aspect-tool/create-account) documentation.
:::

If your account lacks test tokens, join [Discord](https://discord.com/invite/artelanetwork)，and request some
in `testnet-faucet` channel.

#### 2.3.4  Deploy your contract

Execute the following command within the `my-first-aspect` folder, using the provided script:

```bash
npm run contract:deploy --  --abi ./build/contract/HelloWorld.abi \
                           --bytecode ./build/contract/HelloWorld.bin
```

> ✅ Upon successful deployment, the terminal will display the contract address.

:::note 💡
For more detailed usage information about this command, please refer to
the [deploy-contract command](/develop/reference/aspect-tool/deploy-contract) documentation.
:::

### 2.4 Call Contract

Execute the following command within the `my-first-aspect` folder, call the Contract

#### 2.4.1 call `world` method

Replace `{smart-contract-address}` with the contract address you obtained from the previous step.

```bash
npm run contract:call -- --contract {smart-contract-address}  \
                         --abi ./build/contract/HelloWorld.abi   \
                         --method hello
```

> ✅ If the `hello` string is returned, it means that we have successfully deployed the `HelloWorld` contract.

> ✅ Upon successful, the terminal will display call result.

:::note 💡
For more detailed usage information about this command, please refer to
the [contract-call command](/develop/reference/aspect-tool/contract-call) documentation.
:::

## 3. Create your Aspect

### 3.1. Implements an Aspect

The Aspect source files can be found in `aspect/index.ts`.
For example, to add logic after a smart contract call execution, open `index.ts`, locate the `postContractCall`
function, and insert your logic:

<!-- @formatter:off -->
```typescript
postContractCall(input: PostContractCallInput): void {
  // Implement me...
}
```
<!-- @formatter:on -->

:::note 💡
For detailed instructions, refer to the [Aspect Doc](/develop/core-concepts/aspect-programming).
:::

### 3.2. Access State Changes of Smart Contract

To integrate the state of the `HelloWorld` contract with your Aspect, please follow the following steps:

- In `aspect/index.ts`, copy over the code in the `postContractCall` method. If `hello` function is called, the Aspect revert the call

<!-- @formatter:off -->
```typescript {12-17} showLineNumbers
// 1. implement IPostContractCallJP
class Aspect implements IPostContractCallJP {

    ...
  
    /**
     * postContractCall is a join-point which will be invoked after a contract call has finished.
     *
     * @param input input to the current join point
     */
    postContractCall(input: PostContractCallInput): void {
        let txData = uint8ArrayToHex(input.call!.data);

        // if call `hello` function then revert, 19ff1d21 is method signature of `hello`
        if (txData.startsWith("19ff1d21")) {
            sys.revert("the function `hello` not available");
        }
    }
    
    ...
}
```
<!-- @formatter:on -->

### 3.3. Compile the Aspect

Build your Aspect:

```bash
npm run aspect:build 
```

> ✅ The resulting `release.wasm` in the `build` folder contains the necessary WASM bytecode.

### 3.4. Deploy the Aspect

Deploy your compiled Aspect:

```shell
npm run aspect:deploy -- --wasm ./build/release.wasm --joinPoints PostContractCall
```

> ✅ Upon successful execution, the terminal will display the `Aspect address`. It is essential to make a note of this
> address as it will be useful later on.

:::note 💡
For more detailed usage information about this command, please refer to
the [deploy-aspect command](/develop/reference/aspect-tool/deploy-aspect) documentation.
:::

## 4. Bind the Smart Contract and Aspect

Deploying the Aspect doesn't automatically activate it. To make it functional, bind it to a smart contract:

```bash
npm run contract:bind -- --contract {smart-contract-address} \
                         --abi ./build/contract/HelloWorld.abi \
                         --aspectId {aspect-Id} 
```

* replace the placeholder {smart-contract-address} with the information obtained from step `2 3 deploy the smart contract`.
* replace the placeholder {aspect-Id} with the information obtained from step `3.4. Deploy the Aspect`.

> ✅ The binding process has been successful, and the transaction receipt has been printed.

:::note 💡
For more detailed usage information about this command, please refer to
the [bind-aspect command](/develop/reference/aspect-tool/bind-aspect) documentation.
:::

## 5. Test the Smart Contract and Aspect Integration

Now that the `HelloWorld` contract and Aspect are bound, call `hello` to test.

```bash
npm run contract:call -- --contract {smart-contract-address}  \
                         --abi ./build/contract/HelloWorld.abi   \
                         --method hello 
```

* replace the placeholder {smart-contract-address} with the information obtained from step `2 3 deploy the smart contract`.

> ✅ Due to Aspect interception, the transaction is reverted.

![img.svg](img.svg)

Congratulations! You've learned the basics of Aspect development. For a deeper dive, refer to our
comprehensive [Aspect Doc](https://docs.artela.network/develop/aspect-tools/aspect-docs).
