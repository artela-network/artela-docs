---
sidebar_position: 6
---

# Aspect Lifecycle

The lifecycle of an Aspect encompasses several stages, including deployment, upgrade, configuration, binding, unbinding, execution, and destruction.

It's important to note that the Aspect Core, a system contract situated at the address `0x0000000000000000000000000000000000A27E14`, manages all Aspect lifecycle operations. For more details on the Aspect Core's ABI, refer to [this link](https://github.com/artela-network/artela-web3.js/blob/1.9.0/packages/web3-utils/src/aspect_core.json).

## Deployment

Deploying an Aspect mirrors the deployment process of a traditional smart contract. To deploy an Aspect through an EOA transaction, provide the following key information:

| Param Name   | Required | Description                                                                                                                                                                                                                                                                       |
|--------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `code`       | Yes      | Bytecode of the Aspect's WASM artifact in hex format.                                                                                                                                                                                                                             |
| `properties` | No       | Initial readonly states for the Aspect.                                                                                                                                                                                                                                           |
| `account`    | Yes      | This is the settlement account, responsible for paying gas fees for the Aspect. Some Aspect operations incur gas costs. Currently, the settlement account defaults to the sender of the contract call, but customizable settlement accounts will be available in future versions. |
| `proof`      | No       | Placeholder for future support of customized settlement account binding verification.                                                                                                                                                                                             |

Just like a smart contract, once deployed, an Aspect receives a unique ID equivalent to the EVM address type (20 bytes). The initial deployment assigns the Aspect a version of 1.

The Aspect's state can be represented in JSON as:

```json
{
  "id": "0xABCDEF....",
  "code": {
    "1": "0xABCDEF...."
  },
  "properties": {
    "property-name": "property-value",
    ...
  },
  "settlementAccount": "0xABCDEF....",
  "currentVersion": 1
}
```

## Upgrade and Configuration

After deployment, you can update both the Aspect's code and properties. Each update increments the version by one.

To upgrade an Aspect, provide the following:

| Param Name   | Required | Description                                                   |
|--------------|----------|---------------------------------------------------------------|
| `aspectId`   | Yes      | ID of the Aspect being upgraded.                              |
| `code`       | Yes      | Updated bytecode of the Aspect's WASM artifact in hex format. |
| `properties` | No       | Readonly states to update within the Aspect.                  |

Only the owner of the Aspect can initiate the upgrade. The owner's address must pass the `isOwner(address): bool` verification method defined within the Aspect.

The upgraded Aspect's state, represented in JSON, appears as:

```json
{
  "id": "0xABCDEF....", // remains unchanged
  "code": {
    "1": "0xABCDEF....",
    "2": "New Version Code"
  },
  "properties": {
    "property-name": "property-value",
    "new-property": "new-value", // added if new property is set
    ...
  },
  "settlementAccount": "0xABCDEF....", // remains unchanged
  "currentVersion": 2 // incremented by 1
}
```

:::warning
Upgrading an Aspect doesn't disrupt its current binding status. Contracts bound to an older Aspect version will continue executing the old code. Ensure backward compatibility in your Aspect to prevent unforeseen behaviors.
:::

## Binding

Binding associates an Aspect with a specific smart contract. Only the smart contract's owner who's address can be verified through the `isOwner(address): bool` method defined in the contract can initiate the process.

The binding procedure necessitates:

| Param Name      | Required | Description                                                                                                                                                 |
|-----------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `aspectId`      | Yes      | ID of the Aspect to bind.                                                                                                                                   |
| `aspectVersion` | Yes      | Version of the Aspect for binding. Use 0 to bind to the latest version.                                                                                     |
| `account`       | Yes      | Address of the account to bind with the Aspect.                                                                                                             |
| `priority`      | Yes      | Execution priority of the Aspect. The smaller the number, the higher the priority. For Aspects with equal priorities, the one bound earlier executes first. |

The Aspect Core contract records the binding relationship as:

```json
{
  "0x{AccountAddress}": [
    {
      "aspectId": "0x{AspectId1}",
      "aspectVersion": 1
    },
    {
      "aspectId": "0x{AspectId2}",
      "aspectVersion": 2
    }
    ...
  ]
}
```

## Unbinding

Aspects can be detached from smart contracts. Only the owner of the smart contract, whose address must pass the `isOwner(address): bool` verification, can initiate the unbinding.

To unbind, you need:

| Param Name | Required | Description                       |
|------------|----------|-----------------------------------|
| `aspectId` | Yes      | ID of the Aspect for unbinding.   |
| `account`  | Yes      | Address of the account to detach. |

Once unbound, the Aspect won't execute when transaction related to the given account is received.

## Execution

Aspect execution triggers under two scenarios:
1. An EOA transaction or call directed at the bound smart contract address.
2. A direct EOA transaction calling the Aspect's operation method.

### Execution at Join Point

In Aspect, there are a set of predefined methods will be triggered at specific join point.
At certain stage of transaction processing, the entrypoint function of Aspect will be invoked, and it will route to the corresponding method pairs with current join point.
For instance, `PreContractCall` method of the Aspect will be executed before a contract call is made.

### Execution with EOA transaction

Each Aspect has a bytes-in-bytes-out `operation` method.
This method is a maintenance interface that permits Aspect maintainers to update or fetch the Aspect state via transactions / calls.
If your Aspect contains sensitive data, ensure you've implemented necessary authorization checks before altering the state.
Currently, the `operation` method functions in a `bytes in bytes out` format, leaving developers to manage encoding, decoding, and routing.
Future versions will offer more streamlined solutions.

## Destruction

:::warning
This functionality is under development. Updates will be available upon completion.
:::
