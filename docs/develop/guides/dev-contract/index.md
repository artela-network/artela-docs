
# Develop with Remix

In this tutorial, we'll walk you through the process of creating and deploying a smart contract on Artela TestNet using Remix and MetaMask.

## Pre-requisites
* [Metamask](https://metamask.io/)
* [Remix](https://remix.ethereum.org/)

## 1. Write a Smart Contract in Remix

Launch Remix. Configure Remix for Solidity development by selecting `SOLIDITY` under `Featured Plugins` on the main page. Navigate to `File Explorers` to manage your files.

1. Open "contracts" folder.
2. Create new contract file.
3. Enter the file name as "mytoken.sol".
4. Copy the contract mytoken.sol code.
5. Click "solidity compiler", and make sure the compilation is successful.

![img_6.png](img_6.png)

**solidity compiler :**
![img_7.png](img_7.png)


**mytoken.sol :**

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyCollectible is ERC721 {
 constructor() ERC721("MyCollectible", "MCO") {
 }
}
```

## 2. Remix: Connect to Artela TestNet and Deploy

Connecting Remix to MetaMask and deploying your smart contract involves a few straightforward steps:

* Configure MetaMask for Artela TestNet:
  * Open MetaMask and ensure that you are connected to the Artela TestNet. If Artela TestNet is not listed, you may need to add it manually. [Navigate to the network settings and input the Artela TestNet details.](/develop/guides/wallet-configuration)
* Connect Remix to MetaMask 
  * At Remix, on the left side, Click the button `Deploy and run transactions`. Set up the ENVIRONMENT is `Injected Provider - MetaMask[2]`
* Deploy Your Smart Contract
  * With MetaMask connected, you can now deploy your smart contract from Remix. 
  * Compile your contract code and select the correct contract in Remix. 
  * Click on the `Deploy[3]` button to initiate the deployment process.
* Confirm Transaction in MetaMask
  * MetaMask will prompt you to `Confirm[4]` the deployment transaction. 
  * Review the details and confirm the transaction.

![img_9.png](img_9.png)

## 3. Block Explorer

Confirm the successful deployment on Artela TestNet [blockchain explorer](https://betanet-scan.artela.network/) using `transaction hash` in output.


![img_3.png](img_3.png)

Congratulations! You've successfully created and deployed a smart contract on Artela TestNet. Happy coding!
