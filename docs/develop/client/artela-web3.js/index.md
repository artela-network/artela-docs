---
sidebar_position: 3
---

# Artela Web3.js

# Introduction to @artela/web3.js

`@artela/web3` extend Ethereum's web3.js 1.x, supporting Aspect operations. This package retains full compatibility with the original web3.js, with minor adjustments.

If your dApp utilizes the original web3.js, transitioning to Artela is as straightforward as replacing the package and import statements.


# Installation

To integrate this package into your JavaScript or TypeScript project, run the following command:

```bash
npm install @artela/web3 --save
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
