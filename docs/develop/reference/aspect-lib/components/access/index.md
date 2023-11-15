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

## Join point context implemented access interfaces

| Join point           | access authorization interface                                                                                                               |
|:---------------------|:---------------------------------------------------------------------------------------------------------------------------------------------|
| PreTxExecuteCtx      | AspectStateModifiable,StaticCallable,StateDBAccessible,BlockContextAccessible,TxContextAccessible,EnvContextAccessible                       |
| PreContractCallCtx   | JustInTimeCallable,AspectStateModifiable,BlockContextAccessible,StateDBAccessible,TraceAccessible,TxContextAccessible,EnvContextAccessible   |
| PostContractCallCtx  | JustInTimeCallable,AspectStateModifiable,BlockContextAccessible,StateDBAccessible,TraceAccessible,TxContextAccessible,EnvContextAccessible   |
| PostTxExecuteCtx     | TraceAccessible, AspectStateModifiable, StaticCallable, StateDBAccessible, BlockContextAccessible, TxContextAccessible, EnvContextAccessible |
| PostTxCommitCtx      | AspectStateModifiable,TxContextAccessible,ReceiptContextAccessible,BlockContextAccessible,EnvContextAccessible,StaticCallable                |
| OnBlockInitializeCtx | AspectStateModifiable,StaticCallable,EnvContextAccessible,BlockContextAccessible,ScheduleAble                                                |
| OnBlockFinalizeCtx   | AspectStateModifiable,StaticCallable,EnvContextAccessible,BlockContextAccessible,ScheduleAble                                                |
| OperationCtx         | AspectStateModifiable,StaticCallable,ScheduleAble,BlockContextAccessible,EnvContextAccessible,TxContextAccessible                            |

## Access authorization interface & Join point context

| access authorization interface | PreTxExecuteCtx | PreContractCallCtx | PostContractCallCtx | PostTxExecuteCtx | PostTxCommitCtx | OnBlockInitializeCtx | OnBlockFinalizeCtx | OperationCtx | 
|:-------------------------------|-----------------|--------------------|---------------------|------------------|-----------------|----------------------|--------------------|--------------|
| AspectStateModifiable          | &#10004;        | &#10004;           | &#10004;            | &#10004;         | &#10004;        | &#10004;             | &#10004;           | &#10004;     |
| AspectStateReadonly            | &#10008;        | &#10008;           | &#10008;            | &#10008;         | &#10008;        | &#10008;             | &#10008;           | &#10008;     |
| StaticCallable                 | &#10004;        | &#10008;           | &#10008;            | &#10004;         | &#10004;        | &#10004;             | &#10004;           | &#10004;     |
| JustInTimeCallable             | &#10008;        | &#10004;           | &#10004;            | &#10008;         | &#10008;        | &#10008;             | &#10008;           | &#10008;     |
| StateDBAccessible              | &#10004;        | &#10004;           | &#10004;            | &#10004;         | &#10008;        | &#10008;             | &#10008;           | &#10008;     |
| BlockContextAccessible         | &#10004;        | &#10004;           | &#10004;            | &#10004;         | &#10004;        | &#10004;             | &#10004;           | &#10004;     |
| TxContextAccessible            | &#10004;        | &#10004;           | &#10004;            | &#10004;         | &#10004;        | &#10008;             | &#10008;           | &#10004;     |
| EnvContextAccessible           | &#10004;        | &#10004;           | &#10004;            | &#10004;         | &#10004;        | &#10004;             | &#10004;           | &#10004;     |
| ReceiptContextAccessible       | &#10008;        | &#10008;           | &#10008;            | &#10008;         | &#10004;        | &#10008;             | &#10008;           | &#10008;     |
| TraceAccessible                | &#10008;        | &#10004;           | &#10004;            | &#10004;         | &#10008;        | &#10008;             | &#10008;           | &#10008;     |