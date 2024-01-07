# Helper

> This Helper provides utility functions for smooth data type conversions, ensuring compatibility and simplifying the
> management of data transformations in your software application. Whether handling numeric, string, or other data
> representations, this Helper enhances overall flexibility and interoperability in your codebase.

## Import

<!-- @formatter:off -->
```javascript
import {
    uint8ArrayToHex,
    hexToUint8Array,
    stringToUint8Array,
    stringToUint8Array,
    uint8ArrayToString,
    uint8ArrayToAddress,
    uint8ArrayToBool,
    boolToUint8Array,
    arrayCopyPush,
    concatUint8Arrays,
    encodeStringUTF8,
    decodeUTF8,
    base64Encode,
    base64Decode,
    parseCallMethod,
    fromString,
    toString,
    toUint8Array,
    fromUint8Array
} from '@artela/aspect-libs';
```
<!-- @formatter:on -->

## 1. uint8ArrayToHex

> Convert the Uint8Array to a hexadecimal string

<!-- @formatter:off -->
```typescript
function uint8ArrayToHex(data: Uint8Array, prefix: string = ''): string
```
<!-- @formatter:on -->

* Parameter
    * data: Uint8Array;
    * prefix: string;
* Returns
    * string

* Example

<!-- @formatter:off -->
```typescript
import {
  uint8ArrayToHex
} from "@artela/aspect-libs";
{
  const uint8Array = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05]);
  let data =uint8ArrayToHex(u8Array);
}
```
<!-- @formatter:on -->

## 2. hexToUint8Array

> Convert the hexadecimal string y to Uint8Array

<!-- @formatter:off -->
```typescript
function hexToUint8Array(hex: string): Uint8Array
```
<!-- @formatter:on -->

* Parameter
    * hex: string;
* Returns
    * result: string;

* Example

<!-- @formatter:off -->
```typescript
import {
  hexToUint8Array
} from "@artela/aspect-libs";
{
    let hex="74657374";
    let data =hexToUint8Array(u8Array);
}
```
<!-- @formatter:on -->

## 3. stringToUint8Array

> Encodes the specified string to UTF-8 bytes, optionally null terminated. ErrorMode defaults to WTF-8.

<!-- @formatter:off -->
```typescript
export function stringToUint8Array(s: string): Uint8Array
```
<!-- @formatter:on -->

* Parameter
    * hex: string;
* Returns
    * result: string;

* Example

<!-- @formatter:off -->
```typescript
import {
  stringToUint8Array
} from "@artela/aspect-libs";
{
    let hex="test";
    let data =stringToUint8Array(u8Array);
}
```
<!-- @formatter:on -->

## 4. stringToUint8Array

> Encodes the specified string to UTF-8 bytes, optionally null terminated. ErrorMode defaults to WTF-8.

<!-- @formatter:off -->
```typescript
export function stringToUint8Array(s: string): Uint8Array
```
<!-- @formatter:on -->

* Parameter
    * hex: string;
* Returns
    * result: string;

* Example

<!-- @formatter:off -->
```typescript
import {
  stringToUint8Array
} from "@artela/aspect-libs";
{
    let hex="test";
    let data =stringToUint8Array(u8Array);
}
```
<!-- @formatter:on -->

## 5. uint8ArrayToString

> Decodes the specified buffer from UTF-8 bytes to a string, optionally null terminated.

<!-- @formatter:off -->
```typescript

function uint8ArrayToString(arr: Uint8Array): string

```
<!-- @formatter:on -->

* Parameter
    * arr: Uint8Array;
* Returns
    * result: string;

* Example

<!-- @formatter:off -->
```typescript
import {
  uint8ArrayToString
} from "@artela/aspect-libs";
{
    const uint8Array = new Uint8Array([0x74, 0x65, 0x73, 0x74]);
    let data =uint8ArrayToString(u8Array);
}
```
<!-- @formatter:on -->

## 6. uint8ArrayToAddress

> Convert the uint8Array data to ethereum address.

<!-- @formatter:off -->
```typescript

function uint8ArrayToAddress(data: Uint8Array): ethereum.Address

```
<!-- @formatter:on -->

* Parameter
    * data: Uint8Array；address bytes Uint8Array
* Returns
    * result: string;
* Example

<!-- @formatter:off -->
```typescript
import {
  uint8ArrayToAddress
} from "@artela/aspect-libs";
{
  const uint8Array = new Uint8Array([0x5B, 0x38, 0xDa, 0x6a,0x70,0x1c,0x56,0x85,0x45,0xdC,0xfc,0xB0,0x3F,0xcB,0x87,0x5f,0x56,0xbe,0xdd,0xC4]);
  let data =uint8ArrayToAddress(u8Array);
}
```
<!-- @formatter:on -->

## 7. uint8ArrayToBool

