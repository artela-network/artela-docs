---
sidebar_position: 2
---
# Aspect Library

A library for writing aspect to be deployed to Artela，The `aspect-libs` provides Host APIs to interact with the Aspect runtime, with this set of APIs, you can access blockchain data, smart
contracts, cryptographic functions, invoking system calls and more. 

## Installation

```sh
npm install --dev @artela/aspect-libs # NPM
yarn add --dev @artela/aspect-libs    # Yarn
```

## Usage

Once installed, you can implement Transaction Level Aspect、Block Level Aspect Or Operation Aspect：

### Transaction Level Aspect

```typescript
import {
    FilterTxCtx,
    IAspectTransaction,
    PostContractCallCtx,
    PostTxCommitCtx,
    PostTxExecuteCtx,
    PreContractCallCtx,
    PreTxExecuteCtx,
    sys
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
     * filterTx is a join-point which will be invoked when the mem pool first
     * received the transaction. Since it is a join-point outside the consensus stage,
     * so at this join-point, no state or context can be persisted.
     *
     * @param ctx context of the given join-point
     * @return result of Aspect execution,if false drop tx in mempool
     */
    filterTx(ctx: FilterTxCtx): bool {
        return true
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

### Block Level Aspect
```typescript
import {
    IAspectBlock,
    OnBlockFinalizeCtx,
    OnBlockInitializeCtx,
    sys
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
export class Aspect implements  IAspectBlock {
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
     * onBlockFinalize is a join-point which will be invoked when a block proposal has been finalized.
     *
     * @param ctx context of the given join-point
     * @return result of Aspect execution
     */
    onBlockFinalize(ctx: OnBlockFinalizeCtx): void {
        // Implement me...
    }


    /**
     * onBlockInitialize is a join-point which will be invoked when a new block proposal is prepared.
     *
     * @param ctx context of the given join-point
     * @return result of Aspect execution
     */
    onBlockInitialize(ctx: OnBlockInitializeCtx): void {
        // Implement me...
    }
    
}

```


### Operation Aspect

```typescript
import {
    IAspectOperation,
    OperationCtx,
    sys
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
export class Aspect implements  IAspectOperation {
   

    /**
     * operation is a Aspect call.
     *
     * @param ctx  tx input
     * @return result of operation execution
     */
    operation(ctx: OperationCtx, data: Uint8Array): Uint8Array {
        // Implement me...
        return new Uint8Array(0);
    }
}

```