# Send Transaction

Triggering the execution of a smart contract by sending a transaction on the blockchain. This may involve state changes,
event triggering, or the execution of other contract logic.

## Command

You can send transaction using the following command:

```shell
  npm run contract:send -- --skfile {privateKey-path}    \     
                         --contract {smart-contract-address}  \                         
                         --abi ./build/contract/xxx.abi   \                                    
                         --method {method-name}  \   
                         --args [..]
                         --gas 200000 
```

**options:**
> * --skfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
> * --abi : contract abi path.
> * --contract:  smart contract address.
> * --method:  method name.
> * --args : If your contract's constructor requires input parameters, use `--args '[1, "a"]'` (optional).
> * --gas : like `200000`,(optional,default value `7000000`).
---

Specifically, the command will be executed
```shell
node scripts/contract-send.cjs
```

The logic for the create-account command is written in the `scripts/contract-send.cjs` file, primarily relying on the
implementation provided by the [@artela/web3](/develop/client/artela-web3.js) API.   
If needed, you can modify the logic within this file to achieve your specific functionalities.

Furthermore，you can modify the `project.config.json` in the project root
folder [to set the network configurations.](/develop/reference/aspect-tool/guide/config#2network-rpc).

## Execution Status

The current deployment is successful and the receipt for the transaction is printed.

```shell
call contract tx hash: 0x739effa2f1817baa2171c271c7307180c12d73a04d99bd6...
{
  blockHash: '0x7ff306f6aeeec87ab32aab67d7ba0e478a57f8e95419b91e9de0dbe5d...',
  blockNumber: 1129168,
  contractAddress: null,
  cumulativeGasUsed: 2000000,
  from: '0x554eb2f94386fdce289b8323a0f5d9d7c3c...',
  gasUsed: 4000001,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000...',
  status: true,
  to: '0xc54f9bedf4bcab6770d5821ca41c53458...',
  transactionHash: '0x739effa2f1817baa2171c271c7307180c12d73a04d99bd666812a2...',
  transactionIndex: 0,
  type: '0x0'
}

```