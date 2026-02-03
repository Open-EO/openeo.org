---
news:   true
title:  openEO API 1.3.0 and openEO Processes 2.0.0 RC2 released
date:   2026-02-03
author: Matthias Mohr
---

Today, we have released the new version 1.3.0 of the openEO API. At the same time, we've also released openEO Processes 2.0.0-rc.2.

These releases continue the journey towards first-class vector data cube support, while also bringing a number of quality-of-life improvements for implementers (back-ends) and consumers (clients).

Back-ends and clients are advised to check their implementations against the new specifications and update accordingly.

Below you can find details about the individual releases:

## openEO API v1.3.0

openEO API 1.3.0 contains a set of improvements, clarifications and new capabilities, with a strong focus on authentication, batch job metadata and interoperability.

- [API documentation](https://api.openeo.org/1.3.0)

Please consult the **[changelog](https://github.com/Open-EO/openeo-api/tree/1.3.0/CHANGELOG.md)** for the full list of changes and additions.

### API Highlights

- **New extensions**:
  - [Processing Parameters Extension](https://github.com/Open-EO/openeo-api/tree/1.3.0/extensions/processing-parameters)
  - [Remote Process Definition Extension](https://github.com/Open-EO/openeo-api/tree/1.3.0/extensions/remote-process-definition)
  - [Workspaces Extension](https://github.com/Open-EO/openeo-api/tree/1.3.0/extensions/workspaces)
- **Authentication updates:** Support for standard JSON Web Tokens (JWT) as Bearer tokens, while deprecating the openEO-specific token format.
- **Batch job metadata improvements:** Additional timestamps such as `queued`, `started` and `unpublished`, a status diagram, and extended timestamps in STAC results.
- **Improved logging:** Added `stacktrace` to log entries to simplify debugging.
- **Discovery and process metadata tightened:** `GET /` now requires the fields `type` and `conformsTo`; `GET /processes` adds a `version` property for processes; `GET /` also adds a new `web-editor` link relation type.
- **Deprecations:** STAC 0.9.x is deprecated.

Feedback is more than welcome. Please report issues and questions through the [GitHub issue tracker](https://github.com/Open-EO/openeo-api/issues). The next version is likely v1.4.0, work has started.

## openEO Processes v2.0.0-rc.2

openEO Processes 2.0.0-rc.2 is the second release candidate of the upcoming 2.0 release series. It builds on the 2.0 work that introduced the `datacube` data type and vector cube support, and continues to improve process definitions, consistency and implementability.

Please note that some changes are breaking changes. Make sure to review the changelog carefully before updating implementations.

- [Processes documentation](https://processes.openeo.org/2.0.0-rc.2)

Please consult the **[changelog](https://github.com/Open-EO/openeo-processes/tree/2.0.0-rc.2/CHANGELOG.md)** for a full list of changes and additions.

### Processes Highlights

- **Implementation support:** A new implementation guide for implementing OGC API - Processes in openEO, plus a dedicated set of unit tests.
- **New processes:**
  - `export_collection`, `export_workspace`
  - `run_ogcapi`, `run_ogcapi_externally`
  - `stac_modify`
  - `text_find`
- **More stable processes:** `apply_polygon`, `date_between`, `date_shift`, `filter_labels` and `inspect` are now marked as stable.
- **Behaviour and consistency updates:**
  - `save_results` returns the STAC resource (instead of boolean `true`).
  - `all` returns `true` for empty arrays; `any` returns `false` for empty arrays.
  - `apply_polygon` renamed parameter `polygons` to `geometries`.
  - `clip` throws an exception if min > max. [#472](https://github.com/Open-EO/openeo-processes/issues/472)
  - `date_difference` allows `week` as a unit.
  - `is_nan` returns `false` for non-numerical data types. [#486](https://github.com/Open-EO/openeo-processes/issues/486)
- **Clarifications and fixes across the board:** Improved handling of `NaN`, `null` and no-data values, added uniqueness constraints for various array-typed parameters, and numerous targeted fixes (e.g. geometry dimension type clarifications).

As this is a release candidate, feedback is more than welcome. Please report issues and questions through the [GitHub issue tracker](https://github.com/Open-EO/openeo-processes/issues). The next version is likely v2.0.0 (stable).
