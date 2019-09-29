//main.js

//改为你自己的配置
require.config({
    baseUrl: 'src',
    paths: {
        "supercop": "index"
    }
});
console.log('准备好了')
requirejs(['supercop'], function (supercop) {
    supercop.ready(function () {
        var seed = supercop.createSeed()
        var keys = supercop.createKeyPair(seed)
        var msg = (new TextEncoder("utf-8")).encode("hello there")
        var sig = supercop.sign(msg, keys.publicKey, keys.secretKey)
        // console.log(sig, msg, keys.publicKey) // true
        console.log(supercop.verify(sig, msg, keys.publicKey)) // true
    });
})