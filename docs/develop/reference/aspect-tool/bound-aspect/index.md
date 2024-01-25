# Get bound Aspects

This command is used to query the information of the bound Aspect based on the account address.

## Command

```shell
npm run bound:aspect  -- --skfile {privateKey-path} \
                         --contract {smart-contract-address}  \
                         --gas 200000 
```

options：
> * --contract:  smart contract address.
> * --skfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
> * --gas : like `200000`,(optional,default value `7000000`).
---

### Example

```shell
## usage 1
npm run bound:aspect -- --contract 0x1E904b2409ca1e9b60337248d1DFc75c1882Dd3F 

## usage 2
npm run bound:aspect -- --contract 0x1E904b2409ca1e9b60337248d1DFc75c1882Dd3F \
                          --skfile ./curve_accounts.txt

```

### Command Output

If this command successful and the result printed:

```shell
## bound aspects : [{aspect id, aspect version, priority}]
bound aspects : 0xcfC6e698a9750251127e855BAEBe06729D28b96d,1,1
```

## Customize

The logic for the create-account command is written in the `scripts/get-bound-aspect.cjs` file, primarily relying on the
implementation provided by the [@artela/web3](/develop/client/artela-web3.js) API.   
If needed, you can modify the logic within this file to achieve your specific functionalities.

Furthermore，you can modify the `project.config.json` in the project root folder [to set the network configurations.](/develop/reference/aspect-tool/config#2network-rpc).
