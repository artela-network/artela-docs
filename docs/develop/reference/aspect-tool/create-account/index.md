# Create a Account

A blockchain account is used to verify user identity, ensuring that only authorized users can engage in smart contract
transactions and digital asset management within the blockchain network. 

## Command

When you do not have a blockchain account，you can create one by using the following command:

```shell
npm run account:create  -- --skfile {file_path}
```

**options:**

> * --skfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
---

Specifically, the command will be executed
```shell
node scripts/create-account.cjs
```

The logic for the create-account command is written in the `scripts/create-account.cjs` file, primarily relying on the
implementation provided by the [@artela/web3](/develop/client/artela-web3.js) API.   
If needed, you can modify the logic within this file to achieve your specific functionalities.

## Execution Status

If the command is executed successfully, the following log will be printed and a privateKey file will be generated at '{file_path}'.
```shell
> account:create
> node scripts/create-account.cjs

address:  0x773B8Da8De01C9a35DCb74E4C204...
```