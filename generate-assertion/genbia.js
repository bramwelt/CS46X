/*
 * Generate a Backed Identity Assertion, and create Certificates
 */

var jwcrypto = require("jwcrypto");
require("jwcrypto/lib/algs/ds");
require("jwcrypto/lib/algs/rs");

/*
if (process.argv[2])
  jwcrypto.setDataFormatVersion(process.argv[2]);

var root_keypair;
var user_keypair;
var identity_cert;

var EMAIL = "user@exampleidp.com";
var ISSUED_AT = new Date();
var EXPIRES_AT = new Date(new Date().valueOf() + 300);
var ISSUER = "exampleidp.com";

var test = function() {
    jwcrypto.generateKeypair({algorithm: "RSA", keysize: 256}, function(err, keypair) {
        console.log("ROOT RSA KEY");
        console.log(keypair.publicKey.serialize());

        console.log("ROOT RSA SECRET KEY");        
        console.log(keypair.secretKey.serialize());
        root_keypair = keypair;

        // Create user keypair
        jwcrypto.generateKeypair({algorithm: "DSA", keysize: 128}, function(err, keypair) {
            console.log("USER DSA KEY");        
            console.log(keypair.publicKey.serialize());

            console.log("USER DSA SECRET KEY");        
            console.log(keypair.secretKey.serialize());

            user_keypair = keypair;

            // Create cert
            jwcrypto.cert.sign(
                {publicKey: user_keypair.publicKey, principal: {email: EMAIL}},
                {issuer: ISSUER, issuedAt: ISSUED_AT, expiresAt: EXPIRES_AT},
                {}, root_keypair.secretKey, function(err, cert) {
                    console.log("CERT");
                    console.log(JSON.stringify({
                      issued_at: ISSUED_AT.valueOf(),
                      expires_at: EXPIRES_AT.valueOf(),
                      issuer: ISSUER,
                      email: EMAIL
                    }));
                    console.log(cert);
                    identity_cert = cert;
    
                    generateBackedIdentityAssertion(identity_cert, user_keypair);
            });
        });
    });
};
*/

/*
 * Takes a User Certificate (identity cert), a secretkey, and a
 * callback.
 *
 * The secret key is the user's not root certificate signer's
 */
var generateBackedIdentityAssertion = function(cert, secretkey, cb) {
    var ISSUED_AT = new Date();
    var EXPIRES_AT = new Date(new Date().valueOf() + 2590200); // 1 month
    jwcrypto.assertion.sign({},
      {expiresAt: EXPIRES_AT, issuedAt: ISSUED_AT,
       audience: "https://privlyalpha.org"},
       secretKey,
      function(err, assertion) {
        cb(err, jwcrypto.cert.bundle(cert, assertion));
      }
    );
};

//test();

exports.sign = jwcrypto.sign
exports.generateBackedIdentityAssertion = generateBackedIdentityAssertion
