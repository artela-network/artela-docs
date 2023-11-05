---
sidebar_position: 2
---

# Developing Smart Contracts with Artela

Artela's EVM supports smart contracts much like Ethereum. However, it not only maintains full compatibility with original version of Solidity but also introduces some enhancements, including `state` and `call stack` tracing.

If you're unfamiliar with Solidity, delve into the official [Solidity documentation](https://docs.soliditylang.org/en/v0.8.21/). This guide will spotlight crafting smart contracts leveraging Artela's advanced features.

### 1. Installing Artela SOLC (Optional)

:::note
Opt for ASOLC when you need Aspect for analyzing runtime state changes in your smart contract. Otherwise, the you can still use standard version of SOLC.
:::

Artela's SOLC variant activates these features, compiling smart contracts with tailored instruction instrumentation. Checkout the releases [here](https://github.com/artela-network/solidity/releases/tag/v0.8.20-atl) and pick the one suitable for your system (for Mac OS with Arm chip, choose `macos_arm64.tar.gz`).

Once downloaded, unpack the files and relocate the `asolc` executable to an accessible directory, say `/users/{your-account}/.bin/`.

On Unix-like systems, the package can be decompressed using:

```shell
tar -zxvf ./macos.tar.gz
```

Next, authorize the downloaded executable:

```shell
chmod +x asolc
```

To effortlessly use `asolc` globally, extend your `PATH`:

```shell
mkdir -p /users/{your-account}/.bin
mv ./asolc /users/{your-account}/.bin
export PATH=/users/{your-account}/.bin:$PATH
```

:::tip
Embed the above command into your profile for persistence, or it'll reset after the session concludes.
:::

You can then globally invoke `asolc`. To check its global accessibility, execute:

```shell
asolc --version
```

### 2. Crafting a Smart Contract

Within your project's `contracts` directory, forge a `Counter.sol` file and script the following smart contract:

```tsx
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Counter {
    uint256 private counter;
    address private owner;

    constructor() {
        this.owner = msg.sender;
    }
    
    // 'isOwner' is pivotal for aspect binding; its absence will obstruct binding.
    // The address instigating the binding must own the smart contract.
    function isOwner(address user) external view returns (bool result) {
        return user == this.owner;
    }

    function count(uint256 number) public {
        counter += number;
    }
}
```
This smart contract implemented a basic `count` method, which aggregates a specified number to an on-chain `counter` state variable. This contract will work together with our Aspect.

:::note
The `isOwner` privilege is mandatory for aspect binding.
:::

### 3. Artela SOLC Compilation

To compile your smart contract via Artela SOLC, use:

```shell
asolc --bin --abi --via-ir {your contract} -o {your output directory}
```

A successful compilation will yield `{your contract name}.abi` and `{your contract name}.bin` in `{your output directory}`.

Take note: The `--via-ir` flag is essential for state tracing.

:::note
Artela SOLC's compiled smart contract culminates in a slightly bulkier bytecode due to the added instruction sets.
This augmented bytecode might clash with original versions of EVM. Direct bytecode execution in platforms like Genache or Ethereum Remix might lead to issues.
For those not seeking these advanced tools, the standard SOLC remains an alternative. You can also omit the `--via-ir` flag during the compilation for more compact and EVM-friendly bytecode.
:::

### 4. Deploying Your Smart Contract

For deploying the smart contract using `@artela/web3.js` (a modified version of `web3.js`, provides an extra set of methods for Aspect related operations), follow the provided guidelines [here](../../../develop/web3js-guide).
