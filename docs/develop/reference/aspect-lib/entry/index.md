# Entry

> Class `Entry` is the entry of all JoinPoint calls, which is responsible for routing and forwarding, parameter encoding
> and decoding, and permission judgment.

### Methods

#### 1. Check Block Level Aspect

<!-- @formatter:off -->
```typescript
    public isBlockLevel(): i32
```
<!-- @formatter:on -->

* return
    * i32: bool value of is Block Level，Returns this value after the pointer address of the memory store.

#### 2. Check Transaction Level Aspect

<!-- @formatter:off -->
```typescript
      public isTransactionLevel(): i32 
```
<!-- @formatter:on -->

* return
  * i32: bool value of is Block Level，Returns this value after the pointer address of the memory store.


#### 3. Join Point Execute

<!-- @formatter:off -->
```typescript
    public execute(methodPtr: i32, argPtr: i32): i32
```
<!-- @formatter:on -->
* Parameter
  * methodPtr：i32, method name pointer address of the memory store.
  * argPtr: i32，arguments pointer address of the memory store. 
    * Transaction level type: <a href="/docs/classes/proto.EthTxAspect.html" target="_blank">EthTxAspect</a>
    * Block level type: <a href="/docs/classes/proto.EthBlockAspect.html" target="_blank">EthBlockAspect</a>
* Return
  * i32: bool value of is Block Level，Returns this value after the pointer address of the memory store.
  
### Wasm Export

>important：You need to export the entry method as the entry point for Aspect.

```typescript

import {Entry} from "@artela/aspect-libs";
import {Aspect} from "./aspect/aspect";

const aspect = new Aspect();
const entry = new Entry(aspect, aspect, aspect);

export function execute(methodPtr: i32, argPtr: i32): i32 {
    return entry.execute(methodPtr, argPtr);
}

export function isBlockLevel(): i32 {
    return entry.isBlockLevel();
}

export function isTransactionLevel(): i32 {
    return entry.isTransactionLevel();
}

export function allocate(size: i32): i32 {
    return heap.alloc(size) as i32;
}
```
