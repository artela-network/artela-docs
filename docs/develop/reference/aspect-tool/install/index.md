---
sidebar_position: 2
---

# Init Aspect project

## Requirements

1. [Node.js](https://nodejs.org/en/download/) version 18.0 or above (which can be checked by running node -v). You can
   use [nvm](https://github.com/nvm-sh/nvm) for managing multiple Node versions on a single machine installed.
When installing Node.js, you are recommended to check all checkboxes related to dependencies.

* Confirm that Node.js has been installed correctly by running
```shell
node --version
```

2. [sloc](https://docs.soliditylang.org/en/latest/installing-solidity.html)  Installing the Solidity Compiler.


## 1. Init project

```shell

mkdir my-first-aspect && cd  my-first-aspect

npx @artela/aspect-tool init
```

## 2. Project Architecture

```shell
.
├── README.md
├── asconfig.json
├── assembly
│   ├── aspect                     <-- your aspect here
│   └── index.ts
├── contracts                            <-- your contract here
├── package.json
├── project.config.json                  <-- project profile
├── scripts                              <-- project deployment scripts
│   ├── aspect-deploy.cjs         
│   ├── bind.cjs                   <-- contract bind aspect script
│   ├── contract-call.cjs         
│   ├── contract-deploy.cjs
│   ├── contract-send.cjs
│   └── create-account.cjs
├── tests
└── tsconfig.json

```

## 3. Project Config

### 1.Contract Compiler Configuration

Sometimes you need to change the compilation method to get different features, for example, to use artela-evm features,
you need to use asolc to compile the contract, so you need to modify the compilation method of the smart contract.

Modify the 'contract:build' in the 'package.json' to support it:

1. **solc mode （default)**

   [solc](https://docs.soliditylang.org/en/v0.8.20/installing-solidity.html) is required，Update 'contract:build' to the
   following,

   ```json
    {
       "contract:build": "solc -o ./build/contract/ --via-ir --abi --storage-layout --bin ./contracts/*.sol  --overwrite"
     }
   ```

2. **solcjs mode**

   The project relies on a third-party npm package like '@openzeppelin/contracts', which needs to be compiled
   in [solcjs](https://github.com/ethereum/solc-js). Update 'contract:build' to the following,

   Install solcjs
   ```shell
   npm install -g solc
   solcjs --version
   ```
   Update 'contract:build' to the following:

   ```json
   {
     "contract:build": "solcjs --abi --bin --include-path ./node_modules/ --base-path . -o ./build/contract/  ./contracts/*.sol"
   }
   ```

3. **asolc mode**

   ASOLC was developed to generate corresponding state tracing Intermediate Representations (IRs) that synergize with
   Artela EVM. Thus, ASOLC can be viewed as an enhanced version of SOLC, maintaining full compatibility with SOLC while
   introducing groundbreaking features.

   Download [asolc](https://github.com/artela-network/artela-solidity/tags) and set the local environment variables;

   Update 'contract:build' to the following:
   ```json
    {
       "contract:build": "solc -o ./build/contract/ --via-ir --abi --storage-layout --bin ./contracts/*.sol  --overwrite"
     }
   ```

### 2.Network Configuration

modify the `project.config.json` in the project root folder to set the network configurations as the following (assuming
we are using [artela devnet](/develop/node/access-testnet), if you are using your own node, please change the config
accordingly):

```json
{
  "node": "https://artela-devnet-rpc1.artela.network"
}
```

## 4. Command Line

### 1.Create a account

Link Artela to create an account and put the private key at the specified address;

```solidity
  npm run account:create  -- --pkfile {file_path}
```

options：

> * --pkfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
---

### 2. Build contract

```solidity
   npm run contract : build
```

The compiled product is placed in the `build/contract` directory.

### 3. Deploy contract

```bash
  npm run contract:deploy -- --pkfile {privateKey-path} \                        
                           --abi ./build/contract/xxx.abi \                          
                           --bytecode ./build/contract/xxx.bin \     
                           --args [..] \                     
                           --gas 200000         
```

options：
> * --pkfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
> * --abi : contract abi path.
> * --bytecode:  contract bytecode path.
> * --args : If your contract's constructor requires input parameters, use `--args '[1, "a"]'` (optional).
> * --gas : e.g., `200000` (optional,default value `7000000`)
---

### 4. Build Aspect

```bash
   npm run aspect:build
```

The compiled product is placed in the `build` directory.

---

### 5. Deploy Aspect

```bash
  npm run aspect:deploy -- --pkfile {privateKey-path} \                                                
                         --wasm ./build/release.wasm \
                         --gas 200000  
```

options：

> * --pkfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
> * --wasm : wasm path.
> * --gas : like `200000`,(optional,default value `7000000`).
---

### 6. Contract Bind Aspect

```bash
  npm run contract:bind -- --pkfile {privateKey-path} \                          
                         --contract {smart-contract-address} \
                         --abi ./build/contract/xxx.abi \                        
                         --aspectId {aspect-Id} \                          
                         --gas 200000 
```

options：

> * --pkfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
> * --abi : contract abi path.
> * --contract:  smart contract address.
> * --aspectId:  aspect id.
> * --gas : like `200000`,(optional,default value `7000000`).
---

### 7. Contract Call

```shell
  npm run contract:call -- --pkfile {privateKey-path}    \     
                         --contract {smart-contract-address}  \                         
                         --abi ./build/contract/xxx.abi   \                                    
                         --method {method-name}  \   
                         --args [..]
                         --gas 200000 
```

options：

> * --pkfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
> * --abi : contract abi path.
> * --contract:  smart contract address.
> * --method:  method name.
> * --args : If your contract's constructor requires input parameters, use `--args '[1, "a"]'` (optional).
> * --gas : like `200000`,(optional,default value `7000000`).
---

### 8. Send Transaction

```shell
  npm run contract:send -- --pkfile {privateKey-path}    \     
                         --contract {smart-contract-address}  \                         
                         --abi ./build/contract/xxx.abi   \                                    
                         --method {method-name}  \   
                         --args [..]
                         --gas 200000 
```

options：

> * --pkfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
> * --abi : contract abi path.
> * --contract:  smart contract address.
> * --method:  method name.
> * --args : If your contract's constructor requires input parameters, use `--args '[1, "a"]'` (optional).
> * --gas : like `200000`,(optional,default value `7000000`).
---
