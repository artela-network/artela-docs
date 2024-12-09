---
sidebar_position: 3
---
# Launching an EVM++ Rollup

This guide explains how to set up and launch the Artela-Rollkit testnet in both local development and stnet environments. Follow the steps to ensure successful deployment and testing.

---

## Part 1: Setting Up a Local Development Environment

### Option 1: Using Docker

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/artela-network/artela-rollkit.git
   cd artela-rollkit
   ```

2. **Start Docker Containers**:

   Ensure Docker and Docker Compose are installed on your system, if not installed, see [Install Docker]ttps://docs.docker.com/engine/install/).
   Run the following command to start the local environment:

   ```bash
   docker-compose up -d
   ```

3. **Verify the Setup**:

   Check that all services are running:

   ```bash
   docker-compose ps
   ```

   To see the status, run `docker logs -f artroll`.
   Visit [Rollkit Artela EVM++](https://rollkit.dev/tutorials/execution/artela-evm-plus-plus)

### Option 2: Manual Setup (Local Execution)

1. **Run the Initialization Script**:

   Execute the `init.sh` script to configure the environment:

   ```bash
   bash init.sh
   ```

2. **Start the Local Data Availability (DA) Layer**:

   Run the DA service locally:

   ```bash
   curl -sSL https://rollkit.dev/install-local-da.sh | bash -s v0.3.1
   ```

   Vist [Local DA](https://rollkit.dev/tutorials/da/local-da) for more details.

3. **Launch the Artela-Rollkit Node**:

   Use the following command to start the node:

   ```bash
   artela-rollkitd start \
     --rollkit.aggregator \
     --rollkit.da_address 'http://127.0.0.1:7980' \
     --home ./.artroll
   ```

---

## Part 2: Running the Testnet

### Step 1: Setting Up the Celestia DA Layer

1. **Install Celestia Components**:
   - Follow the [Celestia Node Installation Guide](https://docs.celestia.org/) to install and configure lestia Light or Bridge Node.

2. **Run Celestia Node**:
   Use arabica as an example.
   Clone source and checkout v0.20.2-arabica: 

   ```bash
   git@github.com:celestiaorg/celestia-node.git
   git clone git@github.com:celestiaorg/celestia-node.git
   cd celestia-node
   git checkout v0.20.2-arabica
   ```

   Build the source:

   ```bash
   make build
   cp build/celestia /usr/local/bin/.
   make cel-key
   cp cel-key /usr/local/bin/.
   ```

   Init a light node:

   ```bash
   celestia light init --p2p.network arabica
   ```

   Add keys and found in https://faucet.celestia-arabica-11.com/:

   ```bash
   cel-key add my_celes_key --keyring-backend test --node.type light --p2p.network arabica
   cel-key list --node.type light --keyring-backend test --p2p.network arabica
   ```

   Start the light node:

   ```bash
   celestia light start --keyring.keyname my_celes_key --core.ip validator-1.celestia-arabica-11.com p2p   network arabica
   ```

   Learn more details:
   https://docs.celestia.org/how-to-guides/light-node
   https://docs.celestia.org/how-to-guides/arabica-devnet#integrations

### Step 2: Start Artela-rollkit

1. **Set Environment Variables**

   ```bash
   DA_BLOCK_HEIGHT=$(celestia header network-head | jq -r '.result.header.height')
   echo -e "\n Your DA_BLOCK_HEIGHT is $DA_BLOCK_HEIGHT \n"   
   AUTH_TOKEN=$(celestia light auth write --p2p.network arabica)
   echo -e "\n Your DA AUTH_TOKEN is $AUTH_TOKEN \n"   
   DA_NAMESPACE=00000000000000000000000000000000000000000008e5f679bf7116cb   
   DA_ADDRESS=http://localhost:26658
   ```

2. **Start Artela-rollkitd and Set DA to Celestia Testnet Arabica**

   ```bash
   artela-rollkitd start --rollkit.aggregator --rollkit.da_auth_token $AUTH_TOKEN --rollkit.da_namespace A_NAMESPACE --rollkit.da_start_height $DA_BLOCK_HEIGHT --rollkit.da_address $DA_ADDRESS --home ./.artroll
   ```

## Part 3: Add Node

1. **Generate a New Node**

   Run the following command to generate a new script:

   ```bash
   artela-rollkit init my-node
   ```

2. Configure the Node

   Copy `genesis.json` from an existing node in the network to `~/.artroll/config`.
   Modify `config.toml` and `app.toml` in `.artroll/config` as needed.

   Set seeds in the format `p2p_id@ip:port`:

   ```bash
   seeds = "p2p_id@ip:port"
   ```

3. Start the Node

   ```bash
   artela-rollkitd start --rollkit.da_address 'http://127.0.0.1:7980'
   ```
