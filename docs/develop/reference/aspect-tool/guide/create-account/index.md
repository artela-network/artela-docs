# Create a account

A blockchain account is used to verify user identity, ensuring that only authorized users can engage in smart contract
transactions and digital asset management within the blockchain network. 

When you do not have a blockchain account，you can create one by using the following command:
```shell
  npm run account:create  -- --pkfile {file_path}
```

**options:**

> * --pkfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
---

Specifically, the command will be executed
```shell
node scripts/create-account.cjs
```

The logic for the create-account command is written in the `scripts/create-account.cjs` file, primarily relying on the
implementation provided by the [@artela/web3](/develop/client/artela-web3.js) API.   
If needed, you can modify the logic within this file to achieve your specific functionalities.