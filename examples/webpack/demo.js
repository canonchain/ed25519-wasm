const ed25519 = require("/src/index")
// const prv = Buffer.from("0000000000000000000000000000000000000000000000000000000000000000", "hex");

// ed25519.ready(function () {
//     const keys=ed25519.createKeyPair(prv)
//     assert.equal("3B6A27BCCEB6A42D62A3A8D02A6F0D73653215771DE243A63AC048A18B59DA29",Buffer.from(keys.publicKey.buffer).toString('hex').toUpperCase())
// })

console.log("webpack Test",ed25519)

ed25519.ready(function () {
    var seed = ed25519.createSeed()
    var keys = ed25519.createKeyPair(seed)
    var msg = (new TextEncoder("utf-8")).encode("hello there")
    var sig = ed25519.sign(msg, keys.publicKey, keys.secretKey)
    // console.log(sig, msg, keys.publicKey) // true
    console.log("如果看到这里，就算成功",ed25519.verify(sig, msg, keys.publicKey)) // true
});