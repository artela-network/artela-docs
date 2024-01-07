---
sidebar_position: 2
---

# Cosmos APIs

Artela Network built on CosmosSDK and CometBft.

Cosmos gRPC and CometBFT RPC also supported in our network.

## Cosmos gRPC

Artela provides gRPC endpoints for all integrated modules within the Cosmos SDK. This streamlines the interaction process for wallets and blockchain explorers, enabling them to easily engage with Proof-of-Stake mechanisms and native Cosmos transactions and queries.

[Cosmos Tool](https://v1.cosmos.network/rpc/v0.45.1) is also applicable to Artela.

### EVM Module

#### Queries

| Verb   | Method                                               | Description                                                               |
| ------ | ---------------------------------------------------- | ------------------------------------------------------------------------- |
| `gRPC` | `artela.evm.v1.Query/Account`                     | Get an Ethereum account                                                   |
| `gRPC` | `artela.evm.v1.Query/CosmosAccount`               | Get an Ethereum account's Cosmos Address                                  |
| `gRPC` | `artela.evm.v1.Query/ValidatorAccount`            | Get an Ethereum account's from a validator consensus Address              |
| `gRPC` | `artela.evm.v1.Query/Balance`                     | Get the balance of a the EVM denomination for a single EthAccount.        |
| `gRPC` | `artela.evm.v1.Query/Storage`                     | Get the balance of all coins for a single account                         |
| `gRPC` | `artela.evm.v1.Query/Code`                        | Get the balance of all coins for a single account                         |
| `gRPC` | `artela.evm.v1.Query/Params`                      | Get the parameters of x/evm module                                        |
| `gRPC` | `artela.evm.v1.Query/EthCall`                     | Implements the eth_call rpc api                                           |
| `gRPC` | `artela.evm.v1.Query/EstimateGas`                 | Implements the eth_estimateGas rpc api                                    |
| `gRPC` | `artela.evm.v1.Query/TraceTx`                     | Implements the debug_traceTransaction rpc api                             |
| `gRPC` | `artela.evm.v1.Query/TraceBlock`                  | Implements the debug_traceBlockByNumber and debug_traceBlockByHash rpc api |
| `GET`  | `/artela/evm/v1/account/{address}`                | Get an Ethereum account                                                   |
| `GET`  | `/artela/evm/v1/cosmos_account/{address}`         | Get an Ethereum account's Cosmos Address                                  |
| `GET`  | `/artela/evm/v1/validator_account/{cons_address}` | Get an Ethereum account's from a validator consensus Address              |
| `GET`  | `/artela/evm/v1/balances/{address}`               | Get the balance of a the EVM denomination for a single EthAccount.        |
| `GET`  | `/artela/evm/v1/storage/{address}/{key}`          | Get the balance of all coins for a single account                         |
| `GET`  | `/artela/evm/v1/codes/{address}`                  | Get the balance of all coins for a single account                         |
| `GET`  | `/artela/evm/v1/params`                           | Get the parameters of x/evm module                                        |
| `GET`  | `/artela/evm/v1/eth_call`                         | Implements the eth_call rpc api                                           |
| `GET`  | `/artela/evm/v1/estimate_gas`                     | Implements the eth_estimateGas rpc api                                    |
| `GET`  | `/artela/evm/v1/trace_tx`                         | Implements the debug_traceTransaction rpc api                             |
| `GET`  | `/artela/evm/v1/trace_block`                      | Implements the debug_traceBlockByNumber and debug_traceBlockByHash rpc api |

#### Transactions

| Verb   | Method                            | Description                     |
| ------ | --------------------------------- | ------------------------------- |
| `gRPC` | `artela.evm.v1.Msg/EthereumTx` | Submit an Ethereum transactions |
| `POST` | `/artela/evm/v1/ethereum_tx`   | Submit an Ethereum transactions |

### FEE Module

#### Queries

| Verb   | Method                         | Description            |
|--------|--------------------------------|------------------------|
| `gRPC` | `artela.fee.v1.Query/Params`   | Get the module params  |
| `gRPC` | `artela.fee.v1.Query/BaseFee`  | Get the block base fee |
| `gRPC` | `artela.fee.v1.Query/BlockGas` | Get the block gas used |
| `GET`  | `/artela/fee/v1/params`        | Get the module params  |
| `GET`  | `/artela/fee/v1/base_fee`      | Get the block base fee |
| `GET`  | `/artela/fee/v1/block_gas`     | Get the block gas used |

## CometBFT RPC


CometBFT supports the following RPC protocols:

* URI over HTTP
* JSONRPC over HTTP
* JSONRPC over WebSockets

### Configuration

RPC can be configured by tuning parameters under `[rpc]` section in the
`$CMTHOME/config/config.toml` file or by using the `--rpc.X` command-line
flags.

The default RPC listen address is `tcp://127.0.0.1:26657`.
To set another address, set the `laddr` config parameter to desired value.
CORS (Cross-Origin Resource Sharing) can be enabled by setting
`cors_allowed_origins`, `cors_allowed_methods`, `cors_allowed_headers`
config parameters.

For local RPC node testing, update the `cors_allowed_origins` property under the `[rpc]` section. Add the URL where this OpenAPI document is hosted, for example:

  `cors_allowed_origins = ["http://localhost:8088"]`

Or, if testing from the official documentation site:

  `cors_allowed_origins = ["https://docs.cometbft.com"]`

### Parameters

For parameters expecting strings or byte arrays, you can use quoted strings like "abc" or 0x-prefixed strings such as 0x616263.

Arguments which expect strings or byte arrays may be passed as quoted
strings, like `"abc"` or as `0x`-prefixed strings, like `0x616263`.

### URI/HTTP

A REST-like interface.
```bash
curl localhost:26657/block?height=5
```
### JSONRPC/HTTP

JSONRPC requests can be POST'd to the root RPC endpoint via HTTP.
```bash
curl --header "Content-Type: application/json" --request POST --data '{"method": "block", "params": ["5"], "id": 1}' localhost:26657
```
Artela Betanet example:
```bash
curl --header "Content-Type: application/json" --request POST --data '{"method": "block", "params": ["5"], "id": 1}' 47.251.14.47:26657
```
### JSONRPC/WebSockets

JSONRPC requests can also be made via WebSockets.
The WebSocket endpoint is located at `/websocket`, e.g. `localhost:26657/websocket`.
Asynchronous RPC functions like event `subscribe` and `unsubscribe` are
available only via websockets.

For example using the [websocat](https://github.com/vi/websocat) tool, you can subscribe for 'NewBlock` events
with this command:
```bash
echo '{ "jsonrpc": "2.0","method": "subscribe","id": 0,"params": {"query": "tm.event='"'NewBlock'"'"} }' | websocat -n -t ws://127.0.0.1:26657/websocket
```

**List of Available APIs:** [Cometbft APIs](https://docs.cometbft.com/v0.38/rpc/#/Info)
