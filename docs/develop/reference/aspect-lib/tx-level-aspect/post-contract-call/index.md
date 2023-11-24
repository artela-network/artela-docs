
# PostContractCall

## Introduction

The PostContractCall join point occurs during the `DeliverTx` phase of
the [Transaction lifecycle](https://docs.cosmos.network/v0.47/learn/beginner/tx-lifecycle).
This join point will be triggered after the cross-contract call is executed. Below is `evm call` graph:

* `ApplyTransaction`
  * ⮕ `ApplyMessageWithConfig`
    * ⮕ `evm.Call`
      * ⮕ `loop opCodes`
        * | ⚙ [PreContractCall join point](/develop/reference/aspect-lib/tx-level-aspect/pre-contract-call)
        * | `evm.Interpreter.Run 0`
        * | ⚙ [PostContractCall join point](/develop/reference/aspect-lib/tx-level-aspect/post-contract-call)
        *
        * | ⚙ [PreContractCall join point](/develop/reference/aspect-lib/tx-level-aspect/pre-contract-call)
        * | `evm.Interpreter.Run 1`
        * | ⚙ [PostContractCall join point](/develop/reference/aspect-lib/tx-level-aspect/post-contract-call)
        * ....
        *
  * ⮕ `RefundGas`

At this stage, the join point has the capability to examine the post-call state of the contract, enabling it to make
informed decisions for subsequent execution.

## Example

```typescript
   postContractCall(ctx:postContractCallCtx):void {
    let value = "value"
    ctx.aspect.transientStorage<string>("key").set<string>(value);
    let get = ctx.aspect.transientStorage<string>("key").unwrap();
    sys.require(get == value, "Not equal")  // if false revert evm tx
  }
```
## Programming

There are two programming modes that can be used in this method:
1. Using the 'sys' namespace, it provides low-level API access to system data and contextual information generated during blockchain runtime, including details about the environment, blocks, transactions, and utility classes such as crypto and ABI encoding/decoding. see [more details](/develop/reference/aspect-lib/components/overview).
2. By utilizing the 'ctx' input argument, it provides essential insights into transactions and block processing, encompassing smart contract state updates, logged events, and raw transaction data. see [how to use ctx](#how-to-use-ctx).

whatever,the two methods can be used interchangeably.

**Important point**: Since the join point is in the EVM execution process, using [sys.revert()](/develop/reference/aspect-lib/components/sys#1-revert), [sys.require()](/develop/reference/aspect-lib/components/sys#3-require) in this join point will actually revert the transaction.

## How to use `ctx`

### 1. get transaction
> Get the currently executed transaction.
>
<!-- @formatter:off -->
```typescript
    let transaction = ctx.tx.content.unwrap()!
```
<!-- @formatter:on -->

* Returns
  * <a href="/api/docs/classes/proto.EthTransaction.html" target="_blank">EthTransaction</a>

### 2. get transaction properties

> Get transaction extension properties

<!-- @formatter:off -->
```typescript
    let popVal = ctx.tx.extProperties.property.get("xx");
```
<!-- @formatter:on -->

* Parameter
  * key: Properties keys, default key list:
    * `txIndex` get transaction index in block.
* Returns
  * string

### 3. get transaction gas meter
> Get transaction gas meter
>
<!-- @formatter:off -->
```typescript
    let gasMeter = ctx.tx.gasMeter.unwrap()!
```
<!-- @formatter:on -->

* Returns
  * <a href="/api/docs/classes/proto.GasMeter.html" target="_blank">GasMeter</a>

### 4. get block gas meter

>Get block gas meter

<!-- @formatter:off -->
```typescript
    let meter = ctx.block.gasMeter.unwrap();
```
<!-- @formatter:on -->

* Returns
  * <a href="/api/docs/classes/proto.GasMeter.html" target="_blank">GasMeter</a>

### 5. get block header

> Get the block header.

<!-- @formatter:off -->
```typescript
    let header = ctx.block.header.unwrap();
```
<!-- @formatter:on -->

* Returns
  * <a href="/api/docs/classes/proto.EthBlockHeader.html" target="_blank">EthBlockHeader</a>

### 6. get block min gas price

> Get the block min gas price.

<!-- @formatter:off -->
```typescript
    let minGasPrice = ctx.block.minGasPrice.unwrap();
```
<!-- @formatter:on -->

* Returns
  * <a href="/api/docs/classes/proto.MinGasPrice.html" target="_blank">MinGasPrice</a>

### 7. get block last commit

> Get the block last commit info.

<!-- @formatter:off -->
```typescript
    let lastCommit = ctx.block.lastCommit.unwrap();
```
<!-- @formatter:on -->

* Returns
  * <a href="/api/docs/classes/proto.LastCommitInfo.html" target="_blank">LastCommitInfo</a>

### 8. get block partial tx

> Get partial body that have same tx.To

<!-- @formatter:off -->
```typescript
    let txs = ctx.block.partialBody.unwrap();
```
<!-- @formatter:on -->

* Returns
  * <a href="/api/docs/classes/proto.EthTxArray.html" target="_blank">EthTxArray</a>

### 9. get environment

> Get environment content.

<!-- @formatter:off -->
```typescript
   let envContent = ctx.env.baseFee.unwrap();
```
<!-- @formatter:on -->

* Returns
  * <a href="/api/docs/classes/proto.EnvContent.html" target="_blank">EnvContent</a>

### 10. get chain config

> Get chain config

<!-- @formatter:off -->
```typescript
   let chainConfig = ctx.env.chainConfig.unwrap();
```
<!-- @formatter:on -->

* Returns
  * <a href="/api/docs/classes/proto.ChainConfig.html" target="_blank">ChainConfig</a>

### 11. get evm params

> Get evm params

<!-- @formatter:off -->
```typescript
    let evmParams = ctx.env.evmParams.unwrap();
```
<!-- @formatter:on -->

* Returns
  * <a href="/api/docs/classes/proto.EvmParams.html" target="_blank">EvmParams</a>

### 12. get consensus params

> Get consensus params

<!-- @formatter:off -->
```typescript
    let ConsParams = ctx.env.consensusParams.unwrap();
```
<!-- @formatter:on -->

* Returns
  * <a href="/api/docs/classes/proto.ConsParams.html" target="_blank">ConsParams</a>

### 13. get balance

> Retrieves the balance from the given address or 0 if object not found

<!-- @formatter:off -->
```typescript
     let balance = ctx.stateDB.balance("0x111222333444555666");
```
<!-- @formatter:on -->

* Parameter
  * string: account address hex string.
* Returns
  * string: balance value,big int string.

### 14. get nonce

> Returns the nonce of account, 0 if not exists.

<!-- @formatter:off -->
```typescript
    let nonce = ctx.stateDB.nonce("0x111222333444555666");
```
<!-- @formatter:on -->

* Parameter
  * address: account address
* Returns
  * (i64): nonce value

### 15. get state

> Retrieves a value from the given account's storage trie.

<!-- @formatter:off -->
```typescript
    let state = ctx.stateDB.stateAt("0x111222333444555666", "0x9999988888xxx");
```
<!-- @formatter:on -->

* Parameter
  * address: account address
  * hash:  one key, hash hex string
* Returns
  * (string): state , hash hex string

### 16. get refund

> Returns the current value of the refund counter.

<!-- @formatter:off -->
```typescript
    let refund = ctx.stateDB.refund();
```
<!-- @formatter:on -->

* Returns
  * (i64): the current value of the refund counter

### 17. get codeHash

> Returns the code hash of account.

<!-- @formatter:off -->
```typescript
   let codeHash = ctx.stateDB.codeHash("0x111222333444555666");
```
<!-- @formatter:on -->

* Parameter
  * addr: address hash hex string
* Returns
  * (i64): the current value of the refund counter


### 18. get transient storage

> Get aspect transientStorage value

<!-- @formatter:off -->
```typescript
   let value = ctx.aspect.transientStorage<string>("key").unwrap();
```
<!-- @formatter:on -->

* Returns
  * T : generics type value

### 19. set transient storage

> Set aspect transientStorage value

<!-- @formatter:off -->
```typescript
   let isSuccess: bool = ctx.aspect.transientStorage<string>("key").set<string>("value");
```
<!-- @formatter:on -->

* Returns
  * bool ：set success

### 20. set Aspect state

> Set value to Aspect state

<!-- @formatter:off -->
```typescript
   ctx.mutableState.get<string>("key").set<string>("value")
```
<!-- @formatter:on -->

* Parameter
  * key: generics type key
  * value: generics type value

### 21. get Aspect state

> Get value from Aspect state

<!-- @formatter:off -->
```typescript
   let value = ctx.mutableState.get<string>("key").unwrap();
```
<!-- @formatter:on -->

* Parameter
  * key: generics type key
* Returns
  * T：generics type value


### 22. get property

> Get property value

<!-- @formatter:off -->
```typescript
   let value = ctx.property.get<string>("key");
```
<!-- @formatter:on -->

* Parameter
  * key: generics type key
* Returns
  * T：generics type value

### 23. evm jit call

> Provides the capability to submit a just in time call, more about jit call see [details](/develop/core-concepts/jit-call).

<!-- @formatter:off -->
```typescript 
       let request = new JitInherentRequest(
        sys.utils.hexToUint8Array(walletAddress),
        new Uint8Array(0),
        new Uint8Array(0),
        sys.utils.hexToUint8Array(callData),
        sys.utils.hexToUint8Array(ethereum.Number.fromU64(1000000).encodeHex()),
        sys.utils.hexToUint8Array(ethereum.Number.fromU64(1000000).encodeHex()),
        new Uint8Array(0),
        new Uint8Array(0),
        new Uint8Array(0),
);
let response = ctx.jitCall.submit(request);
```
<!-- @formatter:on -->

* Parameter
  * <a href="/api/docs/classes/proto.JitInherentRequest.html" target="_blank">JitInherentRequest</a>
* Returns
  * <a href="/api/docs/classes/proto.JitInherentResponse.html" target="_blank">JitInherentResponse</a>



### 24. get trace call tree

> Get trace call tree,more about trace context see [details](/develop/core-concepts/aspect#state-change-tracing).  
> You can use [generate state tracing code](/develop/reference/aspect-tool/trace), simplify the use.

<!-- @formatter:off -->
```typescript
    let ethCallStacks = ctx.trace.callTree();
```
<!-- @formatter:on -->

* Returns
  * <a href="/api/docs/classes/proto.EthCallStacks.html" target="_blank">EthCallStacks</a>


### 25. find trace call

> Find call by index,more about trace context see [details](/develop/core-concepts/aspect#state-change-tracing).  
> You can use [generate state tracing code](/develop/reference/aspect-tool/trace), simplify the use.

<!-- @formatter:off -->
```typescript
   let traceContext = ctx.trace.findCall(1);
```
<!-- @formatter:on -->

* Returns
  * <a href="/api/docs/classes/proto.EthStackTransaction.html" target="_blank">EthStackTransaction</a>



### 26. get state change indices

> Query State Changes Indices,more about trace context see [details](/develop/core-concepts/aspect#state-change-tracing).  
> You can use [generate state tracing code](/develop/reference/aspect-tool/trace), simplify the use.

<!-- @formatter:off -->
```typescript
   let indices = ctx.trace.stateChangeIndices("0xaaabbbccc",'HoneyPot.balances',[]);
```
<!-- @formatter:on -->

* Parameter
  * addr: account hex string, like `0xxabcccxxxddeddd`
  * variable: string ，like 'HoneyPot.balances'
  * indices: Array<Uint8Array\>  optional
* Returns
  * <a href="/api/docs/classes/proto.EthStateChangeIndices.html" target="_blank">EthStateChangeIndices</a>


### 27. query state changes

> Query state changes, more about trace context see [details](/develop/core-concepts/aspect#state-change-tracing).  
> You can use [generate state tracing code](/develop/reference/aspect-tool/trace), simplify the use.

<!-- @formatter:off -->
```typescript
    let changes = ctx.trace.stateChanges("0xxabcccxxxddeddd",'HoneyPot.balances',[]);
```
<!-- @formatter:on -->

* Parameter
  * addr: account hex string, like `0xxabcccxxxddeddd`
  * variable: string ，like 'HoneyPot.balances'
  * indices: Array<Uint8Array\>  optional
* Returns
  * <a href="/api/docs/classes/proto.EthStateChanges.html" target="_blank">EthStateChanges</a>
---
