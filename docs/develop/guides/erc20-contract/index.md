---
sidebar_position: 2
---

# Create an ERC-20 Token in Artela

## Intro
Below is an example that uses `@artela/aspect-tool` to deploy erc20 contract to Artela BetaNet.

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
mkdir erc20-token && cd erc20-token

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
├── scripts                  <-- Utilitity scripts, including deploying, binding and etc.
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


Install the required dependency `@openzeppelin/contracts`:

```shell
npm install @openzeppelin/contracts
```

Within the `contracts` directory, create your smart contract source files with a `.sol` extension.

#### 2.1.1. create a `ArtToken.sol` file

```solidity
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArtToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("Artela", "ART")  Ownable(msg.sender){
        _mint(msg.sender, initialSupply);
    }
}
```

#### 2.1.2. create a `Broker.sol` file (Holding ArtToken).

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Borker is Ownable {
    address private deployer;
    address immutable _tokenIn;

    constructor(address mytoken) Ownable(msg.sender) {
        _tokenIn=mytoken;
        deployer = msg.sender;
    }

    function isOwner(address user) external view returns (bool result) {
        if (user == deployer) {
            return true;
        } else {
            return false;
        }
    }

    function startSchedule() public pure returns(bool)  {
        return true;
    }

    function transfer(address target,uint256 amount) public onlyOwner{
        require(amount > 0, "You need to sell at least some tokens");
        require(amount < IERC20(_tokenIn).balanceOf(address(this)) ,"Unable to afford sufficient amount");
        IERC20(_tokenIn).transfer(target,amount);
    }

    function allowance(address aspectId) onlyOwner external view returns (uint256 valueWei) {
        require(aspectId>address(0),"aspectId empty");
        //todo check aspectId
        return  IERC20(_tokenIn).balanceOf(msg.sender);
    }

}
```

### 2.2. Compile the Smart Contract


This step relies on `solcjs`, first check if [solc](https://docs.soliditylang.org/en/v0.8.20/installing-solidity.html) is installed correctly

```bash
 npm install -g solc
 
 solcjs --version
```

Update `contract:build` command in `Package.json`. Use `solcjs` to build contract.

```bash
{
  "contract:build": "solcjs --abi --bin --include-path ./node_modules/ --base-path . -o ./build/contract/  ./contracts/*.sol",
}
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

Execute the following command under the `erc20-token` folder to create an account if you haven't already done so:

```bash
// create ArtToken deployer
npm run account:create -- --skfile ./tokenPk.txt

// create Broker deployer
npm run account:create -- --skfile ./brokerPk.txt

```

> * --skfile : privateKey path for sender. (optional, default value: `./privateKey.txt`).

If your account lacks test tokens, join [Discard](https://discord.com/invite/artela)，and request some in `testnet-faucet` channel.


#### 2.3.4  Deploy your contract

Execute the following command within the `erc20-token` folder, using the provided script:

```bash

npm run contract:deploy -- --skfile ./tokenPk.txt  \
                           --abi ./build/contract/contracts_ArtToken_sol_ArtToken.abi \
                           --bytecode ./build/contract/contracts_ArtToken_sol_ArtToken.bin \
                           --args '[10000000]'
                           
                           
npm run contract:deploy -- --skfile ./brokerPk.txt  \
                           --abi ./build/contract/contracts_Broker_sol_Borker.abi \
                           --bytecode ./build/contract/contracts_Broker_sol_Borker.bin \
                           --args '[{ArtToken_Address}]'   
```



Upon successful deployment, the terminal will display the contract address.

### 2.4 Call the Contract

#### 2.4.1 transfer artToken to broker address
Execute the following command within the `erc20-token` folder:

```bash

npm run contract:send   -- --skfile ./tokenPk.txt
                        --contract {artToken-address} 
                        --abi ./build/contract/contracts_ArtToken_sol_ArtToken.abi 
                        --method transfer --args ["{broker-address}",100] 
                        --gas 200000


```

#### 2.4.2 check transaction

Confirm the successful `transfer` on Artela Testnet [blockchain explorer](https://testnet-scan.artela.network/) using `transaction hash` in output. 

![img.png](img.png)