# Scale-out Design

Artela's Scale-out feature will be designed around the characteristics of the Artela network.

1. How to address the increased computational burden on validation nodes when adding a new Aspect.
2. How can Artela as a monolithic chain support more dApps (combining Aspect + Smart Contract dApps).

## Overview

Artela's scale-out is achieved through elastic computing within the blockchain network, which is guaranteed by the protocol. This is achieved through the following design elements.

- **Parallel execution:** Transactions on Artela can be executed in parallel, and the principle is similar to most parallel transaction execution algorithms. Transactions are grouped and executed in parallel based on their dependency conflicts.
- **Elastic computing:** When the network load reaches a certain level, the network can request that participating validators expand their computing shard nodes to horizontally scale processing power and complete block space expansion.
- **Elastic protocol:** The elastic protocol is used to coordinate validator consensus on expansion proposals. After reaching consensus on expansion proposals, validators must deploy additional computing nodes and evaluate expansion reports during consensus, and govern nodes that do not comply with expansion protocols.
- **Elastic block space:** In addition to expanding the public block space, based on the elastic protocol, large dApps that have independent block space requirements can subscribe to dedicated elastic block spaces.
- **DA protocol:** To address the problem of large blocks caused by elastic scaling, the DA protocol, which can operate independently, is used to reduce the load on full nodes and support a node architecture design where computing and storage are separate and relied on by elastic computing.

## Elastic block space

---

Elastic block space refers to dynamic block space expansion and contraction, providing independent block space with protocol guarantees for dApps that require high transaction throughput.

By default, blocks have a globally limited capacity for block space. When a dApp subscribes to independent block space, the block will add this block space to only accommodate transactions related to that dApp's smart contracts. When block space is expanded, validators also need to correspondingly increase elastic execution nodes to expand processing power to ensure that blocks can still be executed within the same time frame.

**Elastic block space is an extension mechanism for smart contract blockchain networks, providing monolithic blockchains with the scalability of multi-chain systems while maintaining atomic transactions between smart contracts.** Some scalable networks, such as multi-chain networks, sharded blockchain networks, Layer2, etc., can also provide dApps with independent block spaces, but their blocks are isolated from each other and block generation is not synchronous, which leads to the need for cross-chain methods for interoperability between smart contracts in different blocks, which is an asynchronous distributed transaction method. Elastic block space eliminates barriers between dApps with independent block spaces, allowing synchronous interoperability through atomic transactions within the same block, without the need for asynchronous cross-chain interoperability.