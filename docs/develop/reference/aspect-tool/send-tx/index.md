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

## Example

```shell
## usage 1: send a contract 'xxxx.sol' with hello() method, using default private key './privateKey.txt'
npm run contract:send --  --contract 0xa1ab92B67C4Bd8bb0fa1C08F29A90b375c260185 \
                          --abi ./build/contract/HelloWorld.abi \
                          --method hello
                        
## usage 3: call a contract 'xxxx.sol' with 'add(address aspectId, address account)' method, using private key './privateKey2.txt'.
npm run contract:send --  --contract 0xa1ab92B67C4Bd8bb0fa1C08F29A90b375c260185 \
                          --abi ./build/xxxx.abi \
                          --method add \
                          --args [100]
                    
## usage 3: call a contract 'xxxx.sol' with 'unbind(address aspectId, address account)' method, using private key './privateKey2.txt'.
npm run contract:send --  --contract 0xa1ab92B67C4Bd8bb0fa1C08F29A90b375c260185 \
                          --abi ./build/xxxx.abi \
                          --method unbind \
                          --args ["0xCE3ccD4a308f25B4c1B36cC883A9bEd76Bc24627","0xA90927a72F1A6c8EFAfa0cc1b432f75eCc2086d8"] \               
                          --skfile ./privateKey2.txt
```

### Command Output

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

## Customize

The logic for the create-account command is written in the `scripts/contract-send.cjs` file, primarily relying on the
implementation provided by the [@artela/web3](/develop/client/artela-web3.js) API.   
If needed, you can modify the logic within this file to achieve your specific functionalities.

Furthermore，you can modify the `project.config.json` in the project root
folder [to set the network configurations.](/develop/reference/aspect-tool/config#2network-rpc).