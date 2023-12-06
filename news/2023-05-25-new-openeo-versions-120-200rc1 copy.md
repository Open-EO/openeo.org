---
news:   true
title:  New releases for openEO API and openEO Processes, focus on vector data
date:   2023-05-25
author: Matthias Mohr
---

Today, we have released the new version 1.2.0 of the openEO API. At the same time, we've also released a 2.0.0 release candidate for the openEO processes.

The focus of these releases is to implement vector data (cube) support in openEO so that the focus is not strongly on raster data any longer.

Back-ends and clients are advised to check their implementations against the new specifications and update accordingly.

Below you can find details about the individual releases:

## openEO API v1.2.0

We've collected improvements and useful new features for two years. It contains clarifications, new extensions (for orders and federation), vector data cubes, STAC (API) updates, alignment with OGC APIs, more link relation types, improved batch job results and logs, and other minor improvements. This API release is required to be able to release openEO processes in version 2.0.0-rc.1 due to the changes from the "raster-cube" to "datacube" subtype and the related changes in the process schema.

- [API documentation](https://api.openeo.org/1.2.0)

Please consult the **[changelog](https://github.com/Open-EO/openeo-api/tree/1.2.0/CHANGELOG.md)** for the changes and additions that have been made to the API.

## openEO Processes v2.0.0-rc.1

AsWe've collected improvements and useful new processes for over a year. The processes incorporate the long-awaited changes for vector data cubes. Unfortunately, this involves some breaking changes (e.g., the new `datacube` datatype) and thus we are moving from 1.x to 2.x. Due to the amount of (breaking) changes, we propose the changes to the community as a release candidate first so that we can evaluate whether it all works as expected. We'll then cut the final release once some implementations confirm that the changes work as planned. Feedback is more than welcome and we'll closely monitor the [GitHub issue tracker](https://github.com/Open-EO/openeo-processes/issues) for your issues. Please feel encoruaged to post your feedback there.

- [Processes documentation](https://processes.openeo.org/2.0.0-rc.1)

This release includes (for the first time) a couple of breaking changes. Therefore, we'll highlight the breaking changes below.
Please consult the [changelog](https://github.com/Open-EO/openeo-processes/tree/2.0.0-rc.1/CHANGELOG.md) for a full list of changes and additions. 

- Added better support for labeled arrays. Labels are not discarded in all cases anymore. Affected processes:
    - `array_append`
    - `array_concat`
    - `array_modify`
- `array_modify`: Change the default value for `length` from `1` to `0`. [#312](https://github.com/Open-EO/openeo-processes/issues/312)
- `aggregate_temporal`, `filter_temporal`, `load_collection` and `load_result`/`load_stac`:
    - The temporal intervals must always be non-empty, i.e. the second instance in time must be after the first instance in time. [#331](https://github.com/Open-EO/openeo-processes/issues/331)
    - `24` as the hour is not allowed anymore.** [#331](https://github.com/Open-EO/openeo-processes/issues/331)
- `inspect`: The parameter `message` has been moved to be the second argument. [#369](https://github.com/Open-EO/openeo-processes/issues/369)
- New definition for `aggregate_spatial`:
    - Allows more than 3 input dimensions [#126](https://github.com/Open-EO/openeo-processes/issues/126)
    - Allow to not export statistics by changing the parameter `target_dimension` [#366](https://github.com/Open-EO/openeo-processes/issues/366)
- Updated the processes based on the subtypes `raster-cube` or `vector-cube` to work with the subtype `datacube` instead. [#68](https://github.com/Open-EO/openeo-processes/issues/68)
- `sort` and `order`: The ordering of ties is not defined anymore. [#409](https://github.com/Open-EO/openeo-processes/issues/409)
- `quantiles`: Parameter `probabilities` provided as array must be in ascending order. [#297](https://github.com/Open-EO/openeo-processes/pull/297)
- `fit_curve` and `predict_curve`: Heavily modified specifications. `fit_curve` works on arrays instead of data cubes, `predict_curve` doesn't support gap filling anymore, clarify no-data handling, ... [#425](https://github.com/Open-EO/openeo-processes/issues/425)
- `climatological_normal`: The `climatology_period` parameter accepts an array of integers instead of strings. [#331](https://github.com/Open-EO/openeo-processes/issues/331)
- `between`: Support for temporal comparison. Use `date_between` instead. [#331](https://github.com/Open-EO/openeo-processes/issues/331)
- Deprecated `GeometryCollections` are not supported any longer. [#389](https://github.com/Open-EO/openeo-processes/issues/389)
- Deprecated PROJ definitions for the CRS are not supported any longer.
- The comparison processes `eq`, `neq`, `lt`, `lte`, `gt`, `gte` and `array_contains`:
    - Removed support for temporal comparison. Instead explicitly use `date_difference`.
    - Removed support for the input data types array and object. [#208](https://github.com/Open-EO/openeo-processes/issues/208)
- `sort` and `order`: Removed support for time-only values. [#331](https://github.com/Open-EO/openeo-processes/issues/331)
