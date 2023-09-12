---
sidebar_position: 2
---

# Scheduler Aspect

The Scheduler Aspect is a practical example of building an on-chain scheduled transaction trigger. In this scenario, we'll create an ERC20 token called `ArtToken` and use a `Broker` contract to schedule fund transfers to a designated account at regular 5-block intervals.

Let's break down the process step by step:

<center>
<img
  src={require('./img/1.png').default} 
  alt="steps"  
  width="50%"
/>
</center>

### 1. Deploy ERC20 Smart Contract

**Step1: Create a `token.sol` Contract**   

```tsx
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

**Step2: Create a `broker.sol` Contract.** 


```tsx
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

**Step3: Compile `token.sol` and `broker.sol` Using `asolc`:**


```bash
>  asolc -o ${your target folder path} --via-ir --abi --bin ${your *.sol file path} --overwrite
```

> **Step4: Deploy Contracts to Artela Testnet:**
> 

```tsx
// Deploy an erc20 contract "token" to define the asset.
//
// contract at: schedule_salary/contracts/token.sol
let token_contract = new web3.atl.Contract(tokenAbi,
    web3.utils.aspectCoreAddr, tokenOptions);
let token_instance = token_contract.deploy({ "arguments": [1000000000000000] }).send({ from: tokenDeployer, nonce: nonceValtokenDeployer });
let contractAddress = "";
token_contract = await token_instance.on('receipt', function (receipt) {
    console.log("=============== deployed contract ===============");
    console.log("contract address: " + receipt.contractAddress);
    console.log(receipt);
    contractAddress = receipt.contractAddress
}).on('transactionHash', (txHash) => {
    console.log("deploy contract tx hash: ", txHash);
});
console.log("== token_address ==", contractAddress)
console.log("== token_account ==", tokenDeployer)

// Deploy an erc20 contract "broker" as payroll accountant.
//
// contrat at: schedule_salary/contracts/broker.sol
let brokerDeployer = accounts[1]
let nonceValBrokerDeployer = await web3.atl.getTransactionCount(brokerDeployer);

let broker_contract = new web3.atl.Contract(brokerAbi,
    web3.utils.aspectCoreAddr, brokerOptions);
let broker_instance = broker_contract.deploy({ "arguments": [contractAddress] }).send({ from: brokerDeployer, nonce: nonceValBrokerDeployer });
let brokerAddress = "";
broker_contract = await broker_instance.on('receipt', function (receipt) {
    console.log("=============== deployed contract ===============");
    console.log("contract address: " + receipt.contractAddress);
    console.log(receipt);
    brokerAddress = receipt.contractAddress
}).on('transactionHash', (txHash) => {
    console.log("deploy contract tx hash: ", txHash);
});

console.log("== broker_contract ==", brokerAddress)
console.log("== broker_account ==", brokerDeployer)
```

### 2. Create Your Aspect

**Step1:**  Use the @artela/aspect-tool to generate a template for your EVM tracer.


```tsx
# Install
npm install @artela/aspect-tool

# Usage
Step1:  aspect-tool generate
Step2:  input your storage layout json file path
Step3:  input your target lib typescript file path
```

**Step2:**  Import the generated file and required libraries to implement your aspect.


