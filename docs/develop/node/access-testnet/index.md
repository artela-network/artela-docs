
# Accessing Testnet

**Option 1: Connect to Artela Testnet via RPC**

You can access the JSON-RPC port service through these URLs:

    https://testnet-rpc1.artela.network
    https://testnet-rpc2.artela.network
    https://testnet-rpc3.artela.network
    https://testnet-rpc4.artela.network

**Option 2: Establish Your Own Local Private Testnet**

For detailed steps, see [Run a Local Node](./full-node-setup).

Once you've initiated the node, connect to the JSON-RPC port service here:

    http://127.0.0.1:8545

## Public Information on Testnet

### 1. Genesis

[genesis.json](./genesis.json)

> **Admin**: Getting the genesis from the home directory `$HOME/.aretlad/config/genesis.json`of any node.
>

### 2. Presistent nodes

```json
ef1777650f2a5f96cfbf2b1b21feb45ef09bbaa4@172.16.10.2:26656
b8160265953ff82a9e7d6752cc5b95e3d3be6d7e@172.16.10.3:26656
96a8e722f93acacd21baec6db51acd6cc16bbee2@172.16.10.4:26656
5bb71ca5886894d3f9fd85f9948c47e2cbab71fa@172.16.10.5:26656
```

> **Admin**: Query the `node id` by running `artelad tendermint show-node-id` in the node.
>

### 3. Trust block and height

- **Block Number**: 10472
- **Block Hash**: 871D569AFBB2A83A7D1A1A02FB41F56F71B50F763D03345033BE10933FC37439

> ⚠️Note: remove prefix `0x` of block hash.
>

> **Admin**: Query block number by `curl 172.16.10.4:8545 -H "Content-Type:application/json" -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'`
>
>
> And then Query block by number `curl 172.16.10.4:8545 -H "Content-Type:application/json" -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x28e8", true],"id":1}'`
>

### 4. RPC servers

```bash
172.16.10.2:26657
172.16.10.3:26657
172.16.10.4:26657
172.16.10.5:26657
```