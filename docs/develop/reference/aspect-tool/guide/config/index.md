
# Project Config

## Introduce
Users can customize the following configuration within the project:
* 1. Contract compilation tool optional
* 2. Artela Network Rpc


## Configuration

### 1. Contract compilation tool optional

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

### 2.Network Rpc Configuration

modify the `project.config.json` in the project root folder to set the network configurations as the following (assuming
we are using [artela devnet](/develop/node/access-testnet), if you are using your own node, please change the config
accordingly):

```json
{
  "node": "https://artela-devnet-rpc1.artela.network"
}
```
