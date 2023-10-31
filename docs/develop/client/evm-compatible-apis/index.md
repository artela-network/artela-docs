---
sidebar_position: 1
---

# EVM-Compatible APIs

Artela JSON-RPC Server provides an API that facilitates connection to the Artela blockchain and interaction with the EVM. JSON-RPC is a stateless, lightweight protocol for remote procedure calls (RPC). It defines various data structures and the rules governing their processing. JSON-RPC is compatible with multiple transport protocols. Artela, in particular, supports JSON-RPC over HTTP and WebSocket.

Artela Testnet example:
```
   curl https://testnet-rpc1.artela.network -H "Content-Type:application/json" -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
```

Artela has most of the Ethereum RPC methods implemented (some are still working in progress), so you can use Ethereum infrastructures connect to Artela without any issue. The following is the RPC methods implementation conditions:

| APIs                                    | Status |
|-----------------------------------------|--------|
| web3_clientVersion                      |        |
| web3_sha3                               |        |
| net_version                             | ✅      |
| net_listening                           |        |
| net_peerCount                           |        |
| debug_traceTransaction                  |        |
| debug_traceBlock                        |        |
| eth_protocolVersion                     |        |
| eth_syncing                             |        |
| eth_coinbase                            |        |
| eth_chainId                             | ✅      |
| eth_mining                              |        |
| eth_hashrate                            |        |
| eth_gasPrice                            | ✅      |
| eth_accounts                            | ✅      |
| eth_blockNumber                         | ✅      |
| eth_getBalance                          | ✅      |
| eth_getStorageAt                        |        |
| eth_getTransactionCount                 | ✅      |
| eth_getBlockTransactionCountByHash      |        |
| eth_getBlockTransactionCountByNumber    |        |
| eth_getUncleCountByBlockHash            |        |
| eth_getUncleCountByBlockNumber          |        |
| eth_getCode                             | ✅      |
| eth_getLogs                             | ✅      |
| eth_sign                                |        |
| eth_signTransaction                     | ✅      |
| eth_sendTransaction                     | ✅      |
| eth_sendRawTransaction                  | ✅      |
| eth_call                                |        |
| eth_estimateGas                         | ✅      |
| eth_getBlockByHash                      | ✅      |
| eth_getBlockByNumber                    | ✅      |
| eth_getTransactionByHash                | ✅      |
| eth_getTransactionByBlockHashAndIndex   |        |
| eth_getTransactionByBlockNumberAndIndex |        |
| eth_getTransactionReceipt               | ✅      |
| eth_getUncleByBlockHashAndIndex         |        |
| eth_getUncleByBlockNumberAndIndex       |        |
| eth_newFilter                           |        |
| eth_newBlockFilter                      |        |
| eth_newPendingTransactionFilter         |        |
| eth_uninstallFilter                     |        |
| eth_getFilterChanges                    |        |
| eth_getFilterLogs                       |        |
