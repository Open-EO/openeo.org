# Getting started with openEO and OpenDataCube

As a back-end provider who wants to provide its datasets, processes and infrastructure to a broader audience through a standardized interface you may want to implement a driver for openEO.

First of all, you should read carefully the [getting started guide for service providers](./getting-started.md).

Please note: OpenDataCube is not an openEO back-end, but can be part of the infrastructure for the data management part.

Currently the EODC back-end uses ODC....

There are three main repositories involved with ODC:
1. The [Process Graph Parser for Python](https://github.com/openeo-pg-parser-python)
2. The openEO process mapper [openeo-odc](https://github.com/openeo-odc)
3. The openEO processes implemented with xarray [openeo-processes-python](https://github.com/openeo-processes-python)

## openEO Process Graph Parser

The process graphh parser translates...
Insert example of json process graph here

## openEO ODC Process Mapper

Describe what it is doing here

## openEO Processes Python

....
Add list of current processes available using xarray/dask.

## How to add a new process which can be used with ODC/Xarray/Dask?

Link to openeo processes defintion
Sample of implemented process taking care of the openEO parameters.
Common mistakes: not reinstalling the repo after modifying the code and so on

## How to test if everything works?
You need an instance of ODC running. The collection name used in openEO is the product name in ODC.
....