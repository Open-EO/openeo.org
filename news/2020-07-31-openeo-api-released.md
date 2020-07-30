---
news: true
title:  Stable release of the openEO API and Processes (v1.0.0)
date:   2020-07-31
author: Matthias Mohr
---

After two release candidates in early 2020, the openEO Consortium released the first stable version of its [openEO API](https://api.openeo.org/) and their set of [common processes](https://processes.openeo.org). This blog post gives an overview of the most notable changes since [version 0.4](2019-03-07-openeo-api-040.md) and provides an outlook on the next months' project activity.
  
## Processes

The most important change was introduced just recently in openEO API version 1.0.0 RC2. Until then, openEO process graphs allowed users to express processing algorithms and execute them on a back-end using *pre-defined processes* exposed by a back-end provider. While this still exists, a user can now also promote a process graph to a full openEO process description, following the same schema as the pre-defined processes: it must include the processing instructions and metadata like an identifier, parameters, return values, examples etc. This allows *user-defined processes* to be stored and used like pre-defined processes, enabling users to extend the processing capabilities of a back-end. Users can now encapsulate algorithms in separate user-defined processes and re-use these in other user-defined processes. This also allows the exchange of processes (algorithms) between users and back-ends, and creates the possibility for a repository of user-contributed processes that other users can benefit from. A place for finding and sharing such processes is (planned to be) the [openEO Hub](https://hub.openeo.org).

Through user-defined processes (and user defined functions) users may also be able to substitute processes that back-ends have not implemented. In fact, several pre-defined processes are defined with alternative processing instructions that use other openEO pre-defined processes to solve the task. For example, the pre-defined process `normalized_ difference` can be emulated with a combination of the processes `add`, `subtract` and `divide`. So if a back-end is missing the `normalized_difference` process, a user can just [download it](https://processes.openeo.org/#normalized_difference) and use an openEO client to push it to the back-end where it then acts as drop-in replacement for the missing pre-defined process. In the future we plan to allow just using the URL of the process, so that no download/upload would be required.

As mentioned above, openEO offers a set of [common processes](https://processes.openeo.org) to improve interoperability and portability between back-ends. This is not a complete list and is expected to be extended by the openEO Consortium. More than that, we would like to see that processes arise from the community and that we can take over and standardize whatever comes up and is useful for the different domains working with openEO. We can then simply use the user-defined processes as they share the same schema as the pre-defined processes.

The pre-defined openEO processes are released separately from the API to ensure a faster release cycle than we plan for the API. We want to be able to quickly adapt to community needs with additional processes. Future version of the processes are valid with any future API version through the specification of the process metadata standard in openEO.

The pre-defined processes itself also got an update just after the API release, but [the changes](https://github.com/Open-EO/openeo-processes/blob/1.0.0/CHANGELOG.md#100---2020-07-31) are relatively small compared to the API. The focus was to clarify unspecified and ambiguous parts of the specification. Some processes such as `apply_neighborhood` and `constant` were added for the use cases. In collaboration with [Julia Wagemann](https://jwagemann.github.io/) from the [ECMWF](https://www.ecmwf.int/) we started defining processes such as `aggregate_temporal_frequency`, `anomaly` and `climatological_normal` for climatology and meteorology use-cases. Unfortunately, this effort could not be finished yet due to the COVID-19 situation. We want to continue to broaden the processes to be useful for more domains apart from core Earth Observation.

## STAC and OGC APIs

The openEO API now supports STAC (API) versions 0.9 and 1.x, which implements OGC API - Features. Thus, a potential integration of the openEO API with upcoming OGC API standards should be easy to establish.

## User-defined Functions (UDFs)

*Note: Don't get confused, user-defined processes and user-defined functions describe different things.*

Although already foreseen in API version 0.4.0, the openEO UDF API has evolved and is better integrated in the openEO API. It now allows to run Docker containers or custom scripts in potentially any programming language. The UDF API itself is not part of the openEO API, but is a separate specification to describe the data exchange between a back-end implementing the openEO API and a UDF API instance. The UDF API is in release candidate phase and we'll likely post a separate blog post focussing solely on them. Currently, implementations in R and Python are available. It is foreseen that users could also host their own UDF API instances and call them from remote back-ends.

## Other improvements

Other notable changes and additions:

* Support for importing user-provided data sets has been added.
* Providers can now expose their terms of service and privacy policies.
* The WebSocket-based Subscription API for notifications and monitoring introduced in version 0.4 has been replaced by a logging mechanism in the HTTP API. This makes implementing the API easier for clients and back-ends, but doesn't work in real-time any longer.

The full set of changes can be found in the [API's change log](https://github.com/Open-EO/openeo-api/blob/1.0.0/CHANGELOG.md).
  
## Limitations

With openEO, we are digging into new grounds regarding the interoperability of big Earth observation clouds. While we could solve a lot of issues that came up, there were some issues that we couldn't solve as part of the API and processes. We want to be honest and give some insights into the lessons learned, so I have posted these as a [separate blog post](2020-07-31-lessons-learned.md).

## Next steps

The API's development went through several iterations and is working well for our broad range of use cases, which we'll report soon. [Implementations](/software.md) by several organizations for several API versions provide evidence that the API and the processes are useful for a wide range of use cases. Client and back-end developers will now finish their implementations and we hope to have the first operational services this year. We will follow up with new blog posts once other releases are available. If you are interested in trying out openEO, please [contact us](/contact.md) to get more information.
