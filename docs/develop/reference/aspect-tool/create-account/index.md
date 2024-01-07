# Create a Account

This command can quickly create a new account in the project, and you will use it in other commands which need to sign
transactions, and you also can use it in your test scripts.

## Command

When you do not have a blockchain account，you can create one by using the following command:

```shell
npm run account:create  -- --skfile {file_path}
```

**options:**

> * --skfile : privateKey path for sender. (optional,default value `./privateKey.txt`).
---

## Example
```shell
## usage 1: this command will create a blockchain account and generate a private key file named 'privateKey.txt' in your project dir
npm run account:create

## usage 2: this command will create a blockchain account and generate a private key file named 'accounts.txt' in your project dir
npm run account:create -- --skfile ./accounts.txt

```

### Command Output

If the command is executed successfully, the following log will be printed and a privateKey file will be generated at '
{file_path}'.

```shell
> account:create
> node scripts/create-account.cjs

address:  0x773B8Da8De01C9a35DCb74E4C204...
```

## Customize

The logic for the create-account command is written in the `scripts/create-account.cjs` file, primarily relying on the
implementation provided by the [@artela/web3](/develop/client/artela-web3.js) API.   
If needed, you can modify the logic within this file to achieve your specific functionalities.
