---
sidebar_position: 2
---

# Scheduler Aspect Example: Step-by-Step

The Scheduler Aspect is an example of building an on-chain scheduled transaction trigger. In this example, it involves defining an ERC20 token named `ArtToken`. Using the `Broker` contract, it enables transferring funds to a designated account at regular intervals of 5 blocks.

The overall process is as follows:

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2b4fad70-0617-4d97-a940-4bf4360fe14f/Untitled.png)

### 1. Deploy ERC20 Smart Contract

> **Step1:**  token.sol is xx.
> 

```solidity
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

> **Step2:**  broker.sol is xx.
> 

```solidity
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

> **Step3:**  compile token.sol and broker.sol to get deploy bytecode through asolc.
> 

```bash
>  asolc -o ${your target folder path} --via-ir --abi --bin ${your *.sol file path} --overwrite
```

> **Step4:**  deploy to Artela testnet.
> 

```solidity
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

### 2. Writer My Aspect

> **Step1:**  use tool to generate template for evm tracer.
> 

```tsx
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

### 3. Deploy Aspect

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

**Complete code:**

    https://github.com/artela-network/aspect-example/tree/feat/clean-v2/schedule_salary

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

---

P.s. **Solidity Smart Contract on Artela**

Here is a concise tutorial on how to write a smart contract using Remix and deploy it to the Artela test network:

1. Open Remix IDE: Enter the URL https://remix.ethereum.org/ in your browser to open Remix IDE.
2. Create a new smart contract: Click on the plus icon on the left to create a new smart contract. For example, you can create a new file named "MyContract.sol". In the new file, you can write your smart contract code.
3. Compile the smart contract: Click on the "Solidity compiler" icon in the left menu, then click the "Compile" button. Remix will compile your smart contract.
4. Select a test network in Metamask: If you haven't installed the Metamask plugin yet, you need to install it first. Then select a test network, such as the Artela test network, in Metamask.
5. Deploy the smart contract: Click on the "Deploy & run transactions" icon in the left menu. Select "Injected Web3" in the "Environment" options, which will connect to your Metamask wallet. Then click the "Deploy" button, and Remix will deploy your smart contract.
6. Confirm the deployment: Click the "Confirm" button in the confirmation window that pops up in Metamask to confirm the deployment.
7. Check the deployment result: In the "Deploy & run transactions" panel of Remix, you can see the deployed smart contracts. Click on the contract address, and you can view the details of the contract in the Artela blockchain explorer(soon).

These are the basic steps to write and deploy a smart contract using Remix. If you encounter any problems during the operation, you can refer to the official documentation of Remix and Metamask or seek help in the Artela community.