---
sidebar_position: 2
---

# PreTxExecuteCtx

> 

## Where was it created

At [evm.go](https://github.com/artela-network/artela/blob/cb7101509a52ffcd00e1c2726f7b0fbc7102c918/x/evm/keeper/evm.go#L383),
before evm call to create `PreTxExecuteCtx` ，and execute Join point `PreTxExecute`.

<!-- @formatter:off -->
```javascript
  //create request
  pointRequest := ...CreateTxPointRequestInEvm(ctx, msg, txConfig, nil)
    
  // Joinpoint
  execute := djpm.AspectInstance().PreTxExecute(pointRequest)
  if hasErr, execErr := execute.HasErr(); hasErr {
  	vmErr = execErr
  } else {
    // evm  call
  	ret, leftoverGas, vmErr = evm.Call(sender, *msg.To, msg.Data, leftoverGas, msg.Value)
  	...
  }
```
<!-- @formatter:on -->

## Use Cases

### Transaction Context

#### Get the currently executed transaction

* return 
  * [EthTransaction](/docs/classes/proto.EthTransaction.html)

```typescript
    let transaction = ctx.tx.content.unwrap()!
```

#### Get Transaction Ext Properties

* Parameter
  * key: Properties keys
    * `txIndex` get transaction index in block.
* return
  * sting
* Default Key

```typescript
    let popVal = ctx.tx.extProperties.property.get("xx");
```

#### GasMeter

* return 
  * [GasMeter](/docs/classes/proto.GasMeter.html)

```typescript
    let gasMeter = ctx.tx.gasMeter.unwrap()!
```

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

### StateDB

#### Get Balance

> retrieves the balance from the given address or 0 if object not found

* Parameter
  * address: account address
* return
  * (string): balance value, big int string

```typescript
    let balance = ctx.stateDB.balance("0x111222333444555666");
```

#### Get Nonce

> returns the nonce of account, 0 if not exists.

* Parameter
  * address: account address
* return
  * (i64): nonce value

```typescript
     let nonce = ctx.stateDB.nonce("0x111222333444555666");
```

#### Get State

> retrieves a value from the given account's storage trie.

* Parameter
  * address: account address
  * hash:  one key, hash hex string
* return
  * (string): state , hash hex string

```typescript
     let state = ctx.stateDB.stateAt("0x111222333444555666", "0x9999988888xxx");
```

#### Get Refund

> returns the current value of the refund counter.

* return
  * (i64): the current value of the refund counter

```typescript
    let refund = ctx.stateDB.refund();
```

#### Get CodeHash

> returns the code hash of account.

* Parameter
  * addr: address hash hex string
* return
  * (i64): the current value of the refund counter

```typescript
    let codeHash = ctx.stateDB.codeHash("0x111222333444555666");
```

### TransientStorage

#### Get Aspect transientStorage value

* return 
  * T : generics type value

```typescript
    let value = ctx.aspect.transientStorage<string>("key").unwrap();
```

#### Set Aspect transientStorage value

* return
  * bool ：set success

```typescript
    let isSuccess: bool = ctx.aspect.transientStorage<string>("key").set<string>("value");
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
