#  Aspect Examples



<!-- 
Since the introduction of Ethereum in 2015,
the ability to control digital assets through [smart contracts](https://ethereum.org/en/smart-contracts/)
has attracted a large community of developers
to build decentralized applications on the Ethereum Virtual Machine (EVM).
This community is continuously creating extensive tooling and introducing standards,
which are further increasing the adoption rate of EVM-compatible technology.

Whether you are building new use cases on Evmos
or porting an existing dApp from another EVM-based chain (e.g. Ethereum),
you can easily build and deploy EVM smart contracts on Evmos to implement the core business logic of your dApp.
Evmos is fully compatible with the EVM,
so it allows you to use the same tools (Solidity, Remix, Oracles, etc.)
and APIs (i.e. Ethereum JSON-RPC) that are available on the EVM.

Leveraging the interoperability of Cosmos chains,
Evmos enables you to build scalable cross-chain applications within a familiar EVM environment.
Learn about the essential components when building and deploying EVM smart contracts on Evmos below.

## Build with Solidity

You can develop EVM smart contracts on Evmos using [Solidity](https://github.com/ethereum/solidity).
Solidity is also used to build smart contracts on Ethereum.
So if you have deployed smart contracts on Ethereum (or any other EVM-compatible chain)
you can use the same contracts on Evmos.

Since it is the most widely used smart contract programming language in Blockchain,
Solidity comes with well-documented and rich language support.
Head over to our list of Tools and IDE Plugins to help you get started.

### EVM Extensions

EVM Extensions are precompiled contracts that are built into the Ethereum Virtual Machine (EVM).
Each offers specific functionality, that can be used by other smart contracts.
Generally, they are used to perform operations that are either not possible
or would be too expensive to perform with a regular smart contract
implementation, such as hashing, elliptic curve cryptography, and modular exponentiation.

By adding custom EVM extensions to Ethereum's basic feature set,
Evmos allows developers to use previously unavailable functionality in smart contracts, like staking and governance operations.
This will allow more complex smart contracts to be built on Evmos and further improves the interoperability between Cosmos and Ethereum.
It also is a key feature to achieve Evmos' vision of being the definitive dApp
chain, where any dApp can be deployed once and users can interact with
a wide range of different blockchains natively.

To enable the described functionalities, Evmos introduces so-called *stateful* precompiled smart contracts,
which can perform a state transition,
as opposed to those offered by the standard Go-Ethereum implementation,
which can only read state information.
This is necessary because an operation like e.g. staking tokens
will ultimately change the chain state.

View a list of available evm extensions [here](./list-evm-extensions.md).

### Oracles

Blockchain oracles provide a way for smart contracts to access external information,
such as price feeds from financial exchanges or carbon emission measurements.
They serve as bridges between blockchains and the outside world.

Head over to our [Oracles section](./oracles) to find out
how smart contracts can make use of oracles on Evmos for real-life activities
such as insurance, borrowing, lending, or gaming.

## Deploy with Ethereum JSON-RPC

Evmos is fully compatible with the [Ethereum JSON-RPC](./../../develop/api/ethereum-json-rpc/) APIs,
allowing you to deploy and interact with smart contracts on Evmos
and connect with existing Ethereum-compatible web3 tooling.
This gives you direct access to reading Ethereum-formatted transactions
or sending them to the network which otherwise wouldn't be possible on a Cosmos chain, such as Evmos.

You can connect to the Evmos [Testnet](./testnet)
to deploy and test your smart contracts before moving to Mainnet.

### Block Explorers

You can use [block explorers](./block-explorers)
to view and debug interactions with your smart contracts deployed on Evmos.
Block explorers index blocks and their transactions
so that you can search for real-time and historical information about the blockchain,
including data related to blocks, transactions, addresses, and more.

### Contract Verification

Once deployed, smart contract data is deployed as non-human readable EVM bytecode.
You can use [contract verification tools](./tools/contract-verifications)
that publish and verify your original Solidity code
to prove to users that they are interacting with the correct smart contract.

## Evmos Features

The core protocol team is continuously building features
that enhance the experience of smart contract developers on Evmos.
Head over to our Mainnet sections to learn more about these functionalities,
e.g. how to earn [revenue](./mainnet#revenue) with your smart contract
or [register your ERC-20](./mainnet#token-registration) token
to be used cross-chain. -->
