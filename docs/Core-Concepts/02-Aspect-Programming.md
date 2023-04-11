# Aspect Programming

As an important component of blockchain technology, Smart Contract supports developers in building decentralized applications through custom programming. However, with the continuous development of blockchain applications, Smart Contract has exposed many shortcomings in terms of upgradeability and scalability. Aspect Programming can support developers in developing Native Extensions to add customized functionality to dApps at the blockchain base layer, which complements Smart Contract technology. At the same time, it increases the modularity of dApps, making it easier to build complex dApps.

---

## 1. Aspect Definition

Aspect is a Native Extension on the Artela Network. It features security isolation and composability, which enhances its functionality.

- **Security isolation:** Aspects will be running within a secure sandbox environment that operates independently from the base layer. Thus, the execution of Aspects has no impact on the security and availability of the base layer. Moreover, Aspects are also securely isolated from each other, ensuring execution of the current aspect will affect others.
- **Composability:** Developers can bind Smart Contracts with Aspects to bring additional functionality. Transactions calling Smart Contracts pass through Aspects, providing additional processing capabilities. Aspects can be combined with multiple Smart Contracts seamlessly.

> In Artela, there are two types of Aspects: Built-in Aspects and Heterogeneous Aspects. Built-in Aspects are lightweight extensions that are integrated with WASM runtime by validator nodes. The operational principle of Aspect is highlighted in the figure below:

<center>
<img
  src={require('./img/3.png').default} 
  alt="3"  
  width="80%"
/>
</center>

Taking Built-in Aspect as an example, developers can import Base Layer API through Aspect SDK to program Aspect. After compiling the Aspect source code into WASM byte code, it can be deployed to the Artela network through a deployment transaction. After go through the consensus process, the byte code of Aspect will be written into the world state and synchronized to all nodes on the network. However, after deployment, it will not immediately affect the transactions on the Artela network. The owner of the smart contract needs to send a binding transaction to the Artela network, specifying that it needs to be combined with the Aspect. After this transaction has been executed, subsequent transactions calling the smart contract will be processed by the Aspect. When processing transactions, nodes will start the WASM runtime, load and execute the Aspect byte code with it.

Aspect needs to specify Join Points, which are the positions where Aspect is cutting and executed during transaction processing, including Block Init, Transaction Verification, Pre Execute, Post Execute, Block Finalize and etc.

The range of Joint Points supported by Aspect is shown in the figure:

<center>
<img
  src={require('./img/4.png').default} 
  alt="4"  
  width="80%"
/>
</center>

Aspect and Smart Contract are two different on-chain programs. Smart Contract is a type of blockchain account that can operate its own state data, call other Smart Contracts and transfer tokens to other accounts. Aspect is an extension program of the Base Layer, not an account. It cannot directly call Smart Contracts and other accounts. Aspect are not able to directly change the state of Smart Contracts, that is, it cannot write/modify/delete the state data of Smart Contracts. The goal of Aspect is to help developers achieve richer functionality in conjunction with Smart Contract.

There are two types of Aspects: Built-in Aspects and Heterogeneous Aspects. Built-in Aspects are lightweight extensions that are loaded and executed by validator nodes with a built-in WASM runtime. Heterogeneous Aspects support heavier computing, further enhancing the capabilities of Aspect. It is deployed and executed in a heterogeneous computing network, and this network shares security with the Artela main net.

The differences between Built-in Aspects and Heterogeneous Aspects are shown in the table:

<center>
<img
  src={require('./img/5.png').default} 
  alt="5"  
  width="80%"
/>
</center>

---

## 2. Aspect Abilities

Aspect, as an actual technical implementation of blockchain extensibility under the Chain-Native pattern, is not a substitute for Smart Contracts, but a complement to them.

What sets Aspects apart from smart contracts is their ability to manage the entire lifecycle of a transaction and interact with the base processing context. The following are just a few examples of what Aspects can do:

- Customize the transaction validation process.
- Integrate middleware natively.
- Construct blocks with customized rules.
- Access the execution context and create reliable asynchronous tasks.

---

## 3. Aspect Benefits

Aspects can enhance the functionality of dApps and support the construction of complex protocols in a modular way, simplifying complexity. The advantages are as the following:

- **Enhanced functionalities:** Developers can easily implement non-functional features such as security checks, off-chain data synchronization, and reliable scheduled tasks through Aspects. This completes the capabilities of Smart Contracts, thus enhancing the functionality of decentralized applications.
- **Enhanced transaction lifecycle management:** Artela provides rich extension join points at the blockchain base layer. Before/after transaction processing and execution, Aspects can add customized process logic to transactions, giving Aspects control over the entire lifecycle of the transaction.
- **Reduced code complexity:** For common processing logic such as malicious transaction filtering, developers can choose to host it on a public Aspect. This not only reduces the complexity of decentralized application code but also saves deployment costs by reducing byte code size.
- **Increased maintainability and scalability:** Developers can separate the functional and non-functional features of a dApp with Aspect to perform logic decoupling, making the maintenance and scaling of the dApp easier.
- **Improved security:** Developers can implement more accurate and efficient security check strategies with Aspects, such as malicious transaction identification and pre/post-execution state data verification, enhancing the overall security of the dApp.
- **Customization without sacrificing composability:** Unlike AppChain, Aspects do not need to maintain composability with other decentralized applications through cross-chain communication. The on-chain composability has higher efficiency and accuracy, allowing developers to still deeply customize their dApp.