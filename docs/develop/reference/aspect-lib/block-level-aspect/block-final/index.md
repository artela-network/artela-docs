
# OnBlockFinalize

## Introduction

The OnBlockInitialize join-point occurs during the `EndBlock` phase of the [Transaction lifecycle](https://docs.cosmos.network/v0.47/learn/beginner/tx-lifecycle).  
This join point activated prior to the preparation of the block proposal. automated transaction is allowed to be inserted at this point.

![img.png](../img/jp.png)

## Example
<!-- @formatter:off -->
```typescript
 onBlockFinalize(ctx: OnBlockFinalizeCtx): void {
  let broker = ctx.property.get<string>("Broker");
  sys.require(broker=="0xaabbbcc..","invalid broker.")
}
```
<!-- @formatter:on -->

## Programming

There are two programming modes that can be used in this method:
1. Using the 'sys' namespace, it provides low-level API access to system data and contextual information generated during blockchain runtime, including details about the environment, blocks, transactions, and utility classes such as crypto and ABI encoding/decoding. see [more details](/develop/reference/aspect-lib/components/overview).
2. By utilizing the 'ctx' input argument, it provides essential insights into transactions and block processing, encompassing smart contract state updates, logged events, and raw transaction data. see [how to use ctx](#how-to-use-ctx).

whatever,the two methods can be used interchangeably.

## How to use `ctx`

### 1. get block gas meter

>Get block gas meter

<!-- @formatter:off -->
```typescript
    let meter = ctx.block.gasMeter.unwrap();
```
<!-- @formatter:on -->

* Return
  * <a href="/api/docs/classes/proto.GasMeter.html" target="_blank">GasMeter</a>

### 2. get block header

> Get the block header.

<!-- @formatter:off -->
```typescript
    let header = ctx.block.header.unwrap();
```
<!-- @formatter:on -->

* Return
  * <a href="/api/docs/classes/proto.EthBlockHeader.html" target="_blank">EthBlockHeader</a>

### 3. get block min gas price

> Get the block min gas price.

<!-- @formatter:off -->
```typescript
    let minGasPrice = ctx.block.minGasPrice.unwrap();
```
<!-- @formatter:on -->

* Returns
  * <a href="/api/docs/classes/proto.MinGasPrice.html" target="_blank">MinGasPrice</a>

### 4. get block last commit

> Get the block last commit info.

<!-- @formatter:off -->
```typescript
    let lastCommit = ctx.block.lastCommit.unwrap();
```
<!-- @formatter:on -->

* Returns
  * <a href="/api/docs/classes/proto.LastCommitInfo.html" target="_blank">LastCommitInfo</a>

### 5. get block partial tx

> Get partial body that have same tx.To

<!-- @formatter:off -->
```typescript
    let txs = ctx.block.partialBody.unwrap();
```
<!-- @formatter:on -->

* Returns
  * <a href="/api/docs/classes/proto.EthTxArray.html" target="_blank">EthTxArray</a>

### 6. get environment

> Get environment content.

<!-- @formatter:off -->
```typescript
   let envContent = ctx.env.baseFee.unwrap();
```
<!-- @formatter:on -->

* Returns
  * <a href="/api/docs/classes/proto.EnvContent.html" target="_blank">EnvContent</a>

### 7. get chain config

> Get chain config

<!-- @formatter:off -->
```typescript
   let chainConfig = ctx.env.chainConfig.unwrap();
```
<!-- @formatter:on -->

* Returns
  * <a href="/api/docs/classes/proto.ChainConfig.html" target="_blank">ChainConfig</a>

### 8. get evm params

> Get evm params

<!-- @formatter:off -->
```typescript
    let evmParams = ctx.env.evmParams.unwrap();
```
<!-- @formatter:on -->

* Returns
  * <a href="/api/docs/classes/proto.EvmParams.html" target="_blank">EvmParams</a>

### 9. get consensus params

> Get consensus params

<!-- @formatter:off -->
```typescript
    let ConsParams = ctx.env.consensusParams.unwrap();
```
<!-- @formatter:on -->

* Returns
  * <a href="/api/docs/classes/proto.ConsParams.html" target="_blank">ConsParams</a>

### 10. set Aspect state

> Set value to aspect state

<!-- @formatter:off -->
```typescript
   ctx.mutableState.get<string>("key").set<string>("value")
```
<!-- @formatter:on -->

* Parameter
  * key: generics type key
  * value: generics type value

### 11. get Aspect state

> Get value from aspect state

<!-- @formatter:off -->
```typescript
   let value = ctx.mutableState.get<string>("key").unwrap();
```
<!-- @formatter:on -->

* Parameter
  * key: generics type key
* Return
  * T：generics type value


### 12. get property

> Get property value

<!-- @formatter:off -->
```typescript
   let value = ctx.property.get<string>("key");
```
<!-- @formatter:on -->

* Parameter
  * key: generics type key
* Return
  * T：generics type value

### 13. evm static call

> Executes a new message call immediately, without creating a transaction on the blockchain.

<!-- @formatter:off -->
```typescript
    let ethMessage = new EthMessage( );
    let result = ctx.staticCall.submit(ethMessage)
```
<!-- @formatter:on -->

* Parameter
  * <a href="/api/docs/classes/proto.EthMessage.html" target="_blank">EthMessage</a>
* Return
  * <a href="/api/docs/classes/proto.EthMessageCallResult.html" target="_blank">EthMessageCallResult</a>

----
