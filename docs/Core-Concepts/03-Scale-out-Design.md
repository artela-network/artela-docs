# Scale-out Design

Artela's Scale-out architecture will be designed around the characteristics of the Artela network, combined with the chain-native pattern, which brings dApps an experience of an endless network, with extensible functionality and expandable block space, while maintaining native composability with other dApps in the network.

## Overview

Within the Artela network, scalability will be improved through elastic computing, with the following technical features:

- **Parallel Execution:** Transactions on Artela can be executed in parallel. The logic is similar to most parallel transaction execution algorithms, which group transactions for parallel execution based on transaction dependency conflict analysis.
- **Elastic Computing:** Validator nodes support horizontal scaling, where the network automatically adjusts the computation node of validators based on the current network load or subscription. The scaling process is coordinated by an elastic protocol, ensuring sufficient elastic computation nodes in the consensus network.
- **Elastic Block Space:** Based on elastic computing, in addition to expanding the public block space, complex dApps with independent block space requirements can apply for dedicated elastic block space in the network.

## Elastic block space

---

Elastic block space refers to dynamically scalable block space, providing independent block space with protocol guarantees for dApps with high transaction throughput requirements.

By default, blocks have a globally limited capacity for block space. When a dApp applies for independent block space, extra space will be added to the block, and this space will only accommodate transactions related to the dApp's smart contract. When block space expands, validators also need to increase elastic execution nodes to expand the corresponding processing capacity, ensuring that blocks can still be executed in the same time frame.

Elastic block space is a scaling mechanism for smart contract blockchain networks, bringing multi-chain network-level scalability to the Artela blockchain while maintaining atomic transactions between smart contracts. Some scalable networks, such as multi-chain networks, sharded blockchain networks, Layer2, etc., can also provide independent block space for dApps, but their blocks are isolated and block generations are also not synchronized with each other. This leads to the use of cross-chain methods for interoperation between smart contracts located in different blocks, which is an asynchronous distributed transaction method. Elastic block space allows dApps with independent block space to interact synchronously through atomic transactions in the same block, without the need for asynchronous cross-chain communication.

When a protocol grows in the Artela network, it can subscribe to Elastic Block Space to handle high-speed growth of protocol users and throughput. Combined with chain-native, it brings dApps a truly endless network experience, with scalable functionality and expandable block space, while maintaining native composability with other dApps in the network.