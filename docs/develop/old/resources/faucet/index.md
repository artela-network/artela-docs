---
sidebar_position: 2
---
# Faucet

When using the Artela testnet, you have the choice to either use **public accounts** provided for your convenience or create and utilize **your own accounts**. Here's a breakdown of both options:

## Use Public Accounts

1. **Available Public Accounts**

    Currently, there are several public accounts you can use. These accounts are preloaded with tokens, and their private keys are securely stored on the node. However, please be aware that since these accounts are accessible to everyone, you might receive unwanted interactions. If privacy is a concern, consider using your own accounts.
    
    The currently available accounts are as follows:
    
    `0x9b79576f6ac97830f314c9d7a0edcb063832e816`
    
    `0x9d7707cc7726b5b41cabb63c873dc5a9e4b8bfc0`
    
    `0x63fc7cb1a09de78de70e73c4596ce5153b721869`
    
    `0x851b8a5b9d9882f0eb66ee818ce3a1a5b9038a86`

    Note that these accounts may change over time. To retrieve the most up-to-date list of available accounts, you can use the following code snippet with `@artela/web3.js`:
    
    ```tsx
    const Web3 = require('@artela/web3');
    const web3 = new Web3('https://artela-devnet-rpc2.artela.network');
    let accounts = await web3.atl.getAccounts();
    console.log(accounts[0]);
    ```
    

2. **Signing Transactions with a Public Account**

    The private keys for public accounts are already deployed on the node. You can use `@artela/web3.js` to send transactions using these public accounts, and the node will handle the transaction signing.

    For detailed instructions on how to obtain a public account and send transactions using it, refer to [here](https://docs.artela.network/develop/web3js-guide).
    

## Use Your Own Account

If you haven't created an account yet, you can create **your own account** and private key on the test network. 

The current public account is completely open, so you can transfer some tokens to your own account from the public account. Afterward, you can try signing a transaction to deploy an aspect to the blockchain using your private key.


1. **Connect to Testnet, Load or Create Account, and Add to Wallet**
    
    To use your own account, follow these steps:
    
    ```tsx
    "use strict"
    
    const fs = require("fs");
    const Web3 = require("web3");
    const web3 = new Web3('https://artela-devnet-rpc2.artela.network');
    
    // load local account from private key
    let privateFile = 'privateKey.txt'; // <-- your private key here, if not exist, create new one
    let account;
    if (fs.existsSync(privateFile)) {
        let pk = fs.readFileSync(privateFile, 'utf-8');
        account = web3.atl.accounts.privateKeyToAccount(pk);
    } else {
        account = web3.atl.accounts.create();
        fs.writeFileSync(privateFile, account.privateKey);
    }
    
    // add account to wallet
    web3.atl.accounts.wallet.add(account.privateKey);
    ```
    

1. **Top-Up Your Own Account**
    
    To fund your account, you can transfer tokens from a public account to your own. Here's how:
    
    ```tsx
    // load bank account
    const bank = (await web3.atl.getAccounts())[0];
    
    // transfer account from bank to local account
    let bankNonce = await web3.atl.getTransactionCount(bank);
    let tx = {
        'from': bank,
        'to': account.address,
        'value': web3.utils.toWei('1', 'ether'), // transfer 0.1 eth
        'gas': 2000000,
        'nonce': bankNonce
    };
    
    // send transaction
    await web3.atl.sendTransaction(tx).on('receipt', receipt => {
        console.log('transferred from bank to local account');
        console.log(receipt);
    });
    ```
    

2. **Signing an Aspect Deployment Transaction with Your Own Private Key**
    
    To sign an Aspect deployment transaction using your private key, follow these steps:

    ```tsx
    // your account as Aspect deployer
    const aspectDeployer = account.address;
    
    // set nonce value
    let nonceValAspectDeployer = await web3.atl.getTransactionCount(aspectDeployer);
    
    // read wasm code, assume in ./build/release.wasm
    const aspectCode = fs.readFileSync('./build/release.wasm', {
        encoding: "hex"
    });
    if (!aspectCode || aspectCode === "" || aspectCode === 'undefined') {
        console.log("aspectCode cannot be empty")
        process.exit(0)
    }
    
    let aspectCore = new web3.atl.aspectCore();
    const deploy = aspectCore.methods.deploy('0x' + aspectCode, [{ 'key': 'owner', 'value': aspectDeployer }]);
    tx = {
        from: account.address,
        to: aspectCore.options.address,
        data: deploy.encodeABI(),
        nonce: nonceValAspectDeployer,
        gas: 4000000
    }
    let signedTx = await web3.atl.accounts.signTransaction(tx, account.privateKey);
    console.log('deployTxHash: ' + signedTx.transactionHash);
    let receipt = await web3.atl.sendSignedTransaction(signedTx.rawTransaction)
        .on('receipt', receipt => {
            console.log(receipt);
        });
    
    // print aspect info
    console.log(`--aspectAccount ${aspectDeployer}  --aspectId ${receipt.aspectId}`);
    ```

With these instructions, you can choose between using public accounts or your own accounts when interacting with the Artela testnet, depending on your specific needs and preferences.