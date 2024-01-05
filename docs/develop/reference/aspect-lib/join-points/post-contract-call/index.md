
# PostContractCall

## Introduction

The PostContractCall join point occurs during the `DeliverTx` phase of
the [Transaction lifecycle](https://docs.cosmos.network/v0.47/learn/beginner/tx-lifecycle).
This join point will be triggered after the cross-contract call is executed. Below is `evm call` graph:

* `ApplyTransaction`
  * ⮕ `ApplyMessageWithConfig`
    * ⮕ `evm.Call`
      * ⮕ `loop opCodes`
        * | ⚙ [PreContractCall join point](/develop/reference/aspect-lib/tx-level-aspect/pre-contract-call)
        * | `evm.Interpreter.Run 0`
        * | ⚙ [PostContractCall join point](/develop/reference/aspect-lib/tx-level-aspect/post-contract-call)
        *
        * | ⚙ [PreContractCall join point](/develop/reference/aspect-lib/tx-level-aspect/pre-contract-call)
        * | `evm.Interpreter.Run 1`
        * | ⚙ [PostContractCall join point](/develop/reference/aspect-lib/tx-level-aspect/post-contract-call)
        * ....
        *
  * ⮕ `RefundGas`

At this stage, the join point has the capability to examine the post-call state of the contract, enabling it to make
informed decisions for subsequent execution.

## Example

<!-- @formatter:off -->
```typescript

/**
 * postContractCall is a join-point that gets invoked after the execution of a contract call.
 *
 * @param input Input of the given join-point
 * @return void
 */
postContractCall(input: postContractCallInput): void {
  let ethMessage = new StaticCallRequest();

  // get static call params from the aspect property
  const from = sys.hostApi.aspectProperty.get("from");
  const to = sys.hostApi.aspectProperty.get("to");
  const data = sys.hostApi.aspectProperty.get("data");

  // build the message
  ethMessage.from = from
  ethMessage.to = to
  ethMessage.gas = 400000;
  ethMessage.data = data;

  // send static call
  let staticCallresult = sys.hostApi.evmCall.staticCall(ethMessage);
  if (staticCallresult.vmError != "") {
    sys.revert("static call failed");
  }
}

```
<!-- @formatter:on -->

## Programming

There are two programming modes that can be used in this method:

1. By utilizing the 'input' input argument, it provides essential insights into transactions and block processing. see [how to use input](#how-to-use-input).

2. Using the 'sys' namespace, it provides both hight level API and low-level API access to system data and contextual information generated during blockchain runtime, including details about the environment, blocks, transactions, and utility classes such as crypto and ABI encoding/decoding. see [more details](#how-to-use-sys-apis).

**Important point**: Since the join point is in the EVM execution process, using [sys.revert()](/develop/reference/aspect-lib/components/sys#1-revert), [sys.require()](/develop/reference/aspect-lib/components/sys#3-require) in this join point will actually revert the transaction.

## How to use `input`

Explore the available information from the class diagram below.

![class.svg](class.svg)

**Parameters:**
- `input.block.number`: current block number.
- `input.call.from`: caller of the contract call.
- `input.call.to`: to address of the contract call.
- `input.call.data`: input bytes of the contract call.
- `input.call.gas`: gas limit of the contract call.
- `input.call.index`: index of the contract call.
- `input.call.value`: transfer value of the contract call.
- `input.call.ret`: return value of the contract call.
- `input.call.error`: error message of the contract call.

Utilize the fields as indicated below:

<!-- @formatter:off -->
```typescript

let blockNumer = input.block!.number
let from = input.call!.from
let to = input.call!.to
let data = input.call!.data
let gas = input.call!.gas  
let index = input.call!.index
let value = input.call!.value
let ret = input.call!.ret
let error = input.call?.error

// use the variables
...

```
<!-- @formatter:on -->

## How to use APIs

For a comprehensive overview of all APIs and their usage see [API References](/develop/reference/aspect-lib/components/overview).

Each breakpoint has access to different host APIs, and the host APIs available within the current breakpoint can be found at the following table.

| System APIs | Availability | Description |
|-------------|--------------|-------------|
| sys.revert | ✅ | Forces the current transaction to fail. |
| sys.require | ✅ | Checks if certain conditions are met; if not, forces the entire transaction to fail. |
| sys.log | ✅ | A wrapper for `sys.hostApi.util.log`, prints log messages to Artela output for debugging on the localnet. |
| sys.aspect.id | ✅ | Retrieves the ID of the aspect. |
| sys.aspect.version | ✅ | Retrieves the version of the aspect. |
| sys.aspect.mutableState | ✅ | A wrapper for `sys.hostApi.aspectState` that facilitates easier reading or writing of values of a specified type to aspect state. |
| sys.aspect.property | ✅ | A wrapper for `sys.hostApi.aspectProperty` that facilitates easier reading of values of a specified type from aspect property. |
| sys.aspect.readonlyState | ✅ | A wrapper for `sys.hostApi.aspectState` that facilitates easier reading of values of a specified type from aspect state. |
| sys.aspect.transientStorage | ✅ | A wrapper for `sys.hostApi.aspectTransientStorage` that facilitates easier reading or writing of values of a specified type to aspect transient storage. |
| sys.hostApi.aspectProperty | ✅ | Retrieves the property of the aspect as written in aspect deployment. |
| sys.hostApi.aspectState | ✅ | Retrieves or writes the state of the aspect. |
| sys.hostApi.aspectTransientStorage | ✅ | Retrieves or writes to the transient storage of the aspect. This storage is only valid within the current transaction lifecycle. |
| sys.hostApi.crypto.ecRecover | ✅ | Calls crypto methods `ecRecover`. |
| sys.hostApi.crypto.keccak | ✅ | Calls crypto methods `keccak`. |
| sys.hostApi.crypto.ripemd160 | ✅ | Calls crypto methods `ripemd160`. |
| sys.hostApi.crypto.sha256 | ✅ | Calls crypto methods `sha256`. |
| sys.hostApi.runtimeContext | ✅ | Retrieves runtime context by the key. |
| sys.hostApi.stateDb.balance | ✅ | Gets the balance of the specified address from the EVM state database. |
| sys.hostApi.stateDb.codeHash | ✅ | Gets the hash of the code from the EVM state database. |
| sys.hostApi.stateDb.codeSize | ✅ | Gets the size of the code from the EVM state database. |
| sys.hostApi.stateDb.hasSuicided | ✅ | Gets the codehash from the EVM state database. |
| sys.hostApi.stateDb.nonce | ✅ | Checks if the contract at the specified address is suicided in the current transactions. |
| sys.hostApi.stateDb.stateAt | ✅ | Gets the state at a specific point. |
| sys.hostApi.util.log | ✅ | Prints log messages to Artela output for debugging on the localnet. |
| sys.hostApi.util.revert | ✅ | Forces the transaction to fail. |
| sys.hostApi.evmCall.jitCall | ✅ | Creates a contract call and executes it immediately. |
| sys.hostApi.evmCall.staticCall | ✅ | Creates a static call and executes it immediately. |
| sys.hostApi.trace.queryCallTree | ✅ | Returns the call tree of EVM execution. |
| sys.hostApi.trace.queryStateChange | ✅ | Returns the state change in EVM execution for the specified key. |