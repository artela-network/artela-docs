# Chain-Native Pattern

## 1. What is Chain-Native Pattern?

Chain-Native Pattern is an dApp design pattern based on **Native Extension**. In **Native Extension**, extension program can be added dynamically to the running environment. By doing so, it is possible to introduce a middle state in the state-transition process. 

Chain-Native Pattern can be used to introduce custom logic into the transaction process. For example, it can be used to perform additional validation checks on transactions, or to implement custom business rules that are specific to a particular use case.

Chain-Native Pattern involves defining a set of extension joint points in the core layer of the blockchain. These extension points can be used to load and execute custom modules at runtime. These custom modules are natively extended from the base layer of the running environment, and can be combined with lightweight smart contracts to allow dApps to be built in a fully customized and plug-and-play manner.

---

## 2. Blockchain in Chain-Native Pattern

In Chain-Native pattern, the blockchain architecture is typically divided into three layers: the base layer, the extension layer and the application layer, with an emphasis on extension layer.

<center>
<img
  src={require('./img/1.png').default} 
  alt="1"  
  width="70%"
/>
</center>

- **Application Layer:** Developers deploy Smart Contracts on the application layer to implement the core business logic of dApps. The application layer provides an execution environment that is consistent with the traditional EVM blockchain function, and is compatible with existing infrastructure (ChainLink, TheGraph, etc.).

- **Extension Layer:** Provide the environment for Native Extensions. Developers can extend the base layer modules natively and build customizable module as a public/private service. Native Extensions can be combined with each other and with Smart Contracts. Native Extensions are securely isolated from the base layer, ensuring that they have no impact on the security or availability of the core network.
    
- **Base Layer:** Core running environment with basic modules, including network, storage, general VMs as well as consensus engine.

Based on the Chain-Native Pattern, developers can build feature-rich dApps more efficiently. In comparison to building AppChains and interconnecting them, Chain-Native offers a lightweight, customizable, modular, and composable technical solution.

---

## 3. dApps in Chain-Native Pattern

Chain-Native Pattern provides developers with the ability to build and run Native Extensions. Within Chain-Native Pattern, dApps consist of two parts: Smart Contracts and Native Extensions.

<center>
<img
  src={require('./img/2.png').default} 
  alt="2"  
  width="70%"
/>
</center>

**Smart Contract:**

A computer protocol that runs on the blockchain network and performs trusted transactions without the need for third-party intervention. Developers can use Smart Contracts to implement the main business logic of dApps.

**Native Extension:**

Modular components run on the extension layer. Developers are capable of tailoring the processing logic and achieving highly customized functions through the Base Layer API. With the use of the Native Extension, developers can incorporate additional features into their dApp, such as automated transaction and risk control during transaction processing. Smart contracts can be combined with multiple Native Extensions, and each individual Smart contract can be paired with different sets of Native Extensions.

> Base Layer API:The blockchain base layer can expose a set of API interfaces to the extension layer. The base layer is a collection of processing modules, such as the blockchain network, consensus, and storage. Through the interfaces, it provides customized capabilities for some basic features to the extension layer. Under the Chain-Native pattern, the capabilities of the Base Layer API are strictly controlled, and abnormal callers will not cause any availability issues to the blockchain network.

dApps under the Chain-Native Pattern are a combination of Smart Contract and Native Extensions, which developers can freely combine and use according to specific needs.

Developers can build not only the lightweight dApps that only contain Smart Contracts but also develop Native Extensions to share with others. The continuous accumulation of excellent Native Extensions will not only lower the threshold for building dApps but also benefit developers and the community.

---

## 4. How does Chain-Native benefit dApp?

Chain-Native is an innovative technical paradigm proposed by the Artela team for application-specific requirements. It will bring many positive changes to dApp construction. Customization, modularity, and composability are the goals that Chain-Native continues to pursue.

Chain-Native Pattern offers developers a new approach to building dApps. With this pattern, developers are no longer required to develop and maintain AppChain separately. Instead, they can develop customized features on the Base Layer using Native Extension. In this way, dApps can reuse and benefit from the capabilities provided by public Native Extension. The combination of Smart Contract and Native Extension makes it easier to build more powerful and independent dApps. The benefits that Chain-Native provides to dApps include the following:

1. **More flexible function extension**
Native Extension is a feature extension based on the main-net. Unlike cross-chain solutions such as AppChain, which share security, Native Extension provides built-in extensibility. This allows for more accurate and efficient operations on the same network environment. The combination of Smart Contract and Native Extension gives dApps more flexible extension capabilities.
2. **More independent dApps**
Adding global functionality to the underlying blockchain usually requires a long development and verification cycle, balancing stability and the universality of functionalities. With Chain-Native, dApps can extend blockchain capabilities that only apply to themselves, without requiring global upgrades of network nodes.
3. **Reusable public services**
Native Extension can be released as independent base services. Developers can choose to integrate these base services when building dApps. This modular construction method reduces code redundancy, enhances software modularity, and improves software security.
4. **More efficient operation and management**
Native Extension is deployed and run as a functional component in the extension layer, without requiring any changes to Smart Contract code. Native Extension provides a very efficient control aspect that allows developers to achieve operational management such as transaction risk control and anti-money laundering by combining it before and after the Smart Contract transaction execution.

Chain-Native is an innovative technical paradigm proposed by the Artela team for application-specific requirements. It will bring many positive changes to dApp construction. Customization, modularity, and composability are the goals that Chain-Native continues to pursue.