# Helper

>Offers functionalities for accessing and interacting with smart contracts, including ABI (Application Binary Interface) handling, as well as encoding and decoding for various data types.

## 1. Function

> Several methods commonly used for ABI operations are defined, ethereum namespace function list.

### 1. uint8ArrayToHex

>  convert uint8Array to hex string

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
    let u8Array=[];
    let data =uint8ArrayToHex(u8Array);
}
```
<!-- @formatter:on -->
