# Authentication

While a couple of openEO operations can be done anonymously, most of the interesting parts of the API require you to identify as a registered user. openEO specifies two ways to authenticate as a user:

- [OpenID Connect](https://en.wikipedia.org/wiki/OpenID_Connect) (recommended, but not always straightforward to use)
- [HTTP Basic](https://en.wikipedia.org/wiki/Basic_access_authentication) (not recommended, but practically easier in some situations)

## HTTP Basic

Let's start with the easiest authentication method, based on the HTTP Basic authentication scheme. It is however *not recommended* for various reasons, such as its limited *security* measures. For example, if you are connecting to a backend with a `http://` URL (unencrypted; discouraged in openEO) instead of a `https://` one (encrypted), you should certainly not use HTTP Basic authentication.

With these security related caveats out of the way, you authenticate using your username and password. The clients usually have a `authenticate_basic` method for this or graphical clients (e.g. QGIS and the Web Editor) will ask for your username and password directly.

::: tip Further Information
* [JS Client Documentation](https://open-eo.github.io/openeo-js-client/1.0.0-rc.2/BasicProvider.html)
* [Python Client Documentation](https://open-eo.github.io/openeo-python-client/auth.html#basic-http-auth)
* [R Client Documentation](https://github.com/Open-EO/openeo-r-client/blob/master/man/BasicAuth.Rd)

:::

## OpenID Connect

OpenID Connect (OIDC) is an identity layer on top of the OAuth 2.0 protocol. It is a quite an extensive stack of interacting actors and protocols, and an in-depth discussion of its architecture would lead us too far here. However, in the context of working with openEO, these OpenID Connect concepts are useful to understand:

- There is **decoupling** between:

    - the *OpenID Connect identity provider* (the platform that handles the authentication of the user)
    - the *openEO backend*, which manages earth observation collections and executes your algorithms

    openEO Backends can decide to host their own OpenID Connect infrastructure, but they may also allow to authenticate with an external OpenID Connect provider, which could be an organization like Google or Microsoft. This means that the backend does not have to take care of all the security and privacy challenges of properly handling user registration, authentication, etc. Also, it allows the user to securely reuse an existing account registered with an established organization, instead of having to register yet another account with some web service.
    
    ::: tip Note
    An openEO backend might support **multiple OpenID Connect providers**. If there is only one, the openEO client libraries will usually pick it automatically, but otherwise you may need to decide explicitly which provider to authenticate against.
    :::

- Your openEO script or application acts as a so called **OpenID Connect client**, with an associated **client ID**. This practically means that, apart from a user account, you need a client ID as well (and often a client secret too) when authenticating.

    The details of how to obtain the client ID and secret largely depend on the backend and OpenID Connect provider: you might have to register a client yourself, or you might have to use an existing client ID. Consult the openEO backend (documentation) about how to obtain client ID (and secret).

- There are several possible "**flows**" (also called "grants") to complete the whole OpenID Connect authentication dance:

    - Authorization Code Flow
    - Device Flow
    - Client Credentials Flow
    - Resource Owner Password flow
    - Refresh Token Flow

    Picking the right flow highly depends on your use case and context: are you working interactively, are you working in a browser based environment, should your application be able to work without user interaction in the background, what does the OpenID Connect provider support, ...?

OpenID Connect is clearly more complex than HTTP Basic Authentication. In the sections below we will discuss the practical details of each flow.

::: tip Further Information
* [JS Client Documentation](https://open-eo.github.io/openeo-js-client/1.0.0-rc.2/OidcProvider.html)
* [Python Client Documentation](https://open-eo.github.io/openeo-python-client/auth.html#openid-connect-based-authentication)
* [R Client Documentation](https://github.com/Open-EO/openeo-r-client/blob/master/man/OIDCAuth.Rd)

:::

### Authorization Code Flow

This is the most popular and widely supported OpenID Connect flow in the general web development world. However, it requires an environment that can be hard to get right when using in other environments like a mobile app or a CLI (command line interface). Some prerequisites must be met:

- You are working interactively (e.g. in a Jupyter notebook, in a Python or R shell or running a script manually)
- You have access to a web browser (preferably on the same machine as your application), to authenticate with the OpenID Connect provider
- The web browser has (network) access
- A URL must be whitelisted in the OpenID client's "redirect URL" configuration at the OpenID Connect provider's side.

For authentication, the client forwards a user to the log-in page of the OpenID Connect provider. There. the user can log in there with an existing account (or create a new one) and then generally has to explicitly grant access to basic profile information (e.g. email address) that the backend will use to identify the user. 

### Device Flow

The device flow (also called device authorization grant) is a relatively new OpenID Connect flow and it is not as widely supported across different OpenID Connect Providers as the other flows. It provides a nice alternative that is roughly comparable to the authorization code flow but without the previously mentioned issues related to short-living webservers, network access and browser redirects.

The device flow is only suited for interactive use cases and requires a web browser for the authentication with the OpenID Connect provider. However, it can be any web browser, even one on your mobile phone. There is no networking magic required to be able to access any short-living background webserver like with the authorization code flow.

The "magic" is that the client will show a message like this:

    To authenticate: visit https://provider.example.com/device
    and enter the user code 'DTNY-KLNX'.

You should now visit this URL. Usually it is intentionally a short URL to make it feasible to type it instead of copy-pasting it (e.g. on another device). Authenticate with the OpenID Connect provider and enter the user code shown in the message. Meanwhile, the client library is usually actively polling the OpenID Connect provider and when you successfully complete the authentication and entering of the user code, it will receive the necessary tokens for authenticated communication with the backend.

### Client Credentials Flow

The Client Credentials flow directly uses the client ID and secret to authenticate. It does not involve interactive authentication through a web browser, which makes it useful for **non-interactive use cases**.

The downside is of the Client Credentials flow is that it can be challenging or even impossible with a given OpenID Connect provider, to set up a client that supports this. Also, your openEO backend might not allow it, because technically you are authenticating a *client*, and not a *user*.

### Resource Owner Password flow

With the Resource Owner Password flow you directly pass the user (and client) credentials. Like the Client Credentials flow, it is useful for **non-interactive uses cases**.

However, usage of the Resource Owner Password flow is **generally discouraged** because of its poor security features (e.g. OAuth/OIDC was designed to avoid passing and storing user passwords unnecessarily). It is also not widely supported across OpenID Connect providers, probably due to its weak security measures.

### Refresh Token Flow

When OpenID Connect authentication completes successfully, the client receives an access token to be used when doing authenticated calls to the backend. The access token usually has a short lifetime to reduce the security risk when it would be stolen or intercepted. The client also receives a *refresh token* that can be used, through the Refresh Token flow, to easily request a new access token, without having to re-authenticate, which makes it useful for **non-interactive uses cases**.

However, as it needs an existing refresh token, the Refresh Token Flow requires **first to authenticate with one of the other flows** (but in practice it might not be required very often because refresh tokens usually have a relatively long lifetime).
