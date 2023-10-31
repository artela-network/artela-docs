
# Introduction to Artela Development

Artela is an extensible blockchain network enabling developers to build feature-rich dApps.

Artela is dedicated to pushing the boundaries of dApp functionality beyond smart contracts, unlocking the full potential of Web3 innovations.


## EVM Compatible

Artela is fully EVM compatible. This means that you can use Artela to deploy and run smart contracts written in Solidity, Vyper, and other EVM compatible languages without any issue.

 * **Ethereum Compatibility:** Artela can run smart contracts similar to those on the Ethereum blockchain. It uses the same smart contract programming languages (such as Solidity) and supports a transaction and smart contract execution model similar to Ethereum.

 * **Cross-Chain Interoperability:**  Artela can achieve interoperability with Ethereum. This allows users to transfer assets or execute smart contracts between different EVM Compatible blockchains without the need for complex conversions or intermediaries.

 * **Developer Ecosystem:** Artela often attract Ethereum developers because they can reuse smart contracts and tools they've already created, expanding their applications across different blockchains.

 * **Protocol Standards:** Artela typically follow similar protocol standards as Ethereum to ensure compatibility. This includes standards like ERC-20 (token standard), ERC-721 (non-fungible token standard), and other Ethereum Improvement Proposals (EIPs).

 * **Interoperability and Ecosystem:** Artela can more easily integrate with Ethereum's DeFi (Decentralized Finance) applications, DApps (Decentralized Applications), and other projects, thereby expanding the entire Ethereum ecosystem.

In summary, EVM Compatible represents compatibility with Ethereum, providing greater interoperability and flexibility to promote the development of decentralized applications and cross-chain operations. This compatibility is crucial for the growth and interconnectivity of the entire blockchain ecosystem.

For more details, refer to [EVM Compatibility](develop/core-concepts/evm-compatibility)

## Smart Contract with Aspect

In Artela, we define a new programmable module to work as Native Extension, called Aspect.

The name “Aspect” is inspired by Aspect-oriented Programming. Aspect can tap into the complete API set of the base layer, and inject extended logic into specific join points during a transaction's lifecycle.

Aspect integrates customized functionality into the blockchain base layer, working synergistically with smart contracts to enhance dApp modularity and functionality.

For more details, see:

* [Aspect](develop/core-concepts/aspect)
* [Aspect programming](develop/core-concepts/aspect-programming)
* [Aspect Runtime](develop/core-concepts/aspect-runtime)

