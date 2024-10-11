# Operation

This guide provides instructions on using commands to initiate EOA transactions with Operation. For additional details
on concepts related to Operation, please refer to:
* [Processing Calls](/develop/core-concepts/aspect#processing-calls)
* [Operation Interface](/develop/reference/aspect-lib/operation)

## Commands

### 1. Operation call

This Command allows you to query the state of a Aspect Operation Interface or perform read-only operations without creating a new transaction on the blockchain.

```bash
npm run operation:call -- --skfile {privateKey-path} \
                         --callData {call-data} \
                         --aspectId {aspect-Id} \
                         --gas 200000
```

**options:**
> * --callData:  hex string call data: like '--callData 0x1167c2e50dFE34b9Ad593d2c6694731097147317'
> * --aspectId:  aspect id.
> * --skfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
> * --gas : like `200000`,(optional,default value `7000000`).
---

#### Example

```shell
## usage 1: operation call using default private key './privateKey.txt'
npm run operation:call -- --aspectId 0x06e883A11888E4A03b45298D132D870AaeB04C34 \
                          --callData 0x1167c2e50dFE34b9Ad593d2c6694731097147317  \
                          
## usage 2: operation call using private key './curve_accounts.txt'                       
npm run operation:call -- --aspectId 0x06e883A11888E4A03b45298D132D870AaeB04C34 \
                          --callData 0x1167c2e50dFE34b9Ad593d2c6694731097147317  \
                           --skfile ./curve_accounts.txt
```

#### Command Output

The bind is successful and the receipt for the transaction is printed.

```shell
operation call result: test
```

### 2. Operation Send

This Command sending a Operation transaction refers to the process of initiating and broadcasting a transaction on the Ethereum blockchain.

```bash
npm run operation:send -- --skfile {privateKey-path} \
                         --callData {call-data} \
                         --aspectId {aspect-Id} \
                         --gas 200000
                         
```

**options:**
> * --callData:  hex string call data: like '--callData 0x1167c2e50dFE34b9Ad593d2c6694731097147317'
> * --aspectId:  aspect id.
> * --skfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
> * --gas : like `200000`,(optional,default value `7000000`).
---

#### Example

```shell

## usage 1: operation send using default private key './privateKey.txt'
npm run operation:send -- --aspectId 0x06e883A11888E4A03b45298D132D870AaeB04C34 \
                          --callData 0x1167c2e50dFE34b9Ad593d2c6694731097147317  \

## usage 2: operation send using private key './curve_accounts.txt'                         
npm run operation:send -- --aspectId 0x06e883A11888E4A03b45298D132D870AaeB04C34 \
                          --callData 0x1167c2e50dFE34b9Ad593d2c6694731097147317  \
                           --skfile ./curve_accounts.txt
```

#### Command Output

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
== aspect unbind success ==

```

## Customize

The logic for the create-account command is written in the `scripts/operation.cjs` file, primarily relying on the
implementation provided by the [@artela/web3](/develop/client/artela-web3.js) API.

If needed, you can modify the logic within this file to achieve your specific functionalities.

Furthermore, you can modify the `project.config.json` in the project root
folder [to set the network configurations.](/develop/reference/aspect-tool/config#2network-rpc)

