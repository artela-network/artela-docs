## Introduction

Elastic block space refers to dynamically scalable block space, providing independent block space with protocol guarantees for dApps with high transaction throughput requirements.

![seventy_p](./img/parallel3.png)

By default, blocks have a limited capacity for public block space. When a dApp applies for independent block space, extra space will be added to the block, and this space will only accommodate transactions related to the dApp's smart contract. When block space expands, validators need to add elastic execution nodes to expand the corresponding processing capacity.

Elastic block space is a scaling mechanism for blockchains, enabling limitless scalability while maintaining interoperability. Scalable networks such as sharded blockchain, appchain networks, layer2, etc., can also provide independent block space, but isolated and block generations are not synchronized. Elastic block space allows dApps with independent block space to interact synchronously through atomic transactions in the same block, avoiding the need for asynchronous cross-chain communication.

When dApp in the Artela network has the need for high scalability, it can subscribe to elastic block space to handle the throughput increase. Elastic block space and native extensions empower dApps in Artela with the extensibility for both scalability and customized functionality.

## Independent block space
Under EVM++, Artela's elastic block space can reach the level of an AppChain: apps have both fixed block space and the ability to customize the chain.

The advantage of Artela is the implementation of a subscription-based model similar to SaaS, where app developers do not need to manage a network but can simply subscribe to independent block space on Artela through transactions. Additionally, through Aspect programming, custom extensions can be dynamically added to the network to achieve chain customization.

## Predictable performance
Unless it is an AppChain or RollApp, applications on any L1/L2 may face the possibility of competing for block space. Especially for scenarios such as DeFi and gaming, stable performance support is required to ensure applications run smoothly. This guarantees that transactions are executed on-chain in a timely manner, ensuring faster transaction processing for critical operations and services, such as liquidation transactions.