---
sidebar_position: 2
---

# Transaction Verification Aspect

## Introduction

Aspect can provide transaction verification service when bound to certain dApp and EoA. If an Aspect has been bound to
certain dApp and EoA as a transaction verifier, instead of doing the legacy secp256k1 signature verification, Aspect
will replace it with the customized verification logic implemented in the `verifyTx` method.

![verify.svg](verify.svg)

## Interface

```
interface ITransactionVerifier extends IAspectBase {
  verifyTx(input: TxVerifyInput): Uint8Array;
}
```

* **Parameter**
    * input: TxVerifyInput; The base layer will deliver the TxVerifyInput object to Aspect in this join point.
        - `input.block.number`: current block number.
        - `input.tx.from`: caller of the transaction.
        - `input.tx.to`: to address of the transaction.
        - `input.tx.hash`: hash of the transaction.
* **Returns**
    * Uint8Array; verified account address.

## Example

To function as a transaction verifier Aspect, an Aspect must implement the `ITransactionVerifier` interface. This
interface comprises a single method, verifyTx, which is invoked for transactions sent from an EoA without a valid ECDSA
signature.

```typescript
import {
    ITransactionVerifier, allocate, entryPoint, execute, sys, TxVerifyInput
} from "@artela/aspect-libs";

class Aspect implements ITransactionVerifier {
    verifyTx(input: TxVerifyInput): Uint8Array {
        return sys.aspect.property.get<Uint8Array>('verifyAccount');
    }

    /**
     * isOwner is the governance account implemented by the Aspect, when any of the governance operation
     * (including upgrade, config, destroy) is made, isOwner method will be invoked to check
     * against the initiator's account to make sure it has the permission.
     *
     * @param ctx context of Aspect state
     * @param sender address of the operation initiator
     * @return true if check success, false if check fail
     */
    isOwner(sender: Uint8Array): bool {
        // always return false on isOwner can make the Aspect immutable
        return true;
    }
}

// 2.register aspect Instance
const aspect = new Aspect();
entryPoint.setAspect(aspect);

// 3.must export it
export {execute, allocate};
```

## Programming Guide

There are two programming modes that can be used in this method:

