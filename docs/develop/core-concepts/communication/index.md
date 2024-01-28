---
sidebar_position: 9
---

# Communication between Aspects & Smart Contracts

While Aspect and Smart Contract execution environments are distinct (WASM vs EVM), they aren't completely isolated. Just as smart contracts can interact via contract calls, there are several methods for Aspects and Smart Contracts to exchange information. This document elaborates on these methods.

## EVM Static Caller

The built-in EVM caller in the Aspect framework facilitates unidirectional communication from Aspect to a smart contract. Within Aspect, you can use the EVM caller to initiate a smart contract method in read-only mode. This method, when invoked, will execute based on the state from the most recent canonical block (current versions do not support historical state) and will synchronously return the result to the Aspect. Here's a code snippet to as an example:

```typescript
// Construct and dispatch contract call
const callMsg = new EthMessage(to, callData);
const res = sys.evm.staticCall(ctx).submit(callMsg);
// Examine for errors and retrieve return data
sys.require(res.vmError == '', res.vmError);
const retData = res.ret;
// Process the returned data...
```

:::note
Note: The static caller is currently restricted from being used at the contract call level join points. It's only functional at the transaction or block level join points.
:::

## EVM JIT Caller

The JIT Call allows Aspect to modify the state of a smart contract through the [Account Abstraction](jit-call#understanding-account-abstraction) wallet. For an in-depth understanding of JIT Call, kindly refer to our [documentation](jit-call).

## Aspect Context

The Aspect Context acts as a transient global storage accessible by both Aspects and smart contracts. This key-value store is segregated based on the smart contract's address and the Aspect's ID. Entities can only modify the context using their unique address/ID but can read data from other entities. This feature not only facilitates information exchange among Aspects but also between smart contracts and Aspects.

Here's how to interact with the Aspect Context within an Aspect:

```typescript
// Fetch the context value from the Aspect storage
const ctxKey = ctx.aspect.transientStorage.get<string>('key');
// Extract and utilize the context value
const ctxValue = ctxKey.unwrap();
// Replace the key with a new value
ctxKey.set<string>('new-value');
```

And for interaction within a smart contract:

```solidity
// Invoke 0x64 with the ABI-encoded address and key to retrieve the raw byte value of the key
(bool success, bytes memory returnData) = address(0x64).call(abi.encodePacked(aspectId, key));
// Invoke 0x66 with the ABI-encoded key and value to store the values in the context
(bool success, ) = address(0x66).call(abi.encode(key, value));
```

The above code snippet can read & write the shared context between Aspects and Smart Contracts, if we use a diagram to show how it works, it will be like this:

![Context](./context.svg)
