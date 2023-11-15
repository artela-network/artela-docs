# sys.context

## 1. sys.context.tx

> Get the currently executed transaction context.   
> It must be executed under the `TxContextAccessible` class that has been implemented.
> about [authorization details see here](/develop/reference/aspect-lib/components/access).

### 1. Get Transaction

> Get the currently executed transaction.

<!-- @formatter:off -->
```typescript
    // ctx implement TxContextAccessible
    let tx= sys.context.tx(ctx).content.unwrap()
```
<!-- @formatter:on -->

* Returns
  * <a href="/docs/classes/proto.EthTransaction.html" target="_blank">EthTransaction</a>

### 2. Ext Properties

> Get Transaction Ext Properties

<!-- @formatter:off -->
```typescript
    // ctx implement TxContextAccessible
    let value = sys.context.tx(ctx).extProperties.property.get("key");
```
<!-- @formatter:on -->

* Parameter
  * key: Properties keys
    * `txIndex` get transaction index in block.
* return
  * sting

### 3. GasMeter

> Get Transaction Gas Meter

<!-- @formatter:off -->
```typescript
    // ctx implement TxContextAccessible
    let meter = sys.context.tx(ctx).gasMeter.unwrap();
```
<!-- @formatter:on -->

* return
  * <a href="/docs/classes/proto.GasMeter.html" target="_blank">GasMeter</a>

## 2. sys.context.block

> Get the block context.   
> It must be executed under the `BlockContextAccessible` class that has been implemented.
> about [authorization details see here](/develop/reference/aspect-lib/components/access).

### 1. Block GasMeter

> Get the block gas Meter .

<!-- @formatter:off -->
```typescript
    // ctx implement BlockContextAccessible
    let meter= sys.context.block(ctx).gasMeter.unwrap()
```
<!-- @formatter:on -->

* Returns
  * <a href="/docs/classes/proto.GasMeter.html" target="_blank">GasMeter</a>

### 2. Block Header

> Get the block Header .

<!-- @formatter:off -->
```typescript
    // ctx implement BlockContextAccessible
    let header= sys.context.block(ctx).header.unwrap()
```
<!-- @formatter:on -->

* Returns
  * <a href="/docs/classes/proto.EthBlockHeader.html" target="_blank">EthBlockHeader</a>

### 3. Block Min Gas Price

> Get the block Min Gas Price .

<!-- @formatter:off -->
```typescript
    // ctx implement BlockContextAccessible
    let minGasPrice= sys.context.block(ctx).minGasPrice.unwrap()
```
<!-- @formatter:on -->

* Returns
  * <a href="/docs/classes/proto.MinGasPrice.html" target="_blank">MinGasPrice</a>

### 4. Last Commit Info

> Get the block last commit info.

<!-- @formatter:off -->
```typescript
    // ctx implement BlockContextAccessible
    let info= sys.context.block(ctx).lastCommit.unwrap()
```
<!-- @formatter:on -->

* Returns
  * <a href="/docs/classes/proto.LastCommitInfo.html" target="_blank">LastCommitInfo</a>

### 5. Get Tx Array

> Get Partial Body that have same tx.To
>
<!-- @formatter:off -->
```typescript
    // ctx implement BlockContextAccessible
    let txs= sys.context.block(ctx).partialBody.unwrap()
```
<!-- @formatter:on -->

* Returns
  * <a href="/docs/classes/proto.EthTxArray.html" target="_blank">EthTxArray</a>

## 3. sys.context.env

> Get the environment context.   
> It must be executed under the `EnvContextAccessible` class that has been implemented.
> about [authorization details see here](/develop/reference/aspect-lib/components/access).

### 1. EnvContent

> Get Environment Content.

<!-- @formatter:off -->
```typescript
    // ctx implement EnvContextAccessible
    let content= sys.context.env(ctx).baseFee.unwrap()
```
<!-- @formatter:on -->

* Returns
  * <a href="/docs/classes/proto.EnvContent.html" target="_blank">EnvContent</a>

### 2. ChainConfig

> Get Chain Config

