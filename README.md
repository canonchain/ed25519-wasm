[![Build Status](https://travis-ci.org/canonchain/ed25519-wasm.svg?branch=master)](https://travis-ci.org/canonchain/ed25519-wasm)

# ed25519-wasm

https://github.com/orlp/ed25519 compiled to WebAssembly using Emscripten and optimized for small size

## Usage

install:

```js
npm install git+https://github.com/canonchain/ed25519-wasm.git
```

Add script:

```js
const ed25519 = require("ed25519-wasm");
```

createKeyPair:

```js
ed25519.createKeyPair(seed)
```

sign:

```js
ed25519.sign(message,publicKey,secretKey)
```

verify:

```js
ed25519.verify(signature,message,publicKey)
```

## Building

Prerequesties:

- emscripten with WebAssembly support (https://webassembly.org/getting-started/developers-guide/)
- CMake