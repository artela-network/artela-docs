---
sidebar_position: 1
---

# EVM-Compatible APIs

Artela JSON-RPC Server provides an API for connection to the Artela blockchain and interaction with the EVM. JSON-RPC is
a stateless, lightweight protocol for remote procedure calls (RPC). It defines various data structures and the rules
governing their processing. JSON-RPC is compatible with multiple transport protocols. Artela, in particular, supports
JSON-RPC over HTTP and WebSocket.

Artela TestNet example:

```shell

   curl https://betanet-rpc1.artela.network -H "Content-Type:application/json" -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
   
```

## Endpoints

Artela has most of the Ethereum RPC methods implemented (while some are still working in progress), so you can use
Ethereum infrastructures connect to Artela without any issue. The RPC methods below, marked with ticks, are the ones we
have already implemented:

| APIs                                    | Status |
|-----------------------------------------|-------|
| web3_clientVersion                      | ✅     |
| web3_sha3                               | ✅     |
| net_version                             | ✅     |
| net_listening                           | ✅     |
| net_peerCount                           | ✅     |
| debug_traceTransaction                  | ✅     |
| debug_traceBlock                        | ✅     |
| eth_protocolVersion                     | ✅     |
| eth_syncing                             | ✅     |
| eth_coinbase                            | ✅     |
| eth_chainId                             | ✅     |
| eth_mining                              |       |
| eth_hashrate                            |       |
| eth_gasPrice                            | ✅     |
| eth_accounts                            | ✅     |
| eth_blockNumber                         | ✅     |
| eth_getBalance                          | ✅     |
| eth_getStorageAt                        | ✅     |
| eth_getTransactionCount                 | ✅     |
| eth_getBlockTransactionCountByHash      | ✅     |
| eth_getBlockTransactionCountByNumber    | ✅     |
| eth_getUncleCountByBlockHash            | ✅     |
| eth_getUncleCountByBlockNumber          | ✅     |
| eth_getCode                             | ✅     |
| eth_getLogs                             | ✅     |
| eth_sign                                | ✅     |
| eth_signTransaction                     | ✅     |
| eth_sendTransaction                     | ✅     |
| eth_sendRawTransaction                  | ✅     |
| eth_call                                | ✅     |
| eth_estimateGas                         | ✅     |
| eth_getBlockByHash                      | ✅     |
| eth_getBlockByNumber                    | ✅     |
| eth_getTransactionByHash                | ✅     |
| eth_getTransactionByBlockHashAndIndex   | ✅     |
| eth_getTransactionByBlockNumberAndIndex | ✅     |
| eth_getTransactionReceipt               | ✅     |
| eth_getUncleByBlockHashAndIndex         | ✅     |
| eth_getUncleByBlockNumberAndIndex       | ✅     |
| eth_newFilter                           | ✅     |
| eth_newBlockFilter                      | ✅     |
| eth_newPendingTransactionFilter         | ✅     |
| eth_uninstallFilter                     | ✅     |
| eth_getFilterChanges                    | ✅     |
| eth_getFilterLogs                       | ✅     |
| eth_feeHistory                          | ✅     |

Below is a list of the RPC methods, the parameters and an example response from the namespaces.

## Web3 Methods

### **`web3_clientVersion`**

Get the web3 client version.

Returns the current network id.

**Parameters**

None

**Returns**

* artelad / artelad version / os - cpu arch/ go version

**Example**

```bash
curl --data '{"jsonrpc": "2.0", "id": 42, "method": "web3_clientVersion", "params": []}' -X POST -H "Content-Type: application/json" http://localhost:8545

{"jsonrpc":"2.0","id":1,"result":"artelad/v0.4.7-rc6/darwin-amd64/go1.21.3"}

```

### **`web3_sha3`**

Returns Keccak-256 (not the standardized SHA3-256) of the given data.

**Parameters **

1: input `hexutil.Bytes`   - Required: ✓ Yes

**Result**

* Result: Keccak256

**Examples**

```bash

curl -X POST -H "Content-Type: application/json" http://localhost:8545 --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'

{"jsonrpc":"2.0","id":64,"result":"0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"}

```

## Net Methods

### `net_version`

Returns the current network id.

**Parameters**

None

**Returns**

`String` - The current network id.

