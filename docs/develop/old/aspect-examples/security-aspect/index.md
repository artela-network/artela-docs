---
sidebar_position: 2
---

# Security Aspect

The "Security Aspect on Artela" is a security implementation that safeguards transactions, particularly in scenarios where a bookkeeping contract may be vulnerable to reentrancy attacks due to unpredictable bugs. This Aspect verifies the balance in the contract and compares it to the actual balance, intercepting any transactions associated with such attacks. 

Let's go through the implementation step by step.


### 1. Deploy a simple Deposit Smart Contract with Reentrancy Vulnerability

**Step1: Deploy a simple Deposit Smart Contract** 

We assume the existence of a Deposit smart contract named `HoneyPot`. This contract allows users to deposit and withdraw funds. Below is the Solidity code for `HoneyPot.sol`:

```tsx
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract HoneyPot {
    mapping(address => uint256) public balances;
    address private owner;
    
    constructor() {
        owner = msg.sender;
    }
    function isOwner(address user) external view returns (bool) {
        return user == owner;
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        uint bal = balances[msg.sender];
        require(bal > 0);

        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");
        address sender=msg.sender;
        balances[sender] = 0;
    }
}
```

**Step2: Deploy the Attacker Smart Contract and exploit HoneyPot with reentrancy** 

We can deploy an attacker smart contract as below. This contract is designed to exploit vulnerabilities in HoneyPot.sol.

```tsx
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

import "./HoneyPot.sol";

contract Attack {
    HoneyPot public honeyPot;

    constructor(address _depositFundsAddress) {
        honeyPot = HoneyPot(_depositFundsAddress);
    }

    function attack() external payable {
        honeyPot.withdraw();
    }

    function deposit() external payable {
        require(msg.value >= 10 ether);
        honeyPot.deposit{value: 10 ether}();
    }

    receive() external payable  {
        if (address(honeyPot).balance >= 1 ether) {
            honeyPot.withdraw();
        }
    }
}
```

**Step3: Compile Contracts**
Compile `HoneyPot.sol` and `Attack.sol` to obtain deployable bytecode using the `asolc` tool:

```bash
>  asolc -o ${your target folder path} --via-ir --abi --bin ${your *.sol file path} --overwrite
```

**Step4: Deploy Contracts** 
Deploy `HoneyPot.sol` and `Attack.sol` to the Artela testnet. Below is an example of deploying `HoneyPot.sol`:

```tsx
// Deploy honeypot contract to artela
//
// HoneyPot is an asset management contract that keeps track of the assets owned by users of HoneyPot. 
// The total recorded amount of these assets is mapped to the native assets held in the contract's account on the blockchain.
//
// Contract at: reentrance/contracts/HoneyPot.sol
let honeyPotContract = new web3.atl.Contract(HoneyPotAbi);
let token_instance = honeyPotContract.deploy().send({ from, nonce, gas, gasPrice });
let honeypotAddress = "";
honeyPotContract = await token_instance.on('receipt', function (receipt) {
    console.log("=============== deployed contract ===============");
    console.log("contract address: " + receipt.contractAddress);
    console.log(receipt);
    honeypotAddress = receipt.contractAddress
}).on('transactionHash', (txHash) => {
    console.log("deploy contract tx hash: ", txHash);
});
console.log("== HoneyPot_address ==", honeypotAddress)
console.log("== HoneyPot_account ==", honeypotDeployer)

// Deploy attack contract to artela
//
// The "attack" contract is one of the users of HoneyPot and defines the "deposit" and "attach" (withdraw) methods.
// It use the contract call method to invoke the "deposit" and "withdraw" functions from the HoneyPot contract.
//
// Contract at: reentrance/contracts/Attack.sol
let attackDeployer = accounts[1]
let attackNonceVal = await web3.atl.getTransactionCount(attackDeployer);

let attackContract = new web3.atl.Contract(attackAbi);
let attack_instance = attackContract.deploy({ arguments: [honeypotAddress] }).send({
    from, nonce, gas, gasPrice
});
let attackAddress = "";
attackContract = await attack_instance.on('receipt', function (receipt) {
    console.log("=============== deployed attack contract ===============");
    console.log("contract attack address: " + receipt.contractAddress);
    console.log(receipt);
    attackAddress = receipt.contractAddress
}).on('transactionHash', (txHash) => {
    console.log("deploy attack contract tx hash: ", txHash);
});
```

### 2. Write the Security Aspect

**Step1: Generate Aspect Template for EVM Tracer.**  

