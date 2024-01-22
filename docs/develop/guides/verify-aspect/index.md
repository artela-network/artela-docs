---
sidebar_position: 3
---

# Verify Tx By Password

## Intro

This guide provides detailed instructions on how to use the "Verify tx" feature to gain write access to a smart contract
without the need for the administrator's key, given knowledge of the password provided by the administrator.

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
mkdir verify-aspect&& cd verify-aspect

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

For example, create a `Counter.sol` file:

<!-- @formatter:off -->
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
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }
  // only owner can do add
  function add(uint256 number) public onlyOwner {
    counter = counter + number;
  }
  function get() external view returns (uint256 result)  {
    return counter;
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

> ✅ Successful compilation will generate `Counter.abi` and `Counter.bin` files in the `build/contract` directory.

### 2.3. Deploy the Smart Contract

#### 2.3.1 Update project.config.json

Update the `project.config.json` in the root directory with the appropriate network configuration:

```json
{
  "node": "https://betanet-rpc1.artela.network"
}
```

:::note 💡
For more details regarding development environment setup, please refer to [artela devnet](/develop/node/access-testnet)
:::

#### 2.3.2 Create a blockchain account (optional).

Execute the following command under the `verify-aspect` folder to create an account if you haven't already done so:

```bash
npm run account:create
```

> ✅ If an account gets created successfully, its private key will be dumped as `privateKey.txt` in the current
> directory.

:::note 💡
For more detailed usage information about this command, please
refer to the [create-account command](/develop/reference/aspect-tool/create-account) documentation.
:::

If your account lacks test tokens, join [Discord](https://discord.com/invite/artela)，and request some
in `testnet-faucet` channel.

#### 2.3.4  Deploy your contract

Execute the following command within the `verify-aspect` folder, using the provided script:

<!-- @formatter:off -->
```bash
npm run contract:deploy --  --abi ./build/contract/Counter.abi \
                           --bytecode ./build/contract/Counter.bin
```
<!-- @formatter:on -->

> ✅ Upon successful deployment, the terminal will display the contract address.

:::note 💡
For more detailed usage information about this command, please refer to
the [deploy-contract command](/develop/reference/aspect-tool/deploy-contract) documentation.
:::

## 3. Create your Aspect

### 3.1. Implements an Aspect

In `aspect/index.ts`, add your Aspect to check the transaction, if validationData not equal Password, then revert:

<!-- @formatter:off -->
```typescript
import {
    allocate,
    entryPoint,
    execute,
    ITransactionVerifier,
    sys,
    TxVerifyInput, uint8ArrayToHex,
} from "@artela/aspect-libs";


class Aspect implements ITransactionVerifier {


    isOwner(sender: Uint8Array): bool {
        return true;
    }

    verifyTx(input: TxVerifyInput): Uint8Array {
        const Passwd: string = "123456";
        const validation = uint8ArrayToHex(input.validationData);
        // Verify whether the password matches the expected value.
        sys.require(validation == Passwd, 'invalid data');
        return sys.aspect.property.get<Uint8Array>("Owner");
    }

}

// 2.register aspect Instance
const aspect = new Aspect()
entryPoint.setAspect(aspect)

// 3.must export it
export {execute, allocate}

```
<!-- @formatter:on -->

### 3.2. Compile the Aspect

Build your Aspect:

```bash
npm run aspect:build 
```

> ✅ The resulting `release.wasm` in the `build` folder contains the necessary WASM bytecode.

### 3.3. Deploy the Aspect

Deploy your compiled Aspect:

<!-- @formatter:off -->
```shell
npm run aspect:deploy -- --wasm ./build/release.wasm \
                         --joinPoints VerifyTx \
                         --properties '[{"key":"Owner","value":"{owner-account}"}]' 

```
<!-- @formatter:on -->

replace the placeholder {owner-account} with the real payment accounts. like:
0x08D721275c6DbB33bc688B62ef199bbd709154c9


> ✅ Upon successful execution, the terminal will display the `Aspect address`. It is essential to make a note of this
> address as it will be useful later on.

:::note 💡
For more detailed usage information about this command, please refer to
the [deploy-aspect command](/develop/reference/aspect-tool/deploy-aspect) documentation.
:::

## 4. Bind the Contract with the Aspect

Deploying the Aspect doesn't automatically activate it. To make it functional, bind it to a smart contract:

```bash
npm run contract:bind -- --contract {smart-contract-address} \
                         --abi ./build/contract/Counter.abi \
                         --aspectId {aspect-Id} 
```

* replace the placeholder {smart-contract-address} with the information obtained from
  step `2.3.4 deploy the smart contract`.
* replace the placeholder {aspect-Id} with the information obtained from step `3.4. Deploy the Aspect`.

> ✅ The binding process has been successful, and the transaction receipt has been printed.

:::note 💡
For more detailed usage information about this command, please refer to
the [bind-aspect command](/develop/reference/aspect-tool/bind-aspect) documentation.
:::

## 5. Bind the EOA with the Aspect

```bash
npm run contract:bind -- --contract {owner-account} \
                         --abi ./build/contract/Counter.abi \
                         --aspectId {aspect-Id} \
                         --skfile {owner-private-key}
```

* replace the placeholder {owner-account} with the owner account address.
* replace the placeholder {owner-private-key} with the owner account private key file.
* replace the placeholder {aspect-Id} with the information obtained from step `3.4. Deploy the Aspect`.

> ✅ The binding process has been successful, and the transaction receipt has been printed.

:::note 💡
For more detailed usage information about this command, please refer to
the [bind-aspect command](/develop/reference/aspect-tool/bind-aspect) documentation.
:::

## 6. Test the Smart Contract and Aspect Integration

Within the `scripts` directory of your project,Create a Verify tx call script that generates a transaction that is not
signed by {owner} and uses the password provided by {owner} to make the transaction.
For example, create a `verify.cjs` file:

```javascript
"use strict"

// import required libs
const fs = require('fs');
const Web3 = require('@artela/web3');
var argv = require('yargs')
    .string('node')
    .string('skfile')
    .array('args')
    .string('contract')
    .string('method')
    .string('abi')
    .string('password')
    .parserConfiguration({
        "parse-numbers": false,
    })
    .argv;
const {LegacyTransaction: EthereumTx} = require('@ethereumjs/tx')

const {numberToHex} = require("@artela/web3-utils");

async function call() {
    // init connection to Artela node
    const configJson = JSON.parse(fs.readFileSync('./project.config.json', "utf-8").toString());
    let node = (argv.node) ? String(argv.node) : configJson.node;
    if (!node) {
        console.log("'node' cannot be empty, please set by the parameter or artela.config.json")
        process.exit(0)
    }
    const web3 = new Web3(node);

    //--skfile ./build/privateKey.txt
    let senderPriKey = String(argv.skfile)
    if (!senderPriKey || senderPriKey === 'undefined') {
        senderPriKey = "privateKey.txt"
    }
    if (!fs.existsSync(senderPriKey)) {
        console.log("'account' cannot be empty, please set by the parameter ' --skfile ./build/privateKey.txt'")
        process.exit(0)
    }
    let pk = fs.readFileSync(senderPriKey, 'utf-8');
    let sender = web3.eth.accounts.privateKeyToAccount(pk.trim());
    console.log("from address: ", sender.address);
    web3.eth.accounts.wallet.add(sender.privateKey);


    // --contract 0x9999999999999999999999999999999999999999
    const contractAddr = argv.contract;
    if (!contractAddr) {
        console.log("'contract address' cannot be empty, please set by the parameter ' --contract 0x9999999999999999999999999999999999999999'")
        process.exit(0)
    }

    // --abi xxx/xxx.abi
    const abiPath = String(argv.abi)
    let abi = null
    if (abiPath && abiPath !== 'undefined') {
        abi = JSON.parse(fs.readFileSync(abiPath, "utf-8").toString());
    } else {
        console.log("'abi' cannot be empty, please set by the parameter' --abi xxx/xxx.abi'")
        process.exit(0)
    }
    // --args [55]
    const inputs = argv.args;
    let parameters = [];
    if (inputs && inputs !== 'undefined') {
        parameters = inputs;
    }
    //--method count
    const method = argv.method;
    if (!method || method === 'undefined') {
        console.log("'method' cannot be empty, please set by the parameter ' --method {method-name}'")
        process.exit(0)
    }

    let storageInstance = new web3.eth.Contract(abi, contractAddr);
    let contractCallData = await storageInstance.methods[method](...parameters).encodeABI();
    //--method count
    const password = argv.password;
    if (!password || password === 'undefined') {
        console.log("'password' cannot be empty, please set by the parameter ' --password {password}'")
        process.exit(0)
    }

    let encodedData = web3.eth.abi.encodeParameters(['bytes', 'bytes'],
        [password, contractCallData]);
    // Append magic prefix and checksum to the encoded data
    encodedData = '0xCAFECAFE' + web3.utils.keccak256(encodedData).slice(2, 10) + encodedData.slice(2);
    let nonce = await web3.eth.getTransactionCount("{owner-account}");
    let gasPrice = await web3.eth.getGasPrice();
    let chainId = await web3.eth.getChainId();

    // Set gas and gas limit
    let gas = 8000000;
    let gasLimit = 20000000;
    // Update the transaction object with the encoded data
    let tx =
        {
            from: sender.address,
            nonce: numberToHex(nonce),
            gasPrice: numberToHex(gasPrice),
            gasLimit: numberToHex(gasLimit),
            gas: numberToHex(gas),
            data: encodedData,
            to: contractAddr,
            chainId: numberToHex(chainId)
        }

    // Return the serialized unsigned transaction
    let rawTx = '0x' + bytesToHex(EthereumTx.fromTxData(tx).serialize());
    let receipt = await web3.eth.sendSignedTransaction(rawTx);
    console.log(`call contract with result: `);
    console.log(receipt);
}

function bytesToHex(bytes) {
    return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}

call().then();

```

* replace the placeholder {owner-account} with the owner account address.

This script is used to create
an [unsigned Ethereum transaction with validation data](/develop/reference/aspect-lib/join-points/verify-aspect#to-trigger).

Then create a new account:

```shell
npm run account:create  -- --skfile ./test_account.txt

```

> ✅ If an account gets created successfully, its private key will be dumped as `test_account.txt` in the current
> directory. And the Address will be printed, and you need to node it.

Now call `verify.cjs` with `test_account` to test.

```bash
node scripts/verify.cjs --skfile ./test_account.txt \
    --contract  {smart-contract-address} \
    --abi ./build/contract/Counter.abi \
    --args 1000 \
    --method add \
    --password 0x123456
```

* replace the placeholder {smart-contract-address} with the information obtained from
  step `2.3.4  Deploy your contract`.

If successful,it will print the result like this:

```json
call contract with result:
{
blockHash: '0x40208524a15ba7d65a91fb4e7c06f87e5ac1276d...',
blockNumber: 271998,
contractAddress: null,
cumulativeGasUsed: 10000000,
from: '0x08d721275c6dbb33bc688b62ef199bb...',
gasUsed: 20000000,
logs: [],
logsBloom: '0x00000000000000000000000000000000000000000000000000...',
status: true,
to: '0xd52bd5b358de33fc126ff50e845973c...',
transactionHash: '0x7ea944b07825e0afbb6924246dcfbeef2da13ae0d2970...',
transactionIndex: 0,
type: '0x0'
}

```

Now let's check if the counter value in the contract has changed;

```shell
npm run contract:call -- --contract {smart-contract-address} \
                        --abi ./build/contract/Counter.abi \
                        --method get \
                        --skfile ./test_account.txt
```
* replace the placeholder {smart-contract-address} with the information obtained from
  step `2.3.4  Deploy your contract`.
  
If the command is executed successfully, will see
```shell
 ==== reuslt===1000
```

Congratulations! You've learned the basics of Aspect development. For a deeper dive, refer to our
comprehensive [Aspect Doc](https://docs.artela.network/develop/aspect-tools/aspect-docs).