The full list of current network IDs is available at [chainlist.org(opens in a new tab)](https://chainlist.org/). Some
common ones are:

- 11820: Local Chain
- 11821:  *Mainnet Chain*
- 11822: TestNet Chain
- 11823: *Devnet Chain*

**Example**

```bash
# Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":1}' -H "Content-Type: application/json" http://localhost:8545

# Result
{"jsonrpc":"2.0","id":1,"result":"11820"}
```

### `net_listening`

Returns `true` if client is actively listening for network connections.

**Parameters**

None

**Returns**

`Boolean` - `true` when listening, otherwise `false`.

**Example**

```bash
# Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":1}' -H "Content-Type: application/json" http://localhost:8545

# Result
{"jsonrpc":"2.0","id":1,"result":true}

```

### `net_peerCount`

Returns number of peers currently connected to the client.

**Parameters**

None

**Returns**

`QUANTITY` - integer of the number of connected peers.

**Example**

```bash
# Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' -H "Content-Type: application/json" http://localhost:8545

# Result
{"jsonrpc":"2.0","id":1,"result":"0x3"}

```

## Ethereum Methods

### `eth_protocolVersion`

Returns the current Ethereum protocol version.

**Parameters**

None

**Returns**

`String` - The current Ethereum protocol version

**Example**

```bash
# Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'  -H "Content-Type: application/json" http://localhost:8545

# Result
{"jsonrpc":"2.0","id":67,"result":"0x41"}

```

### `eth_syncing`

Returns an object with data about the sync status or `false`.

**Parameters**

None

**Returns**

The precise return data varies between client implementations. All clients return `False` when the node is not syncing,
and all clients return the following fields.

`Object|Boolean`, An object with sync status data or `FALSE`, when not syncing:

- `startingBlock`: `QUANTITY` - The block at which the import started (will only be reset, after the sync reached his
  head)
- `currentBlock`: `QUANTITY` - The current block, same as eth_blockNumber

However, the individual clients may also provide additional data. For example Artelad returns the following:

```json
{
  "jsonrpc": "2.0",
  "id": 51,
  "result": {
    "startingBlock": "0x0",
    "currentBlock": "0x1518"
  }
}

```

Refer to the documentation for your specific client for more details.

**Example**

```bash
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' -H "Content-Type: application/json" http://localhost:8545

## Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',

  }
}
## Or when not syncing
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}

```

### `eth_getBlockTransactionCountByNumber`

Returns the number of transactions in a block matching the given block number.

**Parameters**

1. `QUANTITY|TAG` - integer of a block number, or the string `"earliest"`, `"latest"` or `"pending"`, as in
   the [default block parameter](https://ethereum.org/en/developers/docs/apis/json-rpc/#default-block).

`1params: [2  "0xe8", // 2323] Copy`

**Returns**

`QUANTITY` - integer of the number of transactions in this block.

**Example**

```bash
# Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x6af"],"id":1}' -H "Content-Type: application/json" http://localhost:8545

# Result
{"jsonrpc":"2.0","id":1,"result":"0x1"}

```

### `eth_getBlockTransactionCountByHash`

Returns the number of transactions in a block from a block matching the given block hash.

**Parameters**

1. `DATA`, 32 Bytes - hash of a block

```bash
params: ["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"] 
```

**Returns**

`QUANTITY` - integer of the number of transactions in this block.

**Example**

```bash
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x27c8f50d2c8a8c55ee675a2440ce5db4fc9520c6497720e7928af65001f73379"],"id":1}'  -H "Content-Type: application/json" http://localhost:8545

## Result
{"jsonrpc":"2.0","id":1,"result":"0x1"}

```

### `eth_sign`

The sign method calculates an Ethereum specific signature
with: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

By adding a prefix to the message makes the calculated signature recognizable as an Ethereum specific signature. This
prevents misuse where a malicious dapp can sign arbitrary data (e.g. transaction) and use the signature to impersonate
the victim.

Note: the address to sign with must be unlocked.

**Parameters**

1. `DATA`, 20 Bytes - address
2. `DATA`, N Bytes - message to sign

**Returns**

`DATA`: Signature

**Example**

```bash
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x7A09774d44EC5a050489B323352AD56890578B52", "0xdeadbeaf"],"id":1}'   -H "Content-Type: application/json" http://localhost:8545

## Result
{"jsonrpc":"2.0","id":1,"result":"0x8caf3d6cc927c2f389cda8557d4208f469d2ba9cc70dbf64c653d9cb0ad81e856c16e91982b91c85e893200dd87d5786b0f7f60d22aea6ebd253c74f81ed32011c"}

```

### `eth_getTransactionByBlockHashAndIndex`

Returns information about a transaction by block hash and transaction index position.

**Parameters**

1. `DATA`, 32 Bytes - hash of a block.
2. `QUANTITY` - integer of the transaction index position.

**Returns**
See [eth_getTransactionByHash](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactionbyhash)

**Example**

```bash
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x27c8f50d2c8a8c55ee675a2440ce5db4fc9520c6497720e7928af65001f73379", "0x0"],"id":1}' -H "Content-Type: application/json" http://localhost:8545

## Result
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"blockHash": "0x27c8f50d2c8a8c55ee675a2440ce5db4fc9520c6497720e7928af65001f73379",
		"blockNumber": "0x6ae",
		"from": "0x08d721275c6dbb33bc688b62ef199bbd709154c9",
		"gas": "0x895440",
		"gasPrice": "0x7",
		"hash": "0x227263857341d2e989bdf83e5b6cfb939961f4b81d73213ad133005553470ecc",
		"input": "0x6080604052346200002d5762000014620001f4565b6200001e62000033565b6110da6200023a82396110da90f35b62000039565b60405190565b5f80fd5be1565b601f801991011690565b634e487b7160e01b5f52604160045260245ffd5b906200006a9062000040565b810190811060018060401b038211176200008357604052565b6200004a565b90620000a06200009862000033565b92836200005e565b565b60018060401b038111620000c157620000bd60209162000040565b0190565b6200004a565b90620000dd620000d783620000a2565b62000089565b918252565b5f7f53746f726167652e6465706c6f79657200000000000000000000000000000000910152565b620001156010620000c7565b906200012460208301620000e2565b565b6200013062000109565b90565b5f1b90565b906200014b60018060a01b039162000133565b9181191691161790565b60018060a01b031690565b90565b6200017c62000176620001829262000155565b62000160565b62000155565b90565b620001909062000163565b90565b6200019e9062000185565b90565b90565b5f601491620001ef620001e7620001dc7f421683f821a0574472445355be6d2b769119e8515f8376a1d7878523dfdecf7b9662000193565b86868686e6620001a1565b825462000138565b8155e6565b6200023733620002307f421683f821a0574472445355be6d2b769119e8515f8376a1d7878523dfdecf7b5f806200022a62000126565b6200003d565b5f620001a4565b56fe60806040526004361015610013575b6106b6565b61001d5f3561007c565b80632e64cec1146100775780632f54bf6e14610072578063303904141461006d5780636057361d1461006857806364b63e9c1461006357639cf3ef1e0361000e5761067d565b6105e8565b6104d6565b61045a565b61017c565b6100c4565b60e01c90565b60405190565b5f80fd5b5f80fd5b5f91031261009a57565b61008c565b90565b6100ab9061009f565b9052565b91906100c2905f602085019401906100a2565b565b346100f4576100d4366004610090565b6100f06100df610dfc565b6100e7610082565b918291826100af565b0390f35b610088565b5f80fd5b60018060a01b031690565b610111906100fd565b90565b61011d81610108565b0361012457565b5f80fd5b9050359061013582610114565b565b906020828203126101505761014d915f01610128565b90565b61008c565b151590565b61016390610155565b9052565b919061017a905f6020850194019061015a565b565b346101ac576101a8610197610192366004610137565b6106ea565b61019f610082565b91829182610167565b0390f35b610088565b5f80fd5b5f80fd5b601f801991011690565b634e487b7160e01b5f52604160045260245ffd5b906101e1906101b9565b810190811067ffffffffffffffff8211176101fb57604052565b6101c3565b9061021361020c610082565b92836101d7565b565b67ffffffffffffffff81116102335761022f6020916101b9565b0190565b6101c3565b90825f939282370152565b9092919261025861025382610215565b610200565b938185526020850190828401116102745761027292610238565b565b6101b5565b9080601f830112156102975781602061029493359101610243565b90565b6101b1565b906020828203126102cc575f82013567ffffffffffffffff81116102c7576102c49201610279565b90565b6100f9565b61008c565b5190565b905090565b5f5b8381106102ec575050905f910152565b8060209183015181850152016102dc565b61032261031992602092610310816102d1565b948580936102d5565b938491016102da565b0190565b90565b61033561033a9161009f565b610326565b9052565b61034e61035591602094936102fd565b8092610329565b0190565b61036d610364610082565b9283928361033e565b03902090565b61037c91610359565b90565b5f1c90565b67ffffffffffffffff1690565b61039d6103a29161037f565b610384565b90565b6103af9054610391565b90565b60401c90565b63ffffffff1690565b6103cd6103d2916103b2565b6103b8565b90565b6103df90546103c1565b90565b6103ed906002610373565b906104045f6103fd8185016103a5565b93016103d5565b90565b67ffffffffffffffff1690565b61041d90610407565b9052565b63ffffffff1690565b61043390610421565b9052565b91602061045892949361045160408201965f830190610414565b019061042a565b565b3461048b5761047261046d36600461029c565b6103e2565b9061048761047e610082565b92839283610437565b0390f35b610088565b6104998161009f565b036104a057565b5f80fd5b905035906104b182610490565b565b906020828203126104cc576104c9915f016104a4565b90565b61008c565b5f0190565b34610504576104ee6104e93660046104b3565b610d05565b6104f6610082565b80610500816104d1565b0390f35b610088565b5f80fd5b5f80fd5b909182601f8301121561054b5781359167ffffffffffffffff831161054657602001926001830284011161054157565b61050d565b610509565b6101b1565b91909160408184031261059157610569835f8301610128565b92602082013567ffffffffffffffff811161058c576105889201610511565b9091565b6100f9565b61008c565b60209181520190565b6105be6105c76020936105cc936105b5816102d1565b93848093610596565b958691016102da565b6101b9565b0190565b6105e59160208201915f81840391015261059f565b90565b34610619576106156106046105fe366004610550565b91610f2d565b61060c610082565b918291826105d0565b0390f35b610088565b9091604082840312610678575f82013567ffffffffffffffff81116106735783610649918401610511565b929093602082013567ffffffffffffffff811161066e5761066a9201610511565b9091565b6100f9565b6100f9565b61008c565b346106b1576106ad61069c61069336600461061e565b92919091611021565b6106a4610082565b91829182610167565b0390f35b610088565b5f80fd5b5f90565b60018060a01b031690565b6106d56106da9161037f565b6106be565b90565b6106e790546106c9565b90565b6106f26106ba565b5061070d6107076107025f6106dd565b610108565b91610108565b145f1461071957600190565b5f90565b90565b61072c6107319161037f565b61071d565b90565b61073e9054610720565b90565b634e487b7160e01b5f52601160045260245ffd5b61076461076a9193929361009f565b9261009f565b820180921161077557565b610741565be1565b9061078f61078a83610215565b610200565b918252565b5f7f53746f726167652e6e756d626572000000000000000000000000000000000000910152565b6107c5600e61077d565b906107d260208301610794565b565b6107dc6107bb565b90565b5f1b90565b906107f05f19916107df565b9181191691161790565b90565b61081161080c6108169261009f565b6107fa565b61009f565b90565b90565b5f60209161086161085a6108507fec13d6d12b88433319b64e1065a96ea19cd330ef6603f5f6fb685dde3959a320966107fd565b86868686e6610819565b82546107e4565b8155e6565b61087a61087561087f9261009f565b6107fa565b610421565b90565b90565b61089961089461089e92610882565b6107fa565b610421565b90565b6108ad6108b391610421565b91610421565b019063ffffffff82116108c257565b610741565b6108d16040610200565b90565b90565b6108eb6108e66108f0926108d4565b6107fa565b610407565b90565b906108fd90610407565b9052565b9061090b90610421565b9052565be0565b5f7f53746f726167652e6163636f756e747300000000000000000000000000000000910152565b610943601061077d565b9061095060208301610912565b565b61095a610939565b90565b5f7f746f6d0000000000000000000000000000000000000000000000000000000000910152565b610990600380926102d5565b6109998161095d565b0190565b906109b36109ac602093610984565b8092610329565b0190565b6109cc906109c3610082565b9182918261099d565b03902090565b6109db906109b7565b90565b6109e8600361077d565b906109f56020830161095d565b565b6109ff6109de565b90565b7fbe1ed0c8dd29187dc7f912e44de1f4839dd00def8713462ddfc46439e631c0b9907fe1f5c72ff0a649a4ce0a6eab39012684a22d2b6ab37e32f7cfcd9a975890fee492610a4e6109f7565b91e3565be2565b5f7f6964000000000000000000000000000000000000000000000000000000000000910152565b610a86600261077d565b90610a9360208301610a55565b565b610a9d610a7c565b90565b610aaa9051610407565b90565b90610ac067ffffffffffffffff916107df565b9181191691161790565b610ade610ad9610ae392610407565b6107fa565b610407565b90565b90565b5f600891610b2e610b27610b1d7ff1b7aa7bf0d99ca4a537a5236577c04ec41de4d0d5dbff999f5553dd3ee02ce996610aca565b86868686e6610ae6565b8254610aad565b8155e6565b5f7f62616c616e636500000000000000000000000000000000000000000000000000910152565b610b64600761077d565b90610b7160208301610b33565b565b610b7b610b5a565b90565b610b889051610421565b90565b60401b90565b90610ba86bffffffff000000000000000091610b8b565b9181191691161790565b610bc6610bc1610bcb92610421565b6107fa565b610421565b90565b90565b6008600491610c17610c10610c067faab7cacf707fb0c503305d1ae30a92dbb307b40fad33ef28b90a7b75de63a5e496610bb2565b86868686e6610bce565b8254610b91565b8155e6565b610cf791610c8c5f8301610c315f8401610aa0565b90610c877fbe1ed0c8dd29187dc7f912e44de1f4839dd00def8713462ddfc46439e631c0b97ff1b7aa7bf0d99ca4a537a5236577c04ec41de4d0d5dbff999f5553dd3ee02ce95f610c80610a95565b858a610a52565b610ae9565b610cf27fbe1ed0c8dd29187dc7f912e44de1f4839dd00def8713462ddfc46439e631c0b97faab7cacf707fb0c503305d1ae30a92dbb307b40fad33ef28b90a7b75de63a5e46008610ce260205f88019601610b7e565b9585610cec610b73565b91610a52565b610bd1565b565b90610d0391610c1c565b565b610d1b610d5691610d166001610734565b610755565b610d4f7fec13d6d12b88433319b64e1065a96ea19cd330ef6603f5f6fb685dde3959a3205f6001610d4a6107d4565b61077a565b600161081c565b610df66065610da9610d846126ac610d7f610d79610d746001610734565b610866565b91610885565b6108a1565b610da0610d98610d926108c7565b946108d7565b5f85016108f3565b60208301610901565b610ddc7fe1f5c72ff0a649a4ce0a6eab39012684a22d2b6ab37e32f7cfcd9a975890fee46002610dd7610952565b61090f565b6002610df1610dea826109d2565b8092610a02565b610cf9565b565b5f90565b610e04610df8565b50610e0f6001610734565b90565b606090565b60601b90565b610e2690610e17565b90565b610e3290610e1d565b90565b610e41610e4691610108565b610e29565b9052565b909182610e5a81610e61936102d5565b8093610238565b0190565b80610e76601492610e7d9694610e35565b0191610e4a565b90565b90565b610e97610e92610e9c92610e80565b6107fa565b6100fd565b90565b610ea890610e83565b90565b67ffffffffffffffff8111610ec957610ec56020916101b9565b0190565b6101c3565b90610ee0610edb83610eab565b610200565b918252565b606090565b3d5f14610f0557610efa3d610ece565b903d5f602084013e5b565b610f0d610ee5565b90610f03565b610f1c5f61077d565b90565b610f27610f13565b90565b90565b91610f675f9392610f588594610f41610e12565b509193610f4c610082565b94859360208501610e65565b602082018103825203826101d7565b610f716064610e9f565b9082602082019151925af1610f84610eea565b905f14610f9857610f9490610f2a565b5b90565b50610fa1610f1f565b610f95565b9190610fc081610fb981610fc595610596565b8095610238565b6101b9565b0190565b9290610fe590610ff3959360408601918683035f880152610fa6565b926020818503910152610fa6565b90565b90565b61100d61100861101292610ff6565b6107fa565b6100fd565b90565b61101e90610ff9565b90565b5f939161104d85949361105c936110366106ba565b509294611041610082565b95869460208601610fc9565b602082018103825203826101d7565b6110666066611015565b9082602082019151925af1611079610eea565b509056fea264697066735822122060af12da3682ba0447c5ae1c14c513dbc83c079a6a4730d80fbc6133cbd8a36c64736f6c637829302e382e32312d646576656c6f702e323032332e31302e32372b636f6d6d69742e6435343565646237005a",
		"nonce": "0x28",
		"to": null,
		"transactionIndex": "0x0",
		"value": "0x0",
		"type": "0x0",
		"chainId": "0x2e2c",
		"v": "0x5c7b",
		"r": "0xbb87aac6ce7f14537adb176c8116c4c3a135aa356d697f15c53e51e1094f18a4",
		"s": "0x5d93605c137c3d2bcf9c7d42492a52870073ec40143f5046e647d638915a5ec6"
	}
}
```

### `eth_newFilter`

Creates a filter object, based on filter options, to notify when the state changes (logs). To check if the state has
changed, call [eth_getFilterChanges](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges).

**A note on specifying topic filters:** Topics are order-dependent. A transaction with a log with topics [A, B] will be
matched by the following topic filters:

- `[]` "anything"
- `[A]` "A in first position (and anything after)"
- `[null, B]` "anything in first position AND B in second position (and anything after)"
- `[A, B]` "A in first position AND B in second position (and anything after)"
- `[[A, B], [A, B]]` "(A OR B) in first position AND (A OR B) in second position (and anything after)"

**Parameters**

1. `Object` - The filter options:

- `fromBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or `"latest"` for the last mined
  block or `"pending"`, `"earliest"` for not yet mined transactions.
- `toBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or `"latest"` for the last mined
  block or `"pending"`, `"earliest"` for not yet mined transactions.
- `address`: `DATA|Array`, 20 Bytes - (optional) Contract address or a list of addresses from which logs should
  originate.
- `topics`: `Array of DATA`, - (optional) Array of 32 Bytes `DATA` topics. Topics are order-dependent. Each topic can
  also be an array of DATA with "or" options.

**Returns**

- `QUANTITY` - A filter id.

**Example**

```bash
# Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x0000000000000000000000000000000000000000000000000000000012341234"]}],"id":1}' -H "Content-Type: application/json" http://localhost:8545

# Result
{"jsonrpc":"2.0","id":1,"result":"0x21d8cac73ae615e7baa9b5a4c0e0378e"}

```

###       

### `eth_newBlockFilter`

Creates a filter in the node, to notify when a new block arrives. To check if the state has changed,
call [eth_getFilterChanges](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges).

**Parameters** None

**Returns** `QUANTITY` - A filter id.

**Example**

```bash
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'  -H "Content-Type: application/json" http://localhost:8545
## Result
{"jsonrpc":"2.0","id":73,"result":"0xcf5ea31cf8ec93663c32416f090fe8ee"}
```

### `eth_newPendingTransactionFilter`

Creates a filter in the node, to notify when new pending transactions arrive. To check if the state has changed,
call [eth_getFilterChanges](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges).

**Parameters** None

**Returns** `QUANTITY` - A filter id.

**Example**

```bash
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'  -H "Content-Type: application/json" http://localhost:8545

## Result
{"jsonrpc":"2.0","id":73,"result":"0x12371074de32dd8ca4759c8a80872037"}
```

### `eth_uninstallFilter`

Uninstalls a filter with given id. Should always be called when watch is no longer needed. Additionally Filters timeout
when they aren't requested
with [eth_getFilterChanges](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges) for a period of
time.

**Parameters**

1. `QUANTITY` - The filter id.

```json
params: [
"0xb", // 11
]
```

**Returns** `Boolean` - `true` if the filter was successfully uninstalled, otherwise `false`.

**Example**

```bash
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xfa0ffbd75b8ea5db7a74eb8008fd38d7"],"id":73}'  -H "Content-Type: application/json" http://localhost:8545

## Result
{"jsonrpc":"2.0","id":73,"result":true}
```

### `eth_getFilterChanges`

Polling method for a filter, which returns an array of logs which occurred since last poll.

**Parameters**

1. `QUANTITY` - the filter id.

```json
params: [
"0x16", // 22
]
```

**Returns** `Array` - Array of log objects, or an empty array if nothing has changed since last poll.

- For filters created with `eth_newBlockFilter` the return are block hashes (`DATA`, 32 Bytes),
  e.g. `["0x3454645634534..."]`.
- For filters created with `eth_newPendingTransactionFilter` the return are transaction hashes (`DATA`, 32 Bytes),
  e.g. `["0x6345343454645..."]`.
- For filters created with `eth_newFilter` logs are objects with following params:
    - `removed`: `TAG` - `true` when the log was removed, due to a chain reorganization. `false` if its a valid log.
    - `logIndex`: `QUANTITY` - integer of the log index position in the block. `null` when its pending log.
    - `transactionIndex`: `QUANTITY` - integer of the transactions index position log was created from. `null` when its
      pending log.
    - `transactionHash`: `DATA`, 32 Bytes - hash of the transactions this log was created from. `null` when its pending
      log.
    - `blockHash`: `DATA`, 32 Bytes - hash of the block where this log was in. `null` when its pending. `null` when its
      pending log.
    - `blockNumber`: `QUANTITY` - the block number where this log was in. `null` when its pending. `null` when its
      pending log.
    - `address`: `DATA`, 20 Bytes - address from which this log originated.
    - `data`: `DATA` - contains zero or more 32 Bytes non-indexed arguments of the log.
    - `topics`: `Array of DATA` - Array of 0 to 4 32 Bytes `DATA` of indexed log arguments. (In *solidity*: The first
      topic is the *hash* of the signature of the event (e.g. `Deposit(address,bytes32,uint256)`), except you declared
      the event with the `anonymous` specifier.)
- **Example**

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'  -H "Content-Type: application/json" http://localhost:8545

// Result
{
"id": 1,
"jsonrpc": "2.0",
"result": [
{
"logIndex": "0x1", // 1
"blockNumber": "0x1b4", // 436
"blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
"transactionHash": "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
"transactionIndex": "0x0", // 0
"address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
"data": "0x0000000000000000000000000000000000000000000000000000000000000000",
"topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
}, {
...
}
]
}

```

### `eth_getFilterLogs`

Returns an array of all logs matching filter with given id.

**Parameters**

1. `QUANTITY` - The filter id.

```json
params: [
"0x16", // 22
]
```

**Returns** See [eth_getFilterChanges](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges)

**Example**

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'   -H "Content-Type: application/json" http://localhost:8545

```

Result see [eth_getFilterChanges](https://www.notion.so/Api-949ca04b6e10421f8f76f85e92a0bfce?pvs=21)

###       

### `eth_getLogs`

Returns an array of all logs matching a given filter object.

**Parameters**

1. `Object` - The filter options:

- `fromBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or `"latest"` for the last mined
  block or `"pending"`, `"earliest"` for not yet mined transactions.
- `toBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or `"latest"` for the last mined
  block or `"pending"`, `"earliest"` for not yet mined transactions.
- `address`: `DATA|Array`, 20 Bytes - (optional) Contract address or a list of addresses from which logs should
  originate.
- `topics`: `Array of DATA`, - (optional) Array of 32 Bytes `DATA` topics. Topics are order-dependent. Each topic can
  also be an array of DATA with "or" options.
- `blockhash`: `DATA`, 32 Bytes - (optional, **future**) With the addition of EIP-234, `blockHash` will be a new filter
  option which restricts the logs returned to the single block with the 32-byte hash `blockHash`. Using `blockHash` is
  equivalent to `fromBlock` = `toBlock` = the block number with hash `blockHash`. If `blockHash` is present in the
  filter criteria, then neither `fromBlock` nor `toBlock` are allowed.

```json
params: [
{
topics: [
"0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
],
},
]

```

**Returns** See [eth_getFilterChanges](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges)

**Example**

```bash
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}' -H "Content-Type: application/json" http://localhost:8545

```

Result see [eth_getFilterChanges](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges)

### `eth_coinbase`

Returns the account the mining rewards will be send to.

**Parameters**

None

**Returns**

`DATA`, 20 bytes - the current coinbase address.

**Example**

```bash
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'  -H "Content-Type: application/json" http://localhost:8545

## Result
{"jsonrpc":"2.0","id":64,"result":"0x58Fedf73173835B4736A168Cb4ea79Bd453828Aa"}

```

### **`eth_getProof`**

Returns the account- and storage-values of the specified account including the Merkle-proof. This call can be used to
verify that the data you are pulling from is not tampered with.

**Parameters**

1. `DATA`, 20 Bytes - address of the account.
2. `ARRAY`, 32 Bytes - an array of storage-keys that should be proofed and included.
   See `[eth_getStorageAt](https://docs.alchemy.com/reference/eth-getstorageat)`
3. `QUANTITY|TAG` - integer block number, or the string `"latest"` or `"earliest"`, see
   the [default block parameter](https://docs.alchemy.com/reference/ethereum-api-quickstart#what-is-the-default-block-parameter)

**Returns**

`Object` - A account object:

- `balance`: `QUANTITY` - the balance of the account.
  See`[eth_getBalance](https://docs.alchemy.com/alchemy/apis/ethereum/eth-getbalance#returns)`
- `codeHash`: `DATA`, 32 Bytes - hash of the code of the account. For a simple Account without code it will
  return `"0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"`
- `nonce`: `QUANTITY`, - nonce of the account.
  See `[eth_getTransactionCount](https://docs.alchemy.com/alchemy/apis/ethereum/eth-gettransactioncount#returns)`
- `storageHash`: `DATA`, 32 Bytes - SHA3 of the StorageRoot. All storage will deliver a MerkleProof starting with
  this `rootHash`.
- `accountProof`: `ARRAY` - Array of rlp-serialized MerkleTree-Nodes, starting with the stateRoot-Node, following the
  path of the SHA3 (address) as key.
- `storageProof`: `ARRAY` - Array of storage-entries as requested. Each entry is an object with these properties:
    - `key`: `QUANTITY` - the requested storage key
    - `value`: `QUANTITY` - the storage value
    - `proof`: `ARRAY` - Array of rlp-serialized MerkleTree-Nodes, starting with the storageHash-Node, following the
      path of the SHA3 (key) as path.

**Example**

```bash

## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getProof","params":["0x7F0d15C7FAae65896648C8273B6d7E43f58Fa842",["0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"],"latest"],"id":1}' -H "Content-type:application/json" http://localhost:8545

## Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "accountProof": [
      "0xf90211a...0701bc80",
      "0xf90211a...0d832380",
      "0xf90211a...5fb20c80",
      "0xf90211a...0675b80",
      "0xf90151a0...ca08080"
    ],
    "balance": "0x0",
    "codeHash": "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
    "nonce": "0x0",
    "storageHash": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "storageProof": [
      {
        "key": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
        "proof": [
          "0xf90211a...0701bc80",
          "0xf90211a...0d832380"
        ],
        "value": "0x1"
      }
    ]
  }
}
```

### `eth_gasPrice`

Returns an estimate of the current price per gas in wei. For example, the Besu client examines the last 100 blocks and
returns the median gas unit price by default.

**Parameters**

None

**Returns**

`QUANTITY` - integer of the current gas price in wei.

**Example**

```bash
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":1}' -H "Content-Type: application/json" http://localhost:8545

## Result
{"jsonrpc":"2.0","id":1,"result":"0x7"}

```

### `eth_accounts`

Returns a list of addresses owned by client.

**Parameters**

None

**Returns**

Array of DATA, 20 Bytes - addresses owned by the client.

**Example**

```shell
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}' -H "Content-Type: application/json" http://localhost:8545

## Result
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}

```

### `eth_blockNumber`

Returns the number of most recent block.

**Parameters**

None

**Returns**

`QUANTITY` - integer of the current block number the client is on.

**Example**

```shell
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' -H "Content-Type: application/json" http://localhost:8545

## Result
{"jsonrpc":"2.0","id":1,"result":"0x9c3f"}

```

### `eth_getBalance`

Returns the balance of the account of given address.

**Parameters**

1. DATA, 20 Bytes - address to check for balance.
2. `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending", see the default block
   parameter

```shell
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Returns**

`QUANTITY` - integer of the current balance in wei.

**Example**

```shell

## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}' -H "Content-Type: application/json" http://localhost:8545

## Result
{"jsonrpc":"2.0","id":1,"result": "0x0234c8a3397aab58" }

```

### `eth_getStorageAt`

Returns the value from a storage position at a given address.

**Parameters**

1. `DATA`, 20 Bytes - address of the storage.
2. `QUANTITY` - integer of the position in the storage.
3. `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending", see the default block
   parameter

**Returns**

`DATA` - the value at this storage position.

**Example**

Calculating the correct position depends on the storage to retrieve. Consider the following contract deployed at
0x295a70b2de5e3953354a6a8344e616ed314d7251 by address 0x391694e7e0b0cce554cb130d723a9d27458f9298.

```solidity
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;

    function Storage() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

Retrieving the value of pos0 is straight forward:

```shell

curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}'  -H "Content-Type: application/json" http://localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Retrieving an element of the map is harder. The position of an element in the map is calculated with:

```shell

keccak(LeftPad32(key, 0), LeftPad32(map position, 0))

```

This means to retrieve the storage on pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] we need to calculate the
position with:

```json

keccak(
decodeHex(
"000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
"0000000000000000000000000000000000000000000000000000000000000001"
)
)
```

The geth console which comes with the web3 library can be used to make the calculation:

```json
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"

```

Now to fetch the storage:

```shell
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' -H "Content-Type: application/json" http://localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}

```

### `eth_getTransactionCount`

Returns the number of transactions sent from an address.

**Parameters**

1. `DATA`, 20 Bytes - address.
2. `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending", see the default block
   parameter

```shell
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // state at the latest block
]
```

**Returns**

`QUANTITY` - integer of the number of transactions send from this address.

**Example**

```shell
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}' -H "Content-Type: application/json" http://localhost:8545
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}

```

### `eth_getBlockTransactionCountByHash`

Returns the number of transactions in a block from a block matching the given block hash.

**Parameters**

1. `DATA`, 32 Bytes - hash of a block

```shell
params: ["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"]

```

**Returns**

`QUANTITY` - integer of the number of transactions in this block.

**Example**

```shell
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],"id":1}' -H "Content-Type: application/json" http://localhost:8545
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xb" // 11
}

```

### `eth_getBlockTransactionCountByNumber`

Returns the number of transactions in a block matching the given block number.

**Parameters**

1. `QUANTITY|TAG` - integer of a block number, or the string "earliest", "latest" or "pending", as in the default block
   parameter.

**Returns**

`QUANTITY` - integer of the number of transactions in this block.

**Example**

```shell
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0xe8"],"id":1}' -H "Content-Type: application/json" http://localhost:8545

## Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa" // 10
}

```

### `eth_getTransactionByHash`

Returns the information about a transaction requested by transaction hash.

**Parameters**

1. `DATA`, 32 Bytes - hash of a transaction

```shell
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]

```

**Returns**

Object - A transaction object, or null when no transaction was found:

* blockHash: DATA, 32 Bytes - hash of the block where this transaction was in. null when its pending.
* blockNumber: QUANTITY - block number where this transaction was in. null when its pending.
* from: DATA, 20 Bytes - address of the sender.
* gas: QUANTITY - gas provided by the sender.
* gasPrice: QUANTITY - gas price provided by the sender in Wei.
* hash: DATA, 32 Bytes - hash of the transaction.
* input: DATA - the data send along with the transaction.
* nonce: QUANTITY - the number of transactions made by the sender prior to this one.
* to: DATA, 20 Bytes - address of the receiver. null when its a contract creation transaction.
* transactionIndex: QUANTITY - integer of the transactions index position in the block. null when its pending.
* value: QUANTITY - value transferred in Wei.
* v: QUANTITY - ECDSA recovery id
* r: QUANTITY - ECDSA signature r
* s: QUANTITY - ECDSA signature s

**Example**

```shell
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}' -H "Content-Type: application/json" http://localhost:8545

## Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber":"0x5daf3b", // 6139707
    "from":"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas":"0xc350", // 50000
    "gasPrice":"0x4a817c800", // 20000000000
    "hash":"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "input":"0x68656c6c6f21",
    "nonce":"0x15", // 21
    "to":"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex":"0x41", // 65
    "value":"0xf3dbb76162000", // 4290000000000000
    "v":"0x25", // 37
    "r":"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s":"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c"
  }
}

```

### `eth_getTransactionReceipt`

Returns the receipt of a transaction by transaction hash.

Note That the receipt is not available for pending transactions.

**Parameters**

1.DATA, 32 Bytes - hash of a transaction

```shell
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]

```

**Returns**

Object - A transaction receipt object, or null when no receipt was found:

* transactionHash : DATA, 32 Bytes - hash of the transaction.
* transactionIndex: QUANTITY - integer of the transactions index position in the block.
* blockHash: DATA, 32 Bytes - hash of the block where this transaction was in.
* blockNumber: QUANTITY - block number where this transaction was in.
* from: DATA, 20 Bytes - address of the sender.
* to: DATA, 20 Bytes - address of the receiver. null when its a contract creation transaction.
* cumulativeGasUsed : QUANTITY - The total amount of gas used when this transaction was executed in the block.
* effectiveGasPrice : QUANTITY - The sum of the base fee and tip paid per unit of gas.
* gasUsed : QUANTITY - The amount of gas used by this specific transaction alone.
* contractAddress : DATA, 20 Bytes - The contract address created, if the transaction was a contract creation, otherwise
  null.
* logs: Array - Array of log objects, which this transaction generated.
* logsBloom: DATA, 256 Bytes - Bloom filter for light clients to quickly retrieve related logs.
* type: QUANTITY - integer of the transaction type, 0x0 for legacy transactions, 0x1 for access list types, 0x2 for
  dynamic fees.

It also returns either :

* root : DATA 32 bytes of post-transaction stateroot (pre Byzantium)
* status: QUANTITY either 1 (success) or 0 (failure)

**Example**

```shell
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}' -H "Content-Type: application/json" http://localhost:8545

## Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // string of the address if it was created
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // logs as returned by getFilterLogs, etc.
    }],
    "logsBloom": "0x00...0", // 256 byte bloom filter
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}

```

### `eth_call`

Executes a new message call immediately without creating a transaction on the block chain. Often used for executing
read-only smart contract functions, for example the balanceOf for an ERC-20 contract.

**Parameters**

1. Object - The transaction call object

    * from: DATA, 20 Bytes - (optional) The address the transaction is sent from.
    * to: DATA, 20 Bytes - The address the transaction is directed to.
    * gas: QUANTITY - (optional) Integer of the gas provided for the transaction execution. eth_call consumes zero gas,
      but this parameter may be needed by some executions.
    * gasPrice: QUANTITY - (optional) Integer of the gasPrice used for each paid gas
    * value: QUANTITY - (optional) Integer of the value sent with this transaction
    * input: DATA - (optional) Hash of the method signature and encoded parameters. For details see Ethereum Contract
      ABI in the Solidity documentation(opens in a new tab).

2. QUANTITY|TAG - integer block number, or the string "latest", "earliest" or "pending", see the default block parameter

**Returns**

DATA - the return value of executed contract.

**Example**

```shell
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'  -H "Content-Type: application/json" http://localhost:8545

## Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}

```

### `eth_estimateGas`

Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction
will not be added to the blockchain. Note that the estimate may be significantly more than the amount of gas actually
used by the transaction, for a variety of reasons including EVM mechanics and node performance.

**Parameters**

See eth_call parameters, except that all properties are optional. If no gas limit is specified geth uses the block gas
limit from the pending block as an upper bound. As a result the returned estimate might not be enough to executed the
call/transaction when the amount of gas is higher than the pending block gas limit.

**Returns**

QUANTITY - the amount of gas used.

```shell
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}' -H "Content-Type: application/json" http://localhost:8545

## Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### `eth_getBlockByHash`

Returns information about a block by hash.

**Parameters**

1. DATA, 32 Bytes - Hash of a block.
2. Boolean - If true it returns the full transaction objects, if false only the hashes of the transactions.

```shell
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]

```

**Returns**
Object - A block object, or null when no block was found:

* number: QUANTITY - the block number. null when its pending block.
* hash: DATA, 32 Bytes - hash of the block. null when its pending block.
* parentHash: DATA, 32 Bytes - hash of the parent block.
* nonce: DATA, 8 Bytes - hash of the generated proof-of-work. null when its pending block.
* sha3Uncles: DATA, 32 Bytes - SHA3 of the uncles data in the block.
* logsBloom: DATA, 256 Bytes - the bloom filter for the logs of the block. null when its pending block.
* transactionsRoot: DATA, 32 Bytes - the root of the transaction trie of the block.
* stateRoot: DATA, 32 Bytes - the root of the final state trie of the block.
* receiptsRoot: DATA, 32 Bytes - the root of the receipts trie of the block.
* miner: DATA, 20 Bytes - the address of the beneficiary to whom the mining rewards were given.
* difficulty: QUANTITY - integer of the difficulty for this block.
* totalDifficulty: QUANTITY - integer of the total difficulty of the chain until this block.
* extraData: DATA - the "extra data" field of this block.
* size: QUANTITY - integer the size of this block in bytes.
* gasLimit: QUANTITY - the maximum gas allowed in this block.
* gasUsed: QUANTITY - the total used gas by all transactions in this block.
* timestamp: QUANTITY - the unix timestamp for when the block was collated.
* transactions: Array - Array of transaction objects, or 32 Bytes transaction hashes depending on the last given
  parameter.
* uncles: Array - Array of uncle hashes.

**Example**

```shell
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}' -H "Content-Type: application/json" http://localhost:8545

## Result
{
{
"jsonrpc": "2.0",
"id": 1,
"result": {
    "difficulty": "0x4ea3f27bc",
    "extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
    "gasLimit": "0x1388",
    "gasUsed": "0x0",
    "hash": "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
    "mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
    "nonce": "0x689056015818adbe",
    "number": "0x1b4",
    "parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x220",
    "stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
    "timestamp": "0x55ba467c",
    "totalDifficulty": "0x78ed983323d",
    "transactions": [
    ],
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "uncles": [
    ]
}
}

```

### `eth_getBlockByNumber`

Returns information about a block by block number.

**Parameters**

1. QUANTITY|TAG - integer of a block number, or the string "earliest", "latest" or "pending", as in the default block
   parameter.
2. Boolean - If true it returns the full transaction objects, if false only the hashes of the transactions.

```shell
params: [
  "0x1b4", // 436
  true,
]
```

**Returns**

See eth_getBlockByHash

**Example**

```shell
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}' -H "Content-Type: application/json" http://localhost:8545

```

### `eth_sendRawTransaction`

Creates new message call transaction or a contract creation for signed transactions.

**Parameters**

1. DATA, The signed transaction data.

```shell
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Returns**

* DATA, 32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available.
* Use eth_getTransactionReceipt to get the contract address, after the transaction was mined, when you created a
  contract.

**Example**

```shell
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'  -H "Content-Type: application/json" http://localhost:8545

## Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}

```

### `eth_sendTransaction`

Creates new message call transaction or a contract creation, if the data field contains code, and signs it using the
account specified in from.

**Parameters**

Object - The transaction object

* from: DATA, 20 Bytes - The address the transaction is sent from.
* to: DATA, 20 Bytes - (optional when creating new contract) The address the transaction is directed to.
* gas: QUANTITY - (optional, default: 90000) Integer of the gas provided for the transaction execution. It will return
  unused gas.
* gasPrice: QUANTITY - (optional, default: To-Be-Determined) Integer of the gasPrice used for each paid gas.
* value: QUANTITY - (optional) Integer of the value sent with this transaction.
* input: DATA - The compiled code of a contract OR the hash of the invoked method signature and encoded parameters.
* nonce: QUANTITY - (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the
  same nonce.

```shell
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    input:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]

```

**Returns**

DATA, 32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available.

Use eth_getTransactionReceipt to get the contract address, after the transaction was mined, when you created a contract.

**Example**

```shell
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'  -H "Content-Type: application/json" http://localhost:8545

## Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}

```

### `eth_getCode`

Returns code at a given address.

**Parameters**

1. DATA, 20 Bytes - address
2. QUANTITY|TAG - integer block number, or the string "latest", "earliest" or "pending", see the default block parameter

```json
params: [
"0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
"0x2", // 2
]

```

**Returns**

DATA - the code from the given address.

**Example**

```shell
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x2"],"id":1}'  -H "Content-Type: application/json" http://localhost:8545

## Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"
}

```

### `eth_chainId`

Returns the chain ID used for signing replay-protected transactions.

**Parameters**

None

**Returns**

chainId, hexadecimal value as a string representing the integer of the current chain id.

**Example**

```shell
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'  -H "Content-Type: application/json" http://localhost:8545

## Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}

```

## Debug Methods

### `debug_traceTransaction`

The traceTransaction debugging method will attempt to run the transaction in the exact same manner as it was executed on the network. It will replay any transaction that may have been executed prior to this one before it will finally attempt to execute the transaction that corresponds to the given hash.

**Parameters**

* Trace Config

**Example**
```shell
## Request
curl -X POST --data '{"jsonrpc":"2.0","method":"debug_traceTransaction","params":["0xddecdb13226339681372b44e01df0fbc0f446fca6f834b2de5ecb1e569022ec8", {"tracer": "{data: [], fault: function(log) {}, step: function(log) { if(log.op.toString() == \"CALL\") this.data.push(log.stack.peek(0)); }, result: function() { return this.data; }}"}],"id":1}' -H "Content-Type: application/json" http://localhost:8545

##Result
["68410", "51470"]

```

### `debug_traceBlockByNumber`

The traceBlockByNumber endpoint accepts a block number and will replay the block that is already present in the database.

**Parameters**
 * Trace Config

```shell
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"debug_traceBlockByNumber","params":["0xe", {"tracer": "{data: [], fault: function(log) {}, step: function(log) { if(log.op.toString() == \"CALL\") this.data.push(log.stack.peek(0)); }, result: function() { return this.data; }}"}],"id":1}' -H "Content-Type: application/json" http://localhost:8545

//Result
{"jsonrpc":"2.0","id":1,"result":[{"result":["68410", "51470"]}]}

```