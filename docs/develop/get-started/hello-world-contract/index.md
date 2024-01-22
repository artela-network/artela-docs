---
sidebar_position: 2
---

# Hello Smart Contract with web3.js

When developing a smart contract with web3.js on Artela, which is compatible with the Ethereum Virtual Machine (EVM),
the typical workflow involves creating the smart contract in Solidity, compiling it, deploying it to the Artela
blockchain, and then interacting with it using web3.js. Below is a straightforward example:

**Pre-requisites:**

* [Node.js](https://nodejs.org/)
* [solc](https://docs.soliditylang.org/en/v0.8.20/installing-solidity.html)

## 1. Create a Smart Contract

Create your smart contract source files with a `.sol` extension. For example, create a `hello.sol` file:

<!-- @formatter:off -->
```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.12 <0.9.0;

contract Hello {
    // print hello message
    function say(string calldata name) public pure returns (string memory) {
        return string.concat("hello"," ",name);
    }
}
```
<!-- @formatter:on -->

## 2. Compile the Smart Contract

This step relies on `solc`, first check if [solc](https://docs.soliditylang.org/en/v0.8.20/installing-solidity.html) is
installed correctly

```bash
solc --version
```

Compile your contract using:

```bash
solc --abi --bin --hashes --overwrite -o ./ hello.sol
```

> ✅ Successful compilation will generate `Hello.abi` and `Hello.bin` files in present directory.

## 3. Deploy the Smart Contract

To deploy a smart contract using `web3.js`, make sure you have installed the `web3` package using the following command:

```shell
npm install web3
```

Next, to create a `deploy.mjs` file, you can use the following code example to write a script that connects to an
Ethereum node, compiles the smart contract, and deploys it.

```javascript
"use strict";

// import required libs
import {readFileSync} from "fs";
import Web3 from "web3";

async function deploy() {
    //  Replace with the node connection to Artela
    let node = '<Artela TestNet>';

    // Replace with the path to your smart contract abi file
    let abiPath = '<Your Contract ABI File>';

    // Replace with the path to your smart contract byte code file 
    let byteCodePath = '<Your Contract BIN File>';

    // Replace with your private key
    let privateKey = '<Your Private Key>';

    const web3 = new Web3(node);

    const deployParams = {
        data: null,
        arguments: null,
    };

    let byteTxt = readFileSync(byteCodePath, "utf-8").toString().trim();
    if (byteTxt.startsWith("0x")) {
        byteTxt = byteTxt.slice(2);
    }

    deployParams.data = byteTxt.trim();

    let abiTxt = readFileSync(abiPath, "utf-8").toString().trim();
    const contractAbi = JSON.parse(abiTxt);

    let account = web3.eth.accounts.privateKeyToAccount(privateKey.trim());
    web3.eth.accounts.wallet.add(account.privateKey);

    // instantiate an instance of demo contract
    let tokenContract = new web3.eth.Contract(contractAbi);

    // deploy contract
    let tokenDeploy = tokenContract.deploy(deployParams);
    let nonceVal = await web3.eth.getTransactionCount(account.address);

    let tokenTx = {
        from: account.address,
        data: tokenDeploy.encodeABI(),
        nonce: nonceVal,
        gasPrice: 1000,

        gas: 7000000,
    };

    let signedTokenTx = await web3.eth.accounts.signTransaction(tokenTx, account.privateKey);
    await web3.eth.sendSignedTransaction(signedTokenTx.rawTransaction).on("receipt", (receipt) => {
        console.log(receipt);
        console.log("contract address: ", receipt.contractAddress);
    });
}

deploy().then();

```

Make sure to replace the placeholder values in the script with your actual value.

* **Artela TestNet:** The node connection to Artela,You can fill in 'https://betanet-rpc1.artela.network'. For more
  information about testnet, please refer to [TestNet Info](/develop/node/access-testnet).
* **Your Private Key:** The private key is crucial for signing and executing transactions linked to its associated
  account. Obtain it by creating a wallet or importing an existing account. Refer
  to [Wallet Configuration](/develop/guides/wallet-configuration) for further details.
* **Your Contract ABI File:** The path to your smart contract ABI file. like './Hello.abi'.
* **Contract Byte Code File:** The path to your smart contract byte code file. like './Hello.bin'.

Run the deployment script.

```shell
node deploy.mjs
```

If the deployment is successful, the script will display the transaction receipt.

```shell
{
  blockHash: '0x101473b29461db4d632a194d8ad5d07dabc258b5a2b27f229c784...',
  blockNumber: 210996n,
  contractAddress: '0x65c5c637326a33df07d520b88c671e...',  // Make a note of this value, you will need it.
  cumulativeGasUsed: 3500000n,
  from: '0x58c1b539b469fd15a02da47b52a3...',
  gasUsed: 7000000n,
  logs: [],
  logsBloom: '0x0000000000000000000....',
  status: 1n,
  transactionHash: '0xd4025995d764f7e1c944bab3f048f346c428ee91225f21....',
  transactionIndex: 0n,
  type: 0n
}
```

Make note of the `contractAddress` value after successful deployment, as it is required for calling the smart contract.

## 4. Call the Smart Contract

To create a `call.mjs` file, you can use the following code example to write a script that connects to an Ethereum
node,and call it.

```javascript
"use strict";

// import required libs
import {readFileSync} from "fs";
import Web3 from "web3";

async function call() {

    // Replace with the node connection to Artela
    let node = '<Artela TestNet>';
    
    // Replace with your private key
    let privateKey = '<Your Private Key>';
    
    // Replace with the path to your smart contract abi file
    let abiPath = '<Your Contract ABI File>';

    // Replace with the path to your smart contract address
    let contractAddr = '<Your Contract Address>';


    // init connection to Artela node
    const web3 = new Web3(node);

    let account = web3.eth.accounts.privateKeyToAccount(privateKey.trim());
    web3.eth.accounts.wallet.add(account.privateKey);

    let abiTxt = readFileSync(abiPath, "utf-8").toString().trim();
    const contractAbi = JSON.parse(abiTxt);

    // you can replace 'world' here to say others
    let storageInstance = new web3.eth.Contract(contractAbi, contractAddr);
    let instance = await storageInstance.methods["say"]("world").call();
    console.log("call reuslt: " + instance);
}

call().then();

```

Make sure to replace the placeholder values in the script with your actual value.

* **Artela TestNet:** The node connection to Artela,You can fill in 'https://betanet-rpc1.artela.network'. For more
  information about testnet, please refer to [TestNet Info](/develop/node/access-testnet).
* **Your Private Key:** The private key is crucial for signing and executing transactions linked to its associated
  account. Obtain it by creating a wallet or importing an existing account. Refer
  to [Wallet Configuration](/develop/guides/wallet-configuration) for further details.
* **Your Contract ABI File:** The path to your smart contract ABI file.
* **Your Contract Address:** The contract address generated after deploy.

Run the call script.

```shell
node call.mjs
```

If the smart contract call is successful, the script will display the result:

```shell
call reuslt: hello world
```

Congratulations!