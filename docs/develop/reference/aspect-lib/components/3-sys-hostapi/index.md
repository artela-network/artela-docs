# sys.hostApi

> Provides host APIs that communicate with wasm runtimes, including crypto, utils, stateDb, and blockchain runtime context. 
> method entry and exit parameters are coded and decoded by protobuf, as described in each method.

## import

<!-- @formatter:off -->
```typescript
{
    sys
} from "@artela/aspect-libs";
```
<!-- @formatter:on -->

## sys.hostApi.runtimeContext

> This API is used to query, update, and delete Aspect Runtime Contexts.
> The low-level API provided here may report an error without data access authorization, so please use it with caution.

### 1. get context

> get Context by string key

<!-- @formatter:off -->
```typescript
public get(key: string): Uint8Array
```
<!-- @formatter:on -->

* Parameter
    * keys：string，the existing supported keys are; see [key column](/develop/reference/aspect-lib/components/sys-hostapi#get-key-table)

* Returns
    * data: Uint8Array，The data type returned varies depending on the key of the query,see [response data column](/develop/reference/aspect-lib/components/sys-hostapi#get-key-table)

* Example

<!-- @formatter:off -->
```typescript
  import {EthTransaction,
          EthMessage,
          sys
  } from "@artela/aspect-libs";
  import { Protobuf } from "as-proto/assembly/Protobuf";
  
  {    
      // get key
      const number = sys.hostApi.runtimeContext.get('block.header.number');
      if (number){
          // decode get result
          const numberData = Protobuf.decode<UintData>(number, UintData.decode);
      }
  }
```
<!-- @formatter:on -->

#### Key Example, More details see 
| key                           | type      |
 |-------------------------------|-----------|
| isCall                        | BoolData  |
| block.header.parentHash       | BytesData |
| block.header.miner            | BytesData |
| block.header.transactionsRoot | BytesData |
| ...                           | ....      |


### 2. query context

> query context by name space.

<!-- @formatter:off -->
```typescript
    public query(nameSpace: QueryNameSpace = 0, query: Any | null = null): ContextQueryResponse
```
<!-- @formatter:on -->

* Parameter
    * nameSpace : <a href="/api/docs/classes/proto.QueryNameSpace.html" target="_blank">QueryNameSpace</a>
    * query: Any Type，set different objects based on namespace.
        * QueryNameSpace.QueryAspectState : <a href="/api/docs/classes/proto.StringData.html" target="_blank">StringData</a>
        * QueryNameSpace.QueryAspectProperty : <a href="/api/docs/classes/proto.StringData.html" target="_blank">
          StringData</a>
* Returns
    * <a href="/api/docs/classes/proto.ContextQueryResponse.html" target="_blank">ContextQueryResponse</a>, The data type
      returned varies depending on the key of the query.

        * QueryNameSpace.QueryAspectState : <a href="/api/docs/classes/proto.StringData.html" target="_blank">StringData</a>
        * QueryNameSpace.QueryAspectProperty : <a href="/api/docs/classes/proto.StringData.html" target="_blank">
          StringData</a>

* Example

<!-- @formatter:off -->
```typescript
  import {QueryNameSpace,
          StringData,
          MessageUtil,
          sys
  } from "@artela/aspect-libs";
  import { Protobuf } from "as-proto/assembly/Protobuf";
  
  const messageUtil=MessageUtil.instance()
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
    * nameSpace: <a href="/api/docs/classes/proto.RemoveNameSpace.html" target="_blank">RemoveNameSpace</a>
    * query: Any Type，set different objects based on namespace.
        * RemoveAspectContext.RemoveAspectContext : <a href="/api/docs/classes/proto.StringData.html" target="_blank">
          StringData</a>
        * RemoveAspectContext.RemoveAspectState : <a href="/api/docs/classes/proto.StringData.html" target="_blank">
          StringData</a>
* Returns
    * bool: whether the deletion was successful.

* Example

<!-- @formatter:off -->
```typescript
  import {RemoveNameSpace,
    Any,StringData,sys,MessageUtil
  } from "@artela/aspect-libs";
  import { Protobuf } from "as-proto/assembly/Protobuf";
   
  const messageUtil=MessageUtil.instance()
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
    * dataSpace: <a href="/api/docs/classes/proto.SetNameSpace.html" target="_blank">SetNameSpace</a>
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
 let aspId= sys.hostApi.runtimeContext.aspectId();
```
<!-- @formatter:on -->

---

## sys.hostApi.crypto

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
    let data = sys.hostApi.crypto.keccak(sys.utils.stringToUint8Array("test"));
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
    let data = sys.hostApi.crypto.sha256(sys.utils.stringToUint8Array("test"));
```
<!-- @formatter:on -->

### 3. ripemd160

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
    let data = sys.hostApi.crypto.Uint8Array(sys.utils.stringToUint8Array("test"));
```
<!-- @formatter:on -->

### 4. ecRecover

> returns the ecRecover encoding of the data.

<!-- @formatter:off -->
```typescript
    public ecRecover(hash: string, v: BigInt, r: BigInt, s: BigInt): string
```
<!-- @formatter:on -->

* Parameter
    * Uint8Array: data
* Returns
    * Uint8Array: calculation result
* Example

<!-- @formatter:off -->
```typescript

let r="8ddbe43ca7d0b8df7a7a6e3c7843f110863542531262ee3958ae5739db5c8eff";
let s="16b68cdef6ab525c8fa96164ff9a471d5b1d8b6d070810a90efd245583045e99";
let v="1b";
let msgHash="b893fcb3622cea25bc02a2491d3c8464df619d2ca0319203f14325208556fc5e";

const recoverResult = sys.hostApi.crypto.ecRecover(
    msgHash,
    BigInt.fromString(v, 16),
    BigInt.fromString(r, 16),
    BigInt.fromString(s, 16),
);

return hexToUint8Array(recoverResult);

```
<!-- @formatter:on -->

---

## sys.hostApi.evmCall

### 1. staticCall

> Executes a new message call immediately, without creating a transaction on the block chain.

<!-- @formatter:off -->
```typescript
public staticCall(request: StaticCallRequest): StaticCallResult
```
<!-- @formatter:on -->

* Parameter
    * <a href="/api/docs/classes/proto.StaticCallRequest.html" target="_blank">StaticCallRequest</a> : request
* Returns
    * <a href="/api/docs/classes/proto.StaticCallResult.html" target="_blank">StaticCallResult</a> : call result
* Example

<!-- @formatter:off -->
```typescript
const from = sys.aspect.property.get<Uint8Array>('from');
const to = sys.aspect.property.get<Uint8Array>('to');
const data = sys.aspect.property.get<Uint8Array>('data');

const staticCallRequest = new StaticCallRequest(from, to, data, 1000000000);
const staticCallResult = sys.hostApi.evmCall.staticCall(staticCallRequest);

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
    * <a href="/api/docs/classes/proto.JitInherentRequest.html" target="_blank">JitInherentRequest</a> : request
* Returns
    * <a href="/api/docs/classes/proto.JitInherentResponse.html" target="_blank">JitInherentResponse</a> : call result
* Example

<!-- @formatter:off -->
```typescript
const sender = sys.aspect.property.get<Uint8Array>('from');
const to = sys.aspect.property.get<Uint8Array>('to');
const callData = sys.aspect.property.get<Uint8Array>('data');
const request = JitCallBuilder.simple(sender, to, callData).build();
// Submit the JIT call
const response = sys.hostApi.evmCall.jitCall(request);
```
<!-- @formatter:on -->

---

## sys.hostApi.util

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
    let result = sys.hostApi.util.revert("error message");
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
    let result = sys.hostApi.util.log("print xxx on node");
```
<!-- @formatter:on -->

## sys.hostApi.stateDb

### 1. balance

> retrieves the balance from the given address or 0 if object not found

<!-- @formatter:off -->
```typescript
public balance(addr: Uint8Array): Uint8Array
```
<!-- @formatter:on -->

* Parameter
    * addr: Uint8Array account address
* Return
    * result: Uint8Array balance value
* Example

<!-- @formatter:off -->
```typescript
const contract = hexToUint8Array("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4")
const balance = sys.hostApi.stateDb.balance(contract);
```
<!-- @formatter:on -->

### 2. stateAt

> retrieves a value from the given account's storage trie.

<!-- @formatter:off -->
```typescript
public stateAt(addr: Uint8Array, hash: Uint8Array): Uint8Array
```
<!-- @formatter:on -->

* Parameter
    * address: Uint8Array account address
    * hash: Uint8Array slot key hash
* Return
    * Uint8Array: state value
* Example

<!-- @formatter:off -->
```typescript
const contract = hexToUint8Array("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4")
const hash = stringToUint8Array("aabbcc6a701c568545dCfcB03FcB875f56beaabb")
let state = sys.hostApi.stateDb.stateAt(contract,hash);
```
<!-- @formatter:on -->

### 3. hasSuicided

> returns if the contract is suicided in current txs.

<!-- @formatter:off -->
```typescript
public hasSuicided(addr: Uint8Array): bool
```
<!-- @formatter:on -->

* Parameter
    * address: Uint8Array account address
* Return
    * bool: suicided 
* Example

<!-- @formatter:off -->
```typescript
const contract = hexToUint8Array("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4")
const hasSuicided = sys.hostApi.stateDb.hasSuicided(contract);
```
<!-- @formatter:on -->

### 4. codeHash

> returns the code hash of account.

<!-- @formatter:off -->
```typescript
public codeHash(addr: Uint8Array): Uint8Array
```
<!-- @formatter:on -->
* Parameter
    * address: Uint8Array account address
* Return
    * Uint8Array: the current value of the refund counter
* Example

<!-- @formatter:off -->
```typescript
const contract = hexToUint8Array("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4")
let hash = sys.hostApi.stateDb.codeHash(contract);
```
<!-- @formatter:on -->

### 5. nonce

> returns the nonce of account, 0 if not exists.

<!-- @formatter:off -->
```typescript
public nonce(addr: Uint8Array): u64 
```
<!-- @formatter:on -->
* Parameter
    * address: Uint8Array account address
* Return
    * (i64): nonce
* Example
<!-- @formatter:off -->
```typescript
const contract = hexToUint8Array("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4")
let nonce = sys.hostApi.stateDb.nonce(contract);
```
<!-- @formatter:on -->


### 6. codeSize

>  returns the code size of account.

<!-- @formatter:off -->
```typescript
public codeSize(addr: Uint8Array): u64 
```
<!-- @formatter:on -->
* Parameter
    * address: Uint8Array account address
* Return
    * (i64): nonce
* Example
<!-- @formatter:off -->
```typescript
const contract = hexToUint8Array("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4")
let size = sys.hostApi.stateDb.codeSize(contract);
```
<!-- @formatter:on -->