---
news: true
title:  Lessons learned while developing the openEO API
date:   2020-07-31
author: Matthias Mohr
---

With openEO, we are digging into new grounds regarding the interoperability of big Earth observation clouds. While we could solve a lot of issues that came up, there were some issues that we couldn't solve. This article explains *some* of the lessons learned and thus also gives an honest overview about current limitations of the openEO API.

## 1. Collection Names

The naming of data sets (collections) are different across providers. openEO doesn't enforce any naming scheme as data sets are often differently pre-processed by providers. To improve the situation, openEO allows to define process parameters (see above). This allows to define algorithms independently of data set names, which can later be assigned when executing the process.

The major limitations mostly concern the data holdings of the providers and may be solved by initiatives that work on Analysis Ready Data (ARD).

## 2. Other Names

Similarly, the naming of bands (and potentially other dimension labels) are sometimes inconsistent across providers. openEO doesn't enforce any naming scheme, but has found to ways to improve the situation for users. First, process parameters can be used (see above). Second, bands can also be specified using [common names as specified by STAC](https://github.com/radiantearth/stac-spec/tree/v0.9.0/extensions/eo#common-band-names) or wavelength ranges. In general, metadata is aligned for usage in openEO processes by using the [STAC specification](https://www.stacspec.org).

-> example with filter_bands process

## 3. Chunked Collections

Some providers expose data sets such as Sentinel-2 as one large collection. Other providers expose the data sets split into subgroups, e.g. split by CRS or resolution. This decreases the interoperability and thus openEO recommends to split processing instructions into two parts: data loading/pre-processing and the actual algorithm. This allows greater re-usability of algorithms.

-> Link to GH issue
-> S2 example

## 4. Don't specify everything

Some more customer-oriented tasks such as user registration and payments are not handled through the openEO API. These aspects are too different across providers and can be handled more efficiently through external interfaces. For example, most providers already offer such services independently of the openEO API implementation.

## 5. File Formats

File formats and their options are often very different between processing software. That's why GDAL exists. To improve interoperability, the openEO API recommends to align them with GDAL, which is used in most relevant software anyway.

## 6. Debugging Experience for Devs

The logging and debugging experience varies a lot between the "traditional workflow" (download data and compute locally) and cloud processing. While it's "free" to just try whether something is running on a local machine, cloud processing usually comes with a cost. openEO took several measures to mitigate this issue, but it's still different. The issue increases due to the different infrastructure and software used on back-end side. openEO still tries to give a somewhat uniform experience.

## 7. Defining interoperable Processes is hard

-> Go into missing vector data (cubes)...

One of the partners reported that the granularity of the processes is not really suited for the underlying processing software. While we couldn't really solve this issue, it's not a big issue. The openEO API is very extensible and allows providers to define their own models that fits their needs or just choose the pre-defined processes they can actually suppo