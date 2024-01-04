---
sidebar_position: 1
---

# Delegator Guide

This document contains all the necessary information for delegators to interact with the Artela Network through the Command-Line Interface (CLI).

## 1.Generate new delegator account
```bash
artelad keys add <account_name>
```
![](./img/d1.png)

## 2.Delegate to a validator
```bash
artelad tx staking delegate <validator_operator> <amount> \
--chain-id=<chain_id> \
--from=<key_name>
```
![](./img/d2.png)

## 3.Check the delegate tx status
```bash
artelad query tx <tx_hash>
```
![](./img/d3.png)

## 4.Check validator staking balance
```bash
artelad query staking validator <validator_operator>
```
![](./img/d4.png)

## 5.Query self current delegate status
```bash
artelad query staking delegations <delegator_addr>
```
![](./img/d5.png)

## 6.Query self all rewards
```bash
artelad query distribution rewards <delegator_address> <validator_address>
```
![](./img/d6.png)

## 7.Query target delegator rewards
```bash
artelad query distribution rewards <delegator_address>
```
![](./img/d7.png)

## 8.Increase delegator amount
```bash
artelad tx staking delegate <validator_operator> <amount> \
--chain-id=<chain_id> \
--from=<key_name>
```
![](./img/d8.png)

## 9.Claim rewards
```bash
artelad tx distribution withdraw-all-rewards \
  --chain-id=<chain_id> \
--from=<key_name>
```
![](./img/d9.png)

## 10.Redelegate to other validator
```bash
artelad tx staking redelegate <srcValidatorAddress> <destValidatorAddress> <amountToRedelegate> 
--from <delegatorKeyName>
```
![](./img/d10.png)

## 11.Undelegate from validator
```bash
artelad tx staking unbond <validatorAddress> <amountToUnbond> --from <delegatorKeyName>
```
![](./img/d11.png)