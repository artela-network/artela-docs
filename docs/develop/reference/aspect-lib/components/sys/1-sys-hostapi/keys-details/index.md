---
sidebar_position: 2
---

# Get Context Keys List


#### 1.Get Transaction Context

* Key Path
<!-- @formatter:off -->
```typescript
let key="tx^context";

//by ContextKey
let key = ContextKey.tx.context.toString();
```
* ContextQueryResponse Data Type
  * <a href="/docs/classes/proto.EthTransaction.html" target="_blank">EthTransaction</a>
* Wrap Class
```typescript
    let ethTransaction = sys.context.tx(ctx).content.unwrap();
```

