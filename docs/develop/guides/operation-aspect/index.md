---
sidebar_position: 3
---

# Operation Call

## Intro

Operation is a special interface. this interface can be called directly by an operation transaction signed by EoA. The
operation transaction will trigger the execution of the Aspect.

This guide provides a step-by-step walkthrough on how to create and execute a straightforward operation, offering a
comprehensive exploration of the process.

## 1. Init Aspect dApp

```bash
   npm install -g @artela/aspect-tool
   
   mkdir operation-aspect && cd operation-aspect
   
   aspect-tool init
   
   npm install
   
```

## 2. Create Blockchain Accounts (optional).

Execute the following command under project folder to create two accounts, if you don't already have one.

```bash
npm run account:create 

```

If the command is executed successfully, the following log will be printed and a `privateKey.txt` file will be
generated.

If you don't have a test token in your account, please join [our discard](https://discord.com/invite/artela)
，require testnet faucet.

## 3. Create Aspect

The Aspect source files can be found in `aspect/index.ts`. Now we add the detailed logic for the Operation, ensuring it
aligns with the intended functionality.

```typescript
// The entry file of your WebAssembly module.

import {
    allocate,
    entryPoint,
    execute,
    IAspectOperation,
    OperationInput,
    stringToUint8Array,
    sys,
} from '@artela/aspect-libs';

class AspectTest implements IAspectOperation {
    operation(input: OperationInput): Uint8Array {
        sys.require(input.callData.length > 0, 'data is lost');
        //todo something
        return stringToUint8Array('HelloWorld');
    }
}

// 2.register aspect Instance
const aspect = new AspectTest();
entryPoint.setOperationAspect(aspect);

// 3.must export it
export {execute, allocate};

```

Here the code first verifies that the input parameter is not empty, and then returns a 'HelloWorld' after todo
something;

It should be noted that registering an Operation Instance is different from other Joinpoint methods; it requires calling
entryPoint.setOperationAspect( ..) for configuration.

You can do some complex logic like: there is a whitelist Aspect that will be triggered pre-transaction execution; you
can insert and update the whitelist by operation interface.

## 4. Compile the Aspect

Build your Aspect:

```shell
npm run aspect:build
```

The resulting `release.wasm` in the build folder contains the necessary WASM bytecode.

## 5. Deploy the Aspect

Deploy your compiled Aspect:

```shell
 npm run aspect:deploy -- --wasm ./build/release.wasm 
```

> ✅ Upon successful execution, the terminal will display the `Aspect address`. It is essential to make a note of this
> address as it will be useful later on.

:::note 💡
For more detailed usage information about this command, please refer to
the [deploy-aspect command](/develop/reference/aspect-tool/deploy-aspect) documentation.
:::

## 6. Add Operation ABI

Create an abi file in your project root target, e.g. 'aspect.abi', and copy the following to the file.

```json
[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "aspectId",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "entrypoint",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "result",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

```

## 7. Call

```shell

npm run contract:call -- --contract 0x0000000000000000000000000000000000a27e14 \
                          --abi ./aspect.abi  \
                          --method entrypoint \
                          --args {aspectId} 0x1167c2e50dFE34b9Ad593d2c6694731097147317
```

If the protection succeeded, you will see

`==== reuslt=== 0x48656c6c6f576f726c64`

## 8. Send Transaction

```shell
 npm run contract:send -- --contract 0x0000000000000000000000000000000000a27e14 \
                          --abi ./aspect.abi  \
                          --method entrypoint \
                          --args {aspectId}  0x1167c2e50dFE34b9Ad593d2c6694731097147317
```

If the command succeeded, you will see a receipt like this:
```json
{
  blockHash: '0x8779c15cca64b2c92d19b00c2b61124cea3c3f4b8fd11bc...',
  blockNumber: 244493,
  contractAddress: null,
  cumulativeGasUsed: 0,
  from: '0x08d721275c6dbb33bc688b62ef....',
  gasUsed: 4000001,
  logs: [],
  logsBloom: '0x0000000000000000000000000000...',
  status: true,
  to: '0x0000000000000000000000000000000000a27e14',
  transactionHash: '0x2b50ff9acca780257ea1e70c574f4584ae3c9956cbfe8eb51...',
  transactionIndex: 0,
  type: '0x0'
}

```