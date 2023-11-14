---
sidebar_position: 2
---

# OnBlockInitializeCtx

>before evm call to create `OnBlockInitializeCtx` ，and execute Join point `OnBlockInitialize`.

:::note
This Joinpoint is currently in `beta` and might undergo significant changes in the future. Therefore, it's advisable not to use it for production purposes.
:::

## Use Cases

### Block Context

#### Block GasMeter

* return
    * [GasMeter](/docs/classes/proto.GasMeter.html)

```typescript
    let meter = ctx.block.gasMeter.unwrap();
```

#### Block Eth Block Header

* return
    * [EthBlockHeader](/docs/classes/proto.GasMeter.html)

```typescript
    let header = ctx.block.header.unwrap();
```

#### Block Min Gas Price

* return
    * [MinGasPrice](/docs/classes/proto.MinGasPrice.html)

```typescript
    let minGasPrice = ctx.block.minGasPrice.unwrap();
```

#### Last Commit Info

* return
    * [LastCommitInfo](/docs/classes/proto.LastCommitInfo.html)

```typescript
    let lastCommit = ctx.block.lastCommit.unwrap();
```

#### Get Partial Body that have same tx.To

* return
    * [EthTxArray](/docs/classes/proto.EthTxArray.html)

```typescript
    let txs = ctx.block.partialBody.unwrap();
```

### Environment Context

#### Get Environment Content

* return
    * [EnvContent](/docs/classes/proto.EnvContent.html)

```typescript
    let envContent = ctx.env.baseFee.unwrap();
```

#### Get Chain Config

* return
    * [ChainConfig](/docs/classes/proto.ChainConfig.html)

```typescript
    let chainConfig = ctx.env.chainConfig.unwrap();
```

#### Get Evm Params

* return
    * [EvmParams](/docs/classes/proto.EvmParams.html)

```typescript
    let evmParams = ctx.env.evmParams.unwrap();
```

#### Get Consensus Params

* return
    * [ConsParams](/docs/classes/proto.ConsParams.html)

```typescript
    let ConsParams = ctx.env.consensusParams.unwrap();
```

### MutableState

#### Set Value

> set value to aspect state

* Parameter
    * key: generics type key
    * value: generics type value

```typescript
    ctx.mutableState.get<string>("key").set<string>("value")
```

#### Get Value

> Get value from aspect state

* Parameter
    * key: generics type key
* Return
    * T：generics type value

```typescript
    let value = ctx.mutableState.get<string>("key").unwrap();
```

### Property

#### Get property

> get property value

* Parameter
    * key: generics type key

```typescript
    let value = ctx.property.get<string>("key");
```

### Evm Call

#### StaticCall

>Executes a new message call immediately, without creating a transaction on the block chain.

* Parameter
  *  [EthMessage](/docs/classes/proto.EthMessage.html)
* Return
  *  [EthMessageCallResult](/docs/classes/proto.EthMessageCallResult.html)

```typescript
  let ethMessage = new EthMessage( );
  let result = ctx.staticCall.submit(ethMessage)
```
