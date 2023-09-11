---
sidebar_position: 2
---

# Security Aspect Example: Step-by-Step

The "Security Aspect on Artela" is an aspect implementation that safeguards transactions. It assumes a bookkeeping contract that may be vulnerable to reentrancy attacks due to unpredictable bugs. The aspect verifies the balance in the bookkeeping contract and compares it to the actual balance, intercepting any transactions associated with such attacks.

The overall process is as follows:



### 1. Deploy Defi Smart Contract

> **Step1:** honeypot.sol is the defi smart contract which could deposit and withdraw funds.
> 

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract HoneyPot {
    mapping(address => uint256) public balances;
    address private deployer;
    constructor() {
        deployer = msg.sender;
    }
    function isOwner(address user) external view returns (bool result) {
        if (user == deployer) {
            return true;
        } else {
            return false;
        }
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

> **Step2:** attack.sol is the attack smart contract which could get all the funds of honeypot.sol
> 

```solidity
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

> **Step3:**  compile honeypot.sol and attack.sol to get deploy bytecode through asolc.
> 

```bash
>  asolc -o ${your target folder path} --via-ir --abi --bin ${your *.sol file path} --overwrite
```

> **Step4:**  deploy to artela testnet.
> 

```tsx
// Deploy honeypot contract to artela
//
// HoneyPot is an asset management contract that keeps track of the assets owned by users of HoneyPot. 
// The total recorded amount of these assets is mapped to the native assets held in the contract's account on the blockchain.
//
// Contract at: reentrance/contracts/HoneyPot.sol
let honeyPotContract = new web3.atl.Contract(HoneyPotAbi,
    web3.utils.aspectCoreAddr, honeypotOptions);
let token_instance = honeyPotContract.deploy().send({ from: honeypotDeployer, nonce: honeyPotNonceVal });
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
// The "attach" contract is one of the users of HoneyPot and defines the "deposit" and "attach" (withdraw) methods.
// It use the contract call method to invoke the "deposit" and "withdraw" functions from the HoneyPot contract.
//
// Contract at: reentrance/contracts/Attack.sol
let attackDeployer = accounts[1]
let attackNonceVal = await web3.atl.getTransactionCount(attackDeployer);

let attackContract = new web3.atl.Contract(attackAbi,
    web3.utils.aspectCoreAddr, attackOptions);
let attack_instance = attackContract.deploy({ "arguments": [honeypotAddress] }).send({
    from: attackDeployer,
    nonce: attackNonceVal
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

### 2. Writer My Aspect

> **Step1:**  use tool to generate template for evm tracer.
> 

```bash
# Install
npm install @artela/aspect-tool

# Usage
Step1:  aspect-tool generate
Step2:  input your storage layout json file path
Step3:  input your target lib typescript file path
```

> **Step2:**  import step1’s file and libs to impl aspect.
> 

```tsx
// The entry file of your WebAssembly module.
import { AspectOutput } from "@artela/aspect-libs";
import { IAspectBlock, IAspectTransaction } from "@artela/aspect-libs";
import { debug } from "@artela/aspect-libs";

import { HoneyPotState } from "./honeypotstate"
import {
    StateCtx,
    OnTxReceiveCtx,
    ...
} from "@artela/aspect-libs";
import { ethereum } from "@artela/aspect-libs";
import { BigInt } from "@artela/aspect-libs/message";

class GuardByTraceAspect implements IAspectTransaction, IAspectBlock {
    ...

    postContractCall(ctx: PostContractCallCtx): AspectOutput {
        // 1.Calculate the eth balance change of DeFi SmartContract(HoneyPot) before and after tx.
        let sysBalance = new HoneyPotState.SysBalance(ctx, ctx.currInnerTx!.to);
        var deltaSys = sysBalance.current()?.value.sub(sysBalance.original()?.value);

        // 2.Calculate the financial change of withdrawer in DeFi SmartContract(HoneyPot) before and after tx.
        let contractState = new HoneyPotState.balances(ctx, ctx.currInnerTx!.to);
        let withdrawer = ethereum.Address.fromHexString(ctx.currInnerTx!.from);
        var deltaUser = 0;
        if (contractState.isExist(withdrawer)) {
            deltaUser = contractState.current(withdrawer)?.value.sub(contractState.original(withdrawer)?.value);
        }

        // 3.Verify if the above two values are equal.
        if(deltaSys.compareTo(deltaUser) == 0){
            return new AspectOutput(true);
        }
        return new AspectOutput(false, "risky transaction");
    }

    ...
}

export default GuardByTraceAspect;
```

### 3. Deploy Aspect

```tsx
// Deploy GuardAspect
//
// Deploy an aspect onto the blockchain with the functionality of
// checking balances and intercepting transactions according to predefined rules.
//
// Aspect at: 
// - reentrance/assembly/aspect/guard_by_trace_aspect.ts
let AspectDeployer = accounts[2]
let nonceValAspectDeployer = await web3.atl.getTransactionCount(AspectDeployer);

let aspectCode = fs.readFileSync('./build/release.wasm', {
    encoding: "hex"
});
let aspect = new web3.atl.Aspect(
    web3.utils.aspectCoreAddr, {
    gasPrice: 1000000010, // Default gasPrice set by Geth
    gas: 4000000
});
let instance = aspect.deploy({
    data: '0x' + aspectCode,
    properties: [{ 'key': 'HoneyPotAddr', 'value': honeypotAddress }, {
        'key': 'binding',
        'value': honeypotAddress
    }, { 'key': 'owner', 'value': AspectDeployer }]
}).send({ from: AspectDeployer, nonce: nonceValAspectDeployer });

let aspectRt = await instance.on('receipt', (receipt) => {
    console.log("=============== deployed aspect ===============");
    console.log("aspect address: " + aspect.options.address);
    console.log(receipt);
}).on('transactionHash', (txHash) => {
    console.log("deploy aspect tx hash: ", txHash);
});
await new Promise(r => setTimeout(r, 5000));

let aspectId = aspectRt.options.address
```

### 4. Bind Aspect to Smart Contract

```tsx
    // Bind honeyPotContract with the GuardAspect aspect
    //
    // Bind the HoneyPot asset management contract, deployed in Step1 (the contract being attacked),
    // to the security check contract deployed in Step5 on the blockchain.
    await honeyPotContract.bind({
        priority: 1,
        aspectId: aspectId,
        aspectVersion: 1,
    }).send({ from: honeypotDeployer, nonce: honeyPotNonceVal + 2 })
        .on('receipt', function (receipt) {
            console.log("=============== bind aspect ===============")
            console.log(receipt)
        })
        .on('transactionHash', (txHash) => {
            console.log("contract binding tx hash: ", txHash);
        });

    // wait for block committing
    await new Promise(r => setTimeout(r, 5000));
```

### 5. Complete code and Demonstration

**Complete code:**

    https://github.com/artela-network/aspect-example/tree/feat/npm-impl/reentrance

> **Step1:**  build smart contract and aspect.
> 

```bash
cd .     
sh script/build.sh
```

> **Step2:**  run test.
> 

```bash
cd app
sh run-normal.sh // normal case, honeypot was attacked
sh run-app.sh   // aspect case,  protect honeypot
```

### 6. Complete code and Demonstration

**Complete code:**

    https://github.com/artela-network/aspect-example/tree/feat/clean-v2/reentrance

> **Step1:**  build smart contract and aspect.
> 

```bash
cd .     
sh script/build.sh
```

> **Step2:**  run test.
> 

```bash
cd app
sh run-app.sh
```