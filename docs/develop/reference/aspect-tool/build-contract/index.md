# Build Contract

Upon completing contract development, it is necessary to use the contract compilation command to verify the correctness
of the contract code and generate binary (Bin), Application Binary Interface (abi), and Storage class files. 

## Command

You can build contract by using the following command:

```shell
npm run contract:build
```

## Example

```shell
npm run contract:build
```

### Command Output

The compiled product is placed in the `build/contract` directory.it will generate xxx.bin,xxx.abi, xxx_storage.json files.
```shell
.
├── build
│   ├── contract
│   │   ├── xxx.abi
│   │   ├── xxx.bin
│   │   └── xxx_storage.json

```

## Customize

This command relies on `solc`. Specifically, will be executed
```shell
solc -o ./build/contract/ --via-ir --abi --storage-layout --bin ./contracts/*.sol  --overwrite
```
Regarding the contract compiler, you can customize the configuration based on your current environment. For detailed information, please refer to the [configuration documentation](/develop/reference/aspect-tool/config#1-contract-compiler).
