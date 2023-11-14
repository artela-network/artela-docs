# sys.hostApi

## 1. sys.hostApi.runtimeContext

> This API is used to query, update, and delete Aspect Runtime Contexts.
> The low-level API provided here may report an error without data access authorization, so please use it with caution.

### 1. get context

> get Context by string key

<!-- @formatter:off -->
```typescript
    public get(key: string): ContextQueryResponse
```
<!-- @formatter:on -->

* Parameter
    * string : keys
* Returns
    * <a href="/docs/classes/proto.ContextQueryResponse.html" target="_blank">ContextQueryResponse</a> :
    * The data type returned varies depending on the key of the query,
      see  [details](/develop/reference/aspect-lib/components/sys/sys-hostapi/keys-details)

* Example

<!-- @formatter:off -->
```typescript
import {EthTransaction,
        EthMessage,
        sys
} from "@artela/aspect-libs";
import { Protobuf } from "as-proto/assembly/Protobuf";

{
  const response = sys.hostApi.runtimeContext.get("tx^context");
  if (response.result!.success) {
      // decode data 
   let ehtTx=Protobuf.decode<EthTransaction>(response.data!.value, EthTransaction.decode)
  }
}
```
<!-- @formatter:on -->

### 2. query context

> query context by name space.

<!-- @formatter:off -->
```typescript
    public query(nameSpace: QueryNameSpace = 0, query: Any | null = null): ContextQueryResponse
```
<!-- @formatter:on -->

* Parameter
    * nameSpace : <a href="/docs/classes/proto.QueryNameSpace.html" target="_blank">QueryNameSpace</a>
    * query: Any Type，set different objects based on namespace.
        * QueryNameSpace.QueryAspectState : <a href="/docs/classes/proto.StringData.html" target="_blank">StringData</a>
        * QueryNameSpace.QueryAspectProperty : <a href="/docs/classes/proto.StringData.html" target="_blank">
          StringData</a>
* Returns
    * <a href="/docs/classes/proto.ContextQueryResponse.html" target="_blank">ContextQueryResponse</a>, The data type
      returned varies depending on the key of the query.

        * QueryNameSpace.QueryAspectState : <a href="/docs/classes/proto.StringData.html" target="_blank">StringData</a>
        * QueryNameSpace.QueryAspectProperty : <a href="/docs/classes/proto.StringData.html" target="_blank">
          StringData</a>

* Example

<!-- @formatter:off -->
```typescript
import {QueryNameSpace,
        StringData,
        sys
} from "@artela/aspect-libs";
import { Protobuf } from "as-proto/assembly/Protobuf";

{
  const sateChangeQuery = new StringData(key);
  const query = messageUtil.ToAny<StringData>(
          messageUtil.StringData,
          sateChangeQuery,
          StringData.encode,
  );
  const outPtr =sys.hostApi.runtimeContext.query(QueryNameSpace.QueryAspectProperty, query);
  if (!outPtr.result!.success) {
    throw NewMessageError(outPtr.result!.message);
  }
  return convertUtil.fromString<T>(
          outPtr.data == null
                  ? ''
                  : Protobuf.decode<StringData>(outPtr.data!.value, StringData.decode).data,
  );
}
```
<!-- @formatter:on -->

### 3. remove context

> remove context by removeNameSpace.

<!-- @formatter:off -->
```typescript
    public remove(nameSpace: RemoveNameSpace = 0, query: Any | null = null): bool
```
<!-- @formatter:on -->

* Parameter
    * nameSpace: <a href="/docs/classes/proto.RemoveNameSpace.html" target="_blank">RemoveNameSpace</a>
    * query: Any Type，set different objects based on namespace.
        * RemoveAspectContext.RemoveAspectContext : <a href="/docs/classes/proto.StringData.html" target="_blank">
          StringData</a>
        * RemoveAspectContext.RemoveAspectState : <a href="/docs/classes/proto.StringData.html" target="_blank">
          StringData</a>
* Returns
    * bool: whether the deletion was successful.

* Example

<!-- @formatter:off -->
```typescript
import {RemoveNameSpace,
  Any,StringData,sys
} from "@artela/aspect-libs";
import { Protobuf } from "as-proto/assembly/Protobuf";

{
  const data = new StringData(this.key);
  const encode = Protobuf.encode(data, StringData.encode);
  const any = new Any(messageUtil.StringData, encode);

  sys.hostApi.runtimeContext.remove(RemoveNameSpace.RemoveAspectState, any);
}
```
<!-- @formatter:on -->

### 4. set context

> set context by SetNameSpace.

<!-- @formatter:off -->
```typescript
    public set(dataSpace: SetNameSpace, key: string, value: string): bool
```
<!-- @formatter:on -->

* Parameter
    * dataSpace: <a href="/docs/classes/proto.SetNameSpace.html" target="_blank">SetNameSpace</a>
    * key: set key
    * value: set value
* Returns
    * bool: whether the set was successful.

* Example

 <!-- @formatter:off -->
```typescript
import {
        SetNameSpace,
        sys
} from "@artela/aspect-libs";
{
  sys.hostApi.runtimeContext.set(SetNameSpace.SetAspectState, "key", "data");
}
```
<!-- @formatter:on -->

