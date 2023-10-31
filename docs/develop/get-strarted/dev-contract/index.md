

# Develop a Smart Contract

In this tutorial, we'll walk you through the process of creating and deploying a smart contract on Artela Testnet using Remix and MetaMask.

## Requirements
* [Metamask](https://metamask.io/)
* [Remix](https://remix.ethereum.org/)


## 1. Connect MetaMask to Artela Testnet

If you're new to MetaMask, follow this guide on [How Add a Custom Network RPC](https://support.metamask.io/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC) for detailed instructions.

1. Open MetaMask 
2. chick  `Networks` > `Add a network` > `Add a network manually`

```
Network Name : artela testnet
New RPC URL : https://testnet-rpc1.artela.network
ChainID (optional): 11820
Symbol (optional) : ART
Block Explorer URL (optional): https://testnet-scan.artela.network/
```

For more info about the new RPC URL configuration, refer to [artela testnet](develop/node/access-testnet).

Ensure all fields are correctly filled:

![img_1.png ](img_1.png)

## 2. Access TestNet Faucet

Join Artela [Discord server](https://discord.com/invite/artela) to access the Testnet ART faucet. Request access and obtain Testnet ART with your wallet address. 

## 3. Write a Smart Contract in Remix

Launch Remix. Configure Remix for Solidity development by selecting `SOLIDITY` under `Featured Plugins` on the main page. Navigate to `File Explorers` to manage your files.

Remix Configuration:

![img.png](img.png)

Create a new Solidity file by clicking the `+` button below `File Explorers`. Name the file `MyToken.sol`, and compile it.

![img_2.png](img_2.png)

MyToken.sol:

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyCollectible is ERC721 {
 constructor() ERC721("MyCollectible", "MCO") {
 }
}
```

## 4.Remix: Connect to Artela Testnet and Deploy

Ensure the `artela testnet` network is selected on Metamask. Select `Injected Provider - MetaMask` as environment.

In Remix, click the `Deploy` button on the left side. Metamask confirmation window will appear.

![img_5.png](img_5.png)

## 5.Block Explorer

Confirm the successful deployment on Artela Testnet [blockchain explorer](https://testnet-scan.artela.network/) using `transaction hash` in output.

![img_3.png](img_3.png)

Congratulations! You've successfully created and deployed a smart contract on Artela Testnet. Happy coding!