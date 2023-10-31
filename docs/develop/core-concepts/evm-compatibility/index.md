---
sidebar_position: 3
---

# EVM Compatibility

Artela is fully EVM compatible. This means that you can use Artela to deploy and run smart contracts written in Solidity, Vyper, and other EVM compatible languages without any issue.

:::info 
Since we are maintaining our own forked version of EVM (we named it `Artela EVM`). So the EVM runs on Artela may not has the latest features, integration with the latest EVM will take some time. For compatibility reference, please check out the following sections.
:::

## Solidity Compatibility

The following is a list of Solidity versions that are compatible with Artela EVM.

| Artela Chain Version                                                             | Artela EVM Version                                                                   | Solidity Version | Verified |
|----------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|------------------|----------|
| [v0.4.1-beta](https://github.com/artela-network/artela/releases/tag/v0.4.1-beta) | [v0.4.1-beta](https://github.com/artela-network/artela-evm/releases/tag/v0.4.1-beta) | <= 0.8.21        | ✅        |

## Additional Op Codes

Apart from the op codes supported by the legacy version of EVM (you can check them out [here](https://www.evm.codes/?fork=shanghai)), Artela EVM has implemented some extra opcodes as the following:

:::info 
OpCodes at E0 range are for implementing runtime state tracing in Artela EVM. 
:::

 | OpCode | Name       | Description                                                                      |
 |--------|------------|----------------------------------------------------------------------------------|
 | `0xE0` | `RSVJNAL`  | Record reference type state variable storage location.                           |
 | `0xE1` | `VSVJNAL`  | Record value type state variable storage location.                               |
 | `0xE2` | `IRVVJNAL` | Record value type state variable with reference type index storage location.     |
 | `0xE3` | `IRVRJNAL` | Record reference type state variable with reference type index storage location. |
 | `0xE4` | `IVVVJNAL` | Record value type state variable with value type index storage location.         |
 | `0xE5` | `IVVRJNAL` | Record reference type state variable with value type index storage location.     |
 | `0xE6` | `VVJNAL`   | Record value type state variable change.                                         |
 | `0xE7` | `VRJNAL`   | Record reference type state variable change.                                     |

## Pre-compile Contracts

Artela EVM has full support for the pre-compile contracts in Shanghai Fork. For the full list you can check it out [here](https://www.evm.codes/precompiled?fork=shanghai). Artela EVM has also implemented some extra pre-compiles for Aspect, which are:

| Address | Name            | Params                                  | returns   | Description                                                                                           |
|---------|-----------------|-----------------------------------------|-----------|-------------------------------------------------------------------------------------------------------|
| `0x64`  | `context`       | `aspectId: address` <br/> `key: string` | `string`  | Read Aspect context values. Smart contract can use this precompile to read the data passed by Aspect. |
| `0x65`  | `userOpSender`  | `userOpHash: bytes32`                   | `address` | Check sender Aspect ID of given AA user operation.                                                    |
| `0x66`  | `contextWriter` | `key: string` <br/> `value: string`     |           | Write to Aspect context values. Smart contract can pass data to Aspect by using this precompile.      |

## RPC APIs

Artela has most of the Ethereum RPC methods implemented (some are still working in progress), so you can use Ethereum infrastructures (e.g. Metamask, The Graph) connect to Artela without any issue. For RPC methods compatibility, you can check out the details [here](client/ethereum-json-rpc).
