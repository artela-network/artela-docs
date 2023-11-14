---
sidebar_position: 2
---

# Access authorization


## Component classes & Access authorization interface

The 'class' Instance in the following table can only be used in a class that implements the 'access authorization
interface';

| class                | access authorization interface |
|:---------------------|:-------------------------------|
| MutableAspectState   | AspectStateModifiable          |
| ImmutableAspectState | AspectStateReadonly            |
| StaticCaller         | StaticCallable                 |
| JustInTimeCaller     | JustInTimeCallable             |
| StateContext         | StateDBAccessible              |
| BlockContext         | BlockContextAccessible         |
| Tx                   | TxContextAccessible            |
| EnvContext           | EnvContextAccessible           |
| ReceiptContext       | ReceiptContextAccessible       |
| TraceContext         | TraceAccessible                |

## Access authorization interface & Join point context

| access authorization interface | preTxExecute Context | preContractCall Context | postContractCall Context | postTxExecute Context | postTxCommit Context | onBlockInitialize Context | onBlockFinalize Context | 
|:-------------------------------|----------------------|-------------------------|--------------------------|-----------------------|----------------------|---------------------------|-------------------------|
| AspectStateModifiable          | &#10004;             | &#10004;                | &#10004;                 | &#10004;              | &#10004;             | &#10004;                  | &#10004;                |
| AspectStateReadonly            | &#10008;             | &#10008;                | &#10008;                 | &#10008;              | &#10008;             | &#10008;                  | &#10008;                |
| StaticCallable                 | &#10008;             | &#10008;                | &#10008;                 | &#10008;              | &#10008;             | &#10008;                  | &#10008;                |
| JustInTimeCallable             | &#10008;             | &#10008;                | &#10008;                 | &#10008;              | &#10008;             | &#10008;                  | &#10008;                |
| StateDBAccessible              | &#10008;             | &#10008;                | &#10008;                 | &#10008;              | &#10008;             | &#10008;                  | &#10008;                |
| BlockContextAccessible         | &#10008;             | &#10008;                | &#10008;                 | &#10008;              | &#10008;             | &#10008;                  | &#10008;                |
| TxContextAccessible            | &#10008;             | &#10008;                | &#10008;                 | &#10008;              | &#10008;             | &#10008;                  | &#10008;                |
| EnvContextAccessible           | &#10008;             | &#10008;                | &#10008;                 | &#10008;              | &#10008;             | &#10008;                  | &#10008;                |
| ReceiptContextAccessible       | &#10008;             | &#10008;                | &#10008;                 | &#10008;              | &#10008;             | &#10008;                  | &#10008;                |
| TraceAccessible                | &#10008;             | &#10008;                | &#10008;                 | &#10008;              | &#10008;             | &#10008;                  | &#10008;                |