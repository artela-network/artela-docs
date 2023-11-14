# sys.aspect

## 1. Aspect State

> This API is used to get, update Aspect State.

### 1. readonlyState

> readonly state, need implement `AspectStateReadonly`

<!-- @formatter:off -->
```typescript
    sys.aspect.readonlyState(ctx).get<String>("key").unwrap()
```
<!-- @formatter:on -->

* Parameter
    * string : keys
* Returns
    * string : value

### 2. mutable State

> mutable state get and set. need implement `AspectStateModifiable`

<!-- @formatter:off -->
```typescript
//get and set
sys.aspect.mutableState(ctx).get<string>("key").set<string>("value")
//get 
let value = sys.aspect.mutableState(ctx).get<string>("key").unwrap()

```
<!-- @formatter:on -->

* Parameter
  * string : keys
* Returns
  * string : get value


## 2. Aspect Property

### 1. get property

>  get property by key. 

<!-- @formatter:off -->
```typescript
//get 
let value = sys.aspect.property.get<string>("key");

```
<!-- @formatter:on -->

* Parameter
  * string : keys
* Returns
  * string : get value
 