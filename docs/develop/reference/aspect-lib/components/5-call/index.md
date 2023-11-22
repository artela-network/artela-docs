# sys.evm

## 1. Evm call

> Provides access to the Ethereum virtual machine.

### 1. staticCall

> Executes a new message call immediately, without creating a transaction on the blockchain.
> need implement StaticCallable 

<!-- @formatter:off -->
```typescript
    public staticCall(request: EthMessage): EthMessageCallResult
```
<!-- @formatter:on -->

* Parameter
  * <a href="/api/docs/classes/proto.EthMessage.html" target="_blank">EthMessage</a> : request
* Returns
  * <a href="/api/docs/classes/proto.EthMessageCallResult.html" target="_blank">EthMessageCallResult</a> : call result
* Example

<!-- @formatter:off -->
```typescript
{
    let ethMessage = new EthMessage( );
    // ctx implement StaticCallable
    let result = sys.evm.staticCall(ctx).submit(ethMessage)
}
```
<!-- @formatter:on -->

### 2. jitCall

>Provides the capability to submit a buy-in call, see [more details](/develop/core-concepts/jit-call) 
> need implement JustInTimeCallable

<!-- @formatter:off -->
```typescript
    public jitCall(request: JustInTimeCallable): JitInherentResponse
```
<!-- @formatter:on -->

* Parameter
  * <a href="/api/docs/classes/proto.JitInherentRequest.html" target="_blank">JitInherentRequest</a> : request
* Returns
  * <a href="/api/docs/classes/proto.JitInherentResponse.html" target="_blank">JitInherentResponse</a> : call result
* Example

<!-- @formatter:off -->
```typescript
{
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
    // ctx implement JustInTimeCallable
    let response = sys.ys.evm.jitCall(ctx).submit(request);
}
```
<!-- @formatter:on -->