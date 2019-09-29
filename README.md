[![Build Status](https://travis-ci.com/canonchain/ed25519-wasm.svg?branch=master)](https://travis-ci.org/canonchain/ed25519-wasm)

# ed25519-wasm

https://github.com/orlp/ed25519 compiled to base64,It works in both the NodeJS environment and the browser environment.

This project does not need to reference annoying ".wasm" files when used under the browser.

## Install

```js
npm install ed25519-wasm-pro
```

## In Browser

```js
const ed25519 = require('ed25519-wasm-pro');
console.log('webpack Test', ed25519);
ed25519.ready(function() {
  var seed = ed25519.createSeed();
  var keys = ed25519.createKeyPair(seed);
  var msg = new TextEncoder('utf-8').encode('hello there');
  var sig = ed25519.sign(msg, keys.publicKey, keys.secretKey);
  // console.log(sig, msg, keys.publicKey) // true
  console.log('OK', ed25519.verify(sig, msg, keys.publicKey)); // true
});
```

## In Node.js

```
const ed25519=require("ed25519-wasm-pro")

ed25519.ready(function () {
    const keys=ed25519.createKeyPair(prv)
    let signature=ed25519.sign(message,keys.publicKey,keys.secretKey)
})
```

## Usage

Add script:

```js
const ed25519 = require('ed25519-wasm-pro');
```

createKeyPair:

```js
ed25519.createKeyPair(seed);
```

sign:

```js
ed25519.sign(message, publicKey, secretKey);
```

verify:

```js
ed25519.verify(signature, message, publicKey);
```

## Building

Prerequesties:

- emscripten with WebAssembly support (https://webassembly.org/getting-started/developers-guide/)
- CMake