### 5. get aspectId

> get current aspectId.

<!-- @formatter:off -->
```typescript
    public aspectId(): string
```
<!-- @formatter:on -->

* Returns
    * string: current aspectId

* Example

 <!-- @formatter:off -->
```typescript
import { 
    sys
} from "@artela/aspect-libs";
{
 let aspId= sys.hostApi.runtimeContext.aspectId();
}
```
<!-- @formatter:on -->

---

## 2. sys.hostApi.crypto

### 1. keccak

> Keccak256 calculates and returns the Keccak256 hash of the input data.

<!-- @formatter:off -->
```typescript
    public keccak(data: Uint8Array): Uint8Array
```
<!-- @formatter:on -->

* Parameter
    * Uint8Array: data
* Returns
    * Uint8Array: calculation result
* Example

<!-- @formatter:off -->
```typescript
import {
        sys
} from "@artela/aspect-libs";
{
  let data = sys.hostApi.crypto.keccak(sys.utils.stringToUint8Array("test"));
}
```
<!-- @formatter:on -->

### 2. sha256

> returns the SHA256 checksum of the data.

<!-- @formatter:off -->
```typescript
    public sha256(data: Uint8Array): Uint8Array
```
<!-- @formatter:on -->

* Parameter
    * Uint8Array: data
* Returns
    * Uint8Array: calculation result
* Example

<!-- @formatter:off -->
```typescript
import {
        sys
} from "@artela/aspect-libs";
{
  let data = sys.hostApi.crypto.sha256(sys.utils.stringToUint8Array("test"));
}
```
<!-- @formatter:on -->

### 3. base64Encode

> returns the base64 encoding of the data.

<!-- @formatter:off -->
```typescript
   public base64Encode(data: Uint8Array): string
```
<!-- @formatter:on -->

* Parameter
    * Uint8Array: data
* Returns
    * string: calculation result
* Example

<!-- @formatter:off -->
```typescript
import {
        sys
} from "@artela/aspect-libs";
{
  let data = sys.hostApi.crypto.base64Encode(sys.utils.stringToUint8Array("test"));
}
```
<!-- @formatter:on -->

### 4. base64Decode

> returns the base64 decoding of the data.

<!-- @formatter:off -->
```typescript
   public base64Decode(data: string): Uint8Array
```
<!-- @formatter:on -->

* Parameter
    * string: data
* Returns
    * Uint8Array: calculation result
* Example

<!-- @formatter:off -->
```typescript
import {
        sys
} from "@artela/aspect-libs";
{
  let data = sys.hostApi.crypto.base64Decode("VGhpcyBpcyBhIHNhbXBsZS4=");
}
```
<!-- @formatter:on -->

### 5. base58Encode

> returns the base58 encoding of the data.

<!-- @formatter:off -->
```typescript
   public base58Encode(data: Uint8Array): string 
```
<!-- @formatter:on -->

* Parameter
    * Uint8Array: data
* Returns
    * string: calculation result
* Example

<!-- @formatter:off -->
```typescript
import {
        sys
} from "@artela/aspect-libs";
{
  let data = sys.hostApi.crypto.base58Encode(sys.utils.stringToUint8Array("test"));
}
```
<!-- @formatter:on -->

### 6. base58Decode

> returns the base58 encoding of the data.

<!-- @formatter:off -->
```typescript
   public base58Decode(data: string): Uint8Array
```
<!-- @formatter:on -->

* Parameter
    * string: data
* Returns
    * Uint8Array: calculation result
* Example

<!-- @formatter:off -->
```typescript
import {
        sys
} from "@artela/aspect-libs";
{
  let data = sys.hostApi.crypto.base58Decode("3yZe7d");
}
```
<!-- @formatter:on -->

### 7. ripemd160

> returns the ripemd160 digest data.

<!-- @formatter:off -->
```typescript
   public ripemd160(data: Uint8Array): Uint8Array
```
<!-- @formatter:on -->

* Parameter
    * Uint8Array: data
* Returns
    * Uint8Array: calculation result
* Example

<!-- @formatter:off -->
```typescript
import {
        sys
} from "@artela/aspect-libs";
{
  let data = sys.hostApi.crypto.Uint8Array(sys.utils.stringToUint8Array("test"));
}
```
<!-- @formatter:on -->

### 8. ecRecover

> returns the ecRecover encoding of the data.

<!-- @formatter:off -->
```typescript
    public ecRecover(data: Uint8Array): Uint8Array 
```
<!-- @formatter:on -->

* Parameter
    * Uint8Array: data
* Returns
    * Uint8Array: calculation result
* Example

<!-- @formatter:off -->
```typescript
import {
        sys
} from "@artela/aspect-libs";
{
  let data = sys.hostApi.crypto.ecRecover(sys.utils.stringToUint8Array("test"));
}
```
<!-- @formatter:on -->

---

## 3.sys.hostApi.evmCall

### 1. staticCall

> Executes a new message call immediately, without creating a transaction on the block chain.

<!-- @formatter:off -->
```typescript
    public staticCall(request: EthMessage): EthMessageCallResult
```
<!-- @formatter:on -->

