# sys

> Provides essential system-level functionalities, including log, revert, require, etc.


## import

<!-- @formatter:off -->
```typescript
{
    sys
} from "@artela/aspect-libs";
```
<!-- @formatter:on -->

## sys

### 1. revert

> Roll back the current transaction and return the information to the node.

<!-- @formatter:off -->
```typescript
    revert(message: string)
```
<!-- @formatter:on -->

* Parameter
  * string : error message.

* Example

<!-- @formatter:off -->
```typescript
    sys.revert("error message");
```
<!-- @formatter:on -->

### 2. log

> log information to the node.

<!-- @formatter:off -->
```typescript
    log(message: string): void
```
<!-- @formatter:on -->

* Parameter
  * string : log message.

* Example

<!-- @formatter:off -->
```typescript
{
    sys.log("print message");
}
```
<!-- @formatter:on -->

### 3. require

>The require function is used to confirm the validity of the condition and if an error occurs, the termination program continues to run.

<!-- @formatter:off -->
```typescript
    require(condition: bool, message: string = ''): void
```
<!-- @formatter:on -->

* Parameter
  *  condition : bool
  * message : string

* Example

<!-- @formatter:off -->
```typescript
    sys.require(1 == 2, "Not equal")
```
<!-- @formatter:on -->

### 4. alloc

>allocates a chunk of memory of at least the specified size

<!-- @formatter:off -->
```typescript
    alloc(size: i32): i32
```
<!-- @formatter:on -->

* Parameter 
  * i32 : alloc size
* Return
  * i32 : memory pointer address

* Example

<!-- @formatter:off -->
```typescript
    sys.alloc(10)
```
<!-- @formatter:on -->