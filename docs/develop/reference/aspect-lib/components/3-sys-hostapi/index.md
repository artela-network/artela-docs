# sys.hostApi

> Provides host APIs that communicate with wasm runtimes, including crypto, utils, stateDb, and blockchain runtime
> context.
> method entry and exit parameters are coded and decoded by protobuf, as described in each method.

## import

<!-- @formatter:off -->
```javascript
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
    * keys：string，the existing supported keys are;
      see [key context keys](/develop/reference/aspect-lib/components/context-keys)

* Returns
    * data: Uint8Array，The data type returned varies depending on the key of the
      query,see [key context key Response Type](/develop/reference/aspect-lib/components/context-keys)

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

## sys.hostApi.aspectTransientStorage

> Aspect Context is essentially a transient storage whose lifecycle is only current transaction. The Aspect Context can
> be used to enables two-way communication between Aspect and Smart Contract.

### 1. get

> Get Aspect context by key.

<!-- @formatter:off -->
```typescript

public get(key: string, aspectId: Uint8Array = new Uint8Array(0)): Uint8Array

```
<!-- @formatter:on -->

* Parameter
    * key:string context key
    * prefix:Uint8Array prefix of the key. optional. default aspectId
* Returns
    * value:Uint8Array context value
* Example

<!-- @formatter:off -->
```typescript
import {
  sys
} from "@artela/aspect-libs";

let key="test"
// inline call
let value = sys.hostApi.aspectTransientStorage.get(key);
```
<!-- @formatter:on -->

### 2. set

> Get Aspect context by key.

<!-- @formatter:off -->
```typescript

public set(key: string, value: Uint8Array): void

```
<!-- @formatter:on -->

* Parameter
    * value:T set value. The supported generics type are: u8 i8 u16 i16 u32 i32 u64 i64 string Uint8Array BigInt
* Returns
    * void
* Example

<!-- @formatter:off -->
```typescript
import {
  sys,stringToUint8Array
} from "@artela/aspect-libs";
{
  let key="test";
  let data= stringToUint8Array( "value");
  let value = sys.hostApi.aspectTransientStorage.set(key,data);
}
```
<!-- @formatter:on -->

## sys.hostApi.aspectProperty

### 1. get

> get aspect property.

<!-- @formatter:off -->
```typescript
public get(key: string): Uint8Array
```
<!-- @formatter:on -->

* Parameter
    * key:string property key
* Returns
    * value:Uint8Array property value.
* Example

 <!-- @formatter:off -->
```typescript
import {sys} from "@artela/aspect-libs";

{
  let key="test";
  let value = sys.hostApi.aspectProperty.get(key);
}
```
<!-- @formatter:on -->


## sys.hostApi.aspectState

### 1. get

> Get Aspect state by key.

<!-- @formatter:off -->
```typescript

public get(key: string): Uint8Array

```
<!-- @formatter:on -->

* Parameter
  * key:string state key
* Returns
  * value:Uint8Array state value
* Example

<!-- @formatter:off -->
```typescript
import {
  sys
} from "@artela/aspect-libs";

let key="test"
// inline call
let value = sys.hostApi.aspectState.get(key);
```
<!-- @formatter:on -->

### 2. set

> Get Aspect state by key.

<!-- @formatter:off -->
```typescript

public set(key: string, value: Uint8Array): void

```
<!-- @formatter:on -->

* Parameter
  * key:string state key
  * value:Uint8Array state value
* Returns
  * void
* Example
<!-- @formatter:off -->
```typescript
import {
  sys,stringToUint8Array
} from "@artela/aspect-libs";
{
  let key="test"
  let data= stringToUint8Array("value");
  let value = sys.hostApi.aspectState.set(key,data);
}
```
<!-- @formatter:on -->


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

> returns the code size of account.

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

## sys.hostApi.trace

> Aspects can trace the changes of a Smart Contract's state，however this tracing is facilitated by extra opcodes and IR methods generated by the ASOLC compiler。

### 1. queryStateChange

> Query state change.

<!-- @formatter:off -->
```typescript
public queryStateChange(query: StateChangeQuery): Uint8Array 
```
<!-- @formatter:on -->

* Parameter
  * query: StateChangeQuery; 
    * account: Uint8Array;  account hex string, like 0xxabcccxxxddeddd
    * stateVarName: string; state variable name like 'HoneyPot.balances'
    * indices: []Uint8Array; indices optional，
* Return
  * data: Uint8Array; EthStateChangeIndices or
* Example

<!-- @formatter:off -->
```typescript
const account = hexToUint8Array("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4");
const stateVar = 'HoneyPot.balances';

const query= new StateChangeQuery(account,stateVar,[]);
const response = sys.hostApi.trace.queryStateChange(query);
const indicesResult = Protobuf.decode<EthStateChangeIndices>(response, EthStateChangeIndices.decode);
//or set indices
const changeQuery= new StateChangeQuery(account,stateVar,indicesResult.indices);
const responseChange = sys.hostApi.trace.queryStateChange(changeQuery);
const ethStateChange = Protobuf.decode<EthStateChange>(response, EthStateChange.decode);
```
<!-- @formatter:on -->

### 2. queryCallTree

> Query trace call tree by message index.

<!-- @formatter:off -->
```typescript
public queryCallTree(query: CallTreeQuery): Uint8Array
```
<!-- @formatter:on -->

* Parameter
  * query: CallTreeQuery;
    * account: Uint8Array;  account hex string, like 0xxabcccxxxddeddd
    * stateVarName: string; state variable name like 'HoneyPot.balances'
    * indices: []Uint8Array; indices optional，
* Return
  * data: Uint8Array; EthStateChangeIndices or
* Example

<!-- @formatter:off -->
```typescript
var callTreeQuery = new CallTreeQuery(-1);
let response = sys.hostApi.trace.queryCallTree(callTreeQuery)
//if query index ==-1 result EthCallTree
const callTree = Protobuf.decode<EthCallTree>(response, EthCallTree.decode);

//or get one call message

var callTreeQuery = new CallTreeQuery(2);
let response2 = sys.hostApi.trace.queryCallTree(callTreeQuery)
//if query index == call message index, result EthCallMessage
const callMessage = Protobuf.decode<EthCallMessage>(response2, EthCallMessage.decode);
```
<!-- @formatter:on -->
