---
news: true
title:  openEO year one review meeting
date:   2018-10-30
author: Matthias Schramm
---

The openEO consortium is currently undergoing its first evaluation process by the European Commission. During the first year the partners exceeded the planned progress. During the starting phase the meaning of the different layers was clarified more precisely. openEO represents a set of contracts between two API layers.

1. Instances of the core API are implemented at back-end drivers within the respective EO service providers. By guaranteeing the same instances at the various back-ends, their interoperability can be guaranteed.
2. Client APIs – software libraries specific to given programming languages – are enabling users to interact with the back-end's drivers.
The communication between clients and service providers is realised via HTTP requests, which's complexity is not visible to the users, but is dealt with by openEO.

Since the successful development of the Proof of Concept, client APIs are developed for [Python](https://github.com/Open-EO/openeo-python-client), [R](https://github.com/Open-EO/openeo-r-client), and [JavaScript](https://github.com/Open-EO/openeo-js-client), enabling the execution of a growing set of functionalities. Being language neutral, new client APIs of e.g. additional programming languages, Quantum GIS interfaces, or GRASS GIS can be added easily. Currently, the core API is establishing access to entry points of [7 European EO service providers](/software.md/#back-ends), which are thus able to provide services to the user, reflecting examples from all stages of EO data processing.

A process catalogue is under development, describing a set of functionalities to be implemented for openEO, their I/O data and their exact workflow. Interested users are encouraged to discuss with the consortium partners via the various provided channels to enable openEO forming widely accepted and used standards with a consistent syntax. The well-defined process catalogue shall also serve 3rd-party processing platforms with a template to become accessible to openEO. In the same manner, a client library development guideline is being prepared momentarily to ensure a standardised implementation of the client APIs.

For using arbitrary code to process EO data with the openEO API, first User-Defined Functions (UDF) are currently implemented and added to openEO-compatible workflows. The UDFs are running in specific dockers at the EO data service providers.

openEO is published in its version [0.3.0](https://api.openeo.org/v/0.3.0/), providing a HTTP communication between the users and service providers specified by OpenAPI 3.0 JSON files. The JSON data entails process graphs, sent as a job to the back-ends, which can be executed in three different ways.

1. A batch job can be submitted, which stays inactive until processing is requested. It will run only once and stores its results after execution.
2. Secondary web services allow web-based access using different protocols such as OGC WMS, OGC WCS or XYZ tiles. The computation runs on demand to allow users to change e.g. the result's viewing extent or level of detail.
3. Lightweight process graphs (e.g. small previews) can be executed synchronously. More costly processes have to expect timeouts for long-polling HTTP requests.

The next steps for the consortium will entail the realisation of the newest openEO version at all back-ends and a definition of the targeted level of UDFs (e.g. simple NDVI calculation vs. machine learning algorithms). The process catalogues will be widened up, entailing at least all needed processes to implement the project's use cases via openEO. As an interested user please contact us, if you have any suggestions.

Finally, we plan to submit our first preliminary stable openEO version in May 2019.