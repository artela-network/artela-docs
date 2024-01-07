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

> Rollback the current transaction and return the information to the node.

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

When executes `sys.revert`, the program will be interrupted to continue execution, and a Message log will be printed on the server.

**Warning**
* If 'revert' is triggered within the Join-points of `PreContractCall, PostContractCall, PreTxExecute, PostTxExecute, and Operation`, it will revert transaction in blockchain.
* If 'revert' is executed within the `VerifyTx` pointcut, it will drop the transaction from the MemPool.

### 2. require

>The require function is used to confirm the validity of the condition and if an error occurs, the `termination program` continues to run.

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

If the condition evaluates to false, the program will be interrupted, and a message log will be printed on the server.

**Warning**
* If 'require' is triggered within the Join-points of `PreContractCall, PostContractCall, PreTxExecute, PostTxExecute, and Operation`, it will revert transaction in blockchain.
* If 'require' is executed within the `VerifyTx` pointcut, it will drop the transaction from the MemPool.


### 3. log

> Log information to the server.

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

Log printing is generally used in program debugging. However, printing too many logs will consume system performance, and it will limit this function on produce mode.
