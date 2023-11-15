# Generate state tracing code

> A smart contract contains multiple accounts and variables, and the state changes generated by their contract calls are
> a particularly complex data structure.    
> In order to simplify the difficulty of aspect, we generate `xxx_Storage.ts` a wrapper class for [TraceContext](/develop/reference/aspect-lib/components/sys/context#5-syscontexttrace) based on
> the `Storage.json` generated by contract compilation.   

## 1. Command

```shell
USAGE
  $ aspect-tool generate [-i <value>] [-o <value>]

FLAGS
  -i, --in=<value>
  -o, --out=<value>

DESCRIPTION
  Generate state tracing code for Aspect.
```

## 2. Create a simple smart Contract

Assuming you already have an [Aspect Project](/develop/reference/aspect-tool/install), please add the following smart contract to the 'contracts' folder.

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

        (bool sent,) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");
        address sender = msg.sender;
        balances[sender] = 0;
    }
}
```

## 3. Compile contract

```shell
npm run contract:build
```
or

```shell
solc -o ./build/contract/ --via-ir --abi --storage-layout --bin ./contracts/*.sol  --overwrite
```

The result of the compilation will produce one ./build/contract/Storage.json

## 4. Generate code


```bash
npm run aspect:gen
```

```shell
aspect-tool generate -i ./build/contract/honeypot_storage.json -o ./assembly/aspect/honeypot_storage.ts
```
with the following command to generates ./assembly/aspect/honeypot_storage.ts

## 5. How to work

> The following code shows how to judge the balance change of the current contract and compare the state change of balances map that `key==currentCall.from` in the contract, if it is not the same, revert transaction

```typescript
//import 
import {HoneyPotState} from "./honeypot_storage";

class GuardByCountAspect implements IAspectTransaction {
    ...
    postContractCall(ctx: PostContractCallCtx): void {
        // 1.Calculate the eth balance change of DeFi SmartContract(HoneyPot) before and after tx.
        let sysBalance = new HoneyPotState._balance_(ctx.trace, ctx.currentCall.to);
        let deltaSys = sysBalance.current()!.sub(sysBalance.original());


        // 2.Calculate the financial change of withdrawer in DeFi SmartContract(HoneyPot) before and after tx.
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
            sys.revert("risky transaction")
        }
    }
    ...
}
```