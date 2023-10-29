---
sidebar_position: 2
---

# Deploy & Call ERC20 Contract

## 1. Contract

**`ArtToken.sol`**

The contract defines the token.

```bash
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArtToken is ERC20,Ownable {
    constructor(uint256 initialSupply) ERC20("Artela", "ART") {
        _mint(msg.sender, initialSupply);
    }
}
```

**`Broker.sol`**

Contract that hold the token.

```bash
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Borker is Ownable {
    address private deployer;
    address immutable _tokenIn;

    constructor(address mytoken) {
        _tokenIn=mytoken;
        deployer = msg.sender;
    }

    function isOwner(address user) external view returns (bool result) {
        if (user == deployer) {
            return true;
        } else {
            return false;
        }
    }

    function startSchedule() public pure returns(bool)  {
        return true;
    }

    function transfer(address target,uint256 amount) public onlyOwner{
        require(amount > 0, "You need to sell at least some tokens");
        require(amount < IERC20(_tokenIn).balanceOf(address(this)) ,"Unable to afford sufficient amount");
        IERC20(_tokenIn).transfer(target,amount);
    }

    function allowance(address aspectId) onlyOwner external view returns (uint256 valueWei) {
        require(aspectId>address(0),"aspectId empty");
        //todo check aspectId
        return  IERC20(_tokenIn).balanceOf(msg.sender);
    }

}
```

## 2. Deploy Contract Script

Using your private key, sign the deploy transactions for `ArtToken.sol` and `Broker.sol` contracts.

`tokenBytes`, `tokenAbidata`: compiling output of `ArtToken.sol`

`brokerBytes`, `brokerAbidata`: compiling output of `Broker.sol`

```bash
const fs = require('fs');
const Web3 = require('@artela/web3');
const web3 = new Web3('https://testnet-rpc1.artela.network');

const tokenBytes = fs.readFileSync("./contract/ArtToken.bin", "utf-8") // change the bin file to your own
const tokenAbidata = fs.readFileSync("./contract/ArtToken.abi", "utf-8") // change the abi json to your own
var tokenAbi = JSON.parse(tokenAbidata)

const brokerBytes = fs.readFileSync("./contract/Broker.bin", "utf-8") // change the bin file to your own
const brokerAbidata = fs.readFileSync("./contract/Broker.abi", "utf-8") // change the abi json to your own
var brokerAbi = JSON.parse(brokerAbidata)

async function f() {
    // load local account from private key
    let privateFile = 'myKey.txt';
    let pk = fs.readFileSync(privateFile, 'utf-8');
    let account = web3.atl.accounts.privateKeyToAccount(pk);
    console.log("from address: ", account.address);
    web3.atl.accounts.wallet.add(account.privateKey);
    console.log("-----------------------------------------------");

    // retrieve current nonce
    let nonceVal = await web3.atl.getTransactionCount(account.address);

    let tokenAddress;
    {
        // instantiate an instance of token contract
        let tokenContract = new web3.atl.Contract(tokenAbi);
        // deploy token contract
        let tokenDeploy = tokenContract.deploy({ data: tokenBytes, arguments: [1000000000000000] });

        let tokenTx = {
            from: account.address,
            data: tokenDeploy.encodeABI(),
            nonce: nonceVal,
            gas: 4000000
        }
        let signedTokenTx = await web3.atl.accounts.signTransaction(tokenTx, account.privateKey);
        console.log('deploy token tx hash: ' + signedTokenTx.transactionHash);
        await web3.atl.sendSignedTransaction(signedTokenTx.rawTransaction)
            .on('receipt', receipt => {
                console.log(receipt);
                console.log("token contract address: ", receipt.contractAddress);
                tokenAddress = receipt.contractAddress;
            });
    }
    console.log("-----------------------------------------------");

    let brokerAddress;
    {
        // instantiate an instance of token contract
        let brokerContract = new web3.atl.Contract(brokerAbi);
        // deploy broker contract
        let brokerDeploy = brokerContract.deploy({ data: brokerBytes, arguments: [tokenAddress] });

        let brokerTx = {
            from: account.address,
            data: brokerDeploy.encodeABI(),
            nonce: nonceVal + 1,
            gas: 4000000
        }
        let signedBrokerTx = await web3.atl.accounts.signTransaction(brokerTx, account.privateKey);
        console.log('deploy broker tx hash: ' + signedBrokerTx.transactionHash);
        await web3.atl.sendSignedTransaction(signedBrokerTx.rawTransaction)
            .on('receipt', receipt => {
                console.log(receipt);
                console.log("broker contract address: ", receipt.contractAddress);
                brokerAddress = receipt.contractAddress;
            });
    }
}

f().then();
```

## 3. Call Contract Script

`tokenAddress`: contract address that defines the token.

`brokerAddress`: contract address that hold the token.

```bash
const fs = require('fs');
const Web3 = require('@artela/web3');
const web3 = new Web3('https://testnet-rpc1.artela.network');

const tokenBytes = fs.readFileSync("./contract/ArtToken.bin", "utf-8") // change the bin file to your own
const tokenAbidata = fs.readFileSync("./contract/ArtToken.abi", "utf-8") // change the abi json to your own
var tokenAbi = JSON.parse(tokenAbidata)

const brokerBytes = fs.readFileSync("./contract/Broker.bin", "utf-8") // change the bin file to your own
const brokerAbidata = fs.readFileSync("./contract/Broker.abi", "utf-8") // change the abi json to your own
var brokerAbi = JSON.parse(brokerAbidata)

async function f() {
    // load local account from private key
    let privateFile = 'myKey.txt';
    let pk = fs.readFileSync(privateFile, 'utf-8');
    let account = web3.atl.accounts.privateKeyToAccount(pk);
    console.log("from address: ", account.address);
    web3.atl.accounts.wallet.add(account.privateKey);
    console.log("-----------------------------------------------");

    // retrieve current nonce
    let nonceVal = await web3.atl.getTransactionCount(account.address);

    let tokenAddress = "0x8dFc9d90171698AA8a69385B98Fee1255753e544";
    let brokerAddress = "0x9ca7C819CAd212bf8D42fAAa31eCfB791c1dacDd";
    {
        let tokenContract = new web3.atl.Contract(tokenAbi, tokenAddress);
        let transfer = tokenContract.methods.transfer(brokerAddress, 10000000);

        let transferTx = {
            from: account.address,
            to: tokenAddress,
            data: transfer.encodeABI(),
            nonce: nonceVal + 2,
            gas: 4000000
        }
        let signedTransferTx = await web3.atl.accounts.signTransaction(transferTx, account.privateKey);
        console.log('transfer tx hash: ' + signedTransferTx.transactionHash);

        await web3.atl.sendSignedTransaction(signedTransferTx.rawTransaction)
            .on('receipt', receipt => {
                console.log(receipt);
            });

        let result = await tokenContract.methods.balanceOf(brokerAddress).call()
        console.log("brokerDeployer balance: " + result);
    }

}

f().then();
```