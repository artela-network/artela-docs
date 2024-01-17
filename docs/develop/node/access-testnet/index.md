
# TestNet Info

**Option 1: Connect to Artela TestNet via RPC**

You can access the JSON-RPC port service through these URLs:

    https://betanet-rpc1.artela.network
    https://betanet-rpc2.artela.network

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
```

### 2. Genesis

[genesis.json](./genesis.json)


### 3. Persistent nodes

```json
bec6934fcddbac139bdecce19f81510cb5e02949@47.254.24.106:26656
32d0e4aec8d8a8e33273337e1821f2fe2309539a@47.88.58.36:26656
30fb0055aced21472a01911353101bc4cd356bb3@47.89.230.117:26656

```

### 4. Trusted block and height

- **Block Height**: 114011
- **Block Hash**: 94077D92B3DE77C3AE94BEBF496601E7CBA3EEF7CD7E17BD8513F16D9DDA8712

> ⚠️Note: Pick up the latest block and height from the <https://betanet-scan.artela.network> as your trusted block and height.
>

### 5. RPC servers

```bash
http://47.254.24.106:26657
http://47.88.58.36:26657
http://47.89.230.117:26657

```