> Convert the uint8Array data to bool.

<!-- @formatter:off -->
```typescript
function uint8ArrayToBool(data: Uint8Array): bool

```
<!-- @formatter:on -->

* Parameter
    * data: Uint8Array;
* Returns
    * result: bool;
* Example

<!-- @formatter:off -->
```typescript
import {
  uint8ArrayToBool
} from "@artela/aspect-libs";
{
    const u8Array = new Uint8Array([0x01]);
    let data =uint8ArrayToBool(u8Array);
}
```
<!-- @formatter:on -->

## 8. boolToUint8Array

> Convert the bool data to Uint8Array.

<!-- @formatter:off -->
```typescript
function boolToUint8Array(b: bool): Uint8Array 
```
<!-- @formatter:on -->

* Parameter
    * b: bool;
* Returns
    * result: Uint8Array;

* Example

<!-- @formatter:off -->
```typescript
import {
  boolToUint8Array
} from "@artela/aspect-libs";
{
    let b=true;
    let data =boolToUint8Array(b);
}
```
<!-- @formatter:on -->

## 9. arrayCopyPush

> Copies the elements of the input array and appends a new element to the copied array.

<!-- @formatter:off -->
```typescript
function arrayCopyPush<T>(a: Array<T>, elem: T): Array<T>
```
<!-- @formatter:on -->

* Parameter
    * a: ArrayT; The input array to be copied.
    * elem: T; The element to be appended to the copied array.
* Returns
    * result: ArrayT; A new array containing the copied elements from the input array and the appended element.

* Example

<!-- @formatter:off -->
```typescript
import {
  arrayCopyPush
} from "@artela/aspect-libs";
{
  const inputArray = [1, 2, 3];
  const elementToPush = 4;
  // Act
  const result = arrayCopyPush(inputArray, elementToPush);
  // Assert
  expect(result).toEqual([1, 2, 3, 4]);
}
```
<!-- @formatter:on -->

## 10. concatUint8Arrays

> Concatenates two Uint8Arrays and returns a new Uint8Array containing the concatenated values.

<!-- @formatter:off -->
```typescript
function concatUint8Arrays(a: Uint8Array, b: Uint8Array): Uint8Array
```
<!-- @formatter:on -->

* Parameter
    * a: Uint8Array; The first Uint8Array to be concatenated.
    * b: Uint8Array; The first Uint8Array to be concatenated.
* Returns
    * result: Uint8Array; A new Uint8Array containing the concatenated values of a and b.
* Example

<!-- @formatter:off -->
```typescript
import {
  concatUint8Arrays
} from "@artela/aspect-libs";
{
  const a = new Uint8Array([1, 2, 3]);
  const b = new Uint8Array([4, 5, 6]);
  const result = concatUint8Arrays(a, b);
  expect(result).toEqual(new Uint8Array([1, 2, 3, 4, 5, 6]));
}
```
<!-- @formatter:on -->

## 11. encodeStringUTF8

> Encodes the specified string to UTF-8 bytes, optionally null terminated. ErrorMode defaults to WTF-8.

<!-- @formatter:off -->
```typescript
function encodeStringUTF8(str: string): ArrayBuffer 
```
<!-- @formatter:on -->

* Parameter
    * str: string;
* Returns
    * result: string;

* Example

<!-- @formatter:off -->
```typescript
import {
  encodeStringUTF8
} from "@artela/aspect-libs";
{
    let hex="test";
    let data =encodeStringUTF8(u8Array);
}
```
<!-- @formatter:on -->

## 12. decodeUTF8

> Decodes the specified buffer from UTF-8 bytes to a string, optionally null terminated..

<!-- @formatter:off -->
```typescript

function decodeUTF8(uint8Array: Uint8Array): string
```
<!-- @formatter:on -->

* Parameter
    * data: Uint8Array;
* Returns
    * result: string;

* Example

<!-- @formatter:off -->
```typescript
import {
  decodeUTF8
} from "@artela/aspect-libs";
{
  // Arrange
  const uint8Array = new Uint8Array([72, 101, 108, 108, 111]); // Example UTF-8 encoded bytes for "Hello"
  // Act
  const result = decodeUTF8(uint8Array);
  // Assert
  expect(result).toBe('Hello');
}
```
<!-- @formatter:on -->

## 13. base64Encode

> Encodes the given Uint8Array into a base64 string.

<!-- @formatter:off -->
```typescript
function base64Encode(bytes: Uint8Array): string
```
<!-- @formatter:on -->

* Parameter
    * bytes: Uint8Array; The input Uint8Array to be encoded.
* Returns
    * result: string; The base64 encoded string.

* Example