1. By utilizing the 'input' input argument, it provides essential insights into transactions and block processing.
   see [how to use input](#how-to-use-input).

2. Using the 'sys' namespace, it provides both hight level API and low-level API access to system data and contextual
   information generated during blockchain runtime, including details about the environment, blocks, transactions, and
   utility classes such as crypto and ABI encoding/decoding. see [more details](#how-to-use-apis).

## Host APIs

For a comprehensive overview of all APIs and their usage
see [API References](/develop/reference/aspect-lib/components/overview).

Each join-point has access to different host APIs, and the host APIs available within the current breakpoint can be
found at the following table.

| System APIs                                                                                                                 | Availability | Description                                                                                                                                              |
|-----------------------------------------------------------------------------------------------------------------------------|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| [sys.revert](/develop/reference/aspect-lib/components/sys#1-revert)                                                         | ✅            | Forces the current transaction to fail.                                                                                                                  |
| [sys.require](/develop/reference/aspect-lib/components/sys#2-require)                                                       | ✅            | Checks if certain conditions are met; if not, forces the entire transaction to fail.                                                                     |
| [sys.log](/develop/reference/aspect-lib/components/sys#3-log)                                                               | ✅            | A wrapper for `sys.hostApi.util.log`, prints log messages to Artela output for debugging on the localnet.                                                |
| [sys.aspect.id](/develop/reference/aspect-lib/components/sys-aspect#1-sysaspectid)                                          | ✅            | Retrieves the ID of the aspect.                                                                                                                          |
| [sys.aspect.version ](/develop/reference/aspect-lib/components/sys-aspect#2-sysaspectversion)                               | ✅            | Retrieves the version of the aspect.                                                                                                                     |
| [sys.aspect.mutableState](/develop/reference/aspect-lib/components/sys-aspect#4-sysaspectmutablestate)                      | ❌            | A wrapper for `sys.hostApi.aspectState` that facilitates easier reading or writing of values of a specified type to aspect state.                        |
| [sys.aspect.property](/develop/reference/aspect-lib/components/sys-aspect#5-sysaspectproperty)                              | ✅            | A wrapper for `sys.hostApi.aspectProperty` that facilitates easier reading of values of a specified type from aspect property.                           |
| [sys.aspect.readonlyState](/develop/reference/aspect-lib/components/sys-aspect#3-sysaspectreadonlystate)                    | ✅            | A wrapper for `sys.hostApi.aspectState` that facilitates easier reading of values of a specified type from aspect state.                                 |
| [sys.aspect.transientStorage](/develop/reference/aspect-lib/components/sys-aspect#6-sysaspecttransientstorage)              | ❌            | A wrapper for `sys.hostApi.aspectTransientStorage` that facilitates easier reading or writing of values of a specified type to aspect transient storage. |
| [sys.hostApi.aspectProperty](/develop/reference/aspect-lib/components/sys-hostapi#syshostapiaspectproperty)                 | ✅            | Retrieves the property of the aspect as written in aspect deployment.                                                                                    |
| [sys.hostApi.aspectState](/develop/reference/aspect-lib/components/sys-hostapi#syshostapiaspectstate)                       | ✅            | Retrieves or writes the state of the aspect.                                                                                                             |
| [sys.hostApi.aspectTransientStorage](/develop/reference/aspect-lib/components/sys-hostapi#syshostapiaspecttransientstorage) | ❌            | Retrieves or writes to the transient storage of the aspect. This storage is only valid within the current transaction lifecycle.                         |
| [sys.hostApi.crypto.ecRecover](/develop/reference/aspect-lib/components/sys-hostapi#4-ecrecover)                            | ✅            | Calls crypto methods `ecRecover`.                                                                                                                        |
| [sys.hostApi.crypto.keccak](/develop/reference/aspect-lib/components/sys-hostapi#1-keccak)                                  | ✅            | Calls crypto methods `keccak`.                                                                                                                           |
| [sys.hostApi.crypto.ripemd160](/develop/reference/aspect-lib/components/sys-hostapi#3-ripemd160)                            | ✅            | Calls crypto methods `ripemd160`.                                                                                                                        |
| [sys.hostApi.crypto.sha256](/develop/reference/aspect-lib/components/sys-hostapi#2-sha256)                                  | ✅            | Calls crypto methods `sha256`.                                                                                                                           |
| [sys.hostApi.runtimeContext](/develop/reference/aspect-lib/components/sys-hostapi#1-get-context)                            | ✅            | Retrieves runtime context by the key.  Refer to the [runtime context](#runtime-context)  to see which keys can be accessed by the current join point.    |
| [sys.hostApi.stateDb.balance](/develop/reference/aspect-lib/components/sys-hostapi#1-balance)                               | ❌            | Gets the balance of the specified address from the EVM state database.                                                                                   |
| [sys.hostApi.stateDb.codeHash](/develop/reference/aspect-lib/components/sys-hostapi#4-codehash)                             | ❌            | Gets the hash of the code from the EVM state database.                                                                                                   |
| [sys.hostApi.stateDb.codeSize](/develop/reference/aspect-lib/components/sys-hostapi#6-codesize)                             | ❌            | Gets the size of the code from the EVM state database.                                                                                                   |
| [sys.hostApi.stateDb.hasSuicided](/develop/reference/aspect-lib/components/sys-hostapi#3-hassuicided)                       | ❌            | Gets the codehash from the EVM state database.                                                                                                           |
| [sys.hostApi.stateDb.nonce](/develop/reference/aspect-lib/components/sys-hostapi#5-nonce)                                   | ❌            | Checks if the contract at the specified address is suicided in the current transactions.                                                                 |
| [sys.hostApi.stateDb.stateAt](/develop/reference/aspect-lib/components/sys-hostapi#2-stateat)                               | ❌            | Gets the state at a specific point.                                                                                                                      |
| [sys.hostApi.evmCall.jitCall](/develop/reference/aspect-lib/components/sys-hostapi#2-jitcall)                               | ❌            | Creates a contract call and executes it immediately.                                                                                                     |
| [sys.hostApi.evmCall.staticCall](/develop/reference/aspect-lib/components/sys-hostapi#1-staticcall)                         | ✅            | Creates a static call and executes it immediately.                                                                                                       |
| [sys.hostApi.trace.queryCallTree](/develop/reference/aspect-lib/components/sys-hostapi#2-querycalltree )                    | ❌            | Returns the call tree of EVM execution.                                                                                                                  |
| [sys.hostApi.trace.queryStateChange](/develop/reference/aspect-lib/components/sys-hostapi#1-querystatechange)               | ❌            | Returns the state change in EVM execution for the specified key.                                                                                         |

## Runtime context

The Aspect Runtime Context encapsulates data generated through the consensus process. With the acquired Runtime Context
object, retrieve specific data by specifying the relevant Context Key. Each Context Key is associated with a particular
type of data or information.

### Usage

```javascript

const isCall = sys.hostApi.runtimeContext.get('isCall');
// decode BoolData
const isCallData = Protobuf.decode < BoolData > (isCall, BoolData.decode);
sys.log('is call' + ' ' + isCallData.data.toString());

const number = sys.hostApi.runtimeContext.get('block.header.number');
// decode UintData
const numberData = Protobuf.decode < UintData > (number, UintData.decode);
sys.log('block.header.number' + ' ' + numberData.data.toString(10));

```

### Key table

| Context key                                  | Value type      | Description                                                                                                                                                                               |
|----------------------------------------------|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| isCall                                       | BoolData        | Get the current transaction is **Call** or **Send**. If it is **Call**, return true.                                                                                                      |
| tx.type                                      | UintData        | Returns the transaction type id. LegacyTxType=0x00 AccessListTxType=0x01 DynamicFeeTxType=0x02 BlobTxType=0x03                                                                            |
| tx.chainId                                   | BytesData       | Returns the EIP155 chain ID of the transaction. The return value will always be non-nil. For legacy transactions which are not replay-protected, the return value is zero.                |
| tx.accessList                                | EthAccessList   | AccessListTx is the data of EIP-2930 access list transactions.                                                                                                                            |
| tx.nonce                                     | UintData        | Returns the sender account nonce of the transaction.                                                                                                                                      |
| tx.gasPrice                                  | BytesData       | Returns the gas price of the transaction.                                                                                                                                                 |
| tx.gas                                       | UintData        | Returns the gas limit of the transaction.                                                                                                                                                 |
| tx.gasTipCap                                 | BytesData       | Returns the gasTipCap per gas of the transaction.                                                                                                                                         |
| tx.gasFeeCap                                 | BytesData       | Returns the fee cap per gas of the transaction.                                                                                                                                           |
| tx.to                                        | BytesData       | Returns the recipient address of the transaction. For contract-creation transactions, To returns nil.                                                                                     |
| tx.value                                     | BytesData       | Returns the ether amount of the transaction.                                                                                                                                              |
| tx.data                                      | BytesData       | Returns the input data of the transaction.                                                                                                                                                |
| tx.bytes                                     | BytesData       | Returns the transaction marshal binary.                                                                                                                                                   |
| tx.hash                                      | BytesData       | Returns the transaction hash.                                                                                                                                                             |
| tx.unsigned.bytes                            | BytesData       | Returns the unsigned transaction marshal binary.                                                                                                                                          |
| tx.unsigned.hash                             | BytesData       | Returns the unsigned transaction hash.                                                                                                                                                    |
| block.header.number                          | UintData        | Get the current block number.                                                                                                                                                             |
| env.extraEIPs                                | IntArrayData    | Retrieve the EVM module parameters for the '**extra_eips**': defines the additional EIPs for the vm.Config.                                                                               |
| env.enableCreate                             | BoolData        | Retrieve the EVM module parameters for the '**enable_create**': toggles states transitions that use the vm.Create function.                                                               |
| env.enableCall                               | BoolData        | Retrieve the EVM module parameters for the '**enable_call**': toggles states transitions that use the vm.Call function.                                                                   |
| env.allowUnprotectedTxs                      | BoolData        | Retrieve the EVM module parameters for the '**allow_unprotected_txs**': defines if replay-protected (i.e non EIP155 // signed) transactions can be executed on the states machine.        |
| env.chain.chainId                            | UintData        | Retrieve the Ethereum chain config id.                                                                                                                                                    |
| env.chain.homesteadBlock                     | UintData        | Retrieve the Ethereum chain configuration for the '**homestead_block**': switch (nil no fork, 0 = already homestead)                                                                      |
| env.chain.daoForkBlock                       | UintData        | Retrieve the Ethereum chain configuration for the '**dao_fork_block**': corresponds to TheDAO hard-fork switch block (nil no fork)                                                        |
| env.chain.daoForkSupport                     | BoolData        | Retrieve the Ethereum chain configuration for the '**dao_fork_support**': defines whether the nodes supports or opposes the DAO hard-fork                                                 |
| env.chain.eip150Block                        | UintData        | Retrieve the Ethereum chain configuration for the '**eip150_block**': EIP150 implements the Gas price changes (https://github.com/ethereum/EIPs/issues/150) EIP150 HF block (nil no fork) |
| env.chain.eip155Block                        | UintData        | Retrieve the Ethereum chain configuration for the '**eip155_block**'.                                                                                                                     |
| env.chain.eip158Block                        | UintData        | Retrieve the Ethereum chain configuration for the '**eip158_block**'.                                                                                                                     |
| env.chain.byzantiumBlock                     | UintData        | Retrieve the Ethereum chain configuration for the '**byzantium_block**': Byzantium switch block (nil no fork, 0 =already on byzantium)                                                    |
| env.chain.constantinopleBlock                | UintData        | Retrieve the Ethereum chain configuration for the '**constantinople_block**': Constantinople switch block (nil no fork, 0 = already activated)                                            |
| env.chain.petersburgBlock                    | UintData        | Retrieve the Ethereum chain configuration for the '**petersburg_block**': Petersburg switch block (nil no fork, 0 = already activated)                                                    |
| env.chain.istanbulBlock                      | UintData        | Retrieve the Ethereum chain configuration for the '**istanbul_block**': Istanbul switch block (nil no fork, 0 = already on istanbul)                                                      |
| env.chain.muirGlacierBlock                   | UintData        | Retrieve the Ethereum chain configuration for the '**muir_glacier_block**': Eip-2384 (bomb delay) switch block ( nil no fork, 0 = already activated).                                     |
| env.chain.berlinBlock                        | UintData        | Retrieve the Ethereum chain configuration for the '**berlin_block**': Berlin switch block (nil = no fork, 0 = already on berlin)                                                          |
| env.chain.londonBlock                        | UintData        | Retrieve the Ethereum chain configuration for the '**london_block**': London switch block (nil = no fork, 0 = already on london)                                                          |
| env.chain.arrowGlacierBlock                  | UintData        | Retrieve the Ethereum chain configuration for the '**arrow_glacier_block**': Eip-4345 (bomb delay) switch block (nil = no fork, 0 = already activated)                                    |
| env.chain.grayGlacierBlock                   | UintData        | Retrieve the Ethereum chain configuration for the '**gray_glacier_block**': EIP-5133 (bomb delay) switch block (nil = no fork, 0 = already activated)                                     |
| env.chain.mergeNetSplitBlock                 | UintData        | Retrieve the Ethereum chain configuration for the '**merge_netsplit_block**': Virtual fork after The Merge to use as a network splitter.                                                  |
| env.chain.shanghaiTime                       | UintData        | Retrieve the Ethereum chain configuration for the '**shanghaiTime**': Shanghai switch time (nil = no fork, 0 = already on shanghai).                                                      |
| env.chain.cancunTime                         | UintData        | Retrieve the Ethereum chain configuration for the '**CancunTime**': Cancun switch time (nil = no fork, 0 = already on cancun).                                                            |
| env.chain.pragueTime                         | UintData        | Retrieve the Ethereum chain configuration for the '**PragueTime**': Prague switch time (nil = no fork, 0 = already on prague).                                                            |
| env.consensusParams.block.maxGas             | IntData         | Retrieve the max gas per block.                                                                                                                                                           |
| env.consensusParams.block.maxBytes           | IntData         | Retrieve the max block size, in bytes.                                                                                                                                                    |
| env.consensusParams.evidence.maxAgeDuration  | IntData         | Retrieve the max age duration.It should correspond with an app's "unbonding period" or other similar mechanism for handling.                                                              |
| env.consensusParams.evidence.maxAgeNumBlocks | IntData         | The basic formula for calculating this is: MaxAgeDuration / {average block time}.                                                                                                         |
| env.consensusParams.evidence.maxBytes        | IntData         | Retrieve the maximum size of total evidence in bytes that can be committed in a single block.                                                                                             |
| env.consensusParams.validator.pubKeyTypes    | StringArrayData | Restrict the public key types validators can use.                                                                                                                                         |
| env.consensusParams.appVersion               | UintData        | Get the ABCI application version.                                                                                                                                                         |
| aspect.id                                    | BytesData       | Returns current aspect id.                                                                                                                                                                |
| aspect.version                               | UintData        | Returns current aspect version.                                                                                                                                                           |

## To trigger

To trigger the 'VerifyTx' join point, a customized verification transaction without a signature is necessary. The format
of this transaction is as follows:

```shell
magic prefix + checksum(encodedData) + encodedData(validation data + raw calldata)
```

**Description：**
> * 0xCAFECAFE serves as a stable value with a magical prefix.
> * checksum(encodedData) represents a 4-byte checksum of the encoded data.
> * encodedData is the result of ABI encoding, combining validation data and raw call data using `ABI.encode(
    ValidationData, CallData)."

Example:

```shell
0xCAFECAFE75bac07d00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000
0000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000557d7cfdeff97cbabdc4124c779d51
bb2520cbdc769840c6fee4566e23c7c22ea2a3e071dc794283b70608de4566c9dc0fd5f1854d7032676996fd95284693ecad5b2eeca9864734af5131
ed015c52cd1b5b3d9f841c000000000000000000000000000000000000000000000000000000000000000000000000000000000000241003e2d2000
000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000
```

* 0xCAFECAFE75 is a magical prefix.
* 75bac07d is 4-byte checksum of the encoded data.
* The remaining bytes represent the result of ABI encoding for ValidationData and CallData.

### Create customized verification transaction

The TypeScript code facilitates the creation of an unsigned Ethereum transaction with validation data. It covers the
steps to construct, encode, sign the transaction, and prepare validation data for verification. This approach can be
adapted to other programming languages like Go and Python.

The code relies on the [@ethereumjs/tx](https://www.npmjs.com/package/@ethereumjs/tx) package, part of the EthereumJS
Transaction library. This package is designed to
handle Ethereum transactions, offering capabilities for creating, parsing, and manipulating transactions on the Ethereum
blockchain.

```typescript
//import package
const {LegacyTransaction: EthereumTx} = require('@ethereumjs/tx')
const {BigNumber} = require('bignumber.js');

/**
 * Asynchronously creates an unsigned transaction using the provided parameters.
 * @param {Object} web3 - The web3 instance for interacting with the Ethereum network.
 * @param {string} walletAddress - The address of the wallet initiating the transaction.
 * @param {string} sKeyPrivKey - The private key used for signing the transaction. like: let sKeyPrivKey = web3.eth.accounts.create(web3Artela.utils.randomHex(32)).privateKey;
 * @param {string} contractCallData - The data for the contract call. like: let contractCallData = contract.methods.add([1]).encodeABI();
 * @param {string} toAddress - The address of the recipient.
 * @returns {string} - The serialized unsigned transaction.
 */
async function createUnsignTx(web3, walletAddress, sKeyPrivKey, contractCallData, toAddress) {
    // Convert private key to account
    let sKeyAccount = web3.eth.accounts.privateKeyToAccount(sKeyPrivKey);

    // Get gas price, nonce, and chain ID
    let gasPrice = await web3.eth.getGasPrice();
    let nonce = await web3.eth.getTransactionCount(walletAddress);
    let chainId = await web3.eth.getChainId();

    // Set gas and gas limit
    let gas = 8000000;
    let gasLimit = 20000000;

    // Construct the transaction object
    let tx = {
        from: sKeyAccount.address,
        nonce: nonce,
        gasPrice,
        gas: 8000000,
        data: contractCallData,
        to: toAddress,
        chainId,
        gasLimit: gasLimit
    }

    // Sign the transaction
    let signedTx = await web3.eth.accounts.signTransaction(tx, sKeyPrivKey);

    // Prepare validation data
    let validationData = "0x" + walletAddress.slice(2) + padStart(rmPrefix(signedTx.r), 64, "0") +
        padStart(rmPrefix(signedTx.s), 64, "0") + rmPrefix(getOriginalV(signedTx.v, chainId));

    // Encode the data
    let encodedData = web3.eth.abi.encodeParameters(['bytes', 'bytes'], [validationData, contractCallData]);

    // Append magic prefix and checksum to the encoded data
    encodedData = '0xCAFECAFE' + web3.utils.keccak256(encodedData).slice(2, 10) + encodedData.slice(2);

    // Update the transaction object with the encoded data
    tx = {
        from: walletAddress,
        nonce: toPaddedHexString(nonce),
        gasPrice: toPaddedHexString(gasPrice),
        gas: toPaddedHexString(gas),
        data: encodedData,
        to: toAddress,
        chainId: toPaddedHexString(chainId),
        gasLimit: toPaddedHexString(gasLimit),
    }

    // Return the serialized unsigned transaction
    return '0x' + bytesToHex(EthereumTx.fromTxData(tx).serialize());
}

/**
 * Removes the '0x' prefix from the given string.
 * @param {string} str - The input string.
 * @returns {string} - The string without the '0x' prefix.
 */
function rmPrefix(str) {
    return str.startsWith('0x') ? str.substring(2) : str;
}

/**
 * Converts a hexadecimal V value and chain ID to the original V value in hexadecimal format.
 * @param {string} hexV - The hexadecimal V value.
 * @param {string} chainId_ - The chain ID.
 * @returns {string} - The original V value in hexadecimal format.
 */
function getOriginalV(hexV, chainId_) {
    // Convert hexV and chainId_ to BigNumber objects
    const v = new BigNumber(hexV, 16);
    const chainId = new BigNumber(chainId_);

    // Calculate the original V value
    const chainIdMul = chainId.multipliedBy(2);
    const originalV = v.minus(chainIdMul).minus(8);
    const originalVHex = originalV.toString(16);
    return originalVHex;
}

/**
 * Processes and concatenates an array of strings, removing prefixes and validating length.
 * @param {string[]} strings - An array of strings to process and concatenate.
 * @returns {string} - The concatenated processed strings.
 */
function processAndConcatStrings(strings) {
    return strings.map(str => {
        // Remove prefix from the string
        const processedStr = this.rmPrefix(str);

        // Validate the length of the processed string
        if (processedStr.length !== 8) {
            throw new Error(`Processed string length is not 8: ${processedStr}`);
        }

        return processedStr;
    }).join('');
}

/**
 * Converts a uint8 value to its hexadecimal representation.
 * @param {number} value - The uint8 value to convert.
 * @returns {string} - The hexadecimal representation of the uint8 value.
 */
function uint8ToHex(value) {
    // Validate the range of the value
    if (value < 0 || value > 255) {
        throw new Error('Value is out of range for a uint8');
    }

    // Convert the uint8 value to hexadecimal
    let buffer = Buffer.alloc(2);
    buffer.writeInt16BE(value, 0);
    return buffer.toString('hex').padStart(4, '0');
}

/**
 * Pads a string with a specified padString to a target length.
 * @param {string} str - The input string to pad.
 * @param {number} targetLength - The target length of the padded string.
 * @param {string} padString - The string to use for padding.
 * @returns {string} - The padded string.
 */
function padStart(str, targetLength, padString) {
    targetLength = Math.max(targetLength, str.length);
    padString = String(padString || ' ');

    if (str.length >= targetLength) {
        return str;
    } else {
        targetLength = targetLength - str.length;
        if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length);
        }
        return padString.slice(0, targetLength) + str;
    }
}

/**
 * Converts an array of bytes to a hexadecimal string.
 * @param {number[]} bytes - An array of bytes to convert.
 * @returns {string} - The hexadecimal representation of the input bytes.
 */
function bytesToHex(bytes) {
    return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}

/**
 * Converts a number to a padded hexadecimal string with '0x' prefix.
 * @param {number} num - The input number to convert.
 * @returns {string} - The padded hexadecimal string with '0x' prefix.
 */
function toPaddedHexString(num) {
    let hex = num.toString(16);

    if (hex.length % 2 !== 0) {
        hex = '0' + hex;
    }

    return '0x' + hex;
}

```
