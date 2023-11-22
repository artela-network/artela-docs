---
sidebar_position: 2
---

# Block Level Aspect

## Introduction

The block level Aspect is oriented to all blocks, and the logic of all block level Aspect is executed at the [BeginBlock](https://docs.cosmos.network/v0.47/learn/advanced/baseapp#beginblock) and [EndBlock](https://docs.cosmos.network/v0.47/learn/advanced/baseapp#endblock).  
The block-level aspect is still in `beta` and may change in the future, please do not use it for production.

## How to Create

To implement a Block-level aspect, you can implement the `IAspectBlock` interface


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
export class Aspect implements IAspectBlock {
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


## Description

Next, we will provide a detailed description of each method in the `IAspectBlock` interface. You can click on the links associated with each method name to access more detailed information. It is recommended to have a prior understanding of the concept of [Join points](/develop/core-concepts/join-point).


1. IsOwner
>It is the governance account implemented by the Aspect, when any of the governance operation (
>including [bind](/develop/core-concepts/lifecycle#binding), [unbinding](/develop/core-concepts/lifecycle#unbinding), ...)
>is made, isOwner method will be invoked to check against the initiator's account to make sure it has the permission.

2. OnBlockInitialize
>The onBlockInitialize join-point is activated prior to the preparation of a new block proposal, creating a window for the execution of automated transactions and enabling the seamless insertion of such transactions at this stage.

3. OnBlockFinalize
>The onBlockFinalize join-point is triggered following the official completion of a block, providing an opportunity for the Aspect to initiate an asynchronous task. This, in turn, facilitates the execution of the task in a subsequent block.



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
---

### 2. onBlockInitialize

```typescript
   onBlockInitialize(ctx: OnBlockInitializeCtx): void
```
#### Description

 `onBlockInitialize` is a join-point which will be invoked when a new block proposal is prepared.

#### Parameter

* ctx ：OnBlockInitializeCtx see [detailed](/develop/reference/aspect-lib/block-level-aspect/block-final)

#### Output

void

#### Example

```typescript
 onBlockInitialize(ctx: PreContractCallCtx): void  {
    let value = "value"
    ctx.aspect.transientStorage<string>("key").set<string>(value);
    let get = ctx.aspect.transientStorage<string>("key").unwrap();
    sys.require(get == value, "Not equal")  // if false revert evm tx
}
```
---

### 3. onBlockFinalize

```typescript
  onBlockFinalize(ctx: OnBlockFinalizeCtx): void 
```
#### Description

`onBlockFinalize` is a join-point which will be invoked when a block proposal has been finalized.

#### Parameter
* ctx ：OnBlockFinalizeCtx see [detailed](/develop/reference/aspect-lib/block-level-aspect/block-init)

#### Output

void

#### Example
```typescript
onBlockFinalize(ctx: OnBlockFinalizeCtx): void {
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
