# State Access Wrapper

Artela allows Aspect access to the state's change of smart contract execution. It provides a host API to access it. But it is too low level and many too difficult to use it.

Here is an example to access the state’s change.

```tsx
// access a state 'balances' in a contract 
// which contract name is HoneyPot
// and address is 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
const contract = hexToUint8Array("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4");
const stateVar = 'HoneyPot.balances';

// call host API to access it.
const query= new StateChangeQuery(contract,stateVar,[]);
const response = sys.hostApi.trace.queryStateChange(query);
const indicesResult = Protobuf.decode<EthStateChangeIndices>(response, EthStateChangeIndices.decode);
```

This state access Wrapper can generate a wrapper class, and you can access the state’s changes more easily like this.

```tsx
//import wrapper class
import {HoneyPotState} from "./honeypot_storage";
...
// access it by a sweet api   
let contract = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'
let sysBalance = new HoneyPotState._balance_(contract);
```

This guide instructs users on generating a wrapper class using `aspect-tool generate` and provides guidance on its utilization.

## Command

```shell
USAGE
  $ aspect-tool generate [-i <value>] [-o <value>]
FLAGS
  -i, --in=<value>
  -o, --out=<value>
```

**options：**

> * --i :Input your storage layout json file path or directory, like ` -i storage_layout.json`  `-i ./build/contract`
> * --o: Target generated ts file output path or directory, like `-o xx.ts`  `-o ./aspect/contract`

## Example

### 1. create a smart contract

Add a smart contract to the 'contract' directory in the my-first-aspect project (see [Init Project](/develop/reference/aspect-tool/guide/init)), such as `HoneyPot.sol`：

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

### 2. set up the asolc
The compilation of the contract requires the utilization of `asolc`. For more information on `asolc`, please refer to [What is ASOLC](/develop/core-concepts/asolc)

Download the latest ASOLC releases [in here](https://github.com/artela-network/artela-solidity/releases).

```shell
## set up ASOLC to environment variables
$ export PATH= {your asolc path}:$PATH

## confirm that ASOLC is installed successfully
$ asolc --version 
solc, the solidity compiler commandline interface
Version: 0.8.21-develop.2023.10.27+commit.d545edb7.Darwin.appleclang

```

### 3. compile contract

Update package.json 'contract:build' using asolc:

```json
{
"contract:build": "asolc -o ./build/contract/ --via-ir --abi --storage-layout --bin ./contracts/*.sol  --overwrite"
}

```

Execute the contract compilation command

```shell
npm run contract:build
```

If the command is executed successfully, the following file will be generated in the './build/contract' directory.

```shell
.
├── build
│   ├── contract
│   │   ├── HoneyPot.abi
│   │   ├── HoneyPot.bin
│   │   └── HoneyPot_storage.json

```

### 4. generate class

```shell
npm run aspect:gen
```

Specifically, the command will be executed following command, and to generates `./assembly/aspect/honeypot_storage.ts` class.

```shell
aspect-tool generate -i ./build/contract -o ./assembly/aspect
```

### 5. how to work

> The following code shows how to judge the balance change of the current contract and compare the state change of
> balances map that `key==currentCall.from` in the contract, if it is not the same, revert transaction

```typescript
import {
    allocate,
    BigInt,
    entryPoint,
    execute,
    IPostContractCallJP,
    PostContractCallInput,
    sys,
    uint8ArrayToHex,
} from '@artela/aspect-libs';
import { HoneyPotState } from './contract/honeypot-storage';

class GuardBTraceAspect implements IPostContractCallJP {
    isOwner(sender: Uint8Array): bool {
        const value = sys.aspect.property.get<Uint8Array>('owner');
        return uint8ArrayToHex(value).includes(uint8ArrayToHex(sender));
    }

    postContractCall(input: PostContractCallInput): void {
        const mytest = sys.aspect.property.get<string>('mytest-key');
        sys.require(mytest === 'test abc ', 'failed to get property key.');

        // 1.Calculate the eth balance change of DeFi SmartContract(HoneyPot) before and after tx.
        const to = uint8ArrayToHex(input.call!.to);
        const from = uint8ArrayToHex(input.call!.from);
        const sysBalance = new HoneyPotState._balance_(to);
        const deltaSys = sysBalance.current()!.sub(sysBalance.original());

        // 2.Calculate the financial change of withdrawer in DeFi SmartContract(HoneyPot) before and after tx.
        const contractState = new HoneyPotState.balances(to);

        let deltaUser = BigInt.ZERO;

        const fromState = contractState.get(from);

        const current = fromState.current();
        const original = fromState.original();
        if (current && original) {
            deltaUser = current.sub(original);
        }
        // 3.Verify if the above two values are equal.
        if (deltaSys.compareTo(deltaUser) != 0) {
            sys.revert('risky transaction');
        }
    }
}

// 2.register aspect Instance
const aspect = new GuardBTraceAspect();
entryPoint.setAspect(aspect);

// 3.must export it
export { execute, allocate };
```

### 6. compile Aspect

Execute the Aspect compilation command

```shell
npm run aspect:build
```

If the command is executed successfully, WebAssembly is generated in the `build` directory
