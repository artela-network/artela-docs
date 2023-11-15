---
sidebar_position: 2
---

# Aspect Tool

Aspect tool is a dev tool for users to manage the development of Aspect.

It's published in the [npm repository](https://www.npmjs.com/package/@artela/aspect-tool).


## Install

```shell
npm install @artela/aspect-tool
```

## Commands

>This tool provides two commands

1. Init a aspect project in a directory.
```shell
USAGE
  $ aspect-tool init [-d <value>]

FLAGS
  -d, --dir=<value>  [default: /Users/admin/mytech/go-work/src/github.com/artela-network/aspect-tooling/packages/toolkit]

```

2. Generate state tracing code for Aspect.
```shell
USAGE
  $ aspect-tool generate [-i <value>] [-o <value>]

FLAGS
  -i, --in=<value>
  -o, --out=<value>
```

## How it works
1. [Create a aspect project](/develop/reference/aspect-tool/install).
2. [Generate state tracing code](/develop/reference/aspect-tool/trace).
