---
sidebar_position: 4
---

# Deploying a Contract on EVM++

This guide explains how to deploy a smart contract to the Artela EVM++ chain using Remix. Follow these steps to ensure a smooth deployment.

---

## Prerequisites

Before starting, make sure you have:

1. **MetaMask Wallet**
   - Installed and configured.
   - Connected to the Artela EVM++ chain with the correct RPC endpoint.

   Example configuration:
   - Network Name: `Artela EVM++`
   - RPC URL: `https://rpc.artela.network`
   - Chain ID: `11820` (Note that the chain ID of the artela EVM++ chain is the middle part of the chain ID in the configured cosmos format, such as artroll_11820-1)
   - Currency Symbol: `ART`

2. **Remix IDE**
   - Accessible at [https://remix.ethereum.org](https://remix.ethereum.org).
   - Installed browser extensions if needed for better performance.

3. **Test Funds**
   - Acquire ART tokens for gas fees via the Artela faucet or other sources.

---

## Step 1: Write or Import Your Contract

1. Open Remix IDE.
2. In the "File Explorer" panel, create a new file or import an existing contract. For example, a simple `HelloWorld.sol` contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public message;

    constructor(string memory _message) {
        message = _message;
    }

    function updateMessage(string memory _newMessage) public {
        message = _newMessage;
    }
}
```

3. Save the file.

---

## Step 2: Compile the Contract

1. Go to the "Solidity Compiler" plugin in Remix.
2. Select the appropriate compiler version (e.g., `0.8.0`) to match your contract's pragma.
3. Click "Compile HelloWorld.sol."
   - Ensure there are no errors before proceeding.

---

## Step 3: Connect MetaMask to Remix

1. Open the "Deploy & Run Transactions" plugin in Remix.
2. Under the "Environment" dropdown, select "Injected Provider - MetaMask."
3. MetaMask will prompt you to connect to Remix. Approve the connection.

---

## Step 4: Deploy the Contract

1. Verify the "Account" dropdown in Remix shows your MetaMask account.
2. Select the compiled contract from the "Contract" dropdown (e.g., `HelloWorld`).
3. Provide any constructor arguments in the input field, if required.
   - For the `HelloWorld` contract, you can enter `"Hello, Artela!"`.
4. Click "Deploy."

MetaMask will display a transaction confirmation dialog. Review the details and confirm the transaction.

---

## Step 5: Verify Deployment

1. After deployment, the contract address will appear in the Remix "Deployed Contracts" section.
2. Copy the contract address and verify it using Artela's blockchain explorer (e.g., Blockscout).
   - Visit [Artela Explorer](https://explorer.artela.network) and search for the contract address.

---

## Step 6: Interact with the Contract

1. In Remix, expand the deployed contract.
2. Use the available functions to interact with the contract. For example:
   - Call `message()` to view the current message.
   - Call `updateMessage("New message")` to update the message.

---

## Troubleshooting

- **Gas Errors**: Ensure your wallet has enough ART tokens.
- **Compilation Errors**: Check for syntax or version mismatches in the Solidity code.
- **RPC Errors**: Verify your MetaMask network configuration matches the Artela EVM++ settings.
