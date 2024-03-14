---
sidebar_position: 0
---

# API Overview

The following API's are recommended for development purposes. For maximum control and reliability it's recommended to
run your own node.

## Public Available Endpoints

Below is a list of publicly available endpoints that you can use to connect to the Artela chain.

| Network | Address                             | Support Client |
|---------|-------------------------------------|----------------|
| TestNet | https://betanet-rpc1.artela.network | ALL            |
| TestNet | https://betanet-rpc2.artela.network | ALL            |

## Clients

The Artela Network supports different clients in order to support Cosmos and Ethereum transactions and queries. You can
use Swagger as a REST interface for state queries and transactions:

| Client                                                     | Description                                                                          | Endpoint | 
|------------------------------------------------------------|--------------------------------------------------------------------------------------|----------|
| [Ethereum JSON-RPC](/develop/client/evm-compatible-apis)   | Query Ethereum-formatted transactions and blocks or send Ethereum txs using JSON-RPC | 8545     |
| [Ethereum Websocket](/develop/client/evm-ws)               | Subscribe to Ethereum logs and events emitted in smart contracts.                    | 8546     |
| [Cosmos gRPC ](/develop/client/cosmos-apis)                | Query or send transactions using gRPC                                                | 9090     |
| [Cosmos REST ](/develop/client/cosmos-apis)                | Query or send transactions using an HTTP RESTful API                                 | 9091     |
| [Cometbft REST ](https://docs.cometbft.com/v0.37/rpc/)     | Query transactions, blocks, consensus state, broadcast transactions, etc.            | 26657    |
| [Cometbft Websocket](https://docs.cometbft.com/v0.37/rpc/) | Subscribe to ComentBft ABCI events.                                                  | 26657    |

