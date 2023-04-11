# Lite dApp

## 1. Introduction
At Artela Network, Lite dApp is a lightweight protocol that only uses Smart Contracts to build dApps. 

There is no difference between Lite dApp and dApps running on traditional EVM architecture blockchain. Artela is compatible with EVM and seamlessly integrates with ~~basic~~ infrastructures such as ChainLink and TheGraph. The experience of developing and deploying Lite dApps on Artela Network is the same as ~~developing dApps on~~ Ethereum and its Layer 2.

Aspect, as a modular extension component for sustainable integration, does not require developers to use it when building dApps. Developers can achieve equivalent capabilities of dApps built without Aspect and existing EVM architecture.

The principle of Lite dApp on Artela Network is shown in the figure below:

<center>
<img
  src={require('./img/1.png').default} 
  alt="1"  
  width="70%"
/>
</center>

---

## 2. Use Case

Artela Network is compatible with the EVM architecture and can seamlessly integrate with all mature Smart Contract toolchains. Developers can use the mature Smart Contract infrastructure, such as Chain Link oracle price feed service, The Graph data service, OpenZeppelin contract templates, and even Remix IDE, without paying any difference on Artela Network.

Developers can build decentralized lending protocols on Artela Network with seamless integration of ChainLink's price feed. This includes liquidity management related to asset lending and borrowing, account health checks, asset oracle price aggregation, and other smart contract implementations. This dApp development pattern is referred to as Lite dApp on Artela Network. The specific diagram is shown below:

<center>
<img
  src={require('./img/2.png').default} 
  alt="2"  
  width="90%"
/>
</center>
