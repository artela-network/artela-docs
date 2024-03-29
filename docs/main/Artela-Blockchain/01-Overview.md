---
id: artela-blockchain
slug: /Artela-Blockchain
---
# Overview

Artela Blockchain is a layer 1 network that empowers developers to add user-defined native extensions and build feature-rich dApps. It offers extensibility that goes beyond EVM-equivalence, inter-domain interoperability, and boundless scalability with its Elastic Block Space design.

As the first layer 1 network equipped with Aspects, Artela network aims to **maximize the value of Aspect and enable developers to build feature-rich dApps.**

---

## Architecture Overview

 ![fifty_p](./img/2.png)

- **Base Layer:** Provide basic functions, including consensus engine, networking, EVM environments for the smart contract execution, and WASM environments for the Aspects execution. This layer is launched by Artela.

- **Extension Layer:** Provide the Aspect SDK. Developers are able to build Aspects. Aspects have access to all APIs within the base layer and can be freely combined with smart contracts and other Aspects. Aspect is securely isolated from Base Layer, ensuring that it has no impact on the security or availability of the core network.

- **Application Layer:** Developers can build smart contracts as usual. Initially, EVM will be provided for the seamless landing of most dApps in crypto.

## Core Characteristics

Artela aspires to be a truly boundless blockchain network:

- **Boundless Extensibility** — EVM-equivalence but not limited to EVM, enabling the native extension of blockchain base layer.

- **Boundless Composability** — Fully customizable and compatible with heterogeneous modular stacks, while maintaining native interoperability within the network.

- **Boundless Scalability** — By leveraging elastic block space design, Artela network can accommodate a great number of large-scale dApps that demand independent block spaces. This eliminates the need to abandon shared security in exchange for scalability performance.

## Scale-out Design

Artela's scale-out architecture will be designed around the characteristics of the Artela network. It brings dApps extensible functionality and expandable block space, while maintaining native composability with other dApps in the network.

Within the Artela network, dynamic scalability will be guaranteed through elastic computing, with the following technical features:

- **Parallel Execution:** Transactions on Artela can be executed in parallel. Artela network groups transactions for parallel execution based on transaction dependency conflict analysis.
- **Elastic Computing:** Validator nodes support horizontal scaling, where the network automatically adjusts the computation node of validators based on the current network load or subscription. The scaling process is coordinated by an elastic protocol, ensuring sufficient elastic computation nodes in the consensus network.
- **Elastic Block Space:** Based on elastic computing, in addition to expanding the public block space, large-scale dApps with independent block space requirements can apply for dedicated elastic block space in the network.

## Elastic Block Space

Elastic block space refers to dynamically scalable block space, providing independent block space with protocol guarantees for dApps with high transaction throughput requirements.

By default, blocks have a limited capacity for public block space. When a dApp applies for independent block space, extra space will be added to the block, and this space will only accommodate transactions related to the dApp's smart contract. When block space expands, validators need to add elastic execution nodes to expand the corresponding processing capacity.

Elastic block space is a scaling mechanism for blockchains, enabling limitless scalability while maintaining interoperability. Scalable networks such as sharded blockchain, appchain networks, layer2, etc., can also provide independent block space, but isolated and block generations are not synchronized. Elastic block space allows dApps with independent block space to interact synchronously through atomic transactions in the same block, avoiding the need for asynchronous cross-chain communication.

When dApp in the Artela network has the need for high scalability, it can subscribe to elastic block space to handle the throughput increase. Elastic block space and native extensions empower dApps in Artela with the extensibility for both scalability and customized functionality.