```tsx
import { Opts, PeriodicSchedule, Schedule,ScheduleTx } from "@artela/aspect-libs/scheduler";
import { IAspectBlock, IAspectTransaction } from "@artela/aspect-libs/types";
import { AspectOutput  } from "@artela/aspect-libs/proto";

import { ArtToken } from "./token_storage"
import { ethereum } from "@artela/aspect-libs/abi";
import { debug } from "@artela/aspect-libs/host";
import {
    ScheduleCtx,
    StateCtx,
    ...
} from "@artela/aspect-libs/entry";

class SalaryPayment implements IAspectTransaction, IAspectBlock {
	  ...
    onBlockInitialize(ctx: OnBlockInitializeCtx): AspectOutput {
        // schedule a salary payment
        this.scheduleTx(ctx, ctx.getProperty("ScheduleTo"), ctx.getProperty("Broker"), ctx.getProperty("TargetAddr"));
        return new AspectOutput(true);
    }
    ...
    postTxExecute(ctx: PostTxExecuteCtx): AspectOutput {
        let ret = new AspectOutput();
        if (ctx.tx != null) {
            // to retrieve the properties of an aspect, pass the key associated with the aspect,
            // which is deployed together with it.
            let schedule = ctx.getProperty("ScheduleTo");

            // convert to an address
            let scheduleAddr = ethereum.Address.fromHexString(schedule);

            // call traced balance changes, print the diff
            let num1 = new ArtToken._balances(ctx, ctx.tx!.to);
            let num1_latest = num1.diff(scheduleAddr);
            if (num1_latest) {
                debug.log("scheduleAddr balance " + num1_latest.toString(10))
            }
        }
        ret.success = true;
        return ret;
    }
		...
    private scheduleTx(ctx: ScheduleCtx, scheduleTo: string, broker: string, target: string): bool {
        // prepare the transfer parameters, and encode them to abi input.
        let addr = ethereum.Address.fromHexString(target);
        let num = ethereum.Number.fromU64(100);
        let payload = ethereum.abiEncode('transfer', [addr, num]);

        debug.log(payload);

        // the scheduled transaction with params.
        let tx = new ScheduleTx(scheduleTo).New(
            payload,
            new Opts(0, "200000000", "30000", broker))

        // params:
        // startAfter(3): the scheduled transaction will be trigger at the 3rd block after this method is called.
        // count(1000): total count of schedulex transaction is 1000.
        // everyNBlocks(5): execution at every 5th block since started.
        // maxRetry(2): Transaction confirmation on the blockchain is not guaranteed but rather determined by the gas fee.
        // If a transaction fails to be confirmed on the blockchain, it can be retried up to a maximum of two times.
        var periodicSch: Schedule = PeriodicSchedule
            .new(ctx, "myPeriodicSchedule")
            .startAfter(3)
            .count(1000)
            .everyNBlocks(5)
            .maxRetry(2);
        return periodicSch.submit(tx);
    }
}

export default SalaryPayment;
```

### 3. Deploy Your Aspect
Deploy your Aspects to Artela:
```tsx
// Deploy the aspect to chain
//
// Aspect at: schedule_salary/assembly/aspect/salary_payment.ts
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
    properties: [{ 'key': 'TargetAddr', 'value': targetAccount }, { 'key': 'ScheduleTo', 'value': brokerAddress }, { 'key': 'Broker', 'value': brokerDeployer }, { 'key': 'binding', 'value': brokerAddress }, { 'key': 'owner', 'value': AspectDeployer }]
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
// Bind the accountant contract with aspect.
await broker_contract.bind({
    priority: 1,
    aspectId: aspectId,
    aspectVersion: 1,
}).send({ from: brokerDeployer, nonce: nonceValBrokerDeployer + 1 })
    .on('receipt', function (receipt) {
        console.log("=============== bind aspect ===============")
        console.log(receipt)
    })
    .on('transactionHash', (txHash) => {
        console.log("contract binding tx hash: ", txHash);
    });

await new Promise(r => setTimeout(r, 5000));
```

### 5. Start the Scheduler
Call the contract method to initiate scheduled salary payment transactions:
```tsx
// Call the contract method to start schdule salary pament transation.
await broker_contract.methods.startSchedule()
  .send({ from: brokerDeployer, nonce: nonceValBrokerDeployer + 2 })
  .on('receipt', (receipt) => {
      console.log("=============== called startSchedule===============")
      console.log(receipt);
  })
  .on('transactionHash', (txHash) => {
      console.log("called startSchedulet tx hash: ", txHash);
  });
```

### 6. Complete code and Demonstration


For the complete code and demonstration, you can refer to the provided GitHub repository:
**Complete code:**

    https://github.com/artela-network/aspect-example/tree/feat/clean-v2/schedule_salary

To build and run the demonstration:

```bash
cd .     
sh script/build.sh

cd app
sh run-normal.sh 
sh run-app.sh    
```

### Summary

In this step-by-step guide, we've explored the Scheduler Aspect, a powerful tool for automating on-chain scheduled transactions. By following these steps, you've learned how to:

1. Deploy an ERC20 smart contract, such as `ArtToken`, to represent your digital assets.
2. Create a `Broker` contract responsible for scheduling and managing transactions.
3. Develop your custom Aspect, `SalaryPayment`, which triggers scheduled payments and ensures transparency.
4. Deploy your Aspect to the Artela blockchain network, enabling it to interact with smart contracts.
5. Bind your Aspect to the `Broker` contract, establishing the necessary connection.
6. Initiate the scheduler to automate periodic salary payments.


This Scheduler Aspect example demonstrates the flexibility and extensibility of smart contracts on Artela. You can adapt this approach to various use cases where automated, time-based transactions are required. Whether it's for payroll, recurring payments, or any other time-sensitive operation, the Scheduler Aspect empowers you to build robust, secure, and efficient blockchain applications.