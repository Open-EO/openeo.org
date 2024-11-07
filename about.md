# About

Earth Observation data are becoming too large to be downloaded locally for analysis. Also, the way they are organised (as tiles,
or _granules_: files containing the imagery for a small part of the Earth and a single observation date) makes it unnecessary
complicated to analyse them. The solution to this is to store these data in the cloud, on compute back-ends, process them there, and
browse the results or download resulting figures or numbers. But how do we do that?

openEO develops an open application programming interface (API) that connects clients like R, Python and JavaScript to big Earth observation cloud back-ends in a simple and unified way. 

With such an API, 
* each client can work with every back-end, and
* it becomes possible to compare back-ends in terms of capacity, cost, and results (validation, reproducibility)

## openEO?

The acronym openEO contracts two concepts:

- **open**: used here in the context of open source software; open source software is available in source code form, and can be freely modified and redistributed; the openEO project will create open source software, reusable under a liberal open source license (Apache 2.0)
- **EO**: Earth observation

Jointly, the openEO targets the processing and analysis of Earth observation data. The main objectives of the project are the following concepts:

- **Simplicity**: nowadays, many end-users use Python or R to analyse data and JavaScript to develop web applications; analysing large amounts of EO imagery should be equally simple, and seamlessly integrate with existing workflows
- **Unification**: current EO cloud back-ends all have [a different API](https://www.r-spatial.org/2016/11/29/openeo.html), making EO data analysis hard to validate and reproduce and back-ends difficult to compare in terms of capability and costs, or to combine them in a joint analysis across back-ends. A unified API can resolve many of these problems.

The following pages introduce the core concepts of the project. Make sure to introduce yourself to the major technical terms used in the openEO project by reading the <a :href="$site.themeConfig.docPath + 'glossary.html'">glossary</a>.

## Why an API?

An API is an application programming interface. It _defines_ a _language_ that two computers (a client and a server) use to communicate.

The following figure shows how many interfaces are needed to be able to compare back-ends from different clients, without an openEO API:

![Structure before openEO](/images/api.png)

With an openEO API (dark blue), the situation becomes much easier:

![Structure with openEO](/images/api2.png)

However, existing back-ends need to be taught to work with the new API, and clients that interact with back-ends need to be developed.

The task of the openEO project is to design, develop, and evaluate an API for cloud-based Earth Observation data processing.

## More information

* The [project proposal](https://zenodo.org/record/1065474)
* A jointly written [blog entry that motivated the openEO proposal](http://r-spatial.org/2016/11/29/openeo.html)
* openEO publications indexed by [OpenAIRE](https://explore.openaire.eu/search/advanced/research-outcomes?f0=relprojectid&fv0=corda__h2020%253A%253A40125fb230a91b0fb0b156b12cd90682) and [ResearchGate](https://www.researchgate.net/search.Search.html?type=project&query=openeo)