<!-- @formatter:off -->
```typescript
    // ctx implement EnvContextAccessible
    let config= sys.context.env(ctx).chainConfig.unwrap()
```
<!-- @formatter:on -->

* Returns
  * <a href="/docs/classes/proto.ChainConfig.html" target="_blank">ChainConfig</a>

### 3. EvmParams

> Get Evm Params

<!-- @formatter:off -->
```typescript
    // ctx implement EnvContextAccessible
    let evmParams= sys.context.env(ctx).evmParams.unwrap()
```
<!-- @formatter:on -->

* Returns
  * <a href="/docs/classes/proto.EvmParams.html" target="_blank">EvmParams</a>

### 4. ConsensusParams

> Get Consensus Params

<!-- @formatter:off -->
```typescript
    // ctx implement EnvContextAccessible
    let conParams= sys.context.env(ctx).consensusParams.unwrap()
```
<!-- @formatter:on -->

* Returns
  * <a href="/docs/classes/proto.ConsParams.html" target="_blank">ConsParams</a>

## 4. sys.context.receipt

> Get the block context.   
> It must be executed under the `ReceiptContextAccessible` class that has been implemented.
> about [authorization details see here](/develop/reference/aspect-lib/components/access).

### 1.content

> Get receipt

<!-- @formatter:off -->
```typescript
    // ctx implement ReceiptContextAccessible
    let ethReceipt = sys.context.receipt(ctx).content.unwrap();
```
<!-- @formatter:on -->

* Returns
  * <a href="/docs/classes/proto.EthReceipt.html" target="_blank">EthReceipt</a>



## 5. sys.context.trace

> Aspects can trace the changes of a Smart Contract's state，however this tracing is facilitated by extra opcodes and IR methods generated by the ASOLC compiler。  
> TraceContext see [details](/develop/reference/aspect-lib/) on how to use it。  
> It must be executed under the `TraceAccessible` class that has been implemented.
> about [authorization details see here](/develop/reference/aspect-lib/components/access).

### 1. callTree

> Get trace call tree

<!-- @formatter:off -->
```typescript
    // ctx implement TraceAccessible
    let ethCallStacks = sys.context.trace(ctx).callTree();
```
<!-- @formatter:on -->

* Returns
  * <a href="/docs/classes/proto.EthCallStacks.html" target="_blank">EthCallStacks</a>


### 2. findCall

> find call by index

<!-- @formatter:off -->
```typescript
    // ctx implement TraceAccessible
    let ethCallStacks = sys.context.trace(ctx).findCall();
```
<!-- @formatter:on -->

* Returns
  * <a href="/docs/classes/proto.EthStackTransaction.html" target="_blank">EthStackTransaction</a>

  

### 3. stateChangeIndices 

> Query State Changes Indices

<!-- @formatter:off -->
```typescript
    // ctx implement TraceAccessible
    let indices = sys.context.trace(ctx).stateChangeIndices("0xaaabbbccc",'HoneyPot.balances',[]);
```
<!-- @formatter:on -->

* Parameter
  * addr: account hex string, like `0xxabcccxxxddeddd`
  * variable: string ，like 'HoneyPot.balances'
  * indices: Array<Uint8Array\>  optional
* Returns
  * <a href="/docs/classes/proto.EthStateChangeIndices.html" target="_blank">EthStateChangeIndices</a>


* return
  * [EthStateChangeIndices](/docs/classes/proto.EthStateChangeIndices.html) | null


### 4. stateChanges 

> Query State Changes

<!-- @formatter:off -->
```typescript
    // ctx implement TraceAccessible
    let changes = sys.context.trace(ctx).stateChanges("0xxabcccxxxddeddd",'HoneyPot.balances',[]);
```
<!-- @formatter:on -->

* Parameter
  * addr: account hex string, like `0xxabcccxxxddeddd`
  * variable: string ，like 'HoneyPot.balances'
  * indices: Array<Uint8Array\>  optional
* Returns
  * <a href="/docs/classes/proto.EthStateChanges.html" target="_blank">EthStateChanges</a>
