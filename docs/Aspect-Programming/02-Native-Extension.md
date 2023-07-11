# Native Extension

<!-- ## What is Native Extension -->

Native Extension serves as a programmable on-chain module for customized functionality. It extends from the base layer and works synergistically with blockchain smart contracts, allowing dApp to be built in a plug-and-play modular manner.

Native Extension is the solution for blockchain customized functionality. 

---

## Why We Need Native Extension

Functionality, in response to the demands of customization for different use cases, has been identified as a significant challenge that needs to be addressed. In light of this, the [idea](https://vitalik.ca/general/2022/09/17/layer_3.html) of introducing a new “layer” has been proposed:

> L2 is for scaling, L3 is for customized functionality, for example privacy. In this vision there is no attempt to provide “scalability squared”; rather, there is one layer of the stack that helps applications scale, and then separate layers for customized functionality needs of different use cases. — Vitalik Buterin

Per Vitalik’s vision for Ethereum, there is clearly an important role to be played by “layers” of some kind that serve non-scaling needs. His [post](https://vitalik.ca/general/2022/09/17/layer_3.html) highlights the need for the blockchain network to support “customized functionality”.

The Ethereum Virtual Machine (EVM), serving as the execution engine to power smart contracts, is the prevailing model for building dApps to achieve functionality. Initially offered by Ethereum, the EVM has now been adopted by numerous smart contract chains, commonly known as EVM-compatible chains or EVM-equivalent chains. However, the current EVM has proved limited in supporting extensive dApp functionality. The key challenge lies in pushing the boundaries of functionality within EVM chains.

Academia provides a clue for its implementation:

> Functionality and Extensibility refer to the ability of supporting complex behaviors by a blockchain implementation: either as a built-in functionality or through extension mechanisms allowing developers to craft applications beyond the original intent of the platform.

Native Extension is the optimal solution with the balanced built-in functionality of EVM-equivalence and the extension mechanism of WASM modular extension. 

## DApps with Native Extension


<center>
<img
  src={require('./img/2.png').default} 
  alt="2"  
  width="70%"
/>
</center>


**Smart Contract:**

A computer protocol that runs on the EVM base layer and performs trusted transactions without the need for third-party intervention. Developers can use smart contracts to implement the basic business logic of dApps.

**Native Extension:**

Modular component that runs on the WASM extension layer and performs highly customized functionality through the base layer API. Developers can use native extensions to implement the additional custom logic to fine-tailor the entire transaction lifecycle.

> Base layer API: a set of APIs exposed by the blockchain base layer to the extension layer. The base layer is a collection of processing modules, such as the blockchain network, consensus, and storage. The base layer API enables the customization of basic modules at the extension layer. 

Each smart contract can be paired with different sets of Native Extensions, according to specific needs. Native Extension can also be shared as a public service, lower the barrier for dApps building and benefit the whole ecosystem.

## How Native Extension Benefits dApp

Customized functionality, modularity, and composability are the goals that Native Extension pursues.

**Extensibility & customized functionality**

The extensibility of Native Extension allows for the realization of built-in customized functionality at an atomic level. The combination of smart contracts and Native Extensions gives dApps flexible extensibility.

**Independent dApp**

Adding global functionality to the underlying blockchain requires a long development and verification cycle. With Native Extension, dApps can extend functionalities in a modular manner without requiring global upgrades of network nodes.

**Reusable public services**

Native Extension can be released as a public service and integrated into dApp building. It reduces code redundancy, enhances software modularity, and improves software security.

**Easy maintenance**

Native Extension doesn’t require changes to the smart contract code. DApps would no longer be a collection of tightly coupled codebases. 
