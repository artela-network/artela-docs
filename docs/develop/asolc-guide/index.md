# ASOLC Guide

# 1. What’s ASOLC?

Similar to Ethereum, Artela supports EVM smart contracts. However, Artela runs a modified version of the EVM, which is fully compatible with legacy Solidity but includes additional features such as `state` and `call stack` tracing.

To achieve this, Artela uses an enhanced version of **SOLC,** called **ASOLC**. ASOLC compiles smart contracts with instruction instrumenting to enable these features.

# 2. Download ASOLC

You can find ASOLC releases [here](https://github.com/artela-network/solidity/releases/tag/v0.8.21-atl). Choose the version that matches your system (e.g., for macOS, `download macos.tar.gz`).

Once downloaded, extract the file and place the `asolc` executable in a directory that's easy for you to access (e.g., `/users/{your-account}/.bin/`).

If you're using a Unix or Unix-like system, you can decompress the package with this command:

```bash
tar -zxvf ./macos.tar.gz
```

After decompression, you may need to grant execution permission to the downloaded executable with this command:

```shell
chmod +x asolc
```
To make it more convenient to use `asolc` in the future, you can add it to your `PATH` variable:

```tsx
export PATH=/users/{your-account}/.bin:$PATH
```

> 💡 You can add the above line to your profile so that it persists beyond the current session.
> 

You can verify the installation by checking the version of `asolc` with this command:

```shell
asolc --version
```

# 3. Compile Your Smart Contract with ASOLC

To compile your smart contract using Artela SOLC, use the following command:

```bash
asolc --bin --abi --via-ir {your contract} -o {your output directory}
```

Note that the `--via-ir` flag is required to enable state tracing.

> 💡 More to know
> 
> Compiling smart contracts with Artela SOLC results in larger bytecode size due to the additional instructions for state tracing. This bytecode might not be compatible with the legacy EVM version, and you may encounter execution failures if you attempt to execute it directly in tools like Ganache or Ethereum Remix.
> 
> These features are optional. If you don't need state tracing or any of the additional features, you can still use the legacy version of SOLC (or remove the --via-ir flag from the compilation command) to compile your smart contract. This will generate smaller bytecode that is compatible with Ethereum's EVM.
