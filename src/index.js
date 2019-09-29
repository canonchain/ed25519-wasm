(function () {
    let random_bytes;
    if (typeof crypto !== 'undefined') {

        random_bytes = function (size) {
            let array;
            array = new Uint8Array(size);
            crypto.getRandomValues(array);
            return array;
        };
    } else {
        random_bytes = require('crypto').randomBytes;
    }
    function Wrapper(lib) {
        let allocate, free;
        lib = lib();
        allocate = lib['allocateBytes'];
        free = lib['freeBytes'];

        function createSeed() {
            return random_bytes(32);
        }

        function createKeyPair(seed) {
            let publicKey, secretKey;
            if (!(seed instanceof Uint8Array)) {
                throw new Error('not Uint8Array!');
            }
            seed = allocate(0, seed);
            publicKey = allocate(32);
            secretKey = allocate(64);
            lib['_ed25519_create_keypair'](publicKey, secretKey, seed);
            publicKey = publicKey['get']();
            secretKey = secretKey['get']();
            free();
            return {
                publicKey: publicKey,
                secretKey: secretKey
            };
        }

        function sign(message, publicKey, secretKey) {
            let signature;
            if (!(message instanceof Uint8Array && publicKey instanceof Uint8Array && secretKey instanceof Uint8Array)) {
                throw new Error('not Uint8Arrays!');
            }
            message = allocate(0, message);
            publicKey = allocate(0, publicKey);
            secretKey = allocate(0, secretKey);
            signature = allocate(64);
            lib['_ed25519_sign'](signature, message, message['length'], publicKey, secretKey);
            signature = signature['get']();
            free();
            return signature;
        }

        function verify(signature, message, publicKey) {
            let result;
            if (!(signature instanceof Uint8Array && message instanceof Uint8Array && publicKey instanceof Uint8Array)) {
                throw new Error('not Uint8Arrays!');
            }
            message = allocate(0, message);
            publicKey = allocate(0, publicKey);
            signature = allocate(0, signature);
            result = lib['_ed25519_verify'](signature, message, message['length'], publicKey) === 1;
            free();
            return result;
        }
        return {
            'ready': lib['then'],
            'createSeed': createSeed,
            'createKeyPair': createKeyPair,
            'sign': sign,
            'verify': verify
        };
    }
    if (typeof define === 'function' && define['amd'] && Object.keys(define['amd']).length) {
        define(['./ed25519'], Wrapper);
    } else if (typeof exports === 'object') {
        module.exports = Wrapper(require('./ed25519.js'));
    } else {
        this['ed25519_wasm'] = Wrapper(this['__ed25519wasm']);
    }
}).call(this);