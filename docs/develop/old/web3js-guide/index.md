# Web3.js Guide

# Introduction to @artela/web3.js

`@artela/web3` is a modified version of Ethereum's web3.js 1.x, supporting Aspect operations. This package retains full compatibility with the original web3.js, with minor adjustments. If your dApp utilizes the original web3.js, transitioning to Artela is as straightforward as replacing the package and import statements.

# Migrating from the original version of web3.js

Comparing with the original version of `web3.js`, Artela version made the following changes:

1. The field `eth` under `web3` has been renamed to `atl`, if you were using methods in it or creating instances like `new web3.eth.Contract(...)`, you need to change it as `new web3.atl.Contract(...)`
2. Add `@artela/` prefix if you are importing the following packages (for other `web3.js` packages, you can keep the imports as before):
   - `web3`
   - `web3-core`
   - `web3-core-method`
   - `web3-utils`
   - `web3-eth-contract`

# Installation

To integrate this package into your JavaScript or TypeScript project, run the following command:

```bash
npm install @artela/web3 --save
```

# Deploy Smart Contract

You can deploy your smart contract with `@artela/web3` by the following steps:

1. Preparing the connection to Artela Testnet node.

```jsx
const Web3 = require('web3');
const web3 = new Web3('https://testnet-rpc1.artela.network'); // modify it according to your own requirements.
```

2. Retrieve test accounts from our node. 

:::note    
💡You can also use your local account at your preference.
:::

```jsx
// retrieve accounts
let accounts = await web3.atl.getAccounts();

// retrieve current nonce
let nonce = await web3.atl.getTransactionCount(accounts[0]);
```

3. Initialize the contract instance and make the deployment.

```jsx
let sendOptions =  {
    gasPrice: '1000000000', // <-- adjust accrodingly
    gas: 4000000            // <-- adjust accrodingly
}

// instantiate an instance of contract
let contract = new web3.atl.Contract(abi);
// deploy contract
contract = await contract.deploy({data: bytecode})
    .send({ from: accounts[0], nonce, ...deployOptions})
    .on('receipt', function (receipt) {
        console.log("contract address: " + receipt.contractAddress);
    }).on('transactionHash', (txHash) => {
        console.log("tx hash: ", txHash);
    });
```

# Deploy Aspect

During the deployment of an Aspect, the Aspect binary is stored in the system contract, along with additional details such as the version, properties, and other relevant information.

1. Load Aspect binary(assume the binary is in `./build/release.wasm*)`.

```jsx
const fs = require('fs')
let aspectBytecode = '0x' + fs.readFileSync('./build/release.wasm', {
    encoding: "hex"
});
```

2. Instantiate the Aspect instance and make the deployment.

```jsx
let aspect = new web3.atl.Aspect();
aspect = await aspect.deploy({
    data: aspectBytecode,
    properties: [ // <-- properity to initialize the aspect, key-value pairs
        { 'key': 'owner', 'value': accounts[0] }
    ]
}).send({ from: accounts[0], nonce, ...sendOptions });
console.log("aspect address: " + aspect.options.address);
```

# Binding Aspect To Contract

Aspect binding to a contract is a process that establishes a connection between an Aspect and a smart contract in an Artela network. The relationship is maintained within the system contract.

```jsx
await contract.bind({
        priority: 1,             // <-- Priority of the aspect, int8 number, smaller number has higher priority. Aspect with higher priority will be executed first.
        aspectId: aspectAddress, // <-- ID of the aspect to bind with the contract
        aspectVersion: 1,        // <-- Version of the aspect to bind with the contract
    }).send({ from: accounts[0], nonce, ...sendOptions });
```

:::note
The sender of the binding transaction must be the owner of the smart contract. Artela system contract will check the `isOwner(address)` method of the contract to make sure the sender has the permission to bind the aspect.
:::

# Invoke The Contract With the Associated Aspect

We can invoke the methods of smart contract just like the original version of `web3.js`(assume we are calling a method with the following signature `count(uint256)`)

```jsx
await contract.methods.count(1)
        .send({ 
           from: accounts[0], 
           nonce: nonceVal, 
           gas: 4000000, 
           gasPrice: '1000000000' 
        })
        .on('receipt', (receipt) => {
            console.log(receipt);
        })
        .on('transactionHash', (txHash) => {
            console.log("call contract tx hash: ", txHash);
        });
```

# Upgrade Aspect

You can update an existing Aspect's code and properties using aspectId by following code:

```jsx
// ...
await new web3.atl.Aspect('0x{aspect-id}').upgrade({
    data: aspectBytecode,
    properties: [ // <-- properity can also be updated during the upgrade
        { 'key': 'owner', 'value': accounts[0] }
    ]
}).send({ from: accounts[0], nonce, ...sendOptions });
```

:::note
The upgraded Aspect will be activated in the next block and its version will be increased by 1.
:::

# Call Aspect

Aspect can also be invoked like a smart contract, it allows users to make operational calls to modify its state or queries to the Aspect. The Aspect can be called by the following code:

```jsx
await new web3.atl.Aspect('0x{aspect-id}')
        .operation('0x{encoded-hex-call-data}')
        .send({ from: accounts[0], nonce, ...sendOptions });
```

:::note
The first version of Aspect operation calls follows the bytes in bytes out manner, users need to encode and decode the call data themselves. We will provide a more user-friendly way to call Aspect in a later version.
:::
