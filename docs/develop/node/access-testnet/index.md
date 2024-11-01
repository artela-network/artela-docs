
# TestNet Info

**Option 1: Connect to Artela TestNet via RPC**

You can access the JSON-RPC port service through these URLs:

    https://betanet-rpc1.artela.network
    https://betanet-rpc2.artela.network
    https://api.zan.top/node/v1/artela/testnet/82ec5dae795f4d22a5f8238de7c886fc

**Option 2: Establish Your Own Local Private Network**

For detailed steps, see [Run a Local Node](./full-node-setup).

Once you've initiated the node, connect to the JSON-RPC port service here:

    http://127.0.0.1:8545

## Public Information on TestNet

### 1. Basic Info

```
Network Name : Artela TestNet
New RPC URL : https://betanet-rpc1.artela.network
ChainID (optional): 11822
Symbol (optional) : ART
Block Explorer URL (optional): https://betanet-scan.artela.network/   
Block Explorer URL (optional): https://www.okx.com/web3/explorer/artela-testnet
```

### 2. Genesis

[genesis.json](./genesis.json)


### 3. Persistent nodes

```json
f809f4fd17a9cf434b059af3e86262bbac3cb809@47.251.32.165:26656
8889b28795e8be109a532464e5cc074e113de780@47.251.54.123:26656
5c4ea81ac7b8a7f5202fcbe5fe790a6d6f61fb22@47.251.14.108:26656
```

### 4. Trusted block and height

- **Block Height**: 114011
- **Block Hash**: 94077D92B3DE77C3AE94BEBF496601E7CBA3EEF7CD7E17BD8513F16D9DDA8712

> ⚠️Note: Pick up the latest block and height from the <https://betanet-scan.artela.network> as your trusted block and height.
>

### 5. RPC servers

```bash
http://47.251.32.165:26657
http://47.251.54.123:26657
http://47.251.14.108:26657
```