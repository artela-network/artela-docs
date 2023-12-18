# Contract Bind Aspect

Binding associates an Aspect with a specific smart contract.See [details for concept](/develop/core-concepts/lifecycle#binding).

## Command
Contract Bind Aspect using the following command:
```bash
  npm run contract:bind -- --skfile {privateKey-path} \                          
                         --contract {smart-contract-address} \
                         --abi ./build/contract/xxx.abi \                        
                         --aspectId {aspect-Id} \                          
                         --gas 200000 
```

**options:**
> * --skfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
> * --abi : contract abi path.
> * --contract:  smart contract address.
> * --aspectId:  aspect id.
> * --gas : like `200000`,(optional,default value `7000000`).
---

Specifically, the command will be executed
```shell
node scripts/bind.cjs
```
The logic for the create-account command is written in the `scripts/bind.cjs` file, primarily relying on the
implementation provided by the [@artela/web3](/develop/client/artela-web3.js) API.   
If needed, you can modify the logic within this file to achieve your specific functionalities.

## Execution Status

The bind is successful and the receipt for the transaction is printed.
```shell
sending signed transaction...
{
  blockHash: '0x5b661a010625de7bdeabc1f505b28193936cbde012bf3d...',
  blockNumber: 1128845,
  contractAddress: null,
  cumulativeGasUsed: 0,
  from: '0x554eb2f94386fdce289b8323a0f5d9d7c...',
  gasUsed: 9000001,
  logs: [],
  logsBloom: '0x00000000000000000000000000000...',
  status: true,
  to: '0x0000000000000000000000000000000000a27e14',
  transactionHash: '0x77785ae0ac85fdce90d0b1e67c39f7af21918b4ffd636b1ce71f4bc5...',
  transactionIndex: 0,
  type: '0x0'
}
== aspect bind success ==

```