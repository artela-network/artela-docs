---
sidebar_position: 2
---

# PreContractCall

## Introduction

The PreContractCall join point occurs during the `DeliverTx` phase of the [Transaction lifecycle](https://docs.cosmos.network/v0.47/learn/beginner/tx-lifecycle).  
This join point will be invoked before the contract call is executed. Below is  call graph:

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

At this stage, the account state remains pristine, allowing Aspect to preload information as necessary.

## Example

<!-- @formatter:off -->
```typescript

/**
 * preContractCall is a join-point that gets invoked before the execution of a contract call.
 *
 * @param input Input of the given join-point
 * @return void
 */
preContractCall(input: preContractCallInput): void {
  // call to a method 'save', with value of 100
  let callData = ethereum.abiEncode('save', [
    ethereum.Number.fromU32(100, 32)
  ]);

  let sender = hexToUint8Array("0xE2AF7C239b4F2800a2F742d406628b4fc4b8a0d4");
  let request = JitCallBuilder.simple(
      sender,
      input.call!.to,
      hexToUint8Array(callData)
  ).build();

  // Submit the JIT call
  let response = sys.hostApi.evmCall.jitCall(request);
  if (!response.success) {
      sys.revert(response.errorMsg);
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

// use blockNumber, txFrom, txTo, txHash, status

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
