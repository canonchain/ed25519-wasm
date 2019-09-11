const ed25519=require("../src/index")
const assert = require("assert");

const prv = Buffer.from("0000000000000000000000000000000000000000000000000000000000000000", "hex");

let message = Buffer.from("5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053", "hex");

describe("ed25519",async ()=>{
    it("createKeyPair",async ()=>{
        ed25519.ready(function () {
            const keys=ed25519.createKeyPair(prv)
            assert.equal("3B6A27BCCEB6A42D62A3A8D02A6F0D73653215771DE243A63AC048A18B59DA29",Buffer.from(keys.publicKey.buffer).toString('hex').toUpperCase())
        })
    })

    it("sign",async ()=>{
        ed25519.ready(function () {
            const keys=ed25519.createKeyPair(prv)
            let signature=ed25519.sign(message,keys.publicKey,keys.secretKey)
            assert.equal("AD1E0EEBF552D40608F0D7FF43C2C85B60C2F259D2917FB37B6BC5D468147612BAB9F46FEEE6C2DC5F52C83E564E35457317DC47AFB179574178230BDF68A80E",Buffer.from(signature.buffer).toString('hex').toUpperCase())
        })
    })

    it('verify',async ()=>{
        ed25519.ready(function () {
            const keys=ed25519.createKeyPair(prv)
            let signature=ed25519.sign(message,keys.publicKey,keys.secretKey)
            let verify=ed25519.verify(signature,message,keys.publicKey)
            assert.equal(true,verify)
        })
    })


})