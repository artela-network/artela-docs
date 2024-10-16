---
id: index
title: Endpoints
---

The Artela blockchain provides several types of RPC endpoints that allow developers and users to interact with the network. These endpoints offer access to essential blockchain data, such as account balances, transactions, block details, and real-time events. Depending on your use case—whether you're building dApps, querying Cosmos state, or subscribing to live events—you can choose the appropriate RPC interface.

Below is an overview of the available RPCs supported by Artela and their typical use cases.

## Available RPCs

1. [JSON-RPC](https://ethereum.org/en/developers/docs/apis/json-rpc/)

    - Default Port: 8545  
    - Standard RPC interface for interacting with EVM-compatible blockchains (e.g., Ethereum, Artela).  
    - Supports querying blocks, transactions, and account balances.

2. [WebSocket (WS)](https://ethereum.org/en/developers/tutorials/using-websockets/)

    - Default Port: 8546  
    - WebSocket endpoints offer real-time updates by maintaining persistent connections between clients and blockchain nodes.  
    - Useful for event subscriptions and new block notifications.

3. [Cosmos REST API](https://docs.cosmos.network/main/learn/advanced/grpc_rest#rest-server)

    - Default Port: 1317  
    - Exposes Cosmos blockchain state via HTTP endpoints.  
    - Useful for querying account balances, staking info, validators, and governance proposals.

4. [Cosmos gRPC](https://docs.cosmos.network/main/learn/advanced/grpc_rest#grpc-server)

    - Default Port: 9090  
    - Provides high-performance access to Cosmos chain data and services (e.g., auth, bank, staking).  
    - Ideal for real-time interaction with nodes.

5. [CometBFT RPC](https://docs.cosmos.network/main/learn/advanced/grpc_rest#cometbft-rpc)

    - Default Port: 26657  
    - CometBFT (formerly Tendermint) RPC is essential for querying consensus-related data like validators, blocks, and node health.  
    - Exposes critical endpoints for light clients, block explorers, and validators to interact with the consensus layer.
