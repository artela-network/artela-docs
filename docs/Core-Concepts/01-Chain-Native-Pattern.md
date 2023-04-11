# Chain-Native Pattern

## 1. What is Chain-Native Pattern?

Chain-Native Pattern is a dApp design pattern based on "native extension". Users can dynamically add extension programs, called Native Extension, to a running blockchain to add new behaviors to the transaction processing process.

Under the Chain-Native Pattern, the blockchain has high extensibility, and developers can add customized native functions. Powerful and composable Native Extension is an extension of the basic capabilities of the blockchain. Developers can use Smart Contracts and Native Extensions to implement dApps with customized features.

## 2. Blockchain in Chain-Native Pattern

Compared with traditional blockchains, Chain-Native adds an extension layer, which is a 3-layer abstract structure of the blockchain: application layer, extension layer, and base layer.

<center>
<img
  src={require('./img/1.png').default} 
  alt="1"  
  width="70%"
/>
</center>

- **Application Layer:** Developers deploy Smart Contracts in the application layer to implement the core business logic of dApps. The application layer provides an execution environment consistent with traditional EVM blockchains, and is compatible with existing infrastructure (ChainLink, TheGraph, etc.).
- **Extension Layer:** The extension layer is the deployment and execution environment of Native Extension, which can be customized by developers. Native Extension realizes the ability extension of the underlying layer of the blockchain by calling the API of the base layer. Different Native Extensions and Smart Contracts can be combined with each other. Since Native Extension is security isolated and has a complete upgrade and version control strategy, the exception of Native Extension will not affect the overall network execution and other non-dependent dApps.
- **Base Layer:** It includes functional modules such as network, consensus, storage, and virtual machines, and is the basic component of a modular blockchain network. It not only provides modular combination capabilities for developers but also provides a unified API interface for the extension layer. Developers can choose consensus or storage modules according to their needs or develop Native Extensions dependent on APIs.

Based on the Chain-Native Pattern, it is possible for developers to build more powerful dApps. Compared with traditional AppChain and CrossChain, Chain-Native provides a technical solution that balances customization, modularity, and extensibility.

---

## 3. dApps in Chain-Native Pattern

Chain-Native Pattern provides developers with the ability to build and run Native Extension. dApps under Chain-Native Pattern consist of Smart Contracts, Native Extension, and BaseLayer API.

<center>
<img
  src={require('./img/2.png').default} 
  alt="2"  
  width="70%"
/>
</center>

**Smart Contract:**

A computer protocol that runs on the blockchain network and can conduct trusted transactions without the intervention of third parties. Developers use Smart Contract to implement the main business logic of dApps. Multiple Smart Contracts can be combined and have traceable and irreversible characteristics.

**Native Extension:**

A modular component that runs on the extension layer. It supports custom logic by developers and achieves highly customized functions through BaseLayer API. Native Extensions can be combined with each other and can be combined with Smart Contracts. It should be noted that Native Extension is security isolated and will not affect the state of Smart Contract, that is, non-state migration.

**BaseLayer API:**

API interface to the base layer of the blockchain that can be opened to the extension layer. The base layer is a collection of processing modules such as blockchain network, consensus, and storage. It provides customized capabilities for some basic functions to the extension layer through the interface. Under the Chain-Native Pattern, the ability of BaseLayer API is strictly controlled and will not cause damage to the blockchain network due to abnormal callers.

dApps under the Chain-Native Pattern is a collection of Smart Contracts, Native Extension, and BaseLayer API. Developers can freely combine and use them according to specific needs.

Developers can not only build lightweight dApps that only contain Smart Contracts but also develop Native Extensions to share with others. The accumulation of excellent Native Extensions will not only reduce the threshold for building dApps but also benefit developers and the community.

Providing a technical solution that balances customization, modularity, and extensibility is the design goal of Chain-Native.


---

## 4. How does Chain-Native benefit dApp?

> DApp in Chain-Native = Base Layer + Native Extension + Smart Contract

Chain-Native Pattern brings a new way of building dApps for developers. Developers do not need to develop and maintain an App Chain separately, and can achieve equivalent customization capabilities through Native Extension.

The combination of Smart Contract and Native Extension makes it possible to build stronger and independent dApps. The benefits brought by Chain-Native to dApps include:

**Reusable public services**

Native Extension can be published as an independent basic service. Developers can choose whether to integrate this basic service when building dApps. The modular construction method realizes the advantages of reducing code redundancy, enhancing software modularization capabilities, and improving software security.

**More flexible function extension**

Native Extension is a functional extension based on the main network. Different from cross-chain solutions such as shared security AppChain, Native Extension provides built-in expandability, which is a more accurate and efficient collaborative operation in the same network environment. The combination of Smart Contract and Native Extension, as well as the combination between Native Extensions, allows dApps to have more flexible extension capabilities.

**More independent dApp**

Native Extension is an extension of the basic capabilities of the blockchain. Developers can achieve deep customization capabilities such as GAS billing and transaction sorting by combining Smart Contracts and Native Extensions. Unlike dApps built only using Smart Contracts, the extension of the base layer allows dApps to maintain independence while achieving AppChain equivalent customization capabilities.

**More efficient operation**

Native Extension is a functional component deployed and run on the extension layer. Without changing the Smart Contract code, Native Extension provides a very efficient control aspect. Developers can achieve operational operations such as transaction risk control and anti-money laundering by combining them before and after Smart Contract transaction execution.

Chain-Native is an innovative technical paradigm proposed by the Artela team for Application-Specific. It will bring many positive changes to the construction of dApps. Balancing customization, modularity, and extensibility is the continuous pursuit of Chain-Native.