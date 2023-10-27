---
sidebar_position: 7
---

# System Call

In Aspect, when a "system call" is activated, it initiates the execution of a specific system module, hereafter referred to as "Module". A Module can maintain its internal states, which we'll term as "Module States" (previously represented as ϖ M). The relationship can be understood as:

Module States at time t+1 = System Call (Module States at time t, System Call Input)

Every system call has its distinct input, termed "System Call Input" (previously ψ i ). If a Module retains state information, the associated system call will oversee the state transition of that Module. Modules are instrumental in interacting with the foundational layer’s capabilities. For instance, a specific point after EVM execution might provide a system call that allows Aspect to generate a "just-in-time" transaction. This transaction would either be executed at the block's end or immediately after the ongoing transaction. System calls bridge the interaction between Aspect and the node.

**System Call Categories**
System calls, based on their functionalities, can be grouped into several categories: transaction management, block management, information maintenance, communication, and protection.

- **Transaction Management System Calls**: These empower Aspects to design and queue just-in-time transactions.

- **Block Management System Calls**: They enable Aspects to be a part of the block-proposing phase.

- **Information Maintenance System Calls**: These offer access to data related to the node.

- **Communication System Calls**: These facilitate communication between Aspects, smart contracts, and native modules.

- **Protection System Calls**: They allow Aspects to set and enforce rules for the transaction lifecycle.

Beyond these categories, individual system calls might be crafted in projects like Artela or other blockchain platforms to meet their bespoke needs.

The system call is a "blocking operation", which means that Aspect's execution halts temporarily and waits for the system call to complete before continuing. If a system call modifies persistent state during its run, it's vital to maintain consistency between transaction states and the alterations introduced by the system call. This is imperative because a transaction can be reversed, negating its linked modifications. Additionally, the architecture of the system call should emphasize thread safety, ensuring smooth management of parallel transaction executions.
