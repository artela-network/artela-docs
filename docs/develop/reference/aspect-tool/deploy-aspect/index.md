# Deploy Aspect

Deploying an Aspect is similar to deploying a smart contract, involving the publication of binary code and other
essential metadata to the blockchain. This process results in the creation of an Aspect Address, making it accessible on
the network.

## Command

You can deploy Aspect using the following command:

```bash
  npm run aspect:deploy -- --skfile {privateKey-path} \
                         --wasm ./build/release.wasm \
                         --properties [{\"key\":\"k\",\"value\":\"v\"},{\"key\":\"k1\",\"value\":\"v1\"}] \
                         --joinPoints {join point} \
                         --gas 200000
```
**options：**
> * --wasm : *wasm path. like: `--wasm ./build/release.wasm `
> * --joinPoints: specify which join points take effect，point list `PreContractCall PostContractCall PreTxExecute PostTxExecute VerifyTx`. required, like: `--joinPoints PreContractCall PostContractCall PreTxExecute PostTxExecute VerifyTx`
> * --skfile : privateKey path for sender. **optional**,default value `./privateKey.txt`.
> * --properties: aspect properties. **optional**, like: `--properties [{\"key\":\"k\",\"value\":\"v\"},{\"key\":\"k1\",\"value\":\"v1\"}]`
> * --gas : like `200000`, **optional**,default value `7000000`.

---

## Example

```shell
## usage 1: deploy a aspect './build/release.wasm' using default private key './privateKey.txt'
npm run aspect:deploy --  --wasm ./build/release.wasm \
                          --joinPoints PreContractCall PostContractCall

## usage 2: deploy a aspect './build/release.wasm' using private key './privateKey2.txt'
npm run aspect:deploy --  --skfile ./privateKey2.txt \
						  --wasm ./build/release.wasm \
                          --joinPoints PreContractCall PostContractCall

## usage 3: deploy a aspect './build/release.wasm' with  properties
npm run aspect:deploy --  --skfile ./privateKey2.txt \
						  --wasm ./build/release.wasm \
                          --joinPoints PreContractCall PostContractCall
                          --properties [{\"key\":\"k\",\"value\":\"v\"},{\"key\":\"k1\",\"value\":\"v1\"}]
                          
```

### Command Output

The current deployment is successful and the receipt for the transaction is printed. which can record the `aspectID`, and some commands will rely on this value.

```shell
{
  blockHash: '0x03d2a48d6f6281c0a32a20718b475f260d82068342f81ccf7ef8....',
  blockNumber: 377,
  contractAddress: null,
  cumulativeGasUsed: 0,
  from: '0x773b8da8de01c9a35dcb74e4c204c4b59....',
  gasUsed: 9000001,
  logs: [],
  logsBloom: '0x0000000000000000000000000....',
  status: true,
  to: '0x0000000000000000000000000000000000a27e14',
  transactionHash: '0x4731caff311fc29146f61f93db1ded27dce4ec266a165029d3d283f83...',
  transactionIndex: 0,
  type: '0x0',
  aspectAddress: '0xEf3A9A495A80eA681797A721FD4708dB0e....'
}
== deploy aspectID == 0xEf3A9A495A80eA681797A721FD4708dB0e...
```

## Customize

The logic for the create-account command is written in the `scripts/aspect-deploy.cjs` file, primarily relying on the
implementation provided by the [@artela/web3](/develop/client/artela-web3.js) API.   
If needed, you can modify the logic within this file to achieve your specific functionalities.

Furthermore，you can modify the `project.config.json` in the project root folder [to set the network configurations.](/develop/reference/aspect-tool/guide/config#2network-rpc).