<!-- @formatter:off -->
```typescript
import {
  base64Encode
} from "@artela/aspect-libs";
{
  // Arrange
  const bytes = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in ASCII
  // Act
  const result = base64Encode(bytes);
  // Assert
  expect(result).toBe('SGVsbG8=');
}
```
<!-- @formatter:on -->

## 14. base64Decode

> Decodes the given string into a Uint8Array.

<!-- @formatter:off -->
```typescript
function base64Decode(str: string): Uint8Array
```
<!-- @formatter:on -->

* Parameter
    * str: string; The input sting to be decoded.
* Returns
    * result: Uint8Array; The base64 decoded Uint8Array.
* Example

<!-- @formatter:off -->
```typescript
import {
  base64Decode
} from "@artela/aspect-libs";
{
  const input = 'SGVsbG8gV29ybGQh'; // Base64 encoded "Hello World!"
  const expected = new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]);
  expect(base64Decode(input)).toEqual(expected);
}
```
<!-- @formatter:on -->

## 15. parseCallMethod

> Parses the call method from the given Uint8Array data and returns a string representation.

<!-- @formatter:off -->
```typescript
function parseCallMethod(data: Uint8Array): string 
```
<!-- @formatter:on -->

* Parameter
    * data: Uint8Array; The Uint8Array data to be parsed.
* Returns
    * result: string; The parsed call method as a string.

* Example

<!-- @formatter:off -->
```typescript
import {
  parseCallMethod
} from "@artela/aspect-libs";
{
  // Arrange
  const input = new Uint8Array([0x30, 0x78, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66]);
  // Act
  const result = parseCallMethod(input);
  // Assert
  expect(result).toBe('0x30786162');
}
```
<!-- @formatter:on -->

## 16. fromString

> Converts the input string to a value of type T.

<!-- @formatter:off -->
```typescript
function fromString<T>(value: string): T
```
<!-- @formatter:on -->

* Parameter
    * hex: string; The string to be converted to a value of type T.
* Returns
    * result: T; The value of type T parsed from the input string.
* Example

<!-- @formatter:off -->
```typescript
import {
  fromString
} from "@artela/aspect-libs";
{
  expect(fromString<i8>('10')).toBe(10 as i8);
  expect(fromString<u8>('20')).toBe(20 as u8);
  expect(fromString<i16>('30')).toBe(30 as i16);
}
```
<!-- @formatter:on -->

## 17. toString

> Converts the input value to a string representation.

<!-- @formatter:off -->
```typescript
function toString<T>(value: T): string 
```
<!-- @formatter:on -->

* Parameter
    * value: T; The value to be converted to a string.
* Returns
    * result: string; The string representation of the input value.

* Example

<!-- @formatter:off -->
```typescript
import {
  toString
} from "@artela/aspect-libs";
{
  expect(toString('hello')).toBe('hello');
  expect(toString(true)).toBe('1');
  expect(toString(false)).toBe('0');
  expect(toString(BigInt(123))).toBe('123');
  expect(toString(10 as i8)).toBe('10');
  expect(toString(20 as u8)).toBe('20');
  expect(toString(30 as i16)).toBe('30');
  expect(toString(40 as u16)).toBe('40');
  expect(toString(50 as i32)).toBe('50');
  expect(toString(60 as u32)).toBe('60');
  expect(toString(70 as i64)).toBe('70');
  expect(toString(80 as u64)).toBe('80');
}
```
<!-- @formatter:on -->

## 18. toUint8Array

> Converts the input value to a Uint8Array representation.

<!-- @formatter:off -->
```typescript
function toUint8Array<T>(value: T): Uint8Array
```
<!-- @formatter:on -->

* Parameter
  *value: T; The value to be converted to a Uint8Array.
* Returns
    * result: Uint8Array; The Uint8Array representation of the input value.

* Example

<!-- @formatter:off -->
```typescript
import {
  toUint8Array
} from "@artela/aspect-libs";
{
  expect(toUint8Array('hello')).toEqual(new Uint8Array([104, 101, 108, 108, 111]));
  expect(toUint8Array(true)).toEqual(new Uint8Array([1]));

}
```
<!-- @formatter:on -->

## 19. fromUint8Array

> Converts the input Uint8Array to a value of type T.

<!-- @formatter:off -->
```typescript
function fromUint8Array<T>(value: Uint8Array): T 
```
<!-- @formatter:on -->

* Parameter
    * value: Uint8Array; The Uint8Array to be converted to a value of type T.
* Returns
    * result: T; The value of type T parsed from the input Uint8Array.

* Example

<!-- @formatter:off -->
```typescript
import {
  fromUint8Array
} from "@artela/aspect-libs";
{
  expect(fromUint8Array<string>(new Uint8Array([104, 101, 108, 108, 111]))).toEqual('hello');
  expect(fromUint8Array<bool>(new Uint8Array([1]))).toEqual(true);
}
```
<!-- @formatter:on -->



