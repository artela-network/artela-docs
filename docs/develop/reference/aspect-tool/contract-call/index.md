# Contract Call

`Contract call` refers to the operation of executing a smart contract on the blockchain. Through a contract call, users
can interact with the target smart contract and execute the functions or methods defined within the contract.

## Command

You can contract call using the following command:

```shell
  npm run contract:call -- --skfile {privateKey-path} \
                         --contract {smart-contract-address}  \
                         --abi ./build/contract/xxx.abi   \
                         --method {method-name}  \
                         --args [..] \
                         --gas 200000 
```

options：
> * --abi : contract abi path.
> * --contract:  smart contract address.
> * --method:  method name.
> * --skfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
> * --args : If your contract's constructor requires input parameters, use `--args '[1, "a"]'` (optional).
> * --gas : like `200000`,(optional,default value `7000000`).
---

## Example

```shell
## usage 1: call a contract 'xxxx.sol' with hello() method, using default private key './privateKey.txt'
npm run contract:call --  --contract 0xa1ab92B67C4Bd8bb0fa1C08F29A90b375c260185 \
                          --abi ./build/contract/xxxx.abi \
                          --method hello
                        
## usage 3: call a contract 'xxxx.sol' with 'add(int32 num)' method, using private key './privateKey2.txt'.
npm run contract:call --  --contract 0xa1ab92B67C4Bd8bb0fa1C08F29A90b375c260185 \
                          --abi ./build/contract/xxxx.abi \
                          --method add \
                          --args [100]
                    
## usage 3: call a contract 'xxxx.sol' with 'unbind(address aspectId, address account)' method, using private key './privateKey2.txt'.
npm run contract:call --  --contract 0xa1ab92B67C4Bd8bb0fa1C08F29A90b375c260185 \
                          --abi ./build/contract/xxxx.abi \
                          --method unbind \
                          --args ["0xCE3ccD4a308f25B4c1B36cC883A9bEd76Bc24627","0xA90927a72F1A6c8EFAfa0cc1b432f75eCc2086d8"] \
                          --skfile ./privateKey2.txt
```

### Command Output

The current deployment is successful and the receipt for the transaction is printed.

```shell
from address:  0x554EB2f94386fdCe289b8323a0F5d9d7...
==== reuslt=== 
{reuslt data}
```

## Customize

The logic for the create-account command is written in the `scripts/contract-call.cjs` file, primarily relying on the
implementation provided by the [@artela/web3](/develop/client/artela-web3.js) API.   
If needed, you can modify the logic within this file to achieve your specific functionalities.

Furthermore，you can modify the `project.config.json` in the project root folder [to set the network configurations.](/develop/reference/aspect-tool/config#2network-rpc).
