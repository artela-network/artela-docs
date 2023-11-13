---
sidebar_position: 2
---

# Transaction Level Aspect

There are two ways to implement a Transaction-level aspect, you can : 
1. implement the `IAspectTransaction` interface 
2. extend the `AbsAspectTransaction` abstract class


### 1.Implement the `IAspectTransaction`

```typescript

import {
    FilterTxCtx,
    IAspectTransaction,
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

### 2.Extend the `AbsAspectTransaction`

```typescript
import {
    AbsAspectTransaction,
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
export class Aspect extends AbsAspectTransaction {
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
}
```


## Description of the methods

### 1. isOwner

```typescript
 isOwner(sender: string): bool
```
#### Description
`isOwner` is the governance account implemented by the Aspect, when any of the governance operation (including [bind](/develop/core-concepts/lifecycle#binding), [unbinding](/develop/core-concepts/lifecycle#unbinding), ...) is made, isOwner method will be invoked to check against the initiator's account to make sure it has the permission.  

#### Parameter
* sender ： account address,like '0x6265617665726275696c642e666666'

#### Output

* (bool) ：if false is returned, the governance operation will be blocked.

#### Example
```typescript
isOwner(sender: string): bool {
    let value = sys.aspect.property.get<string>("owner");
    return value.includes(sender);
}
```

### 2. onContractBinding

```typescript
 onContractBinding(contractAddr: string): bool
```
#### Description

`onContractBinding` is an Aspect lifecycle hook, it will be invoked by Aspect Core when a new smart contract is [binding](/develop/core-concepts/lifecycle#binding) to this Aspect. Aspect can choose whether to allow the binding request or not. The binding request will succeed if onContractBinding returns true, otherwise it will fail.

#### Parameter
* contractAddr ：contract address,like '0x6265617665726275696c642e888888'

#### Output

* (bool) ：if false is returned, the aspect binding will be blocked.

#### Example
```typescript
onContractBinding(contractAddr: string): bool {
    let value = sys.aspect.property.get<string>("binding")
    return !!value.includes(contractAddr);
}
```

### 3. preTxExecute

```typescript
  preTxExecute(ctx: PreTxExecuteCtx): void 
```
#### Description

`preTxExecute` is a join-point which will be invoked before the transaction execution. 

#### Parameter
* ctx ：PreTxExecuteCtx see [detailed](/develop/reference/aspect-lib/tx-level-aspect/pre-tx-execute)

#### Output
 
void 

#### Example
```typescript
preTxExecute(ctx: PreTxExecuteCtx): void {
    let value = "value"
    ctx.aspect.transientStorage<string>("key").set<string>(value);
    let get = ctx.aspect.transientStorage<string>("key").unwrap();
    sys.require(get == value, "Not equal")
}
```

### 4. preContractCall

```typescript
  preContractCall(ctx: PreContractCallCtx): void 
```
#### Description

preContractCall is a join-point which will be invoked before the contract call is executed.

#### Parameter

* ctx ：PreContractCallCtx see [detailed](/develop/reference/aspect-lib/tx-level-aspect/pre-contract-call)

#### Output

 void 

#### Example

```typescript
 preContractCall(ctx: PreContractCallCtx): void  {
    let value = "value"
    ctx.aspect.transientStorage<string>("key").set<string>(value);
    let get = ctx.aspect.transientStorage<string>("key").unwrap();
    sys.require(get == value, "Not equal")  // if false revert evm tx
}
```


### 5. postContractCall

```typescript
   postContractCall(ctx: PostContractCallCtx): void
```
#### Description

postContractCall is a join-point which will be invoked after a contract has finished.

#### Parameter

* ctx ：PostContractCallCtx see [detailed](/develop/reference/aspect-lib/tx-level-aspect/post-contract-call)

#### Output

 void

#### Example
```typescript
 postContractCall(ctx: PostContractCallCtx): void  {
    let value = "value"
    ctx.aspect.transientStorage<string>("key").set<string>(value);
    let get = ctx.aspect.transientStorage<string>("key").unwrap();
    sys.require(get == value, "Not equal")
}
```

### 6. postTxExecute

```typescript
   postTxExecute(ctx: PostTxExecuteCtx): void 
```
#### Description

postTxExecute is a join-point which will be invoked when the transaction execution is finished but state is not committed.

#### Parameter

* ctx ：PostTxExecuteCtx see [detailed](/develop/reference/aspect-lib/tx-level-aspect/post-tx-execute)

#### Output

void, but may impact the regular execution flow of the EVM transaction when coupled with the following methods.
* [sys.require](/develop/reference/aspect-lib/sys-namespace/sys)
* [sys.revert](/develop/reference/aspect-lib/sys-namespace/sys)

#### Example
```typescript
postTxExecute(ctx: PostTxExecuteCtx): void  {
    let value = "value"
    ctx.aspect.transientStorage<string>("key").set<string>(value);
    let get = ctx.aspect.transientStorage<string>("key").unwrap();
    sys.require(get == value, "Not equal")
}
```


### 7. postTxCommit

```typescript
   postTxCommit(ctx: PostTxCommitCtx): void 

```
#### Description

postTxCommit is a join-point which will be invoked after the state of the transaction is committed.

#### Parameter

* ctx ：PostTxCommitCtx see [detailed](/develop/reference/aspect-lib/tx-level-aspect/post-tx-commit)

#### Output

void, Since the switch is executed after the EVM is executed, the following method will print the exception log on the server.
* [sys.require](/develop/reference/aspect-lib/sys-namespace/sys)
* [sys.revert](/develop/reference/aspect-lib/sys-namespace/sys)

#### Example 
```typescript
 postTxCommit(ctx: PostTxCommitCtx): void  {
    let value = "value"
    ctx.aspect.transientStorage<string>("key").set<string>(value);
    let get = ctx.aspect.transientStorage<string>("key").unwrap();
    sys.require(get == value, "Not equal")
}
```




---
For more information on Transaction-level Aspect Perceptions, see Transaction-level Aspect;

* [aspect-programming](/develop/core-concepts/aspect-programming)
* [aspect-lifecycle](/develop/core-concepts/lifecycle)
