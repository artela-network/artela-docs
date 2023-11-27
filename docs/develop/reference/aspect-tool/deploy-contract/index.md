# Deploy Contract

The deployment of a smart contract involves publishing the contract's binary code, Application Binary Interface (ABI),
and other necessary metadata to the `Artela` blockchain, thereby generating an associated address for the contract, making it
available on the network.

## Command

You can deploy contract using the following command:

```bash
  npm run contract:deploy -- --pkfile {privateKey-path} \                        
                           --abi ./build/contract/xxx.abi \                          
                           --bytecode ./build/contract/xxx.bin \     
                           --args [..] \                     
                           --gas 200000         
```

**options:**
> * --pkfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
> * --abi : contract abi path.
> * --bytecode:  contract bytecode path.
> * --args : If your contract's constructor requires input parameters, use `--args '[1, "a"]'` (optional).
> * --gas : e.g., `200000` (optional,default value `7000000`)
---

Specifically, the command will be executed
```shell
node scripts/contract-deploy.cjs
```
The logic for the create-account command is written in the `scripts/contract-deploy.cjs` file, primarily relying on the
implementation provided by the [@artela/web3](/develop/client/artela-web3.js) API.   
If needed, you can modify the logic within this file to achieve your specific functionalities.

Furthermore，you can modify the `project.config.json` in the project root folder [to set the network configurations.](/develop/reference/aspect-tool/guide/config#2network-rpc).

## Execution Status

If the command is executed successfully, the following log will be printed, which can record the `contractAddress`, and some commands will rely on this value.

```shell
deploy contract tx hash: 0xe0bf4ecfd6efcbf292afceb97ec8b3fd2b3eb31a6882f6b79972...
{
  blockHash: '0xf9135ed605d53ee2f6d563da263b40c56d322c00e0f582c2f2...',
  blockNumber: 304,
  contractAddress: '0x489036739ca7e4316ef683B55051ade....',
  cumulativeGasUsed: 3500000,
  from: '0x773b8da8de01c9a35dcb74e4c204c4....',
  gasUsed: 7000001,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: null,
  transactionHash: '0xe0bf4ecfd6efcbf292afceb97ec8b3fd2b3eb31a6882f6b7997....',
  transactionIndex: 0,
  type: '0x0'
}
contract address:  0x489036739ca7e4316ef683B55051a.....
--contractAccount 0x773B8Da8De01C9a35DCb74E4C204c4b...... --contractAddress 0x489036739ca7e4316ef683B55051ade155...

```