* Parameter
    * <a href="/docs/classes/proto.EthMessage.html" target="_blank">EthMessage</a> : request
* Returns
    * <a href="/docs/classes/proto.EthMessageCallResult.html" target="_blank">EthMessageCallResult</a> : call result
* Example

<!-- @formatter:off -->
```typescript
{
    let ethMessage = new EthMessage( );
    let result = sys.hostApi.evmCall.staticCall(ethMessage)
}
```
<!-- @formatter:on -->

### 2. jitCall

> Executes a new message call immediately, without creating a transaction on the block chain.

<!-- @formatter:off -->
```typescript
    public jitCall(request: JitInherentRequest): JitInherentResponse
```
<!-- @formatter:on -->

* Parameter
    * <a href="/docs/classes/proto.JitInherentRequest.html" target="_blank">JitInherentRequest</a> : request
* Returns
    * <a href="/docs/classes/proto.JitInherentResponse.html" target="_blank">JitInherentResponse</a> : call result
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
    
    let response = sys.hostApi.evmCall.jitCall(request);
}
```
<!-- @formatter:on -->

---

## 4.sys.hostApi.util

### 1. revert

> Roll back the current transaction and return the information to the node.

<!-- @formatter:off -->
```typescript
   public revert(message: string): void
```
<!-- @formatter:on -->

* Parameter
    * string : error message
* Example

<!-- @formatter:off -->
```typescript
{
    let result = sys.hostApi.util.revert("error message");
}
```
<!-- @formatter:on -->

### 2. log

> log information to the node.

<!-- @formatter:off -->
```typescript
   public log(data: string): void 
```
<!-- @formatter:on -->

* Parameter
    * string : log message
* Example

<!-- @formatter:off -->
```typescript
{
    let result = sys.hostApi.util.log("print xxx on node");
}
```
<!-- @formatter:on -->

### 3. hexToUint8Array

> convert hex string to Uint8Array

<!-- @formatter:off -->
```typescript
   public hexToUint8Array(s: string): Uint8Array
```
<!-- @formatter:on -->

* Parameter
    * string : hex string.
* Return
    * Uint8Array: byte result.
* Example

<!-- @formatter:off -->
```typescript
{
    let result = sys.hostApi.util.hexToUint8Array("0x74657374");
}
```
<!-- @formatter:on -->

### 4. uint8ArrayToHex

> convert Uint8Array to hex string

<!-- @formatter:off -->
```typescript
  public uint8ArrayToHex(data: Uint8Array): string 
```
<!-- @formatter:on -->

* Parameter
    * Uint8Array : Data.
* Return
    * string: hex string.
* Example

<!-- @formatter:off -->
```typescript
{
    let result = sys.hostApi.util.uint8ArrayToHex([]);
}
```
<!-- @formatter:on -->

---

## 5.sys.hostApi.stateDb

### 1. balance

> retrieves the balance from the given address or 0 if object not found

<!-- @formatter:off -->
```typescript
  public balance(addr: string): string
```
<!-- @formatter:on -->

* Parameter
    * string: account address hex string.
* Return
    * string: balance value,big int string.
* Example

<!-- @formatter:off -->
```typescript
{
    let balance = sys.hostApi.stateDb.balance("0x111222333444555666");
}
```
<!-- @formatter:on -->

### 2. stateAt

> retrieves a value from the given account's storage trie.

<!-- @formatter:off -->
```typescript
  public stateAt(addr: string, hash: string): string
```
<!-- @formatter:on -->

* Parameter
    * address: account address, hash hex string
    * hash: one key, hash hex string
* Return
    * string: state, hash hex string
* Example

<!-- @formatter:off -->
```typescript
{
    let state = sys.hostApi.stateDb.stateAt("0x111222333444555666","0x9999988888xxx");
}
```
<!-- @formatter:on -->

### 3. refund

> returns the current value of the refund counter.

<!-- @formatter:off -->
```typescript
  public refund(): i64
```
<!-- @formatter:on -->

* Return
    * (i64): the current value of the refund counter
* Example

<!-- @formatter:off -->
```typescript
{
    let refund = sys.hostApi.stateDb.refund();
}
```
<!-- @formatter:on -->

### 4. codeHash

> returns the code hash of account.

<!-- @formatter:off -->
```typescript
    public codeHash(addr: string): string
```
<!-- @formatter:on -->
* Parameter
    * addr: address hash hex string
* Return
    * (i64): the current value of the refund counter
* Example

<!-- @formatter:off -->
```typescript
{
    let refund = sys.hostApi.stateDb.codeHash("0x111222333444555666");
}
```
<!-- @formatter:on -->

### 5. nonce

> returns the nonce of account, 0 if not exists.

<!-- @formatter:off -->
```typescript
    public nonce(addr: string): i64 
```
<!-- @formatter:on -->
* Parameter
    * addr: account address hash hex string
* Return
    * (i64): nonce
* Example

<!-- @formatter:off -->
```typescript
{
    let refund = sys.hostApi.stateDb.nonce("0x111222333444555666");
}
```
<!-- @formatter:on -->