---
sidebar_position: 7
---

# Configure Explorers

We recommend using [**Blockscout**](https://www.blockscout.com/) as the blockchain explorer for the EVM++ chain.  
Artela has released a fork of Blockscout that supports EVM++. For users who require specific support for [Aspect](https://docs.artela.network/develop/core-concepts/aspect) integration, the Artela fork is recommended.

---

## Prerequisites

1. **System Requirements:**
   - **CPU:** 4-core or 8-core
   - **Operating System:** Ubuntu 20.04 or later
   - **RAM:** 8GB / 16GB / 32GB
   - **Storage:** 120GB or 500GB NVMe SSD / Standard SSD

2. **Dependencies:**
   - **Docker** and **Docker Compose**
   - **PostgreSQL:** Version 13 or later
   - **Git**

3. **RPC Requirements:**
   - A **Full Archive Node**
   - **JSON RPC URL:** A JSON RPC interface provided by the Artela EVM++ chain, compatible with Ethereum's JSON RPC standard.
   - **WS URL:** A Websocket interface provided by the Artela EVM++ chain, compatible with Ethereum's JSON RPC standard.

---

## **Backend Repositories**

- **Original Repository:** [Blockscout Backend](https://github.com/blockscout/blockscout)  
- **Artela Fork:** [Artela Block Explorer Backend](https://github.com/artela-network/block-explorer)

---

## **Frontend Repositories**

- **Original Repository:** [Blockscout Frontend](https://github.com/blockscout/frontend)  
- **Artela Fork:** [Artela Block Explorer Frontend](https://github.com/artela-network/block-explorer-frontend)

---

## **Artela Fork Docker Image**

- **Backend:** `docker pull artelanetwork/block-explorer:latest`
- **Frontend:** `docker pull artelanetwork/block-explorer-frontend:latest`

---

## **Installation Guide**

Follow the [Blockscout Manual Deployment Guide](https://docs.blockscout.com/setup/deployment/manual-deployment-guide) for setup instructions.
