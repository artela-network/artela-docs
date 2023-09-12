---
sidebar_position: 2
---



# Develop a Smart Contract

Similar to Ethereum, EVM smart contract is also supported by Artela. Artela's EVM is fully compatible with legacy Solidity but offers additional features like `state` and `call stack` tracing.

If you're new to Solidity, we recommend exploring the official [Solidity documentation](https://docs.soliditylang.org/en/v0.8.20/) to grasp its fundamental concepts. In the following sections, we'll focus on how to build a smart contract with these enhanced features enabled.

### 1. Download Artela SOLC

Artela uses an enhanced version of SOLC to enable these features by compiling smart contracts with instruction instrumentation. You can find the releases [here](https://github.com/artela-network/solidity/releases/tag/v0.8.20-atl) and choose the version that matches your system (e.g., for Mac OS, download `macos.tar.gz`).

After downloading the compiler, extract the files and place the extracted `asolc` file in a directory for easy access (e.g., `/users/{your-account}/.bin/`).

On Unix or Unix-like systems, you can decompress the package with the following command:

```shell
tar -zxvf ./macos.tar.gz
```

After decompression, grant execution permission to the downloaded executable using this command:
```shell
chmod +x asolc
```

To make it more convenient to use `asolc` globally, you can add it to your `PATH` variable with this command:
```shell
export PATH=/users/{your-account}/.bin:$PATH
```

:::tip
Consider adding the above line to your profile, otherwise it will be gone after the session is closed.
:::

Then you will be able to call `asolc` globally, you can verify the global availability of asolc by running:
```shell
asolc --version
```


### 2. Write a Smart Contract

In your project's `contracts` directory, create a file named `Counter.sol` and implement a simple smart contract as shown below:
```tsx
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Counter {
    uint256 private counter;

        // The aspect specification should allow overriding the isOwner method.
    function isOwner(address user) external view returns (bool result) {
        return true;
    }

    function count(uint256 number) public {
        counter = counter + number;
    }
}
```
This smart contract contains a simple `count` function that takes a number and adds it to an on-chain state variable called `counter`. We'll use this smart contract in conjunction with our Aspect.

:::note
Binding an aspect requires the `isOwner` permission.
:::

### 3. Compile Your Smart Contract with Artela SOLC

Compile your smart contract using Artela SOLC with the following command:
```shell
asolc --bin --abi --via-ir {your contract} -o {your output directory}
```

If the compilation is successful, you'll find `{your contract name}.abi` and `{your contract name}.bin` in `{your output directory}`.

Please note that the `--via-ir` flag is required to enable state tracing.


> 💡 More To Know
> 
> Compiling a smart contract with Artela SOLC generates bytecode with a larger size (due to the extra instructions instrumented into the bytecode). 
> 
> This larger bytecode may not be compatible with legacy EVM versions, you may encounter execution failure if you directly execute the byte code in tools like Genache or Ethereum Remix. 
> 
> If you don't need these enhanced features, you can still use the legacy version of SOLC (or remove the `--via-ir` flag during compilation) to generate smaller and EVM-compatible bytecode.
>


### 4. Deploy your smart contract

Deploy smart contract using `@artela/web3.js` refers to here.

:::note
It is important to retain the contract address after successfully deploying the contract.
:::


