---
sidebar_position: 2
---

# Transaction Level Aspect

## Introduction

The Transaction Level Aspect defines multiple Join Points, with each one representing a distinct state transition
function at a specific stage in the [transaction lifecycle](/develop/core-concepts/lifecycle),
it needs to be binding a smart contract and activated by EOA transactions.

![img.png](../img/jp.png)

The current transaction is delivered to the Evm module, and Transactions are applied according to Geth's execution
logic `ApplyTransaction` ⮕ `ApplyMessage` ⮕ `evm. Call`, In this process, additional Join Points are executed, and the
process is shown in the following call graph.

* `ApplyTransaction`
    * ⮕ `ApplyMessageWithConfig`
        * ⚙ [PreTxExecute join point](/develop/reference/aspect-lib/tx-level-aspect/pre-tx-execute)
        * ⮕ `evm.Call`
            * ⮕ `loop opCodes`
                * | ⚙ [PreContractCall join point](/develop/reference/aspect-lib/tx-level-aspect/pre-contract-call)
                * | `evm.Interpreter.Run`
                * | ⚙ [PostContractCall join point](/develop/reference/aspect-lib/tx-level-aspect/post-contract-call)
                *
                * | ⚙ [PreContractCall join point](/develop/reference/aspect-lib/tx-level-aspect/pre-contract-call)
                * | `evm.Interpreter.Run`
                * | ⚙ [PostContractCall join point](/develop/reference/aspect-lib/tx-level-aspect/post-contract-call)
                * ....
                *
        * ⚙ [PostTxExecute join point](/develop/reference/aspect-lib/tx-level-aspect/post-tx-execute)
    * ⚙ [PostTxCommit join point](/develop/reference/aspect-lib/tx-level-aspect/post-tx-commit)
    * ⮕ `RefundGas`

## How to Create

Implement the `IAspectTransaction` interface

```typescript

import {
    IAspectTransaction,
    FilterTxCtx,
    PostContractCallCtx,
    PostTxCommitCtx,
    PostTxExecuteCtx,
    PreContractCallCtx,
    PreTxExecuteCtx
} from "@artela/aspect-libs";

/**
 * There are two types of Aspect: Transaction-Level Aspect and Block-Level Aspect.
 * Transaction-Level Aspect will be triggered whenever there is a transaction calling the bound smart contract.
 * Block-Level Aspect will be triggered whenever there is a new block generated.
 *
 * An Aspect can be Transaction-Level, Block-Level,IAspectOperation or both.
 * You can implement corresponding interfaces: IAspectTransaction, IAspectBlock,IAspectOperation or both to tell Artela which
 * type of Aspect you are implementing.
 */
export class Aspect implements IAspectTransaction {
    /**
     * isOwner is the governance account implemented by the Aspect, when any of the governance operation
     * (including upgrade, config, destroy) is made, isOwner method will be invoked to check
     * against the initiator's account to make sure it has the permission.
     *
     * @param ctx context of Aspect state
     * @param sender address of the operation initiator
     * @return true if check success, false if check fail
     */
    isOwner(sender: string): bool {
        // always return false on isOwner can make the Aspect immutable
        return false;
    }

    /**
     * onContractBinding is an Aspect lifecycle hook, it will be invoked by Aspect Core when
     * a new smart contract is binding to this Aspect. Aspect can choose whether to allow the
     * binding request or not. The binding request will succeed if onContractBinding returns true,
     * otherwise it will fail.
     *
     * @param ctx context of Aspect state
     * @param contractAddr address of the smart contract to binding with current Aspect
     * @return true if binding succeed, otherwise false
     */
    onContractBinding(contractAddr: string): bool {
        return true;
    }


    /**
     * preTxExecute is a join-point which will be invoked before the transaction execution.
     *
     * @param ctx context of the given join-point
     * @return result of Aspect execution
     */
    preTxExecute(ctx: PreTxExecuteCtx): void {
        // Implement me...
    }

    /**
     * preContractCall is a join-point which will be invoked before the contract call is executed.
     *
     * @param ctx context of the given join-point
     * @return result of Aspect execution
     */
    preContractCall(ctx: PreContractCallCtx): void {
        // Implement me...
    }

    /**
     * postContractCall is a join-point which will be invoked after a contract has finished.
     *
     * @param ctx context of the given join-point
     * @return result of Aspect execution
     */
    postContractCall(ctx: PostContractCallCtx): void {
        // Implement me...
    }

    /**
     * postTxExecute is a join-point which will be invoked when the transaction execution is finished but state is not committed.
     *
     * @param ctx context of the given join-point
     * @return result of Aspect execution
     */
    postTxExecute(ctx: PostTxExecuteCtx): void {
        // Implement me...
    }

    /**
     * onTxCommit is a join-point which will be invoked after the state of the transaction is committed.
     *
     * @param ctx context of the given join-point
     * @return result of Aspect execution
     */
    postTxCommit(ctx: PostTxCommitCtx): void {
        // Implement me...
    }
}

```

## Description

Next, we will provide a detailed description of each method in the IAspectTransaction interface. You can click on the links associated with each method name to access more detailed information. It is recommended to have a prior understanding of [the concept of Joinpoints](/develop/core-concepts/join-point).

1. IsOwner
>It is the governance account implemented by the Aspect, when any of the governance operation (
>including [bind](/develop/core-concepts/lifecycle#binding), [unbinding](/develop/core-concepts/lifecycle#unbinding), ...)
>is made, isOwner method will be invoked to check against the initiator's account to make sure it has the permission.

2. OnContractBinding
> It is an Aspect lifecycle hook, it will be invoked by Aspect Core when a new smart contract 
> is [binding](/develop/core-concepts/lifecycle#binding) to this Aspect. Aspect can choose whether to allow the binding
> request or not. The binding request will succeed if onContractBinding returns true, otherwise it will fail.

3. FilterTx
> Triggered when the RPC server receives this transaction, please note this join-point is outside consensus, so Aspect state is not allowed to be modified here.  
> This join point still **in beta** and may be changed in the future, so it is not recommended for production.

4. [PreTxExecute](/develop/reference/aspect-lib/tx-level-aspect/pre-tx-execute)
> Triggered prior to the transaction execution. At this stage, the account state remains pristine, allowing Aspect to preload information as necessary.

5. [PreContractCall](/develop/reference/aspect-lib/tx-level-aspect/pre-contract-call)
> Triggered before the execution of the cross-contract call. For example, during a TX execution, Uniswap contract calls into Maker contract, the Aspect will be executed.

6. [PostContractCall](/develop/reference/aspect-lib/tx-level-aspect/post-contract-call)
> Triggered after the cross-contract call is executed. The Aspect can then inspect the post-call state of the contract and make subsequent execution decisions.

7. [PostTxExecute](/develop/reference/aspect-lib/tx-level-aspect/post-tx-execute)
> Activated once the transaction has been executed and the account states have been finalized. Subsequently, Aspect can conduct a comprehensive review of the final execution state.

8. [PostTxCommit](/develop/reference/aspect-lib/tx-level-aspect/post-tx-commit)
> Triggered after the transaction has been finalized, and the modified states induced by the transaction have already been flushed into the state database. At this stage, Aspect can conduct post-processing activities, such as initiating an asynchronous task that can be executed in a future block.

