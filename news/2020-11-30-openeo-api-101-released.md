---
news: true
title:  openEO API v1.0.1 released
date:   2020-11-30
author: Matthias Mohr
---

Today, the newly established [openEO Project Steering Committee](../psc.md)
released a new version 1.0.1 of the openEO API. This doesn't include any new
functionality, but clarifies ambiguous parts of the specification and changes
the API's recommendation regarding CORS headers to avoid potential security
issues with credentials in web browsers. Back-ends are advised to check their 
implementations against the new specification and update the CORS headers
accordingly. The web clients have already been updated accordingly.

More details about the release:
* Details on the [CORS issue](https://github.com/Open-EO/PSC/issues/7)
* [Changelog](https://github.com/Open-EO/openeo-api/tree/1.0.1/CHANGELOG.md)
* [API documentation](https://api.openeo.org/)