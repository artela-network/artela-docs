---
sidebar_position: 7
---

# System Call

In the world of Aspect, a "system call" is a mechanism that triggers the execution of a specific system module, which we'll refer to as "Module". Each Module can have its own internal states, known as "Module States". The way a Module changes over time can be understood as follows: The Module States at a future moment are determined by a system call applied to the Module States at a current moment along with the input to that system call.

Every system call has its unique input, referred to as "System Call Input". If a Module maintains state information, the relevant system call will be responsible for managing the transition of that Module's state. Modules play a key role in interacting with the core functionalities of the system. For example, at a certain point after the execution of the Ethereum Virtual Machine (EVM), a system call might enable Aspect to create a "just-in-time" call. This call could then be executed either at the end of the current contract call or before the current contract call. Essentially, system calls serve as the communication channel between Aspect and the node.

## Categories of System Calls

Based on their functions, system calls can be categorized as follows:

**Transaction Management System Calls**: These empower Aspects to create and queue transactions that are executed just-in-time.

**Block Management System Calls**: These allow Aspects to participate in the block-proposing phase.

**Information Maintenance System Calls**: These provide access to information related to the node.

**Communication System Calls**: These enable communication between Aspects, smart contracts, and native modules.

**Protection System Calls**: These permit Aspects to establish and enforce rules governing the transaction lifecycle.

Besides these general categories, specific system calls might be developed for projects like Artela or other blockchain platforms to cater to their unique requirements.

It's important to note that the system call is a "blocking operation". This means that the execution of Aspect pauses and waits for the system call to complete before proceeding. If a system call modifies any persistent state during its operation, it's crucial to ensure consistency between the transaction states and the changes introduced by the system call. This is especially important because transactions can be reversed, which would undo the associated modifications. Additionally, the design of the system call should prioritize thread safety to ensure efficient handling of simultaneous transaction executions.
