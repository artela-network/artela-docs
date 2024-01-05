# sys.aspect

> Provides an interface to access the Aspect State and Aspect Property.

## 1. sys.aspect.id

> get、set transientStorage.

<!-- @formatter:off -->
```typescript
 sys.aspect.id():string
```
<!-- @formatter:on -->

* Returns
    * aspect:string
* Example

<!-- @formatter:off -->
```typescript
const aspectId = sys.aspect.id()
```
<!-- @formatter:on -->

## 2. sys.aspect.version

> get、set transientStorage.

<!-- @formatter:off -->
```typescript
 sys.aspect.version(): u64
```
<!-- @formatter:on -->

* Returns
    * aspect:string
* Example

<!-- @formatter:off -->
```typescript
const version = sys.aspect.version()
```
<!-- @formatter:on -->

## 3. sys.aspect.readonlyState

> Readonly state

<!-- @formatter:off -->
```typescript
sys.aspect.readonlyState.get<T>(key: string):ImmutableStateValue<T>
```
<!-- @formatter:on -->

* Parameter
    * key:string state key.
* Returns
    * value:T state value. The supported generics type
      are: `u8` `i8` `u16` `i16` `u32` `i32` `u64` `i64` `string` `Uint8Array` `BigInt`
* Example

<!-- @formatter:off -->
```typescript
const value = sys.aspect.readonlyState.get<string>("key").unwrap();

```
<!-- @formatter:on -->

## 4. sys.aspect.mutableState

> get set on aspect state

<!-- @formatter:off -->
```typescript

sys.aspect.mutableState.get<T>(key: string): MutableStateValue<T>
```
<!-- @formatter:on -->

* Parameter
    * key:string state key.
* Returns
    * value:T state value. The supported generics type
      are: `u8` `i8` `u16` `i16` `u32` `i32` `u64` `i64` `string` `Uint8Array` `BigInt`
* Example

<!-- @formatter:off -->
```typescript
// 1. get string value
const value = sys.aspect.mutableState.get<string>("key").unwrap();

// 2. set (key=>value)
sys.aspect.mutableState.get<string>("key").set<string>("value");

// 3. Function Call Mode
const mutableState = sys.aspect.mutableState.get<string>("key");
mutableState.set<string>("value2");  // set (key=>value2)
mutableState.reload();  // reload state
var data = mutableState.unwrap(); // data="value2"
```
<!-- @formatter:on -->

## 5. sys.aspect.property

> get property by key.

<!-- @formatter:off -->
```typescript
sys.aspect.property.get<T>(key: string): T
```
<!-- @formatter:on -->

* Parameter
    * key:string property key.
* Returns
    * value:T property value. The supported generics type are: `u8` `i8` `u16` `i16` `u32` `i32` `u64` `i64` `string` `Uint8Array` `BigInt`
* Example

<!-- @formatter:off -->
```typescript
const value = sys.aspect.rproperty.get<string>("key");
```
<!-- @formatter:on -->

## 6. sys.aspect.transientStorage

> get、set transientStorage.

<!-- @formatter:off -->
```typescript
sys.aspect.transientStorage.get<T>(key: string, prefix: string = ''): TransientStorageValue<T>
```
<!-- @formatter:on -->

* Parameter
    * key:string  aspect context key.
* Returns
    * result:TransientStorageValue  context value. The supported generics type are: `u8` `i8` `u16` `i16` `u32` `i32` `u64` `i64` `string` `Uint8Array` `BigInt`.
* Example
<!-- @formatter:off -->
```typescript
import {
  sys
} from "@artela/aspect-libs";

let key="test"
// inline call
sys.aspect.transientStorage.get<string>(key).set<u32>(10000);

// function call
let transientStorage = sys.aspect.transientStorage.get<string>(key);
// set （test=>9999）
transientStorage.set<u32>(9999);
// reload storage, optional
transientStorage.reload();
// get value=9999
var val = transientStorage.unwrap();

```
<!-- @formatter:on -->