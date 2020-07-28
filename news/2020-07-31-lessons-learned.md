---
news: true
title:  Lessons learned while developing the openEO API
date:   2020-07-31
author: Matthias Mohr
---

With openEO, we are digging into new grounds regarding the interoperability of big Earth observation clouds. While we could address a lot of problems that came up, some issues remained that we couldn't solve. This article explains *some* of the lessons learned and thus also gives an honest overview about current limitations of the openEO API.

## 1. Collection Names

The naming of data sets (collections) are different across providers. We thought about recommending to follow lists like the [CEOS Mission Index](http://database.eohandbook.com/database/missionindex.aspx), but then the question is what data does it really refer to? It lists `Sentinel-2 A` and `Sentinel-2 B`, but would that be Level 1C or 2A or something completely different? Therefore, openEO decided to not enforce any naming scheme as data sets throughout the affiliated providers were mostly differently pre-processed anyway. To improve the situation, openEO allows to define process parameters. This allows to define algorithms independently of data set names, which can later be assigned when executing the process. Also, openEO recommends to split processing instructions into two parts: data loading/pre-processing and the actual algorithm.

Some more background information can be found in the corresponding [GitHub issue](https://github.com/Open-EO/openeo-api/issues/52). In general, many limitations (including the following) concern the data holdings of the providers and may hopefully be solved by initiatives that work on Analysis Ready Data (ARD).

## 2. Other Names

Similarly, the naming of bands (and potentially other dimension labels, too) are inconsistent across providers, we faced names such as `B2`, `B02`, `2` or `blue` for Sentinel-2. openEO doesn't enforce any naming scheme, but has found ways to improve the situation for users. First, process parameters can be used (see above). Second, bands can also be specified using the [common names as specified by STAC](https://github.com/radiantearth/stac-spec/tree/v0.9.0/extensions/eo#common-band-names) or wavelength ranges. openEO recommends to use common names whenever available.

For example, to avoid specific naming you could filter for Sentinel-2 (A and B) band 2 as follows:
* by common name: `filter_bands(data = cube, bands = ['blue'])` (blue maps to the wavelength range 0.45 - 0.50 according to STAC)
* by wavelength, specified in μm: `filter_bands(data = cube, wavelength = [[0.49, 0.50]])` (wavelength is 0.4966 for Sentinel-2A and 0.4921 for Sentinel-2B)

In general, metadata is aligned for usage in openEO processes by using the [STAC specification](https://www.stacspec.org), which improves interoperability.

## 3. Chunked Collections

Some providers (for example [Google Earth Engine](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR)) expose data sets such as Sentinel-2 L2A as one large collection. Other providers expose the data sets split into groups, e.g. chunked by CRS and resolution. EURAC has collections such as `S2_32632_60m_L2A` or `S2_32635_10m_L2A` for example. There are valid [reasons](https://github.com/Open-EO/openeo-api/issues/180) for any of the implementations, but to explain them is too much for this article. Unfortunately, those differences decrease the interoperability and in the end the re-usability of the processes. openEO aims to make algorithms re-usable and thus recommends to split processing instructions into two parts: data loading/pre-processing and the actual algorithm. This allows greater re-usability of the algorithms.

## 4. What to specify?

The API has a focus on Service and Data Discovery, Data Processing and Result Retrieval/Publishing. Some more customer-oriented tasks such as user registration and payments are not handled through the openEO API. These aspects are too different across providers and can be handled more efficiently through external interfaces. Most providers already offer such services independently of the openEO API implementation anyway to offer their pre-openEO services.

Still, the openEO API uses OpenID Connect as main Authentication and Authorization mechanism (see also point 5). [OpenID Connect](https://openid.net/connect/) has a [User Registration extension draft](https://openid.net/specs/openid-connect-prompt-create-1_0.html) that can be used by back-ends and my be adopted in the future. We closely follow upcoming specifications and standards and are happy to adopt anything useful.

### File Formats

Similarly, file [formats](https://github.com/Open-EO/openeo-api/issues/63) and their [options](https://github.com/Open-EO/openeo-api/issues/32) are often very different between processing software. That's why GDAL exists. To improve interoperability, the openEO API just recommends to align them with GDAL, which is used in most relevant software anyway. Unfortunately, this comes with some small inconveniences. For example, most people would probably expect to just specify "GeoTiff" as file format name, but then GDAL has named it "GTiff" for whatever reason. Another idea was to use [media types](https://www.iana.org/assignments/media-types/media-types.xhtml) such as `application/json`, but then we realized that these are often to bread or not even defined. As such openEO even had to [push the OGC](https://github.com/opengeospatial/geotiff/issues/34) to specify an official media type for GeoTiff. But the same issue exists for other file formats, too.

## 5. Authentication

One of the most complex issues we faced during API development was actually not EO or data processing related. It was the Authentication and Authorization mechanism. We quickly decided to use one of the well-established standards available for security reasons. Unfortunately, most of them doesn't seem to cater very well for our use case where you have a number of different clients and back-ends communicating with each other. Usually in the Web you have multiple clients communicating with a single back-end (*1:n*), but in openEO we have a *n:m* relation. There are CLI tools, web clients and more that need to authenticate against a growing set of independent providers. Therefore, you can't easily ship clients with security measures like Client IDs (and Client Secrets) as required by [OpenID Connect](https://openid.net/connect/) (based on [OAuth 2](https://oauth.net/2/)). User need to get those information theirself and provide it to the clients, which is inconvenient and probably confusing to many non-developers. This issue is probably the thing I dislike most in the current API specification and thus would love to hear from you, if there are good solutions out there that we didn't find yet.

## 6. Debugging Experience

The logging and debugging experience varies a lot between cloud processing and the "traditional workflow" (you download data and compute locally with your preferred tools). While it's "free" on a local machine to just do "try and error" to check whether something is running, cloud processing usually comes with a cost and you likely don't want to work with "try and error". Also you don't directly have access to the hardware and software and thus it's harder to investigate problems. openEO took several measures to mitigate these issues, but it's still a different experience for users. I guess that's a long learning process until it adopted by users and may need additional effort to implement tools to improve the situation. While many users are getting used to it in situations where a streamlined experience is somewhat possible as only few clients communicate with a single provider (e.g. Google Earth Engine), the issue increases in openEO due to the different infrastructure and software used on back-end side.

## 7. Defining interoperable Processes

Defining a common set of pre-defined processes was a very long and challenging task.

1. First, we had to come up with a useful schema that allowed us to describe processes in JSON. We got inspired by different other standards such as [WPS](https://www.ogc.org/standards/wps) and [OpenAPI](http://spec.openapis.org/oas/v3.0.3).
2. Second, we had to find what processes are required and which granularity they should have. That quickly lead to over [a hundred processes](https://processes.openeo.org/), mainly for data cube and math operations. And that was only for mostly raster operations. We still have a big hole in the processes regarding vector related operations, but we aim to close that in the next year(s).
3. Third, we had to figure out what common processing softwares offered and how to come up with process definitions than can be implemented with those softwares.
4. Last, we had to specify it in a way that is unambiguous and easy to understand by users.

All of these tasks took much more time than initially expected. For example, one of the partners reported that the granularity of the processes is not really suited for the underlying processing software. While we couldn't really change the granularity, it was at least not an issue to make openEO work for them. Fortunately, the process part of the openEO API is very flexible and allows providers to change the processes according to their needs or define their own processes. Due to the fact that the actual parameters and return values are described in JSON Schema, clients and back-ends can easily re-use existing JSON Schema implementations and adopt to changes in the process specifications. Thus, if a back-end doesn't support parts of a process, it can just be changed/removed and a client can understand that and cater for it.

## Conclusion

This was a deep dive into *some* of my challenges during the last years. I hope it's useful for others and I'm hoping to get into discussions with developers facing similar issues. Maybe with joint forces we can solve some of these for a better cloud processing experience in the future. If you have anything to say, please contact me via [e-mail](mailto:m.mohr@uni-muenster.de), GitHub issues ([API](https://github.com/Open-EO/openeo-api), [Processes](https://github.com/Open-EO/openeo-processes/issues)) or [Twittter](https://twitter.com/matthmohr). You can also [contact openEO](/contact.md).