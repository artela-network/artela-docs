# Start a Local Node

## 1. Building the Source

Building `artelad` requires the installation of Go, which you can install with your preferred package manager.

`Artela` comprises multiple repositories, including:

- [Artela SDK](https://github.com/artela-network/artela-aspect) : A modified version of Cosmos SDK with Aspect join-points hooks.
- [Aspect Framework](https://github.com/artela-network/artela-aspect) : A framework for fast integration of Aspect features for blockchains.
- [Aspect Runtime](https://github.com/artela-network/artela-aspect) : A WASM runtime implementation optimized for Aspect execution.
- [ArtEVM](https://github.com/artela-network/artela-aspect) : An enhanced version of EVM built by Artela, supporting call stack and state tracing.
- [ArtBFT](https://github.com/artela-network/artela-aspect) : A modified version of CometBFT with Aspect join-points hooks.

Since most of these repositories are currently private, successfully retrieving all the above dependencies from GitHub requires setting up either `GoPrivate` or `Sub-Module`. You can find instructions for both setups in the following two sections.

After setting up `GoPrviate`or `Sub-Module`, you can execute the following commands to build the source:

```bash
make clean
make install
```

### Option 1: Go Private Setup

`GOPRIVATE` is an environment variable in the Go programming language that specifies a comma-separated list of patterns (in the form of paths or modules) that always use direct downloading. Modules matching these patterns are downloaded directly, bypassing the public Go module proxy ([proxy.golang.org](http://proxy.golang.org/)) and the checksum database ([sum.golang.org](http://sum.golang.org/)).
This is especially useful when working with private repositories inaccessible through the public Go proxy.

Here is a step-by-step guide on setting up `GOPRIVATE` with a GitHub private repository:

1. **Create a Personal Access Token on GitHub**
    - Go to your GitHub settings.
    - Select "Developer settings" from the left menu.
    - Click "Personal access tokens" and then "Generate new token".
    - Provide a descriptive name for your token, select the `repo` scope (granting full access to private and public repositories), and click "Generate token".
    - Copy the generated token and save it somewhere securely, as you won't be able to see it again.
2. **Configure Git to Use the Token**
    - Open a terminal on your local machine.
    - Execute the following command, replacing `TOKEN` with your GitHub token and `OWNER` with the repository owner's name. 

    This command tells Git to replace the usual URL used for the repo with one that includes your Personal Access Token. This way, when Go attempts to fetch the private repo, it will be authenticated.

```bash
git config --global url."<https://${TOKEN}@github.com/${OWNER}/>".insteadOf "<https://github.com/${OWNER}/>"

```
        
1. **Set the GOPRIVATE Environment Variable**
    - Still in the terminal, execute the following command, replacing `OWNER/REPO` with the path to your repository. 
    
    This informs Go that the repository is private and should be fetched directly, bypassing the module proxy. You can add multiple repositories by separating them with a comma.
        
```bash
go env -w "GOPRIVATE=github.com/artela-network/*"

```
        
Now, when you run `go get`, `go build`, or any other command that fetches dependencies, Go will use your Personal Access Token to authenticate with GitHub and fetch the private repo directly. 

Ensure you keep your token safe and avoid sharing it or committing it to version control. If you frequently use the `GOPRIVATE` setting, consider adding the `export` command to your shell profile file (like `.bashrc` or `.bash_profile` for Bash, or `.zshrc` for Zsh) so it's automatically set whenever you open a new terminal session.

### Option 2: Sub-Module Setup

Clone `artelamint` and its dependencies into `${GOPATH}/src/github.com/artela-network/`. After completing this step, your directory structure in `artela-network` should look like this:
```bash
.
├── artela-aspect
├── artelamint
├── artelasdk
├── cometbft
├── evm
└── runtime

```

Execute the following script in the `artelamint` project root directory:

```bash
sh dev.sh set

```

This script automatically sets up directory replacements with your local repositories in all `go.mod` of `artelamint` and its dependencies:
```go
replace (
  github.com/artela-network/evm => ../evm
  github.com/artela-network/runtime => ../runtime
  github.com/cosmos/cosmos-sdk => ../artela-aspect
  github.com/tendermint/tendermint => ../cometbft
)

```

If you wish to use dependencies from GitHub instead of the local ones in your `go.mod` file, you can execute the following command:
```bash
sh dev.sh reset
```

## 2. Executables

The artelamint project includes several essential executables located in the `build` directory:

| Executables | Description |
| --- | --- |
| artelad | Artelad is a core program of Artela, which is an executable file that facilitates various functionalities such as creating accounts and launching Artela nodes.artelad --help for command line options. |

## 3. Running `artelad`

**Minimum Hardware Requirements**

To run an Artela node effectively, your machine should meet the following minimum hardware requirements:

- A CPU with at least 4 physical cores
- At least 500GB of SSD disk storage
- At least 16GB of memory (RAM)
- At least 100mbps network bandwidth

As the blockchain grows, the demand will also increase.

### Running a Single Node

To run a single node locally for development purposes, you can quickly bootstrap it using the following commands:
```bash
# config & genisis
sh init.sh

# start a single node
./artelad start --metrics --pruning=nothing --minimum-gas-prices=0.0001aphoton --json-rpc.api eth,txpool,personal,net,debug,web3,miner --api.enable
```
By default, the workspace of the node is set to `~/.artelad/`, where all blockchain data is stored. If you need to clear this data, you can simply remove the entire folder.

### Running a Full Node on the Artela Testnet

Connect to the JSON-RPC port service of the testnet through:

```
https://artela-devnet-rpc1.artela.network
https://artela-devnet-rpc2.artela.network
```

## Q&A

1. **What to do if you encounter the runtime error *"artelad: command not found"*?**

    It is possible that the `go install` command failed. Refer to [official Go installation documentation](https://go.dev/doc/install) to ensure that your Go environment is configured correctly.

    If the issue persists, try to build & run Artela with the following steps:

```bash
# Clean and Build
make clean && make all

# Initialize in the ./artelamint directory
sh init.sh

# Option 1: Copy artelad to /usr/local/bin (requires superuser privileges)
sudo cp $GOPATH/src/github.com/artela-network/artelamint/build/artelad /usr/local/bin/.

# Option 2: Run the command from within the ./artelamint directory
./build/artelad start --metrics --pruning=nothing --minimum-gas-prices=0.0001aphoton --json-rpc.api eth,txpool,personal,net,debug,web3,miner --api.enable
```