---
sidebar_position: 2
---

Through this page, you can learn how to write an aspect and explore the functionalities it offers to assist you in various tasks.

# 1. ****High-level Overview****

## 1.1 What Is Aspect

Aspect is a native extension on the Artela Network that provides security isolation and composability to enhance its functionality. Aspects are designed to manage the entire lifecycle of a transaction and interact with the base processing context. They can customize the transaction validation process, making them a powerful tool for you to use in creating high-quality aspect-oriented code.

Aspects run within a secure sandbox environment (wasm runtime) that operates independently from the base layer, ensuring that the execution of Aspects has no impact on the security and availability of the base layer. Additionally, Aspects are securely isolated from each other, ensuring that the execution of one aspect does not affect others.

Another important feature of Aspects is the composability. You can bind smart contracts with Aspects to bring additional functionality. Transactions calling smart contracts pass through Aspects, providing additional processing capabilities. Aspects can be combined with multiple smart contracts seamlessly, making them a flexible and powerful tool for developers to use.

Overall, Aspect is a powerful tool for you looking to create high-quality aspect-oriented code. Its ability to manage the entire lifecycle of a transaction and interact with the base processing context, combined with its security isolation and composability, make it a valuable addition to the Artela Network.

## 1.2 How To Develop An Aspect

Aspects are designed to run on the WebAssembly (Wasm) platform, and you can use any language that is supported by Wasm to develop an Aspect. But at present, only the library for developing Aspects is available in [AssemblyScript](https://www.assemblyscript.org/getting-started.html). 

All logic implementing Aspect requires entry points defined in the following file:

```bash
${your-poject}/assembly/aspect/aspect.ts
```

To implement the desired logic within an Aspect join point where you want to achieve a specific functionality, please ensure that the code and package references adhere to the AssemblyScript development guidelines. 

- meaning of every join point
    
    [2.1 Join Points](https://www.notion.so/2-1-Join-Points-19abe60bffe748059fc05589802b5492?pvs=21) 
    
- available input parameter contents and supported functionalities
    
    [2.2.1 Input Ctx](https://www.notion.so/2-2-1-Input-Ctx-3139b0c5cac94f86a12c9249860d71b9?pvs=21) 
    
- definition of output parameters
    
    [2.2.2 AspOutput](https://www.notion.so/2-2-2-AspOutput-62b2034f58814875ac68c4aa7509496a?pvs=21) 
    

To compile and verify your code, run npm command:

```bash
# build a release version
npm run asbuild:release
# build a debug version
npm run asbuild:debug
```

# 2. Core Concepts

## 2.1 Join Points

Join Points refer to the specific positions within the transaction processing lifecycle where an Aspect can be applied. Artela defines a set of Join Points that you can use to specify when and where your Aspects should be executed during the processing of transactions.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f896d580-df14-4453-a527-1b3458c8f561/Untitled.png)

- `onTxReceive`
    
    This Join Point occurs at receiving transaction data from a broadcast.
    
- `onBlockInitialize`
    
    This Join Point occurs at the beginning of a new block. Aspects applied at this Join Point can perform initialization tasks or set up any necessary state for the block.
    
- `onTxVerify`
    
    This Join Point occurs during the verification of a transaction. Aspects applied at this Join Point can intercept and modify the transaction data, perform additional validation checks, or enforce specific rules.
    
- `onAccountVerify`
    
    This Join Point occurs during the verification of account.
    
- `onGasPayment`
    
    Not supported at the moment.
    
- `preTxExecute`
    
    This Join Point occurs before the execution of a transaction. 
    
- `preContractCall`
    
    This Join Points occurs in front of a contract call. In preContractCall, you can trace all the state changes of current transaction that cached in EVM.
    
- `postContractCall`
    
    This Join Points occurs at the back of a contract call. In postContractCall you can trace the state change bring with both the transaction and the contract call.
    
- `postTxExecute`
    
    This Join Point occurs after the execution of a transaction. At this join point, the transaction has already been executed, and you can query the post-transaction data to trigger an inherent transaction or prevent the current transaction.
    
- `onTxCommit`
    
    This Join Point occurs after the successful execution and commitment of a transaction.
    
- `onBlockFinalize`

To implement your custom logic within the matched functions below, which will be triggered at the join points:

```tsx
onTxReceive(ctx: OnTxReceiveCtx): AspectOutput {

}

onBlockInitialize(ctx: OnBlockInitializeCtx): AspectOutput {

}

onTxVerify(ctx: OnTxVerifyCtx): AspectOutput {

}

onAccountVerify(ctx: OnAccountVerifyCtx): AspectOutput {

}

onGasPayment(ctx: OnGasPaymentCtx): AspectOutput {

}

preTxExecute(ctx: PreTxExecuteCtx): AspectOutput {

}

preContractCall(ctx: PreContractCallCtx): AspectOutput {

}

postContractCall(ctx: PostContractCallCtx): AspectOutput {

}

postTxExecute(ctx: PostTxExecuteCtx): AspectOutput {

}

onTxCommit(ctx: OnTxCommitCtx): AspectOutput {

}

onBlockFinalize(ctx: OnBlockFinalizeCtx): AspectOutput {

}
```

In addition to these join points, there are two additional methods available to control aspect upgrades and restrict contract bindings. They are

- `isOwner`
- `onContractBinding`

See [3.1 Authentication Management](https://www.notion.so/3-1-Authentication-Management-59d386af2acf4915a394865f78ad3b49?pvs=21) for the usage of these two methods.

## 2.2 Input & Output

### 2.2.1 Input Ctx

- **blockHeight**: current block height.
- **tx**: current transaction.
- **methods**(**`Hostapis`**)
    
    These functions provide entry points for the functionality along the call chain. Different join points is associated with different functionalities. Refer to the diagram below for the available functionalities and the corresponding join point scopes.
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/92273a72-c8cc-4861-88dc-789ae1b52785/Untitled.png)
    
    - `currentBlock`
        
        Get the block header of current ethereum block.
        
        ```tsx
        let block = ctx.currentBlock();
        if (block) {
        	let header = block.header;
        	...
        }
        ```
        
    - `lastBlock`
        
        Get the last ethereum block. Call lastBlock
        
        ```tsx
        let block = ctx.lastBlock();
        if (block) {
        	let header = block.header;
        	...
        }
        ```
        
    - `localCall`
        
        Not supported at the moment.
        
    - `getProperity`
        
        To retrieve the properties of an aspect, pass the key associated with the aspect, which is deployed together with it.
        
        e.g. Properties “*TargetAddr*”, “*ScheduleTo*”, “*Broker*”, “*binding*” and “*owner*” are deployed with aspect like
        
        ```tsx
        let instance = aspect.deploy({
        	data: '0x' + aspectCode,
        	properties: [{ 'key': 'TargetAddr', 'value': targetAccount }, { 'key': 'ScheduleTo', 'value': brokerAddress }, { 'key': 'Broker', 'value': brokerDeployer }, { 'key': 'binding', 'value': brokerAddress }, { 'key': 'owner', 'value': AspectDeployer }]
        }).send({ from: AspectDeployer, nonce: nonceValAspectDeployer });
        ```
        
        Get the property of “ScheduleTo”
        
        ```tsx
        let scheduleToAddress = ctx.getProperity("ScheduleTo")
        ```
        
    - `setContext`
        
        Store a key-value pair in the temporary space of memory and pass to other join points, the memory is binding to current tx. When the tx is completed, the space will be destroyed.
        
        ```tsx
        // balance = BigInt.fromUint64(100)
        ctx.setContext("balance-key", balance.toString(16))
        ```
        
    - `getContext`
        
        Retrieve the key-value pair stored using `setContext`.
        
        ```tsx
        let stored = ctx.getAspectState("balance-key");
        let balance = BigInt.fromString(stored, 16);
        ```
        
    - `setAspectState`
        
        Same with a setContext, store a key-value pair in the blockchain state, but not shared with other aspects.
        
        e.g. Store balance of an account
        
        ```tsx
        // balance of 0xBC0E48f5d2A48350B74c81ECed3A42b35b532ef8 = BigInt.fromUint64(100)
        ctx.setAspectState("0xBC0E48f5d2A48350B74c81ECed3A42b35b532ef8", balance.toString(16))
        ```
        
    - `getAspectState`
        
        Retrieve the key-value pair stored using `getAspectState`.
        
        Retrieve the balance corresponding to the stored account as shown below.
        
        ```tsx
        let stored = ctx.getAspectState("0xBC0E48f5d2A48350B74c81ECed3A42b35b532ef8");
        let balance = BigInt.fromString(stored, 16);
        ```
        
    - `traceStateChange`
        
        Retrieve the process of changes for a variable that modified the state during transaction execution or after execution.
        
        *This method is not recommended for direct usage. Instead, please refer to [2.3.2 Schedule An AdHoc Transaction](https://www.notion.so/2-3-2-Schedule-An-AdHoc-Transaction-b656e2a21bc54c4d893d08e9154e796c?pvs=21)  of the code generation tool that facilitates its invocation.*
        
    - `scheduleTx`
        
        Schedule a transaction.
        
        *This method is not recommended for direct use. Please refer to [2.3 Scheduler](https://www.notion.so/2-3-Scheduler-faa2e2b9820d43508b9547627102a2ca?pvs=21)  to learn about the recommended approach for scheduling a transaction.*
        
    - `addInherent`
        
        Not supported at the moment.
        
    - `revertTx`
        
        This method is used for rolling back or reverting transactions. Once it is called, the WASM will immediately exit, and the remaining aspects will not be executed, also the current transaction will be marked as failed, and any changes it made to the state will not take effect.
        
        Reason for marking the transaction execution as failed can be passed as shown below.
        
        ```tsx
        ctx.revert("incorrect balance, transaction invalidated")
        ```
        
    - `dropTx`
        
        Not supported at the moment.
        
        Works only for OnTxReceived. If this method is called, the currently received broadcast transaction will be deleted and will not be inserted into the mempool for on-chain submission.
        
    - `currentBalance`
        
        currentBalance returns the balance of native tokens.
        
        If the block has not yet started, an attempt is made to query the balance from the last block. This behavior is intended to occur only at the ***onTxReceive*** join point.
        
        If a transaction is being processed, the cached balance is returned. This behavior is intended to occur at ***preContractCall*** and ***preContractCall*** .
        
        Otherwise, an attempt is made to retrieve the account balance using a current block query.  This intended to occur at other join points except ***onTxReceive, preContractCall*** and ***preContractCall.***
        
        Passing the contract account address or EOA address allows for retrieving the balance.c
        
        ```tsx
        let balance = ctx.currentBalance("0xBC0E48f5d2A48350B74c81ECed3A42b35b532ef8");
        ```
        

### 2.2.2 AspOutput

To create return value a AspOutput

```tsx
let ret = new AspectOutput();
ret.success = false;
ret.message = "balance incorrect, transaction rollback";
return ret;
```

- success
    
    The flag of success also decide the transaction execution revert or not. Unlike "revert," it does not immediately exit, but instead continues executing other aspect logics.
    
- message
    
    If the transaction rollback is set (success = false), assign the transaction failure reason to the message. If the transaction is successful, keep the message empty.
    

## 2.3 Scheduler

### 2.3.1 Schedule A Periodic Transaction

The scheduler works like:

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9b6710ad-2ec4-4d65-815a-639565f8be11/Untitled.png)

To submit a scheduler in aspect, for instance, we arrange periodic transaction calls to a on-chain contract method

`function transfer(address target,uint256 amount) public onlyOwner`

scheduler can be set in the following way:

```tsx
import { Opts, PeriodicSchedule, Schedule,ScheduleTx } from "@artela/aspect-libs/scheduler";
import { ethereum } from "@artela/aspect-libs/abi";

...
private scheduleTx(ctx: ScheduleCtx, target: string, amount: u64): bool {
	// prepare the transfer parameters, and encode them to abi input.
	let addr = ethereum.Address.fromHexString(target);
	let num = ethereum.Number.fromU64(amount);
	let payload = ethereum.abiEncode('transfer', [addr, num]);

	debug.log(payload);

	// the scheduled transaction with params. Adjust the gas cap and other options
	// to your values.
	// the broker account is used to pay for the transaction fees associated with each scheduled transaction
	let broker = "0xBC0E48f5d2A48350B74c81ECed3A42b35b532ef8"
	// contract is the address which scheduled transactions calls to
	let contract = "0xA32576Bd17b4e9dDfFaD917068F80A4ff7b7409a";
	let tx = new ScheduleTx(contract).New(
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
```

### 2.3.2 Schedule An AdHoc Transaction

Similar to scheduling a periodic transaction, the method for scheduling an ad-hoc transaction is as follows:

```tsx
// build scheduleTx just as it is in periordic scheduler
tx := new ScheduleTx...

var adhocSch : Schedule = AdHocSchedule
	.new(ctx, "myAdhocSchedule")
	.nextNBlocks(5)
	.maxRetry(2);

adhocSch.submit(tx);
```

## 2.4 Trace State Change

You can use aspect-tool to trace variables or directly call **`getStateChanges`** to obtain raw data.

### 2.4.1 **Option 1: Trace Varibales with** `aspect-tool` (Recommended)

**Tracing Progress**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4a31d0aa-58df-4e07-80ff-340ce92436aa/Untitled.png)

Just as indicated by the blue boxes and blue lines shown above, to trace state changes, you can follow the steps outlined below:

1. Identify the specific contract you want to trace or a group of contracts with similar layouts (referring to contracts with the same storage layout and variables), and obtain the storage layout file.
    
    The storage layout can be generated using the following approach
    
    ```bash
    solc --storage-layout myContract.sol -o myContract
    ```
    
2. Install aspect-tool and generate trace state file based on storage layout
    
    ```bash
    # install aspect-tool
    npm install -g @artela/aspect-tool
    
    # generate trace file
    aspect-tool generate
    
    # input your storage layout file path and output path, e.g.
    > myContract/MyContract_storage.json
    > myContract.ts
    ```
    
3. Import and use generated trace state file in your aspect. For instance, in the contract where you want to monitor the changes in a variable named `balance` of type `uint256` , you can get the change like
    
    ```tsx
    import {balance} from "./myContract"
    
    ...
    postTxExecute(ctx: PostTxExecuteCtx): AspectOutput {
    	...
    	// ctx: current ctx, If passing ctx is unavailable,
    	//   then the tracing functionality at the current join point is not accessible.
    	// ctx.tx!.to: contract address to track
      let balance = new myContract.balance(ctx, ctx.tx!.to);
    	let originalBalance = balance.before();
    	let lastestBalance = balance.lastest();
    	let diff = balance.diff();
    	let changes = balance.changes();
    }
    ```
    
    `State.account` ****in **changes,** refers to the account address that leads to a change in value.
    
    `State.change` in **changes**, refers to the value after updating by the account.
    

**Tracing a mapping variable**

Let’s say a variable in the contract *“myContract”* is defined like `mapping(string => uint256) public accounts;`, pass the key of the value which need to be traced, the approach is as follows:

```tsx
let accounts = new myContract.accounts(ctx, ctx.tx!.to);
let diff = balance.diff("acct1");
```

**Tracing a mixed complex structure**

A mapping with a value of user-defined struct variable in the contract is defined as follows:

```tsx
mapping(address => Person) public persons;
struct Person {
	string id;
	uint256 balance;
}
```

To trace the changes, the approach is as follows:

```tsx
let persons = new myContract.persons(ctx, ctx.tx!.to);
let tom_address = ethereum.Address.fromHexString('0xA32576Bd17b4e9dDfFaD917068F80A4ff7b7409a');
let tom_balance_latest = account.person(tom_address).balance().latest();
...
```

### 2.4.2 **Option 2**: Trace Variables, directly calling host function `getStateChanges`.

Calling the trace with command:

```go
let changes = ctx.getStateChanges({cotract address}, "{variable}", "{key}")
```

1. **Input Params:**
    - **contract address**: The contract is tracing for. Pass `tx.to!` for current contract of transaction invoked.
    - **variable**: The variable is tracing for, with a format of `contract_name.vairable_name` , e.g. HoneyPot.balance.
    - **key**:
        - For a primitive variable such as string, uint256, bool, etc., use empty uint8array. `new uint8array()`
        - For a complex type
            - **simple map**, use the uint8array of abi encoded map key, e.g. map key = “abc”, `uint8array(abiEncode(”abc”))`
            - **nested map**, use the union of encoded key, e.g. map[”abc”][123], `concat(uint8array(abiEncode(”abc”)), uint8array(abiEncode(”123”))`)
            - **user defined structure**, use the uint8array of encoded filed name. e.g. person.Name, `uint8array(abiEncode(”Name”)`
            - **mix of map and structure**, concat the abi encoded map keys and fields in order.
2. **Output:**
    
    The return value is a list of key-value pairs in the format of "address:change". Here, the "address" corresponds to the entity that made the changes, while the "value" represents an ABI-encoded value of your variable type.
    
    e.g. read returns for `balance: uint256`.
    
    ```go
    let account = changes.all[0].account; // the account made the change
    let valueHex = utils.uint8ArrayToHex(changes.all[0].value); // changed value, with a format of abi encode
    let value = BigInt.fromString(valueHex, 16);
    ```
    

## 2.5 Aspect Property

# 3. Aspect Maintenance

## 3.1 Authentication Management

- **isOwner**
    
    This mechanism serves as a permission control measure, specifically for actions like **upgrading** the Aspect. It is a join point that gets triggered during the upgrade deployment process, enabling permission verification.
    
    The `isOwner` function's return value has the following implications:
    
    - **True**: Permission check passed, allowing the upgrade.
    - **False**: Permission check failed, denying the upgrade.
    
    ```tsx
    isOwner(ctx: StateCtx, sender: string): bool {
    
    }
    ```
    
    **Example:**
    
    > One approach is to include administrator account and related information in the deployed property, such as deploy with property of `owner`(Deploy details see [](https://www.notion.so/8e9ed459203c4c1da7dcaaf0f34796f2?pvs=21) )
    > 
    
    ```tsx
    instance = aspect.deploy({
    		data: '0x' + aspectCode,
    		properties: [{ 'key': 'owner', 'value': accounts[0] + "," + account[1] }] // <-- properity of aspect, k-v pairs
    }).send({ from: accounts[0], nonce: nonceVal });
    ```
    
    > And the logic for performing permission checks is as follows:
    > 
    
    ```tsx
    isOwner(ctx: StateCtx, sender: string): bool {
    		let value = ctx.getProperty("owner");
        if (value.includes(sender)) {
    		    return true;
        }
        return false;
    }
    ```
    
- **onContractBinding**
    
    Similar to upgrade permission checks, this join point is called during contract binding and allows determining which contracts can be bound to this aspect.
    
    ```tsx
    onContractBinding(ctx: StateCtx, contractAddr: string): bool {
    
    }
    ```
    

## 3.2 Upgrade

To enhance a specific aspect, it is crucial to ensure that you possess the necessary permission for that aspect. Upgrade an Aspect using `@artela/web3.js` refers to [here](https://www.notion.so/Web3-js-Empowering-Aspect-and-Smart-Contract-Development-a60802e129104395bafda62eb048afa0?pvs=21).