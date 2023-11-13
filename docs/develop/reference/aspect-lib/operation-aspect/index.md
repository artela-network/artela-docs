---
sidebar_position: 2
---

# Operation Aspect

To implement a Operation aspect, you can :

* implement the `IAspectOperation` interface

:::note
The block-level aspect is still in beta and may change in the future.
:::

## Implement the `IAspectOperation`

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
export class Aspect implements IAspectOperation {
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


## Methods

### 1. operation

```typescript
 operation(ctx: OperationCtx, data: Uint8Array): Uint8Array

```
#### Description
operation is a Aspect call.

#### Parameter
* ctx ： OperationCtx 
* data : Uint8Array  byte[] format, which is passed in through the input of the transaction, and the input is encoded in a format.

#### Output

* (Uint8Array) ： The result returned to the client.

#### Example
```typescript
  operation(ctx: OperationCtx, data: Uint8Array): Uint8Array {

    sys.log(sys.utils.uint8ArrayToString(data))

    let s = ctx.mutableState.get<string>("k2").unwrap()!

    sys.require(s == "v2", s + "mutableState get fail")

    const stringData = new StringData("test")

    return Protobuf.encode(stringData, StringData.encode);
}

```

---
For more information on Transaction-level Aspect Perceptions, see Transaction-level Aspect;

* [aspect-programming](/develop/core-concepts/aspect-programming)
* [aspect-lifecycle](/develop/core-concepts/lifecycle)
