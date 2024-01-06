---
sidebar_position: 2
---

# Transaction Join Point

## Introduction

The Transaction Level Aspect defines multiple Join Points, with each one representing a distinct state transition
function at a specific stage in the [transaction lifecycle](/develop/core-concepts/lifecycle),
it needs to be binding a smart contract and activated by EOA transactions.

![img.png](../img/jp2.svg)

The current transaction is delivered to the Evm module, and Transactions are applied according to Geth's execution
logic `ApplyTransaction` ⮕ `ApplyMessage` ⮕ `evm. Call`, In this process, additional Join Points are executed, and the
process is shown in the following call graph.

* `RunMsg`
  * | ⚙ [VerifyTx join point](/develop/reference/aspect-lib/tx-level-aspect/verify-tx)
  * `ApplyTransaction`
    * ⮕ `ApplyMessageWithConfig`
      * ⚙ [PreTxExecute join point](/develop/reference/aspect-lib/tx-level-aspect/pre-tx-execute)
      * ⮕ `evm.Call`
        * ⮕ `loop opCodes`
          * | ⚙ [PreContractCall join point](/develop/reference/aspect-lib/tx-level-aspect/pre-contract-call)
          * | `evm.Interpreter.Run 0`
          * | ⚙ [PostContractCall join point](/develop/reference/aspect-lib/tx-level-aspect/post-contract-call)
            * |
            * | ⚙ [PreContractCall join point](/develop/reference/aspect-lib/tx-level-aspect/pre-contract-call)
            * | `evm.Interpreter.Run 1`
            * | ⚙ [PostContractCall join point](/develop/reference/aspect-lib/tx-level-aspect/post-contract-call)
            * | ....
            * |
      * ⚙ [PostTxExecute join point](/develop/reference/aspect-lib/tx-level-aspect/post-tx-execute)
      * ⮕ `RefundGas`

## How to Create a Transaction-Level Aspect

A complete aspect should include several components. Firstly, create your class as an implementation of the aspect. Then, import and inherit based on the join point you want to implement into your aspect, and fill in your own logic to implement these functions. The IsOwner method, serving as the permission management part of your aspect, must be implemented. Next, register your aspect class with aspect-libs. Finally, your code should include the imports and exports used by aspect-runtime, as well as the components that your aspect must contain.

For the given code snippet, where MyAspect is my aspect class:

1. Mandatory implementations include:
<!-- @formatter:off -->
```typescript
import { entryPoint, execute, allocate } from "@artela/aspect-libs";
...
class MyAspect {
  isOwner(sender: Uint8Array): bool {
    // your logic here
  }
  ...
}
...
const aspect = new MyAspect();
entryPoint.setAspect(aspect);
export { execute, allocate }
```
<!-- @formatter:on -->

2. Optional implementations may include, for example, if you want to implement join point `preTxExecute`
<!-- @formatter:off -->
```typescript
import { PreTxExecuteInput, IPreTxExecuteJP } from "@artela/aspect-libs";
...
class MyAspect implements IPreTxExecuteJP {
  preTxExecute(input: PreTxExecuteInput): void {
    // you logic here
  }
}
```
<!-- @formatter:on -->

