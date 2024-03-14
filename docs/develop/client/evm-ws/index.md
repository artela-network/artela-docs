---
sidebar_position: 2
---

# EVM-Compatible WebSocket

Ethereum WebSocket integration empowers developers with real-time data updates and seamless communication with the Ethereum network. Unlike traditional HTTP methods, WebSockets maintain persistent connections, enabling efficient and immediate data exchange without the overhead of continuous polling.

With WebSocket integration, developers can subscribe to Ethereum events, such as new block notifications, pending transactions, or smart contract events, in real-time. This capability facilitates the creation of dynamic and responsive decentralized applications (DApps) that react instantly to changes on the Ethereum blockchain.

However, it's crucial to acknowledge that WebSocket connections are not immune to interruptions. Handling dropped connections and managing reconnections gracefully are vital aspects of building robust Ethereum applications. Additionally, unlike HTTP responses, WebSocket responses lack HTTP status codes, providing only error messages in case of issues.

By leveraging Ethereum WebSocket integration, developers can unlock the full potential of real-time communication and build innovative decentralized applications that offer a seamless user experience.

## How to use Websockets

### Using wscat

The easiest way to test out WebSockets is to install a command line tool for making WebSocket requests such as [wscat](https://github.com/websockets/wscat). Using wscat, you can send requests as follows:
```shell
wscat -c ws://localhost:8546           
Connected (press CTRL+C to quit)

> {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}
< {"jsonrpc":"2.0","id":0,"result":"0x7"}

```

### With Web3
Transitioning to WebSockets while using a client library like `@artela/web3` is simple. Simply pass the WebSocket URL instead of the HTTP one when instantiating your Web3 client. For example:
```javascript
import web3 from '@artela/web3'

const ws = new web3("ws://localhost:8546");
ws.eth.getBlockNumber().then(console.log) // -> 42967

```

## Subscription API
When connected through a WebSocket, you may use two additional methods: `eth_subscribe` and `eth_unsubscribe`. These methods will allow you to listen for particular events and be notified immediately.

### eth_subscribe

Creates a new subscription for specified events. Learn more about eth_subscribe(opens in a new tab).

#### Parameters

1. Subscription types 
2. Optional params

The first argument specifies the type of event for which to listen. The second argument contains additional options which depend on the first argument. The different description types, their options, and their event payloads are described below.

#### Returns

The subscription ID: This ID will be attached to any received events, and can also be used to cancel the subscription using eth_unsubscribe.

#### Subscription events
    
While the subscription is active, you will receive events which are objects with the following fields:

* jsonrpc: Always "2.0"
* method: Always "eth_subscription"
* params: An object with the following fields:
  * subscription: The subscription ID returned by the eth_subscribe call which created this subscription.
  * result: An object whose contents vary depending on the type of subscription.
  Subscription types

#### Example

```shell
{ "id": 1, "jsonrpc": "2.0", "method": "eth_subscribe", "params": ["newHeads"] }
{ "id": 1, "jsonrpc": "2.0", "result": "0x9cef478923ff08bf67fde6c64013158d" }
```

### eth_unsubscribe

Subscriptions are cancelled with a regular RPC call with eth_unsubscribe as method and the subscription id as first parameter. It returns a bool indicating if the subscription was cancelled successful.

#### Parameters

1. Subscription ID, as previously returned from an eth_subscribe call.

#### Returns

true if a subscription was successfully cancelled, or false if no subscription existed with the given ID.

#### Example
```shell
{ "id": 1, "jsonrpc": "2.0", "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"] }
{ "id": 1, "jsonrpc": "2.0", "result": true }
```


## Supported Subscriptions


### newHeads
Fires a notification each time a new header is appended to the chain, including chain reorganizations. Users can use the bloom filter to determine if the block contains logs that are interested to them. Note that if geth receives multiple blocks simultaneously, e.g. catching up after being out of sync, only the last block is emitted.

In case of a chain reorganization the subscription will emit the last header in the new chain. Therefore the subscription can emit multiple headers on the same height.

#### Subscribe:

```shell
wscat -c ws://localhost:8546           
Connected (press CTRL+C to quit)

> { "id": 1, "jsonrpc": "2.0", "method": "eth_subscribe", "params": ["newHeads"] }
< {"jsonrpc":"2.0","id":1,"result":"0xf294b50192715a593849aa8cecab8877"}

```

#### Response
```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "subscription": "0xf294b50192715a593849aa8cecab8877",
    "result": {
      "parentHash": "0x1134ed580de8a624457b0dfcb4508c67ffdbbdc4ffd1f8d33803da0dd2790872",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "miner": "0x18b20df6619c4597d87ffe5b037ab2162e1bdeab",
      "stateRoot": "0x1eab94cf0dc8dc93cce96c6eb4c1af13f12a8cd2c38d8ed07c13623d0dbbf24e",
      "transactionsRoot": "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "logsBloom": "0x000000000000000...",
      "difficulty": "0x0",
      "number": "0xa94f",
      "gasLimit": "0x0",
      "gasUsed": "0x0",
      "timestamp": "0x65f26fd3",
      "extraData": "0x",
      "mixHash": "0x000000000000000000000000000000000000000...",
      "nonce": "0x0000000000000000",
      "baseFeePerGas": "0x7",
      "withdrawalsRoot": null,
      "excessDataGas": null,
      "hash": "0x049cf9c549e388e1b605a3527215e5d11005be0211a76172c9a23eb20faad102"
    }
  }
}

```

#### Cancel Subscribe:

```shell
> { "id": 1, "jsonrpc": "2.0", "method": "eth_unsubscribe", "params": ["0xf294b50192715a593849aa8cecab8877"] }
< {"jsonrpc":"2.0","id":1,"result":true}

```


### logs
Emits logs which are part of newly added blocks that match specified filter criteria.

When a chain reorganization occurs, logs which are part of blocks on the old chain will be emitted again with the property removed set to true. Further, logs which are part of the blocks on the new chain are emitted, meaning that it is possible to see logs for the same transaction multiple times in the case of a reorganization.

**Parameters**

An object with the following fields:
* address (optional): either a string representing an address or an array of such strings.
    * Only logs created from one of these addresses will be emitted.
* topics: an array of topic specifiers.
  * Each topic specifier is either null, a string representing a topic, or an array of strings. 
  * Each position in the array which is not null restricts the emitted logs to only those who have one of the given topics in that position.

Some examples of topic specifications:
* []: Any topics allowed.
* [A]: A in first position (and anything after).
* [null, B]: Anything in first position and B in second position (and anything after).
* [A, B]: A in first position and B in second position (and anything after).
* [[A, B], [A, B]]: (A or B) in first position and (A or B) in second position (and anything after).

#### Subscribe:

```shell
wscat -c ws://localhost:8546           
Connected (press CTRL+C to quit)

>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["logs",  {"address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",  "topics":  ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}

<  {"jsonrpc":"2.0","id":2,"result":"0x4a8a4c0517381924f9838102c5a4dcb7"}

```

#### Response
```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "subscription": "0x4a8a4c0517381924f9838102c5a4dcb7",
    "result": {
      "address": "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",
      "blockHash": "0x61cdb2a09ab99abf791d474f20c2ea89bf8de2923a2d42bb49944c8c993cbf04",
      "blockNumber": "0x29e87",
      "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003",
      "logIndex": "0x0",
      "topics": ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"],
      "transactionHash": "0xe044554a0a55067caafd07f8020ab9f2af60bdfe337e395ecd84b4877a3d1ab4",
      "transactionIndex": "0x0"
    }
  }
}

```

#### Cancel Subscribe:

```shell
> { "id": 1, "jsonrpc": "2.0", "method": "eth_unsubscribe", "params": ["0x4a8a4c0517381924f9838102c5a4dcb7"] }
< {"jsonrpc":"2.0","id":1,"result":true}

```


### newPendingTransactions

Returns the hash for all transactions that are added to the pending state and are signed with a key that is available in the node.

When a transaction that was previously part of the canonical chain isn't part of the new canonical chain after a reorganization its again emitted.

**Parameters**

#### Subscribe:

```shell
wscat -c ws://localhost:8546           
Connected (press CTRL+C to quit)

> { "id": 1, "jsonrpc": "2.0", "method": "eth_subscribe", "params": ["newPendingTransactions"] }
< {"jsonrpc":"2.0","id":1,"result":"0x667c9f4ab4e10ae6b77cfeb7b9a24ca6"}

```

#### Response
```json
{
  "jsonrpc":"2.0",
  "method":"eth_subscription",
  "params":{
    "subscription":"0xc3b33aa549fb9a60e95d21862596617c",
    "result":"0xd6fdc5cc41a9959e922f30cb772a9aef46f4daea279307bc5f7024edc4ccd7fa"
  }
}
```

#### Cancel Subscribe:

```shell
> { "id": 1, "jsonrpc": "2.0", "method": "eth_unsubscribe", "params": ["0x667c9f4ab4e10ae6b77cfeb7b9a24ca6"] }
< {"jsonrpc":"2.0","id":1,"result":true}

```
