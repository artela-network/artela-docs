---
sidebar_position: 2
---

# Join Point Model


## Understanding Aspects

Think of the blockchain as a state machine, powered by transactions. It starts from an initial genesis state and evolves by executing transactions, leading to its current state. Within this framework, an "Aspect" is essentially a stateful program that runs on the blockchain. Each Aspect has its own unique state, which we'll refer to as the "Aspect State". Consequently, a blockchain that incorporates Aspects has two main types of global states: the "World States of Accounts" and the "Aspect States".

Whenever a transaction interacts with an Aspect, it triggers a change in that Aspect's state. We can describe this change as the Aspect State at a future moment being equal to a State Transition Function applied to the Aspect State at a current moment and the transaction.

The "State Transition Function" is the process that enables the Aspect to calculate and update states across different transactions.

## Join Points Explained

Join points are specific moments within the life cycle of transactions and blocks. In the join point model, each Aspect is linked to a particular join point. At these points, the connected Aspects are executed. The state change linked with a join point can be seen as the sequential execution of the Aspects associated with it.

It's important to note that only Aspects connected to the smart contract activated by a particular transaction are executed at a join point. This connection, or "binding", is predetermined by the smart contract owner.

## Transaction State Transition

In the context of the Ethereum blockchain, the transition of transaction states is characterized by the evolution of the world state. When Aspect is integrated, a transaction leads to changes in both the world state and the Aspect state. Throughout its life cycle, a transaction passes through multiple join points, influencing both of these states.

## Block State Transition

In Ethereum, the transition of a block's state is determined by the sequence of transactions within that block. With Aspect integration, this model is expanded to include an Aspect state. The block state transition, in this augmented model, oversees the overall transition of both the world state and the Aspect state. Apart from traditional roles like distributing validator rewards, the block-finalization state transition function also handles additional tasks such as settling gas fees.
