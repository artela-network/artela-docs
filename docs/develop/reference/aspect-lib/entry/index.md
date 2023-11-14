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

