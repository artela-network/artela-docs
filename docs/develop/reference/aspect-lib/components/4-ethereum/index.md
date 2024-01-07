# ethereum

>Offers functionalities for accessing and interacting with smart contracts, including ABI (Application Binary Interface) handling, as well as encoding and decoding for various data types.

## 1. Function

> Several methods commonly used for ABI operations are defined, ethereum namespace function list.

### 1. abiEncode

>  abi encode

<!-- @formatter:off -->
```typescript
   function abiEncode(method: string, types: Type[]): string
```
<!-- @formatter:on -->

* Parameter
    * string : method
    * types : ethereum.Type array
* Returns
    * abi encode hex string

* Example
<!-- @formatter:off -->
```typescript
import {
  ethereum
} from "@artela/aspect-libs";

{
  let payload = ethereum.abiEncode('store', [num]);
}
```
<!-- @formatter:on -->

### 2. parseMethodSig

>  parse Method signature

<!-- @formatter:off -->
```typescript
   function parseMethodSig(calldata: Uint8Array): string
```
<!-- @formatter:on -->

* Parameter
  * Uint8Array : method name bytes.
* Returns
  * string : string method name

* Example
<!-- @formatter:off -->
```typescript
import {ethereum} from "@artela/aspect-libs";

{
    // parseMethodSig to string  "add"
  let add = ethereum.parseMethodSig([4f2be91f]);
}
```
<!-- @formatter:on -->

### 3. computeMethodSig

>  compute Method signature

<!-- @formatter:off -->
```typescript
   function computeMethodSig(method: string): string
```
<!-- @formatter:on -->

* Parameter
  * string : method name
* Returns
  * string : method signature hex string

* Example
<!-- @formatter:off -->
```typescript
import {ethereum} from "@artela/aspect-libs";

{
    // parseMethodSig to string  "f2be91f"
  let addSig = ethereum.computeMethodSig("add");
}
```
<!-- @formatter:on -->

---

## 2. Types

> Define the data type in the smart contract and the data type conversion, encoding, and decoding operations of AssemblyScript.

1. <a href="/api/docs/classes/common.ethereum.Address.html" target="_blank">ethereum.Address</a>
2. <a href="/api/docs/classes/common.ethereum.ArraySlice.html" target="_blank">ethereum.ArraySlice</a>
3. <a href="/api/docs/classes/common.ethereum.Boolean.html" target="_blank">ethereum.Boolean</a> 
4. <a href="/api/docs/classes/common.ethereum.ByteArray.html" target="_blank">ethereum.ByteArray</a> 
5. <a href="/api/docs/classes/common.ethereum.Bytes.html" target="_blank">ethereum.Bytes</a> 
6. <a href="/api/docs/classes/common.ethereum.BytesN.html" target="_blank">ethereum.BytesN</a> 
7. <a href="/api/docs/classes/common.ethereum.Int.html" target="_blank">ethereum.Int</a> 
8. <a href="/api/docs/classes/common.ethereum.Number.html" target="_blank">ethereum.Number</a> 
9. <a href="/api/docs/classes/common.ethereum.String.html" target="_blank">ethereum.String</a> 
10. <a href="/api/docs/classes/common.ethereum.Tuple.html" target="_blank">ethereum.Tuple</a> 
11. <a href="/api/docs/classes/common.ethereum.Uint.html" target="_blank">ethereum.Uint</a> 


## 3. UseCases

generate the abi encode of the function `function execute(address account,uint64 num,bytes calldata data) public `

```typescript

let contractAddress="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
let txData="0x112233"

const callData = ethereum.abiEncode('execute', [
  ethereum.Address.fromHexString(contractAddress),
  ethereum.Number.fromU64(0),
  ethereum.Bytes.fromHexString(txData),
]);
```