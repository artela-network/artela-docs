## Design Background

Artela Network's parallel execution solution is ** designed for performance-first EVM-based dApps.** 

Just as using C language doesn't always lead to high-performance code, developers need to master high-performance programming models such as multithreading and asynchronous I/O. The same applies to high-performance programming on the blockchain; even with parallel EVM, unoptimized smart contracts may not execute faster.

Based on past experience, unoptimized contracts running on parallel EVMs can only achieve a 2-4x increase in parallelism. Artela Network aims for more; to allow optimally optimized contracts to achieve higher multiples of improvement.

Thus, predictable parallel execution algorithms and elastic block spaces are differentiating features of Artela. Developers can:

- Write high-performance contracts based on the characteristics of parallel execution.
- Obtain predictable execution performance through elastic block space.

## Focus on Solving Problems

Because the introduction of [EVM++](/main/Artela-Blockchain/EVM++) does not increase conflict rates, it does not conflict with existing parallel EVM solutions. Although existing Parallel EVM solutions are efficient, there are still several issues under Artela's goals:

1. Optimistic execution schemes increase performance with higher optimistic parallelism when transaction conflict rates are high, leading to many transactions needing to be rolled back and re-executed. Therefore, an intelligent prediction algorithm is needed to anticipate conflicting transactions based on execution history, rather than blindly optimistic execution.
2. Full optimistic execution efficiency is not optimal when machine core count is not elastically scalable. For example, transactions with a parallelism of up to 500 still require execution queues on a 32-core machine.
3. Even if transactions are fully parallelized, bottlenecks occur in Merklization and disk read/write performance, making them the biggest weaknesses of the bucket principle, thus affecting overall performance.
4. There is an issue of unpredictable performance; even with parallel execution, when a block contains conflicting transactions that are not friendly to parallel execution, there is still a possibility of competition for block space. Applications requiring predictable performance cannot yet guarantee performance.

## Key Design

Artela's scala-out design consists of parallel execution and elastic computing.

### Parallel Execution

1. **Pre-predictive optimistic grouping execution**: Based on optimistic grouping, predict conflicting transactions in advance. It finds the lowest conflict probability and highest parallelism group closest to machine configuration through LightDAG grouping algorithm based on code analysis, conflict dataset, historical execution process, and other past information.
2. **Double Preloading**: Preload deterministic read-write sets through pessimistic Preloading, and in resource-rich situations, preload potential read-write sets through optimistic Preloading to reduce the execution time of each group using I/O and memory.
![parallel1](./img/parallel1.png)
3. **Optimistic Pipeline**: Similar to asynchronous I/O, transform synchronous blocking waiting sections in the blockchain system into parallel asynchronous execution. For example, block execution begins during consensus voting, rather than waiting for voting to complete before executing blocks. There are many similar synchronous blocking waiting sections, all of which are fully optimized.
![parallel2](./img/parallel2.png)
4. **Art-IAVL**: Artela is developed based on Cosmos SDK, with state based on IAVL implementation. Art-IAVL features fast persistence and is an optimized version for Merklization and I/O. The core achieves fast persistence through memory submission, WAL, and asynchronous flushing.

### Elastic computing

1. **Elastic Computing**: Validator nodes support horizontal scaling, where the network automatically adjusts the computation node of validators based on the current network load or subscription. The scaling process is coordinated by an elastic protocol, ensuring sufficient elastic computation nodes in the consensus network.
2. **Elastic Block Space**: Based on elastic computing, in addition to expanding the public block space, large-scale dApps with independent block space requirements can apply for dedicated elastic block space in the network.

## Learn more

* [Elastic block space](/main/Artela-Blockchain/Elastic%20Block%20Space)