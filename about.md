---
layout: page
title: About
permalink: /about/
order: 1
---

## Introduction

Earth Observation data are becoming too large to be downloaded locally for analysis. Also, the way they are organised (as tiles,
or _granules_: files containing the imagery for a small part of the Earth and a single observation date) makes it unnecessary
complicated to analyse them. The solution to this is to store these data in the cloud, on compute back-ends, process them there, and
browse the results or download resulting figures or numbers. But how do we do that?

The aim of openEO is to develop an open API to connect R, python, javascript and other clients to big Earth observation cloud back-ends in a simple and unified way.

With such an API, 
* each client can work with every back-end, and
* it becomes possible to compare back-ends in terms of capacity, cost, and results (validation, reproducibility)

## Why an API?

An API is an application programming interface. It _defines_ a _language_ that two computers (a client and a server) use to communicate.

The following figure shows how many interfaces are needed to be able to compare back-ends from different clients, without an openEO API:

<img src="/images/api.png" alt="api" style="width: 500px;"/>

With an openEO API (dark blue), the situation becomes much easier:

<img src="/images/api2.png" alt="api" style="width: 500px;"/>

However, existing back-ends need to be taught to work with the new API, and clients that interact with back-ends need to be developed.

The task of the openEO project is to design, develop, and evaluate an API for cloud-based Earth Observation data processing.

## Funding

*openEO - A Common, Open Source Interface between Earth
Observation Data Infrastructures and Front-End Applications*
is an H2020 project funded under call [EO-2-2017: EO Big Data
Shift](https://ec.europa.eu/research/participants/portal/desktop/en/opportunities/h2020/topics/eo-2-2017.html),
under grant number 776242. The project runs from Oct 2017 to
Sept 2020.

### Proposal abstract

The capabilities of the latest generation of Earth observation
satellites to collect large volumes of diverse and thematically
rich data are unprecedented. For exploiting these valuable data
sets, many research and industry groups have started to shift their
processing into the cloud. Although the functionalities of existing
cloud computing solutions largely overlap, they are all custom-made
and tailored to the specific data infrastructures. This lack of
standards not only makes it hard for end users and application
developers to develop generic front-ends, but also to compare the
cloud offerings by running the same analysis against different
cloud back-ends. To solve this, a common interface that allows end-
and intermediate users to query cloud-based back offices and carry
out computations on them in a simple way is needed. The openEO
project will design such an interface, implement it as an open
source community project, bind it to generic analytics front-ends
and evaluate it against a set of relevant Earth observation cloud
back offices. The openEO interface will consist of three layers of
Application Programming Interfaces, namely a core API for finding,
accessing, and processing large datasets, a driver APIs to connect
to back offices operated by European and worldwide industry,
and client APIs for analysing these datasets using R, Python and
JavaScript. To demonstrate the capability of the openEO interface,
four use cases based chiefly on Sentinel-1 and Sentinel-2 time series
will be implemented. openEO will simplify the use of cloud-based
processing engines, allow switching between cloud-based back office
providers and comparing them, and enable reproducible, open Earth
observation science. Thereby, openEO reduces the entry barriers
for the adaptation of cloud computing technologies by a broad user
community and paves the way for the federation of infrastructure
capabilities.

### Funding and disclaimer

This project has received funding from the European Union's Horizon
2020 research and innovation programme under grant agreement No 776242.
The contents of this website reflects only the authors' view; the
European Commission is not responsible for any use that may be made
of the information it provides.

## Partners

1. [Technische Universitaet Wien](https://www.tuwien.ac.at) (Coordinator)\*, AT
1. [Westfaelische Wilhelms-Universitaet Muenster](https://www.uni-muenster.de/Geoinformatics/)\*, DE
1. [Wageningen University](
https://www.wur.nl/en/expertise-services/Chair-groups/Environmental-Sciences/Laboratory-of-Geoinformation-Science-and-Remote-Sensing.htm)\*, NL
1. [Vlaamse Instelling Voor Technologisch Onderzoek N.V.](https://remotesensing.vito.be/)\*, BE
1. [Earth Observation Data Centre for Water Resources Monitoring GmbH](https://www.eodc.eu/)\*, AT
1. [Mundialis GmbH and Co. KG](https://www.mundialis.de/)\*, DE
1. [Sinergise Laboratorij Za Geografske Informacijske Sisteme Doo](
http://www.sinergise.com/en/)\*, SI
1. [Accademia Europea di Bolzano (EURAC Research)](http://www.eurac.edu/en/research/mountains/remsen/Pages/default.aspx)\*, IT
1. [Solenix Schweiz GmbH](https://www.solenix.ch/)\*, CH
1. [Joint Research Centre of the European Commission](
https://ec.europa.eu/jrc/en)\*, IT
1. [Google Earth Engine, US/CH](https://earthengine.google.com/)

(\* : consortium member receiving H2020 funding)

## More information

* The [project proposal](https://zenodo.org/record/1065474)
* A jointly written [blog entry that motivated the openEO proposal](http://r-spatial.org/2016/11/29/openeo.html)
* openEO publications indexed by [OpenAIRE](https://www.openaire.eu/search/project?projectId=corda__h2020::40125fb230a91b0fb0b156b12cd90682) and [ResearchGate](https://www.researchgate.net/search.Search.html?type=project&query=openeo)