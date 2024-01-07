# Build Aspect

Upon completing Aspect development, it is necessary to use the contract compilation command to verify the correctness
of the Aspect code and compiles to WebAssembly.

## Command

You can build contract by using the following command:

```bash
npm run aspect:build
```

## Example

```shell
npm run aspect:build
```

### Command Output

The compiled product is placed in the `build` directory.

```shell
├── build
│   ├── debug.d.ts  // debug TypeScript declaration file
│   ├── debug.js    // debug JavaScript declaration file
│   ├── debug.wasm   //debug WebAssembly bytecode file
│   ├── debug.wasm.map  //debug WebAssembly output source map file
│   ├── debug.wat      // debug WebAssembly text output file
│   ├── release.d.ts    // release TypeScript declaration file
│   ├── release.js      // release JavaScript declaration file
│   ├── release.wasm    //release WebAssembly bytecode file
│   ├── release.wasm.map //release WebAssembly output source map file
│   └── release.wat    // release WebAssembly text output file

```

## Customize

The `aspect-build` command, which utilizes AssemblyScript's `asc`, is responsible for compiling to WebAssembly. For
detailed information regarding compilation parameters, please consult
the [compiler options](https://assemblyscript.bootcss.com/compiler.html#compiler-options) documentation.