```bash
# Install
npm install @artela/aspect-tool -g

# Usage
aspect-tool generate -i /path/to/honeypot/storage.json -o /path/to/aspect/src/dir/honeypot_storage.ts
```

**Step2: Import and Implement the Aspect** 
Import the generated TypeScript file and necessary libraries to implement your security aspect. Below is an example:

```tsx
// The entry file of your WebAssembly module.
// The entry file of your WebAssembly module.

import {
    BigInt,
    FilterTxCtx,
    IAspectBlock,
    IAspectTransaction,
    OnBlockFinalizeCtx,
    OnBlockInitializeCtx,
    PostContractCallCtx,
    PostTxCommitCtx,
    PostTxExecuteCtx,
    PreContractCallCtx,
    PreTxExecuteCtx, sys,
    vm,
} from "@artela/aspect-libs";
import {HoneyPotState} from "./honeypot_storage";

export class GuardByCountAspect implements IAspectTransaction, IAspectBlock {

    // ...
    
    // modify the postContractCall method to check the balances of the deposit contract 
    // and the withdrawer before and after the transaction to make sure the balances are equal.
    postContractCall(ctx: PostContractCallCtx): void {
        // 1.Calculate the eth balance change of our deposit smart contract before and after tx.
        let sysBalance = new HoneyPotState._balance_(ctx.trace, ctx.currentCall.to);
        let deltaSys = sysBalance.current()!.sub(sysBalance.original());
        
        // 2.Calculate the eth balance change of the withdrawer in our deposit smart contract before and after tx.
        let contractState = new HoneyPotState.balances(ctx.trace, ctx.currentCall.to);
        let deltaUser = BigInt.ZERO;
        let fromState = contractState.get(ctx.currentCall.from)
        let current = fromState.current()
        let original = fromState.original();
        if (current && original) {
            deltaUser = current.sub(original)
        }
        
        // 3.Verify if the above two values are equal.
        if (deltaSys.compareTo(deltaUser) != 0) {
            vm.revert("whoops, user balance not as expected, reverting...")
        }
    }

    // ...
}

```

### 3. Deploy Aspect
Deploy your security aspect to the Artela testnet. Here's an example:

```tsx
// Deploy GuardAspect
//
// Deploy an aspect onto the blockchain with the functionality of
// checking balances and intercepting transactions according to predefined rules.
let aspectCode = fs.readFileSync('./build/release.wasm', {
    encoding: "hex"
});

let aspect = new web3.atl.Aspect();
let deployTx = aspect.deploy({
    data: '0x' + aspectCode,
    properties: []
}).send({ from, nonce, gasPrice, gas });

aspect = await deployTx.on('receipt', (receipt) => {
    console.log("=============== deployed aspect ===============");
    console.log("aspect address: " + aspect.options.address);
    console.log(receipt);
}).on('transactionHash', (txHash) => {
    console.log("deploy aspect tx hash: ", txHash);
});

let aspectId = aspect.options.address
```

### 4. Bind Aspect to Smart Contract

Bind your HoneyPot contract with the GuardByTraceAspect aspect. This step establishes a connection between the security aspect and the contract it aims to protect.

```tsx
    // Bind honeyPotContract with the GuardAspect aspect
    //
    // Bind the HoneyPot asset management contract, deployed in Step1 (the contract being attacked),
    // to the security check contract deployed in Step5 on the blockchain.
    await honeyPotContract.bind({
        priority: 1,
        aspectId: aspectId,
        aspectVersion: 1,
    }).send({ from, nonce, gas, gasPrice })
        .on('receipt', function (receipt) {
            console.log("=============== bind aspect ===============")
            console.log(receipt)
        })
        .on('transactionHash', (txHash) => {
            console.log("contract binding tx hash: ", txHash);
        });
```

### 5. Complete the Code and Demonstration

Complete the code and run the demonstration to test your security aspect. You can find the complete code and a demonstration in the provided GitHub repository.

**Complete code:**

    https://github.com/artela-network/aspect-example/tree/feat/npm-impl/reentrance

To build and run the demonstration:

```bash
cd .     
sh script/build.sh

cd app
sh run-normal.sh # for the normal case (HoneyPot being attacked)
sh run-app.sh    # for the aspect case (HoneyPot protected)
```


### Summary
This guide outlines the steps to implement a security aspect on Artela to protect your smart contracts from potential vulnerabilities. The example provided showcases a scenario involving a Defi smart contract and an attack contract. By following these steps, you can enhance the security of your smart contracts on the Artela network.
