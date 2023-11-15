# ethereum

## 1. function

> ethereum namespace function list

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

## 2. types

Type Define :

```typescript
export interface Type {
    /**
     * encode type to hex
     */
    encodeHex(): string;

    /**
     * encode type to Uint8Array
     */
    encodeUint8Array(): Uint8Array;

    /**
     * return name of the type, used to generate function signature
     */
    typeName(): string;

    /**
     * type kind
     */
    typeKind(): TypeId;

    /**
     * true if type is dynamic, otherwise false
     */
    isDynamicType(): boolean;

    /**
     * encode size of the type
     */
    typeSize(): u64;
  }
```

Implement the `Type` class list

```typescript
enum TypeId {
    Number,
    BytesN,
    Address,
    Boolean,
    Array,
    Tuple,
    Bytes,
    String,
  }
```

### 1.ethereum.Number

<!-- @formatter:off -->
```typescript
// signed number to ethereum.Number
let number = ethereum.Number.fromI8(0);
let number = ethereum.Number.fromI16(0);
let number = ethereum.Number.fromI32(0);
let number = ethereum.Number.fromI64(0);

// unsigned number to ethereum.Number
let number = ethereum.Number.fromU8(0);
let number = ethereum.Number.fromU16(0);
let number = ethereum.Number.fromU32(0);
let number = ethereum.Number.fromU64(0);

//hex to  ethereum.Number
let number = ethereum.Number.fromHexString("0x1b");
//Uint8Array to ethereum.Number
let number = ethereum.Number.fromUint8Array([2,1]);

```
<!-- @formatter:on -->

### 2.ethereum.Int
<!-- @formatter:off -->
```typescript
//hex to  ethereum.Int
let number = ethereum.Int.fromHexString("0x1b");
//Uint8Array to ethereum.Int
let number = ethereum.Int.fromUint8Array([2,1]);
```
<!-- @formatter:on -->

### 3.ethereum.Uint
<!-- @formatter:off -->
```typescript

//hex to  ethereum.Uint
let number = ethereum.Uint.fromHexString("0x1b");
//Uint8Array to ethereum.Uint
let number = ethereum.Uint.fromUint8Array([2,1]);
```
<!-- @formatter:on -->

### 4.ethereum.Boolean
<!-- @formatter:off -->
```typescript
// signed number to ethereum.Boolean
let boolean = ethereum.Boolean.fromBoolean(true);
let boolean = ethereum.Boolean.fromUint8Array([1]);
```
<!-- @formatter:on -->

### 5.ethereum.Address
<!-- @formatter:off -->
```typescript
// hex string to ethereum.Address
let addr = ethereum.Address.fromHexString("0x1b");
//
let addr = ethereum.Address.fromUint8Array([]);
```
<!-- @formatter:on -->

### 6.ethereum.Bytes
<!-- @formatter:off -->
```typescript
// hex string to ethereum.Address
let addr = ethereum.Bytes.fromHexString("0x1b");
//
let addr = ethereum.Bytes.fromUint8Array([]);
```
<!-- @formatter:on -->

### 7.ethereum.BytesN
<!-- @formatter:off -->
```typescript
// hex string to ethereum.Address
let addr = ethereum.BytesN.fromHexString("0x1b");
//
let addr = ethereum.BytesN.fromUint8Array([]);
```
<!-- @formatter:on -->

### 8.ethereum.ByteArray
<!-- @formatter:off -->
```typescript

```
<!-- @formatter:on -->

### 9.ethereum.Tuple
<!-- @formatter:off -->
```typescript

```
<!-- @formatter:on -->