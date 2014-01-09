Persona is built on the BrowserID protocol. This page describes the BrowserID
protocol at a high level.

#Actors

The protocol involves three actors:

*  Users: The actual people that want to sign into websites using Persona.
*  Relying Parties (RPs): Websites that want to let users sign in using Persona.
*  Identity Providers (IdPs): Domains that can issue Persona-compatible identity
certificates to their users.

Persona and the BrowserID protocol use email addresses as identities, so it''s
natural for email providers to become IdPs.

Mozilla operates a fallback IdP so that users can use any email address with
Persona, even one with a specific domain that isn''t an IdP itself.  

#Protocol Steps

There are three distinct steps in the protocol:

1  User Certificate Provisioning 
2  Assertion Generation 
3  Assertion Verification

As a prerequisite, the user should have an active identity (email address) that
they wish to use when logging in to websites. The protocol does not require
that IdP-backed identities are SMTP-routable, but it does require that
identities follow the user@domain format.  

##User Certificate Provisioning

In order to sign into an RP, a user must be able to prove ownership of their
preferred email address. The foundation of this proof is a cryptographically
signed certificate from an IdP certifying the connection between a browser''s
user and a given identity within the IdP''s domain.

Because Persona uses standard public key cryptography techniques, the user
certificate is signed by the IdP''s private key and contains:

*  The user''s email address.
*  The user''s public key for that address on that browser.  
*  The time that the certificate was issued.
*  The time that the certificate expires.
*  The IdP''s domain name.

The user''s browser generates a different keypair for each of the user''s email
addresses, and these keypairs are not shared across browsers. Thus, a user must
obtain a fresh certificate whenever one expires, or whenever using a new
browser or computer. Certificates must expire within 24 hours of being issued.

When a user selects an identity to use when signing into an RP, the browser
checks to see if it has a fresh user certificate for that address. If it does,
this step is complete and the browser continues with the assertion generation
step below. If the browser does not have a fresh certificate, it attempts to
obtain one from the domain associated with the chosen identity.

1  The browser fetches the /.well-known/browserid support document over SSL
from the identity''s domain.  
2  Using information from the support document, the browser passes the user''s email address and associated public key to the IdP and requests a signed certificate.
3  If necessary, the user is asked to sign into the IdP before provisioning proceeds. 
4  The IdP creates, signs, and gives auser certificate to the user''s browser.

With the certificate in hand, the browser can continue with generating an
identity assertion and signing into an RP.

user-certificate-provisioning.png 
##Assertion Generation

The user certificate establishes a verifiable link between an email address and
a public key. However, this is alone not enough to log into a website: the user
still has to show their connection to the certificate by proving ownership of
the private key.

In order to prove ownership of a private key, the user''s browser creates and
signs a new document called an "identity assertion." It contains:

*  The origin (scheme, domain, and port) of the RP that the user wants to sign
into.  
*  An expiration time for the assertion, generally less than five minutes
after it was created.

The browser then presents both the user certificate and the identity assertion
to the RP for verification.  

##Assertion Verification

The combination of user certificate and identity assertion is sufficient to
confirm a user''s identity.

First, the RP checks the domain and expiration time in the assertion. If the
assertion is expired or intended for a different domain, it''s rejected. This
prevents malicious re-use of assertions.

Second, the RP validates the signature on the assertion with the public key
inside the user certificate. If the key and signature match, the RP is assured
that the current user really does possess the key associated with the
certificate.

Last, the RP fetches the IdP''s public key from its /.well-known/browserid
document and verifies that it matches the signature on the user certificate. If
it does, then the RP can be certain that the certificate really was issued by
the domain in question.

Once verifying that this is a current login attempt for the proper RP, that the
user certificate matches the current user, and that the user certificate is
legitimate, the RP is done and can authenticate the user as the identity
contained in the certificate.

assertion-generation-and-verify.png 
#The Persona Fallback IdP

What if a user''s email provider doesn''t support Persona? In that case, the
provisioning step would fail. By convention, the user''s browser handles this by
asking a trusted third party, https://login.persona.org/, to certify the user''s
identity on behalf of the unsupported domain. After demonstrating ownership of
the address, the user would then receive a certificate issued by the fallback
IdP, login.persona.org, rather than the identity''s domain.

RPs follow a similar process when validating the assertion: the RP would
ultimately request the fallback IdP''s public key in order to verify the
certificate.

