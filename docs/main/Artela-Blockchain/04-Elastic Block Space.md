## Introduction

Elastic Block Space refers to a dynamically scalable block space that provides independent and protocol-guaranteed block space for dApps with high transaction throughput needs.

![seventy_p](./img/parallel3.png)

Typically, blocks are constrained by a fixed public block space capacity. When a dApp requires more room due to high activity, it can apply for dedicated block space. This additional space is integrated into the block and is exclusively used for the dApp’s transactions. As block space increases, validators must scale "up" by adding elastic execution nodes to handle the enhanced processing load.

Elastic block space is a pivotal blockchain scaling mechanism, facilitating limitless scalability while ensuring interoperability. Unlike other scalable networks such as sharded blockchains, appchain networks, and Layer 2 solutions—which provide independent block spaces but suffer from isolation and unsynchronized block generation—elastic block space enables dApps with dedicated block spaces to conduct synchronous interactions through atomic transactions within the same block, circumventing the complexities of asynchronous cross-chain communications.

When a dApp in the Artela network demands high scalability, it can subscribe to elastic block space to manage the increase in transaction volume. This functionality, combined with native extensions, grants dApps on Artela enhanced scalability and customization potential.

## Independent block space

With EVM++, Artela's elastic block space extends to the level of an AppChain, allowing applications to enjoy both a fixed block space and chain customization capabilities. Artela adopts a subscription-based model akin to SaaS - app developers can easily subscribe to independent block space through transactions without the need to manage a network infrastructure. Furthermore, through Aspect programming, developers can dynamically introduce custom extensions, enabling tailored chain functionalities.

## Predictable performance

In typical L1/L2 environments, applications may compete for block space, potentially impacting performance - particularly in critical areas like DeFi and gaming that require stable operational support. Artela’s approach ensures that applications have guaranteed timely on-chain execution, facilitating faster transaction processing for essential operations such as liquidations.
