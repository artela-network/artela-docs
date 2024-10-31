---
sidebar_position: 1
---

# EVM-Compatible APIs

Artela JSON-RPC Server provides an API for connection to the Artela blockchain and interaction with the EVM. JSON-RPC is a stateless, lightweight protocol for remote procedure calls (RPC). It defines various data structures and the rules governing their processing. JSON-RPC is compatible with multiple transport protocols. Artela, in particular, supports JSON-RPC over HTTP and WebSocket.

Artela TestNet example:

```
   curl https://betanet-rpc1.artela.network -H "Content-Type:application/json" -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
```

Artela has most of the Ethereum RPC methods implemented (while some are still working in progress), so you can use Ethereum infrastructures connect to Artela without any issue. The RPC methods below, marked with ticks, are the ones we have already implemented:

| APIs                                    | Status |
|-----------------------------------------|--------|
| web3_clientVersion                      |  ✅      |
| web3_sha3                               |  ✅      |
| net_version                             | ✅     |
| net_listening                           |  ✅      |
| net_peerCount                           | ✅       |
| debug_traceTransaction                  |  ✅      |
| debug_traceBlock                        |  ✅      |
| eth_protocolVersion                     |  ✅      |
| eth_syncing                             |  ✅      |
| eth_coinbase                            |   ✅     |
| eth_chainId                             | ✅     |
| eth_mining                              | N/A       |
| eth_hashrate                            |  N/A      |
| eth_gasPrice                            | ✅     |
| eth_accounts                            | ✅     |
| eth_blockNumber                         | ✅     |
| eth_getBalance                          | ✅     |
| eth_getStorageAt                        | ✅     |
| eth_getTransactionCount                 | ✅     |
| eth_getBlockTransactionCountByHash      | ✅       |
| eth_getBlockTransactionCountByNumber    |  ✅      |
| eth_getUncleCountByBlockHash            |  ✅      |
| eth_getUncleCountByBlockNumber          |  ✅      |
| eth_getCode                             | ✅     |
| eth_getLogs                             | ✅     |
| eth_sign                                |   ✅     |
| eth_signTransaction                     | ✅     |
| eth_sendTransaction                     | ✅     |
| eth_sendRawTransaction                  | ✅     |
| eth_call                                | ✅     |
| eth_estimateGas                         | ✅     |
| eth_getBlockByHash                      | ✅     |
| eth_getBlockByNumber                    | ✅     |
| eth_getTransactionByHash                | ✅     |
| eth_getTransactionByBlockHashAndIndex   |  ✅      |
| eth_getTransactionByBlockNumberAndIndex |   ✅     |
| eth_getTransactionReceipt               | ✅     |
| eth_getUncleByBlockHashAndIndex         |  N/A      |
| eth_getUncleByBlockNumberAndIndex       |  N/A      |
| eth_newFilter                           |        |
| eth_newBlockFilter                      |        |
| eth_newPendingTransactionFilter         |        |
| eth_uninstallFilter                     |        |
| eth_getFilterChanges                    |        |
| eth_getFilterLogs                       |        |
| eth_feeHistory                          | ✅     |

Artela-specific API:

| APIs                                    | Status |
|-----------------------------------------|--------|
| eth_getDenomByAddress                   | ✅     |
| eth_getAddressByDenom                   | ✅     |