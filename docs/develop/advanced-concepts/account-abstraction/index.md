---
sidebar_position: 9
---

# Account Abstraction

Account abstraction offers a versatile solution to common issues by enabling users to embed enhanced security measures and superior user experiences directly into their accounts. For a comprehensive understanding of account abstraction, consider reading [Ethereum's articles on the topic](https://ethereum.org/en/roadmap/account-abstraction/). It provides an insightful perspective on the subject.

Artela features a built-in AA (Account Abstraction) entrypoint at the address `0x000000000000000000000000000000000000aaEC`. We encourage you to experiment with this AA entrypoint and craft your own AA wallet.

## Aspect Integration with AA

Aspects boast the capability to initiate just-in-time calls through an AA wallet during transaction execution. However, this functionality demands that the AA wallet is compatible with Aspect verification. If you wish to delegate control of your AA wallet to an Aspect, you can authenticate the Aspect sender. To do this, leverage the precompiled smart contract deployed at `0x65`. Here's how you can go about it:

```solidity
// call 0x65 with the user operation hash
(bool success, bytes memory returnData) = address(0x65).call(bytes32ToBytes(userOpHash));
// validate the return aspect id in your whitelist
// note: this is a very simple way to verify the JIT call, 
//       you may need to implement your own customized validation logic according to you needs.
validationData = success 
                ? _validateAspectId(bytesToAddress(returnData)) 
                : ASPECT_VALIDATION_FAILED;
```

The precompiled contract at `0x65` returns the address of the corresponding Aspect for a given user operation hash. This allows you to ascertain if the user operation was initiated by an Aspect on your approved list.
