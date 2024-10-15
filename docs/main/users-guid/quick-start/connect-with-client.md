---
sidebar_position: 2
---

# Connect With Client

In addition to wallets, advanced users can connect to the Artela network directly using RPC clients. This approach provides more flexibility and control, enabling developers and power users to interact with the network programmatically. With the right setup, you can use clients to send transactions, query blockchain data, and manage accounts.

---

## 1. Prerequisites  
Before connecting with a client, ensure you have the following:
- **RPC URL** of the Artela network: `https://api.artela.network`  
- **Chain ID**: `artela_11820-1`  
- A terminal or compatible development environment (e.g., Node.js, Python, or Go)  
- An account with ART tokens to cover transaction fees  

---

## 2. Connect Using JavaScript [artela@web3.js](https://www.npmjs.com/package/@artela/web3)
[artela@web3](https://github.com/artela-network/artela-web3.js) is an extension built on top of [ethereum/web3.js](https://github.com/web3/web3.js). It provides additional functionalities to support **Aspect-related** operations, including deployment, binding, and upgrades. 

Since it is fully compatible with web3.js, you can use it just like the original web3 library for standard Ethereum features. If your interaction with Artela only requires typical Ethereum functionality, you can safely use `web3.js` without any changes.

The `@artela/web3` library allows JavaScript applications to interact with EVM-compatible blockchains. Here's how you can use it to connect to Artela.

### Step 1: Install @artela/web3.js
```bash
npm install @artela/web3
```

### Step 2: Connect to Artela
```js
const Web3 = require('@artela/web3');
const rpcURL = 'https://api.artela.network';
const web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));

const address = '0xYourAddressHere'; // Replace with your wallet address

web3.eth.getBalance(address).then((balance) => {
  console.log(`Balance of ${address}: ${web3.utils.fromWei(balance, 'ether')} ART`);
});
```

## 3. Connect Using cURL
You can also use cURL to send raw JSON-RPC requests directly to the Artela network.
```bash
curl -X POST https://api.artela.network \
-H "Content-Type: application/json" \
-X POST \
--data '{
  "jsonrpc": "2.0",
  "method": "eth_getBalance",
  "params": ["0xYourAddressHere", "latest"],
  "id": 1
}'
```

## 4. Advanced Usage
Using clients allows you to perform complex tasks such as:

- Deploying smart contracts
- Querying past events and logs
- Sending signed transactions
- Interacting with smart contracts

For more advanced usage, please visit [Developers Guid](/main/developers-guid).