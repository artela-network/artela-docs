---
sidebar_position: 6
---

# Integrating Bridges

This guide explains how to use Hyperlane to set up a bridge on Artela EVM++ Rollkit. We will start with environment preparation and gradually complete the bridge setup and testing.
Refer to the documentation: [Hyperlane Documentation](https://docs.hyperlane.xyz/docs/intro)

---

## 1. Environment Preparation

### 1.1 Install Necessary Tools

Before starting, make sure the following tools are installed:

- Node.js (recommended version: 22.10.0)
- npm (version 10.9.0 or higher)
- `hyperlane` CLI tool
- jq (installed at `/usr/bin/jq`)

Ensure the testnet or local network is running and you have the following artifacts and assets available:

- Metadata:
    - Chain name, e.g., `artroll1`
    - Chain ID, e.g., `11820`
    - RPC URL, e.g., `https://rpc.artroll1.com`
- A deployer wallet/EOA private key or seed phrase. This EOA should be funded on your custom chain and any chain you will be passing messages to and from.

If you need to deploy ArtRollkit locally, follow these steps:

1. Clone the ArtRollkit repository:

    ```bash
    git clone https://github.com/artela-network/artela-rollkit.git
    cd artela-rollkit
    ```

2. Start the local test network:

    ```bash
    docker compose up -d
    ```

   Verify the node is running successfully:

    ```bash
    curl http://localhost:26657/status
    ```

### 1.2 Ensure Hyperlane CLI is Properly Installed

Verify that the Hyperlane CLI is installed correctly:

```bash
hyperlane --version
```

If it is not installed, run the following commands:

```bash
npm install -g @hyperlane-xyz/cli
# Or uninstall old versions
npm uninstall -g @hyperlane-xyz/cli
```

Ensure the `hyperlane` executable is in the correct path:

```bash
echo $PATH
```

### 1.3 Set Up Working Directory

Create a directory for Hyperlane configuration and operations:

```bash
mkdir -p ~/.artroll/hyperlane-bridge && cd ~/.artroll/hyperlane-bridge
```

---

## 3. Configure New Chain

### 1. Download the Registry

```bash
git clone https://github.com/hyperlane-xyz/hyperlane-registry.git
```

### 2. Create a Custom Chain Configuration

Run the following command to initialize the configuration file:

```bash
hyperlane registry init --registry /your/path/to/hyperlane-registry
```

The configuration file is located at `$HOME/.hyperlane/chains/metadata.yaml`.

### 3. Configure, Deploy, and Test Core Contracts

Set an environment variable for the private key of the EOA funded on your custom chain:

```bash
export HYP_KEY='<YOUR_PRIVATE_KEY>'
```

Initialize the core contract configuration:

```bash
hyperlane core init --registry /your/path/to/hyperlane-registry
```

Deploy the contracts:

```bash
hyperlane core deploy --registry /your/path/to/hyperlane-registry
```

### 4. Run a Test Relayer

Run a relayer between your custom chain and Sepolia:

```bash
hyperlane relayer --chains yourchain,sepolia
```

### 5. Send a Test Message

```bash
hyperlane send message --relay
```

---

## 4. Deploy a Warp Route and Bridge a Token

During the deployment of the Warp Router, continue using the `HYP_KEY` for signing transactions:

```bash
export HYP_KEY='<YOUR_PRIVATE_KEY>'
```

### 1. Create Warp Route Configuration File

```bash
hyperlane warp init --registry /your/path/to/hyperlane-registry
```

For Warp Router configuration options, refer to the [deployment config schema](https://docs.hyperlane.xyz/docs/guides/deploy-warp-route#deployment-config-schema).

### 2. Deploy the Warp Route

Deploy the Warp Router to your custom chain and target chain:

```bash
hyperlane warp deploy
```

### 3. Test the Warp Route

```bash
hyperlane warp send --relay --symbol TOKEN --registry /your/path/to/hyperlane-registry
```

---

## 5. Run Local Bridge UI

Build the registry:

```bash
cd /your/path/to/hyperlane-registry
yarn build
```

Clone the UI source code:

```bash
git clone https://github.com/hyperlane-xyz/hyperlane-warp-ui-template.git
cd hyperlane-warp-ui-template
```

Replace the registry package path in `package.json`:

```json
"@hyperlane-xyz/registry": "4.11.1",
```

Change to:

```json
"@hyperlane-xyz/registry": "file:/your/path/to/hyperlane-registry",
```

Build the source and run:

```bash
yarn install && yarn build && yarn start
```

Then, in the opened browser page, you should see the newly added token pair and custom chain.
