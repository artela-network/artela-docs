
# Api References

## Overview

This library simplifies and enhances Aspect application development, offering tools to boost developer productivity and ensure code type safety. It provides low-level API access to system data and contextual information generated during blockchain runtime, covering environment details, blocks, transactions, and utility classes such as crypto, ABI encoding/decoding, and other utilities.

## Components

* **[sys](/develop/reference/aspect-lib/components/sys)**
> Provides essential system-level functionalities, including log, revert, require, etc.

* [sys.hostApi](/develop/reference/aspect-lib/components/sys-hostapi)
> Offers a low-level interface for exchanging data with blockchain workers.

* [sys.aspect](/develop/reference/aspect-lib/components/sys-aspect)
> Provides data query and update operations for Aspect State and Property.

* [sys.evm](/develop/reference/aspect-lib/components/call)
> Delivers static call and just-in-time call services to the Ethereum Virtual Machine (EVM).

* [sys.context](/develop/reference/aspect-lib/components/context) 
> Offers a high-level interface to encapsulate the retrieval of Block Runtime Context, simplifying the reading process.

* [ethereum](/develop/reference/aspect-lib/components/ethereum)
> Delivers Ethereum smart contract functionality, along with ABI (Application Binary Interface) handling, encoding/decoding, and utility classes.

