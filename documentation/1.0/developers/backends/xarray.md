# Getting started with openEO and Xarray and Dask

As a back-end provider who wants to provide its datasets, processes and infrastructure to a broader audience through a
standardized interface you may want to implement a driver for openEO.

First of all, you should read carefully the [getting started guide for service providers](./getting-started.md).

::: tip Note
The Xarray-Dask implementation for openEO is not a full-fledged out-of-the-box openEO back-end,
but can be part of the infrastructure for the data management and processing part.
In detail it can be used as data source for [EO Data Discovery](../api/reference.md#tag/EO-Data-Discovery) and e.g.
in combination with a Dask cluster as processing back-end for [Data Processing](../api/reference.md#tag/Data-Processing).
In any case, a [HTTP REST interface must be available in front of process implementations to properly answer openEO requests](#http-rest-interface).
:::

There are two main components involved with openEO and Xarray:
1. [Process Graph Parser for Python](#process-graph-parser-for-python)
2. [Python Processes for openEO](#python-processes-for-openeo)

## Process Graph Parser for Python

* Repository: [openeo-pg-parser-networkx](https://github.com/Open-EO/openeo-pg-parser-networkx)

This pg-parser parses OpenEO process graphs from raw JSON into fully traversible networkx graph objects. 

The `ProcessRegistry` can be imported from the pg-parser and includes `Process` objects, that include a 
* spec: Process definition (e.g. https://github.com/Open-EO/openeo-processes)
* implementation: Callable process implementation (https://github.com/Open-EO/openeo-processes-dask/tree/main/openeo_processes_dask/process_implementations)
* namespace

The `ProcessRegistry` automatically maps from the name of a process to the `spec` and to the `implementation`.
Every `Process` in the `ProcessRegistry` requires a `spec`, while `implementation` and `namespace` are optional.

An example on how to use the pg-parser can be found [here](https://github.com/Open-EO/openeo-pg-parser-networkx/blob/main/examples/01_minibackend_demo.ipynb).

## Python Processes for openEO

* Repository: [openeo-processes-dask](https://github.com/Open-EO/openeo-processes-dask)

This package includes the implementations of openEO processes, using Xarray and Dask. Currently, the `load_collection` and `save_result` process are not included as these implementations can differ widely for different backends. 

The `specs` can be found in the `openeo-processes-dask` as a submodule. That way, the specification and the implementation are stored close to each other. 

## The load_collection and save_result process

As mentioned before, the `load_collection` and `save_result` processes are back-end-specific and therefore not included in [openeo-processes-dask](https://github.com/Open-EO/openeo-processes-dask). The [load_collection](https://processes.openeo.org/#load_collection) process should return a `raster-cube` object - to be compliant with the `openeo-processes-dask` implementations, this should be realized by a `xarray.DataArray` loaded with `dask`. 

### Connection to ODC and STAC

For testing purposes with `DataArrays` - which can be loaded from one file - the `xarray.open_dataarray()` function can be used to implement a basic version of `load_collection`. 

Large data sets can be organised as `opendatacube Products` or as `STAC Collections`.

* `opendatacube Products`: The implementation of `load_collection` can include the `opendatacube` function `datacube.Datacube.load()`. It is recommended to use the `dask_chunks` parameter, when loading the data. The function returns a `xarray DataSet`, in order to be compliant with `openeo-processes-dask`, it can be converted to a `DataArray` using the `Dataset.to_array(dim='bands')` function. A sample `load_collection` process using OpenDatacube [can be found here](https://github.com/Open-EO/openeo_odc_driver/blob/c197387c10f8fef7d5573270a35961a278a18e1d/openeo_odc_driver/processing.py#L38).

* `STAC Collections`: Alternatively, the `load_collection` process can be implemented using the `odc.stac.load()` function. To make use of `dask`, the `chunks` parameter must be set. Just as in the previous case, the resulting `xarray DataSet` can be converted to a `DataArray` with `Dataset.to_array(dim='bands')`. A similar implementation is the one of the `load_stac` process [available here](https://github.com/Open-EO/openeo-processes-dask/blob/9267e4ccffbbbf755cb7b8a43ba80d9483398314/openeo_processes_dask/process_implementations/cubes/load.py#L83).

## openEO Client Side Processing

The client-side processing functionality allows to test and use openEO with its processes locally, i.e. without any connection to an openEO back-end.
It relies on the projects [openeo-pg-parser-networkx](https://github.com/Open-EO/openeo-pg-parser-networkx), which provides an openEO process graph parsing tool, and [openeo-processes-dask](https://github.com/Open-EO/openeo-processes-dask), which provides an Xarray and Dask implementation of most openEO processes.

You can find more information and usage examples in the openEO Python client documentation [available here](https://open-eo.github.io/openeo-python-client/cookbook/localprocessing.html).

## Adding a new process

To add a new process, there are changes required in the [openeo-processes-dask](https://github.com/Open-EO/openeo-processes-dask). 

1. Add the process spec
2. Add the process implementation

The HTTP rest interface should have a `processes` endpoint that reflects the process specs from `openeo-processes-dask`.

### Add the process spec

Currently, [openeo-processes-dask](https://github.com/Open-EO/openeo-processes-dask) includes the process definitions as a `submodule` in the `openeo-processes-dask/specs`. The submodule can be found under https://github.com/eodcgmbh/openeo-processes, which is a fork from https://github.com/Open-EO/openeo-processes to reflect which processes (with their implementations) are actually available in `openeo-processes-dask`.

### Add the process implementation

1. Select a process from [processes.openeo.org](https://processes.openeo.org/) which does not yet have an
   implementation in [openeo-processes-dask](https://github.com/Open-EO/openeo-processes-dask). 
2. Clone [openeo-processes-dask](https://github.com/Open-EO/openeo-processes-dask), checkout a new branch, and start implementing the missing process. Make sure you properly handle all parameters defined for this process. Add a test for your process in `openeo-processes-dask/tests` ideally using dask. The `create_fake_rastercube` from the `openeo-processes-dask/tests/mockdata` can be used for testing, with the `backend` parameter set to `numpy` or `dask`.
3. Push your code and open a PR.

## HTTP REST Interface

The next step would be to set up a HTTP REST interface (i.e. an implementation of the openEO HTTP API) for the new openEO environment.
It must be available in front of the process implementations to properly answer openEO client requests.
Currently, the [EODC](https://openeo.eodc.eu/v1.0) and [Eurac Research](https://openeo.eurac.edu/) back-ends use Xarray and Dask and thus
are the first implementations of back-ends to look at.

- EODC is using a Python implementation, the [openeo-fastapi](https://github.com/eodcgmbh/openeo-fastapi).
- Eurac Research relies on a Java based implementation, the [openeo-spring-driver](https://github.com/Open-EO/openeo-spring-driver)

If you have any questions, please [contact us](../../../../contact.md).
