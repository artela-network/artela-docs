---
sidebar_position: 2
---

# Command Line


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
   npm run contract:build
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
