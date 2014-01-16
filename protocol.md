This document was copied and modified from the original found at:
https://developer.mozilla.org/en-US/Persona/Protocol_Overview

The Privly PGP app is built on top of Mozilla Persona. This page describes how
the Privly PGP app uses Persona for identity certificates and public key
discovery at a high level.

#Actors

The protocol involves four actors:

*  Users: The actual people that want to upload their email address associated
          with a public key to a public directory.
*  Relying Parties (RPs): Users that want to discover public keys of potential
          message recipients.
*  Identity Providers (IdPs): Domains that can issue Persona-compatible 
           identity certificates to their users.
*  Directory Provider (DP): A key-value store that provides storage for an 
          authenticated directory of email addresses and public keys.

Persona and the BrowserID protocol use email addresses as identities, so it''s
natural for email providers to become IdPs.

Mozilla operates a fallback IdP so that users can use any email address with
Persona, even one with a specific domain that isn''t an IdP itself.  

#Protocol Steps

There are three distinct steps in the protocol:

1.  User Certificate Provisioning 
2.  Assertion Generation 
3.  Assertion Verification

As a prerequisite, the user should have an identity (email address) that they
wish to publicly disclose and associate with a public key. The protocol does
not require that IdP-backed identities are SMTP-routable, but it does require
that identities follow the user@domain format.  

##User Certificate Provisioning

In order to upload their email and public key to the directory, a user must be
able to prove ownership of their preferred email address. The foundation of
this proof is a cryptographically signed certificate from an IdP certifying the
connection between a browser''s user and a given identity within the IdP''s
domain.

Because Persona uses standard public key cryptography techniques, the user
certificate is signed by the IdP''s private key and contains:

*  The user''s email address.  
*  The user''s public key for that address on that browser.  
*  The time that the certificate was issued.  
*  The time that the certificate expires.  
*  The IdP''s domain name.
*  The user''s public key they wish to publicly associate with their email.

The user''s browser generates a different keypair for each of the user''s email
addresses, and these keypairs are not shared across browsers. Thus, a user must
obtain a fresh certificate whenever one expires, or whenever using a new
browser or computer. Certificates should not expire before the PK&E expires.

When a PK&E expires or a user wants to generate a new one pair, it attempts to
obtain one from the domain associated with the chosen identity.

1.  The browser extension fetches the /.well-known/browserid support document
    over SSL from the identity''s domain.
2.  Using information from the support document, the browser extension passes
    the user''s email address and associated public key to the IdP and requests
    a signed certificate.
3.  If necessary, the user is asked to sign into the IdP before provisioning
    proceeds.
4.  The IdP creates, signs, and returns the user certificate to the browser
    extension.

With the certificate in hand, the browser extension can continue with generating
an identity assertion and uploading it to the directory.

##Assertion Generation

The user certificate establishes a verifiable link between an email address and
a public key. However, this is alone not enough to create a valid entry in the
directory: the user still has to show their connection to the certificate by 
proving ownership of the private key.

In order to prove ownership of a private key, the user''s browser creates and
signs a new document called an "identity assertion." It contains:

*  The origin (scheme, domain, and port) of the directory that the user wants to
   be entered into.
*  An expiration time for the assertion, generally less than five minutes
after it was created.

The browser then presents both the user certificate and the identity assertion
to the directory for verification.  

##Assertion Verification

The combination of user certificate and identity assertion is sufficient to
confirm a user''s identity.

First, the DP checks the domain and expiration time in the assertion. If the
assertion is expired or intended for a different domain, it''s rejected. This
prevents malicious re-use of assertions.

Second, the DP validates the signature on the assertion with the public key
inside the user certificate. If the key and signature match, the DP is assured
that the current user really does possess the key associated with the
certificate.

Last, the DP fetches the IdP''s public key from its /.well-known/browserid
document and verifies that it matches the signature on the user certificate. If
it does, then the DP can be certain that the certificate really was issued by
the domain in question.

Once verifying that this is a current directory entry request for the proper DP, 
that the user certificate matches the current user, and that the user
certificate is legitimate, the DP is done and can permit the user certificate as 
a valid entry in the directory.

#The Persona Fallback IdP

What if a user''s email provider doesn''t support Persona? In that case, the
provisioning step would fail. By convention, the user''s browser handles this
by asking a trusted third party, https://login.persona.org/, to certify the
user''s identity on behalf of the unsupported domain. After demonstrating
ownership of the address, the user would then receive a certificate issued by
the fallback IdP, login.persona.org, rather than the identity''s domain.

DPs follow a similar process when validating the assertion: the DP would
ultimately request the fallback IdP''s public key in order to verify the
certificate.
