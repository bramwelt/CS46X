/*
 * Generate a Backed Identity Assertion
 *  to be stored on a Directory Provider
 */

var jwcrypto = require('jwcrypto');
var DS = require('jwcrypto/lib/algs/ds');
// jwcrypto.extractComponents ?


var ident = {
    "default": {
        "tehriddler@gmail.com":{
            "created":"2014-03-10T21:36:09.315Z",
            "updated":"2014-03-10T21:36:09.315Z",
            "pub":{
                "algorithm":"DS",
                "y":"c787457881c08f8dccd888f50acae58cc3addbe80145d889b47e09ff955e8ec4738d8e2828b03be828cd6a403626ca24ddeba8193d6d497c36df6580c6b9f1e018b9b08e2ba9fdb6e045cd5515f1b0e98661f9eaa65ea53bd5d543e55f3cbb5d7ba60fbb0487186ee670d76b45cc12abdbe4a732bca606ae74efc2298804a731",
                "p":"ff600483db6abfc5b45eab78594b3533d550d9f1bf2a992a7a8daa6dc34f8045ad4e6e0c429d334eeeaaefd7e23d4810be00e4cc1492cba325ba81ff2d5a5b305a8d17eb3bf4a06a349d392e00d329744a5179380344e82a18c47933438f891e22aeef812d69c8f75e326cb70ea000c3f776dfdbd604638c2ef717fc26d02e17",
                "q":"e21e04f911d1ed7991008ecaab3bf775984309c3",
                "g":"c52a4a0ff3b7e61fdf1867ce84138369a6154f4afa92966e3c827e25cfa6cf508b90e5de419e1337e07a2e9e2a3cd5dea704d175f8ebf6af397d69e110b96afb17c7a03259329e4829b0d03bbc7896b15b4ade53e130858cc34d96269aa89041f409136c7242a38895c9d5bccad4f389af1d7a4bd1398bd072dffa896233397a"
            },
            "priv":{
                "algorithm":"DS",
                "x":"47d031554a82c7f28b1186b9278ed6cf60b5c421",
                "p":"ff600483db6abfc5b45eab78594b3533d550d9f1bf2a992a7a8daa6dc34f8045ad4e6e0c429d334eeeaaefd7e23d4810be00e4cc1492cba325ba81ff2d5a5b305a8d17eb3bf4a06a349d392e00d329744a5179380344e82a18c47933438f891e22aeef812d69c8f75e326cb70ea000c3f776dfdbd604638c2ef717fc26d02e17",
                "q":"e21e04f911d1ed7991008ecaab3bf775984309c3",
                "g":"c52a4a0ff3b7e61fdf1867ce84138369a6154f4afa92966e3c827e25cfa6cf508b90e5de419e1337e07a2e9e2a3cd5dea704d175f8ebf6af397d69e110b96afb17c7a03259329e4829b0d03bbc7896b15b4ade53e130858cc34d96269aa89041f409136c7242a38895c9d5bccad4f389af1d7a4bd1398bd072dffa896233397a"
            },
            "trevor@bramwell.net":{
                "created":"2014-03-10T21:36:09.681Z"
            }
        }
    }
}

// Create an initial payload to be signed
var payload = {}

// Generate a RSA Keypair
/*
var kp_rsa = jwcrypto.genKeyPair(JWA, );

// Generate a PGP Keypair
var kp_pgp = {}

// Create an Identity Assertion for the Directory Provider

// Pull out own User Certificate from ....

// Add PGP Pubkey hash to params

// Sign with RSA private key
jwcryto.sign();

// 


//////////
*/

var kp;
var jws;
var JWA = { algorithm: 'DSA', keysize: 256 };
var payload = { email: 'some@dude.domain' };
var assertionParams = { issuer: "foo.com", expiresAt: in_a_minute,
                        audience: "https://example.com" }

//
var assertionParams = {
    issuer : "issuer.com",
    issuedAt : new Date(),
    expiresAt : new Date((new Date()).getTime() + (6 * 60 * 60 * 1000))
};

// yes, we're signing our own public key, cause it's easier for now
cert.sign({publicKey: keypair.publicKey, principal:{email: "john@issuer.com"}},
        assertionParams, null, keypair.secretKey, self.callback);
//


function generate(JWA, sign) {
    jwcrypto.generateKeypair(JWA, sign);
}

function sign(err, keypair) {
    if (err) throw err
    kp = keypair
    jwcrypto.sign(payload, kp.secretKey, verify);
}

function verify(err, signedObject) {
    if (err) console.log(err);
    jws = signedObject;
    jwcrypto.verify(signedObject, kp.publicKey, result);
}

function result(err, designed_payload) {
    if (err) throw err
    if (designed_payload.email == payload.email)
        console.log("Payload: "+JSON.stringify(payload));
}

generate(JWA, sign);
