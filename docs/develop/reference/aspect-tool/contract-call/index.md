# Contract Call

`Contract call` refers to the operation of executing a smart contract on the blockchain. Through a contract call, users
can interact with the target smart contract and execute the functions or methods defined within the contract.

## Command

You can contract call using the following command:

```shell
  npm run contract:call -- --skfile {privateKey-path}    \     
                         --contract {smart-contract-address}  \                         
                         --abi ./build/contract/xxx.abi   \                                    
                         --method {method-name}  \   
                         --args [..]
                         --gas 200000 
```

options：
> * --skfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
> * --abi : contract abi path.
> * --contract:  smart contract address.
> * --method:  method name.
> * --args : If your contract's constructor requires input parameters, use `--args '[1, "a"]'` (optional).
> * --gas : like `200000`,(optional,default value `7000000`).
---

Specifically, the command will be executed
```shell
node scripts/contract-call.cjs
```

The logic for the create-account command is written in the `scripts/contract-call.cjs` file, primarily relying on the
implementation provided by the [@artela/web3](/develop/client/artela-web3.js) API.   
If needed, you can modify the logic within this file to achieve your specific functionalities.

Furthermore，you can modify the `project.config.json` in the project root
folder [to set the network configurations.](/develop/reference/aspect-tool/guide/config#2network-rpc).

## Execution Status

The current deployment is successful and the receipt for the transaction is printed.

```shell
from address:  0x554EB2f94386fdCe289b8323a0F5d9d7...
==== reuslt=== 
{reuslt data}
```