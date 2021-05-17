---
news: true
title:  openEO API v1.1.0 released
date:   2021-05-17
author: Matthias Mohr
---

Today, we released a new version 1.1.0 of the openEO API.

It features a number of relatively minor, but interesting new features.
The OpenID Connect authentication process has been made easier by providing negotiating client IDs automatically.
Jobs, Services, and Logs can provide detailed usage metrics to users
so that they can monitor memory usage, CPU usage, data transfer, and other metrics.
For synchronous processing, a recommendation has been added on how to deliver multiple
files (via TAR archives). Overall, we also aligned better with the STAC specification,
which recently has been released in 1.0.0 release candidate state.
For several parts exposed by the API can now be declared to be experimental
or deprecated.
Finally, the API specification also clarifies several ambiguous parts of the specification. 

Back-ends and clients are advised to check their implementations against the new specification and update accordingly.

More details about the release:
* [Changelog](https://github.com/Open-EO/openeo-api/tree/1.1.0/CHANGELOG.md)
* [API documentation](https://api.openeo.org/)