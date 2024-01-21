---
sidebar_position: 3
---

# Smart Contract and Aspect Communication via Transient Storage

## Intro

Here's the detailed process for data interchange between a smart contract and Aspect using `transientStorage`.

In this scenario, data is written at the `preTxExecute` join point, allowing the contract to read the data through the
`getAspectContext` method. Furthermore, data is written in the contract's `setAspectContext` method, and the written data is
subsequently retrieved during the `preTxExecute` join point.

## 1. Init Aspect dApp

```bash
   npm install -g @artela/aspect-tool
   
   mkdir contract-aspect && cd contract-aspect
   
   aspect-tool init
   
   npm install
   
```

## 2. Create Blockchain Accounts (optional).

Execute the following command under project folder to create two accounts, if you don't already have one.

```bash
npm run account:create 

```

✅ If an account gets created successfully, its private key will be dumped as `privateKey.txt` in the current directory.

If you don't have a test token in your account, please join [our discard](https://discord.com/invite/artela)
，require testnet faucet.

## 3. Create Smart Contract

Within the `contracts` directory of your project, create your smart contract source files with a `.sol` extension.

For example, create a `Storage.sol` file:

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Storage {
    address private deployer;

    constructor() {
        deployer = msg.sender;
    }

    function isOwner(address user) external view returns (bool result) {
        if (user == deployer) {
            return true;
        } else {
            return false;
        }
    }

    function getAspectContext(address aspectId, string calldata key) public returns (string memory validationData) {
        bytes memory contextKey = abi.encodePacked(aspectId, key);
        (bool success, bytes memory returnData) = address(0x64).call(contextKey);
        validationData = success ? string(returnData) : '';
    }

    function setAspectContext(string calldata key, string calldata value) public returns (bool) {
        bytes memory contextKey = abi.encode(key, value);
        (bool success,) = address(0x66).call(contextKey);
        return success;
    }
}
```

During the execution of the smart contract, store the data that needs to be shared in the transientStorage.

* getAspectContext(...) : The getAspectContext function allows access to the precompile address (0x64) by making a call
  to retrieve the aspect context. This context includes data that has been written to transientStorage by the
  PreTxExecute and PreContractCall join-points.

* setAspectContext(...) : The setAspectContext function facilitates access to the precompile address (0x66) by making a
  call to set the aspect context. This operation involves writing data to transientStorage, and the data becomes
  accessible through the PostContractCall and PostTxExecute join-points.

## 4. Deploy Contract

```shell

mkdir -p ./build/contract

npm run contract:build

## deploy contract
npm run contract:deploy -- --abi ./build/contract/Storage.abi  --bytecode ./build/contract/Storage.bin 
```

✅ Upon successful deployment, the terminal will display the `contractAddress`. Please take note of it, it will be
utilized in the upcoming commands.

```shell
...
--contractAccount 0xaa19F4957C890518b577205c41C706F1c07fa0cc --contractAddress 0xFe4b65F17554B45eF7D146B86E030da7A4e250bb
```

## 5. Create Aspect

The Aspect source files can be found in `aspect/index.ts`. We will add the following logic to exchange data with Smart
Contract.

* In the preTxExecute pointcut, the key-value pair `ToContract => HelloWorld` is written to transientStorage before the
  contract is executed. Subsequently,call the `getAspectContext({aspectId},'ToContract')` method in the contract can
  retrieve the value 'HelloWorld'.

* After the entry point following the `postTxExecute` occurs and the contract is executed, you can obtain the value of
  the
  `setAspectContext()` contract method by calling  `transientStorage.get()` at this pointcut.

```typescript
import {
    allocate,
    entryPoint,
    ethereum,
    execute,
    IPostTxExecuteJP,
    IPreTxExecuteJP,
    PostTxExecuteInput,
    PreTxExecuteInput,
    sys, BytesData,
    uint8ArrayToHex,
} from '@artela/aspect-libs';
import {Protobuf} from "as-proto/assembly";

class StoreAspect
    implements IPostTxExecuteJP, IPreTxExecuteJP {
    isOwner(sender: Uint8Array): bool {
        return true
    }

    preTxExecute(input: PreTxExecuteInput): void {
        //for smart contract call
        sys.aspect.transientStorage.get<string>('ToContract').set<string>('HelloWorld');
    }

    postTxExecute(input: PostTxExecuteInput): void {
        const to = uint8ArrayToHex(input.tx!.to);
        let txData = sys.hostApi.runtimeContext.get("tx.data");
        const txDataPt = Protobuf.decode<BytesData>(txData, BytesData.decode);
        const parentCallMethod = ethereum.parseMethodSig(txDataPt.data);
        const value = sys.aspect.transientStorage.get<string>('ToAspect', to).unwrap();
        // setAspectContext method signature value is `9cf3ef1e`
        if (parentCallMethod == "9cf3ef1e") {
            //'HelloAspect' here is set from smart contract
            sys.require(value == "HelloAspect", "failed to get value by contract setting.");
        }
    }

}

// 2.register aspect Instance
const aspect = new StoreAspect();
entryPoint.setAspect(aspect);

// 3.must export it
export {execute, allocate};

```

## 6. Deploy the Aspect

Build your Aspect:

```shell
npm run aspect:build
```

The resulting `release.wasm` in the build folder contains the necessary WASM bytecode.

Deploy your compiled Aspect:

```shell
 npm run aspect:deploy -- --wasm ./build/release.wasm  \
                           --joinPoints PreTxExecute PostTxExecute 
```

> ✅ Upon successful execution, the terminal will display the `Aspect address`. It is essential to make a note of this
> address as it will be useful later on.

:::note 💡
For more detailed usage information about this command, please refer to
the [deploy-aspect command](/develop/reference/aspect-tool/deploy-aspect) documentation.
:::

## 7. Bind the Contract and Aspect

Deploying the Aspect doesn't automatically activate it. To make it functional, bind it to a smart contract:

```shell
   npm run contract:bind -- --contract {contractAddress} \
                            --abi ./build/contract/Storage.abi \
                            --aspectId {aspect-Id}
```

* replace the placeholder {contractAddress} with the information obtained from step 4. deploy the smart contract.
* replace the placeholder {aspect-Id} with the information obtained from step 6. Deploy the Aspect.

If the command is executed successfully, will see `== aspect bind success == `.

## 8. Test GetAspectContext

Now, let's check whether the `GetAspectContext` method in the contract is able to retrieve the values written at
the `preTxExecute` join point.

```shell
 npm run contract:call -- --contract {contractAddress} \
                          --abi ./build/contract/Storage.abi  \
                          --method getAspectContext \
                          --args {aspectId} ToContract
```

If the command is executed successfully, will see

```shell
==== reuslt=== HelloWorld
```

## 8. Test SetAspectContext

Now, let's verify whether the `SetAspectContext` method in the contract has been successfully executed and written.

```shell
 npm run contract:call -- --contract {attackAddress} \
                          --abi ./build/contract/Storage.abi  \
                          --method setAspectContext \
                          --args ToAspect HelloAspect
```

If the command is executed successfully, will see

```shell
==== reuslt=== true
```
 