A complete example is as follows.
<!-- @formatter:off -->
```typescript

import {
    entryPoint,
    execute,
    allocate,

    TxVerifyInput,
    PreTxExecuteInput,
    PreContractCallInput,
    PostContractCallInput,
    PostTxExecuteInput,

    ITransactionVerifier,
    IPreTxExecuteJP,
    IPreContractCallJP,
    IPostContractCallJP,
    IPostTxExecuteJP,
} from "@artela/aspect-libs";

export class MyAspect implements
    ITransactionVerifier,
    IPreTxExecuteJP,
    IPreContractCallJP,
    IPostContractCallJP,
    IPostTxExecuteJP {

    //****************************
    // Optional Methods
    //****************************

    /**
     * verifyTx is a join-point which will be invoked in both check mode and deliver mode.
     * This method is optional; remove ITransactionVerifier if you do not want to include this functionality.
     * This method is executed only for customized verification transactions.
     *
     * @param input Input of the given join-point
     * @return a 20-byte address
     */
    verifyTx(input: TxVerifyInput): Uint8Array {
        return new Uint8Array(20);
    }

    /**
     * preTxExecute is a join-point that gets invoked before the execution of a transaction.
     * This method is optional; remove IPreTxExecuteJP if you do not want to include this functionality.
     *
     * @param input Input of the given join-point
     * @return void
     */
    preTxExecute(input: PreTxExecuteInput): void {
    }

    /**
     * preContractCall is a join-point that is invoked before the execution of a contract call.
     * This method is optional; remove IPreContractCallJP if you do not want to include this functionality.
     *
     * @param input Input of the given join-point
     * @return void
     */
    preContractCall(input: PreContractCallInput): void {
    }

    /**
    * postContractCall is a join-point that gets invoked after the completion of a contract call.
    * This method is optional; remove IPostContractCallJP if you do not want to include this functionality.
    *
    * @param input Input of the given join-point
    * @return void
    */
    postContractCall(input: PostContractCallInput): void {
    }

    /**
     * postTxExecute is a join-point that gets invoked when the transaction execution is completed, and the state is not yet committed.
     * This method is optional; remove IPostTxExecuteJP if you do not want to include this functionality.
     *
     * @param input Input of the given join-point
     * @return void
     */
    postTxExecute(input: PostTxExecuteInput): void {
    }


    //****************************
    // Required Methods
    //****************************

    /**
     * isOwner is the governance account implemented by the Aspect.
     * When any governance operation, including upgrade, config, or destroy, is performed, the isOwner method is invoked to check against the initiator's account.
     * This ensures that the initiator has the necessary permission.
     *
     * @param sender Address of the operation initiator
     * @return True if the check is successful, false if the check fails
     */
    isOwner(sender: Uint8Array): bool {
        return true;
    }

}

// Register your aspect instance to aspect libs
const aspect = new MyAspect()
entryPoint.setAspect(aspect)

// Export lib methods for aspect-runtime
export { execute, allocate }

```
<!-- @formatter:on -->

## Join Point Description

Next, we will provide a detailed description of each method in the IAspectTransaction interface. You can click on the links associated with each method name to access more detailed information. It is recommended to have a prior understanding of [the concept of Joinpoints](/develop/core-concepts/join-point).

1. IsOwner

> It is the governance account implemented by the Aspect, when any of the governance operation (
including [bind](/develop/core-concepts/lifecycle#binding), [unbinding](/develop/core-concepts/lifecycle#unbinding), ...)
is made, isOwner method will be invoked to check against the initiator's account to make sure it has the permission.

2. [VerifyTx](/develop/reference/aspect-lib/verify-aspect)

> Aspect can provide transaction verification service when bound to certain dApp and EoA. If an Aspect has been bound to certain dApp and EoA as a transaction verifier, instead of doing the legacy secp256k1 signature verification, Aspect will replace it with the customized verification logic implemented in the verifyTx method.

3. [PreTxExecute](/develop/reference/aspect-lib/tx-level-aspect/pre-tx-execute)

> Triggered prior to the transaction execution. At this stage, the account state remains pristine, allowing Aspect to preload information as necessary.

4. [PreContractCall](/develop/reference/aspect-lib/tx-level-aspect/pre-contract-call)

> Triggered before the execution of the cross-contract call. For example, during a TX execution, Uniswap contract calls into Maker contract, the Aspect will be executed.

5. [PostContractCall](/develop/reference/aspect-lib/tx-level-aspect/post-contract-call)

> Triggered after the cross-contract call is executed. The Aspect can then inspect the post-call state of the contract and make subsequent execution decisions.

6. [PostTxExecute](/develop/reference/aspect-lib/tx-level-aspect/post-tx-execute)

> Activated once the transaction has been executed and the account states have been finalized. Subsequently, Aspect can conduct a comprehensive review of the final execution state.
