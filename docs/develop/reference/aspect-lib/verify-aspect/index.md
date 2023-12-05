---
sidebar_position: 2
---

# Transaction Verification Aspect


## Introduction
The verifyTx method is invoked for transactions from an EoA. It allows customization of the transaction verification process.
Triggered when transaction signature is being verified, Aspect can replace the built-in secp256k1 signature verification with customized verification logic.

![verify.svg](verify.svg)

## How to Create
To function as a transaction verifier Aspect, an Aspect must implement the `ITransactionVerifier` interface. This interface comprises a single method, verifyTx, which is invoked for transactions sent from an EoA without a valid ECDSA signature.

```typescript
import {
  ITransactionVerifier,
  VerifyTxCtx,
  sys
} from "@artela/aspect-libs";

export class Aspect implements ITransactionVerifier {
    
  verifyTx(ctx: VerifyTxCtx, validationData: Uint8Array): Uint8Array {
    // Custom verification logic
    // ...
    return address; // A 20-byte address must be returned to the base layer.
  }
}
```
#### Parameter
* `ctx` ： By utilizing the 'ctx' input argument, it provides essential insights into transactions and block processing, encompassing smart contract state updates, logged events, and raw transaction data. see [how to use ctx](#how-to-use-ctx).
* `validationData` : Data used to derive the sender's address.

#### Returns
* (Uint8Array) ：return a 20-byte address.


## How to use `ctx`

### 1. get transaction
> Get the currently executed transaction.
>
<!-- @formatter:off -->
```typescript
    let transaction = ctx.tx.content.unwrap()!
```
<!-- @formatter:on -->

* Return
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
* Return
  * string

### 3. get transaction gas meter
> Get transaction gas meter
>
<!-- @formatter:off -->
```typescript
    let gasMeter = ctx.tx.gasMeter.unwrap()!
```
<!-- @formatter:on -->

* Return
  * <a href="/api/docs/classes/proto.GasMeter.html" target="_blank">GasMeter</a>

### 4. get block gas meter

>Get block gas meter

<!-- @formatter:off -->
```typescript
    let meter = ctx.block.gasMeter.unwrap();
```
<!-- @formatter:on -->

* Return
  * <a href="/api/docs/classes/proto.GasMeter.html" target="_blank">GasMeter</a>

### 5. get block header

> Get the block header.

<!-- @formatter:off -->
```typescript
    let header = ctx.block.header.unwrap();
```
<!-- @formatter:on -->

* Return
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

### 13. set Aspect state

> Set value to Aspect state

<!-- @formatter:off -->
```typescript
   ctx.mutableState.get<string>("key").set<string>("value")
```
<!-- @formatter:on -->

* Parameter
  * key: generics type key
  * value: generics type value

### 14. get Aspect state

> Get value from Aspect state

<!-- @formatter:off -->
```typescript
   let value = ctx.mutableState.get<string>("key").unwrap();
```
<!-- @formatter:on -->

* Parameter
  * key: generics type key
* Return
  * T：generics type value


### 15. get property

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

### 16. evm static call

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
