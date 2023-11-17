---
sidebar_position: 1
---

# Create A simple storage contract in Artela

## Intro
Below is an example that use `@artela/aspect-tool` to deploy storage contract to Artela Testnet.

**Pre-requisites:**
* [Node.js](https://nodejs.org/)
* [solc](https://docs.soliditylang.org/en/v0.8.20/installing-solidity.html)


# 1.Setting up a new project
Make sure you have a recent version of [Node.js](https://nodejs.org/) and npm installed,
Start by installing the `aspect-tool`:

```bash
npm install -g @artela/aspect-tool
```

**Project Initialization**, to kick off your project with `aspect-tool`, follow these steps:

```bash
# Create a new directory and navigate into it
mkdir storage-demo && cd storage-demo

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
├── scripts                    <-- Utility scripts, including deploying, binding and etc.
│   ├── aspect-deploy.cjs
│   ├── bind.cjs
│   ├── contract-call.cjs
│   └── contract-deploy.cjs
... [other directories and files]
```



## 2. Deploy a smart contract

### 2.1. Add a Smart Contract

Within the `contracts` directory of your project, create your smart contract source files with a `.sol` extension.

#### 2.1.1. create a `Storage.sol` file

```solidity
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Storage {

    uint256 number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256){
        return number;
    }
}


```


### 2.2. Compile the Smart Contract


This step relies on `solc`, first check if [solc](https://docs.soliditylang.org/en/v0.8.20/installing-solidity.html) is installed correctly

```bash
 npm install -g solc
 
 solc --version
```

Compile your contract using:

```bash
npm run contract:build
```

> ✅ Successful compilation will generate some `*.abi`  files in the `build/contract` directory.


### 2.3. Deploy the Smart Contract

#### 2.3.1 Update project.config.json

Update the `project.config.json` in the root directory with the appropriate network configuration:
```json
{
  "node": "https://testnet-rpc1.artela.network"
}
```
:::note 💡
For more details regarding development environment setup, please refer to [artela devnet](/develop/node/access-testnet)
:::

#### 2.3.2 Create a blockchain account (optional).

Execute the following command under the `storage-demo` folder to create an account if you haven't already done so:

```bash
// create  deployer

npm run account:create

```

> * --pkfile : privateKey path for sender. (optional, default value: `./privateKey.txt`).

If your account lacks test tokens, join [Discord](https://discord.com/invite/artela)，and request some in `testnet-faucet` channel.


#### 2.3.4  Deploy your contract

Execute the following command within the `storage-demo` folder, using the provided script:

```bash
npm run contract:deploy -- --abi ./build/contract/Storage.abi \
                           --bytecode ./build/contract/Storage.bin                       
```



Upon successful deployment, the terminal will display the contract address.

### 2.4 Call Contract
Execute the following command within the `storage-demo` folder, call the Contract

#### 2.4.1 send transaction for store

```bash

npm run contract:send -- --contract {artToken-address} 
                         --abi ./build/contract/Storage.abi 
                         --method store --args [100] 
```


```bash
npm run contract:call -- --contract {artToken-address}  \
                         --abi ./build/contract/Storage.abi \
                         --method retrieve 

```

#### 2.4.2 check transaction

Confirm the successful on Artela Testnet [blockchain explorer](https://testnet-scan.artela.network/) using `transaction hash` in output.

![img.png](img.png)
