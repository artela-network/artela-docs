---
sidebar_position: 11
---

# JIT (Just-In-Time) Call

Aspect provides the capability to execute an EVM call immediately before or after another call. This feature is known as **Just-In-Time (JIT) Call**. It allows dApps to make real-time, call-level decisions. For example, a user can leverage Aspect to monitor the price of certain symbols in a DEX contract. If the price drops below a specified threshold after a certain transaction, Aspect can immediately submit a buy-in call.

## How to Make a JIT Call?

You can initiate a JIT call with the following code:

```typescript
import { sys } from "@artela/aspect-libs";

// ...
// Construct a JIT request (similar to the user operation defined in EIP-4337)
let request = new JitInherentRequest(
    walletAddress,        // The account initiating the operation
    nonce,                // Anti-replay parameter
    initCode,             // The initCode of the account (necessary only if the account is not yet on-chain and needs to be created)
    calldata,             // The amount of gas to allocate to the main execution call
    callGasLimit,         // The amount of gas to allocate for the verification step
    verificationGasLimit, // The amount of gas to compensate the bundler for pre-verification execution, calldata, and any untrackable gas overhead on-chain
    maxFeePerGas,         // Maximum fee per gas (similar to EIP-1559 max_fee_per_gas)
    maxPriorityFeePerGas, // Maximum priority fee per gas (similar to EIP-1559 max_priority_fee_per_gas)
    paymasterAndData,     // Address of the paymaster sponsoring the transaction, followed by extra data to send to the paymaster (empty for self-sponsored transactions)
);
// Submit the JIT call
let response = sys.evm.jitCall(ctx).submit(request);
// Verify successful submission of the call
sys.require(response.success, 'Failed to submit the JIT call');
// ...
```

:::note
Please note that: to initiate a JIT call, the sender of the call must be an Aspect-enabled AA wallet. For details about AA and Aspect enabled AA wallet, please check out the contents in the [following sections](#understanding-account-abstraction).
:::

The code above triggers the following sequence:

![JIT Call](./jit-call.svg)

1. Initiating a JIT call in Aspect sends the corresponding request to the JIT Caller system module within the Aspect framework.
2. The JIT Caller encapsulates the request into a user operation and forwards it to the AA entrypoint.
3. The AA entrypoint verifies the user operation using the sender's AA wallet.
4. If the sender's AA wallet supports Aspect verification, it initiates a verification request to the pre-compiled contract at `0x65` in the Artela EVM.
5. Upon successful verification, the JIT call is integrated into the EVM callstack.

:::note
Be aware that the JIT call may fail if verification is unsuccessful (e.g., due to insufficient gas) or if the sender's AA wallet lacks Aspect verification support. Ensure to handle these scenarios in your Aspect code.
:::

## Understanding Account Abstraction

Account abstraction provides a versatile approach to addressing common issues by enabling users to incorporate advanced security features and improved user experiences directly into their accounts. For an in-depth understanding of account abstraction, consider exploring [Ethereum's articles on the topic](https://ethereum.org/en/roadmap/account-abstraction/), which offer valuable insights.

Artela includes a built-in AA (Account Abstraction) entrypoint at the address `0x000000000000000000000000000000000000aaEC`. We encourage you to experiment with this AA entrypoint and create your unique AA wallet.

:::note
Please note that the entrypoint on Artela is still experimental (since EIP4337 has not yet been adopted even within the Ethereum community). The underlying contracts will be proactively updated to introduce more features and address security issues. Exercise caution when using this feature.
:::

## Aspect Integration with AA Wallet

Aspects have the capability to initiate just-in-time calls via an AA wallet during transaction execution. However, this functionality requires that the AA wallet is compatible with Aspect verification. If you intend to delegate control of your AA wallet to an Aspect, you can authenticate the Aspect sender. This is achievable by utilizing the precompiled smart contract deployed at `0x65`. Here's the process:

```solidity
// Call 0x65 with the user operation hash
(bool success, bytes memory returnData) = address(0x65).call(bytes32ToBytes(userOpHash));
// Validate the return aspect id against your whitelist
// Note: This is a basic method to verify the JIT call. 
//       You may need to implement your customized validation logic based on your requirements.
validationData = success
? _validateAspectId(bytesToAddress(returnData))
: ASPECT_VALIDATION_FAILED;
```

The precompiled contract at `0x65` returns the address of the corresponding Aspect for a given user operation hash. This allows you to determine whether the user operation was initiated by an Aspect on your approved list.
