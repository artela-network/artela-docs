---
sidebar_position: 2
---

# Join Point Model


In this section, we provide an overview of the join point model's specifications. Details on its components will be discussed in subsequent sections.

**Aspect**:
The blockchain can be perceived as a state machine driven by transactions. It commences with an initial genesis state and progresses by executing transactions to evolve into its current state. In this context, an "Aspect" can be understood as a stateful program running on the blockchain. Each Aspect maintains its distinct state, termed "Aspect State". As such, a blockchain integrated with Aspect embodies two global state categories: the "World States of Accounts" and the "Aspect States".

When a transaction interacts with an Aspect, it induces a state transition within that Aspect. This transition can be represented as:

Aspect State at time t+1 = State Transition Function (Aspect State at time t, Transaction)

Here, the "State Transition Function" denotes the mechanism allowing the Aspect to compute and store states across different transactions.

**Join Points**:
Join points denote specific stages within the lifecycle of transactions and blocks. Under the join point model, each Aspect must associate itself with a specific join point. At every such point, the linked Aspects get executed. The state transition associated with a join point can be depicted as:

Join Point State Transition = Sequential Execution of Associated Aspects

Only Aspects linked with the smart contract invoked by a particular transaction get executed at a join point. This association, or "binding", is pre-established by the smart contract owner.

**Transaction State Transition**:
In the Ethereum blockchain model, the transition of transaction states is defined by the world state's progression. When integrated with Aspect, a transaction induces transitions in both the world state and the Aspect state. Throughout a transaction's lifecycle, it navigates multiple join points, thus affecting both states.

**Block State Transition**:
In the Ethereum paradigm, the block state transition is defined by a series of transactions within a block. With the integration of Aspect, the model is extended to include an Aspect state. The block state transition, in this enhanced model, governs the global transition of both the world state and the Aspect state. In addition to traditional tasks like validator rewards distribution, the block-finalization state transition function also manages additional operations, such as gas fee settlement.

