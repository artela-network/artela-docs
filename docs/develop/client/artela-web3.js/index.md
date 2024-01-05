---
sidebar_position: 3
---

# Artela Web3.js

`@artela/web3` extend Ethereum's web3.js 1.9.x, supporting Aspect operations.

This package retains full compatibility with the
original [web3.js](https://web3js.readthedocs.io/en/v1.9.0/getting-started.html), with minor adjustments.

## Installation

To integrate this package into your JavaScript or TypeScript project, run the following command:

```bash
npm install @artela/web3 --save
```

## web3.instance

The Web3 class is an umbrella package to house all Ethereum related modules.

```javascript
var Web3 = require('web3');

var web3 = new Web3('http://127.0.0.1:8545');

```

## web3.atl.Aspect

> The ``web3.atl.Aspect`` function lets you create a proxy Contract type for this instance, as a Contract's provider is
> stored as a class member rather than an instance variable.

```javascript
import Web3 from '@artela/web3';

// new a aspect instance from aspectId
// Aspect: new (address?: string, options?: AspectOptions) => Aspect;
let aspect = new Web3.atl.Aspect("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4");

```

``Aspect`` - A Aspect instance.

- ``aspect.address``: The address of aspect instance.
- ``aspect.options``: The option of aspect instance, type is AspectOptions.

``AspectOptions`` - A AspectOptions instance.

- ``aspectOption.from``: The sender to use for contract calls.
- ``aspectOption.gasPrice``: The gas price to use for contract calls.
- ``aspectOption.gas``: The gas to use for contract calls.
- ``aspectOption.data``: The aspect WASM code.

With Aspect Instance you can do the following things：
*  [Deploy a Aspect to blockchain](/develop/client/artela-web3.js#aspect-deploy)
*  [Upgrade a Aspect to blockchain](/develop/client/artela-web3.js#aspect-upgrade)
*  [Bind Aspect to Contract](/develop/client/artela-web3.js#aspect-bind)
*  [UnBind Aspect and Contract](/develop/client/artela-web3.js#aspect-unbind)
*  [Send/Call Aspect Operation](/develop/client/artela-web3.js#aspect-operation)
*  [Get Aspect Version](/develop/client/artela-web3.js#get-aspect-version)
*  [Get Bound Aspect Address](/develop/client/artela-web3.js#get-bound-aspect-address)
*  [Get Bound Account Addresses](/develop/client/artela-web3.js#get-bound-account-addresses)

### Aspect Deploy

> During the deployment of an Aspect, the Aspect binary is stored in the system contract, along with additional details
> such as the version, properties, and other relevant information.

#### Example

<!-- @formatter:off -->
```jsx
const fs = require('fs')
const Web3 = require("@artela/web3");
let web3= new Web3("http://127.0.0.1:8545");

let privateKey="..."
const sender = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(sender.privateKey);

//Load Aspect binary
let aspectBytecode = '0x' + fs.readFileSync('./build/release.wasm', {
    encoding: "hex"
});

//new Aspect Instance
let aspect = new web3.atl.Aspect();

const deploy = await aspect.deploy({
    data: aspectBytecode,
    properties: [ // <-- properity to initialize the aspect, key-value pairs
        { 'key': 'owner', 'value': accounts[0] }
    ],
    paymaster: account.address,
    proof: '0x0',
    joinPoints:["PreContractCall","PostContractCall"]
});
let aspectCore = web3.atl.aspectCore();

const tx = {
    from: sender.address,
    data: deploy.encodeABI(),
    to: aspectCore.options.address,
    gasPrice:11000,
    gas:10000
}
const signedTx = await web3.atl.accounts.signTransaction(tx, sender.privateKey);
return await web3.atl.sendSignedTransaction(signedTx.rawTransaction);
```
<!-- @formatter:on -->

``DeployOperation``

- ``data``: The aspect binary hex string, **require**.
- ``properties``:  KVPair[], **optional**,
  like: `[{ 'key': 'owner', 'value': accounts[0] },{ 'key': 'key1', 'value': 'value1' }]`
- ``joinPoints``: Specify which join points take effect，fill in multiple choices in the
  list ["VerifyTx","PreTxExecute","PreContractCall","PostContractCall","PostTxExecute"].
  like `["PreContractCall","PostContractCall"]`
- ``paymaster``: The pay master address. **optional**
- ``proof``: Proof hex data. **optional**

### Aspect Upgrade

> Aspect Upgrade updates existing `binary data`, `joinPoints`, and `properties` based on the incoming AspectId. This
> operation will overwrite the original values;

#### Example

<!-- @formatter:off -->
```jsx
const fs = require('fs')

//Load Aspect binary
let aspectBytecode = '0x' + fs.readFileSync('./build/release.wasm', {
    encoding: "hex"
});

//new Aspect Instance by aspectId
let aspect = new web3.atl.Aspect("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4");

const upgrade = await aspect.upgrade({
    data: aspectBytecode,
    properties: [ // <-- properity to initialize the aspect, key-value pairs
        { 'key': 'owner', 'value': accounts[0] }
    ],
    joinPoints:["PreContractCall","PostContractCall"]
});

let aspectCore = web3.atl.aspectCore();

const tx = {
    from: account.address,
    data: upgrade.encodeABI(),
    to: aspectCore.options.address,
    gasPrice:11000,
    gas:10000
}
const signedTx = await web3.atl.accounts.signTransaction(tx, account.privateKey);
return await web3.atl.sendSignedTransaction(signedTx.rawTransaction);
```
<!-- @formatter:on -->

``DeployOperation``

- ``data``: The aspect binary hex string,will overwrite the original values. **require**.
- ``properties``:  KVPair[], will overwrite the original values. **optional**,
  like: `[{ 'key': 'owner', 'value': accounts[0] },{ 'key': 'key1', 'value': 'value1' }]`
- ``joinPoints``: Specify which join points take effect，fill in multiple choices in the
  list ["VerifyTx","PreTxExecute","PreContractCall","PostContractCall","PostTxExecute"].
  like `["PreContractCall","PostContractCall"]`

:::note
The upgraded Aspect will be activated in the next block and its version will be increased by 1.
:::

### Aspect Bind

> Aspect binding to a contract is a process that establishes a connection between an Aspect and a smart contract in an
> Artela network. The relationship is maintained within the system contract.
> The function lets you binds a contract with an aspect: transactionHash, receipt.

#### Example

<!-- @formatter:off -->
```javascript
const Web3 = require("@artela/web3");
let web3= new Web3("http://127.0.0.1:8545");


// smart Contract abi
let abi={...};

// smart Contract Addres
let contractAddress="0x778838Da6a701c568545dCfcB03FcB875f56beaabb";

// do aspect bind
let contract = new web3.eth.Contract(abi, contractAddress);

// Aspect address
let aspectId ="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";

// bind the smart contract with aspect
let bind = await contract.bind({
    priority: 1,
    aspectId: aspectId,
    aspectVersion: 1,
})
//create transaction
let aspectCore = web3.atl.aspectCore();
let tx = {
    from: sender.address,
    data: bind.encodeABI(),
    to: aspectCore.options.address,
    gasPrice:9000000,
    gas: 9000000
}

// sender privateKey ....
let privateKey="0x..."

let signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    .on('receipt', receipt => {
        console.log(receipt);
    });

```
<!-- @formatter:on -->

``BindAspectOptions``

- ``priority``: The aspect binary hex string,will overwrite the original values. **optional**.
- ``aspectId``:  Aspect Address. **require**, like: `0x5B38Da6a701c568545dCfcB03FcB875f56beddC4`
- ``aspectVersion``: Specify which join points take effect，fill in multiple choices in the
  list ["VerifyTx","PreTxExecute","PreContractCall","PostContractCall","PostTxExecute"].
  like `["PreContractCall","PostContractCall"]`

:::note
The sender of the binding transaction must be the owner of the smart contract. Artela system contract will check
the `isOwner(address)` method of the contract to make sure the sender has the permission to bind the aspect.
:::

### Aspect UnBind

> Aspects can be detached from smart contracts. Only the owner of the smart contract, whose address must pass the
> isOwner(address): bool verification, can initiate the unbinding.

#### Example

<!-- @formatter:off -->
```javascript
const Web3 = require("@artela/web3");
let web3= new Web3("http://127.0.0.1:8545");

let privateKey="..."
const sender = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(sender.privateKey);

// smart Contract Addres
let contract="0x778838Da6a701c568545dCfcB03FcB875f56beaabb";

// Aspect address
let aspectId ="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";

const aspectContract = new web3.atl.aspectCore();
// bind the smart contract with aspect
const bind = await aspectContract.methods.unbind(
    aspectId,
    contract
)

let tx = {
    from: sender.address,
    data: bind.encodeABI(),
    to: aspectCore.options.address,
    gasPrice:9000000,
    gas: 9000000
}

const signedTx = await web3.eth.accounts.signTransaction(tx, sender.privateKey);
await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    .on('receipt', receipt => {
        console.log(receipt);
    });

```
<!-- @formatter:on -->

``UnBindAspectOptions``

- ``aspectId``:  Aspect Address. **require**, like: `0x5B38Da6a701c568545dCfcB03FcB875f56beddC4`
- ``contract``:  Contract Address. **require**, like: `0x5B38Da6a701c568545dCfcB03FcB875f56beddC4`

:::note
The sender of the unbind transaction must be the owner of the smart contract. Artela system contract will check
the `isOwner(address)` method of the contract to make sure the sender has the permission to bind the aspect.
:::

### Aspect Operation

> The Operation Aspect, akin to a smart contract, exclusively responds to transactions initiated by externally owned
> accounts (EOAs). This includes transactions triggered by contract interactions. Notably, these Join Points are also
> activated in the case of cross-contract interactions.

#### Example

<!-- @formatter:off -->
```javascript
const Web3 = require("@artela/web3");
let web3= new Web3("http://127.0.0.1:8545");

let privateKey="..."
const sender = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(sender.privateKey);

var aspectCore = web3.atl.aspectCore();
// Aspect address
let aspectId ="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";

const aspectInstance = new web3.atl.Aspect(aspectId);
const encodeABI = aspectInstance.operation(operationData).encodeABI();

const tx = {
    from: sender.address,
    to:  aspectCore.options.address,
    data: encodeABI,
    gasPrice:900000,
    gas: 900000
}
const signedTx = await web3.eth.accounts.signTransaction(tx, sender.privateKey);

//send Operation tx
await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    .on('receipt', receipt => {
        console.log(receipt);
    });

//call Operation
await web3.eth.call({
    to: aspectCore.options.address,
    data: encodeABI
});
```
<!-- @formatter:on -->

:::note
The first version of Aspect operation calls follows the bytes in bytes out manner, users need to encode and decode the
call data themselves. We will provide a more user-friendly way to call Aspect in a later version.
:::

### Get Aspect Version

Get Aspect last version

#### Example

<!-- @formatter:off -->
```javascript
const Web3 = require("@artela/web3");
let web3= new Web3("http://127.0.0.1:8545");

let privateKey="..."
const sender = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(sender.privateKey);

var aspectCore = web3.atl.aspectCore();
// Aspect address
let aspectId ="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";

return await aspectCore.methods.versionOf(aspectId).call()

```
<!-- @formatter:on -->

### Get Bound Aspect Address

> Get Aspect list by contract address, return address list sort by priority.

#### Example

<!-- @formatter:off -->
```javascript
const Web3 = require("@artela/web3");
let web3= new Web3("http://127.0.0.1:8545");

let privateKey="..."
const sender = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(sender.privateKey);

var aspectCore = web3.atl.aspectCore();
// Aspect address
let contract ="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";

return await aspectCore.methods.aspectsOf(contract).call()

```
<!-- @formatter:on -->

### Get Bound Account Addresses

> Get all contracts or EOA account bound to an Aspect

#### Example

<!-- @formatter:off -->
```javascript
const Web3 = require("@artela/web3");
let web3= new Web3("http://127.0.0.1:8545");

let privateKey="..."
const sender = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(sender.privateKey);

var aspectCore = web3.atl.aspectCore();
// Aspect address
let aspectId ="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";

return await aspectCore.methods.boundAddressesOf(aspectId).call()

```
<!-- @formatter:on -->
