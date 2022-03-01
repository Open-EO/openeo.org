# Glossary

This glossary introduces the major technical terms used in the openEO project.

## General terms

- **EO**: Earth observation
- **API**: application programming interface ([wikipedia](https://en.wikipedia.org/wiki/Application_programming_interface)); a communication protocol between client and back-end
- **client**: software tool or environment that end-users directly interact with, e.g. R (RStudio), Python (Jupyter notebook), and JavaScript (web browser); R and Python are two major data science platforms; JavaScript is a major language for web development
- **(cloud) back-end**: server; computer infrastructure (one or more physical computers or virtual machines) used for storing EO data and processing it
- **big Earth observation cloud back-end**: server infrastructure where industry and researchers analyse large amounts of EO data

## Processes

A **process** is an operation that performs a specific task on a set of parameters and returns a result. An example is computing a statistical operation, such as mean or median, on selected EO data. A process is similar to a function or method in programming languages.

A **pre-defined process** is a process provided by the *back-end*, often one of the [ones centrally defined by openEO](processes.md).

A **user-defined process** is a process defined by the *user*. It can directly be part of another process graph or be stored as custom process on a back-end. Internally it is a *process graph* with optional additional metadata.

A **process graph** chains specific process calls from the set of pre-defined and user-defined processes together. A process graph itself is a (user-defined) process again. Similarly to scripts in the context of programming, process graphs organize and automate the execution of one or more processes that could alternatively be executed individually. In a process graph, processes need to be specific, i.e. concrete values for input parameters need to be specified. These arguments can again be process graphs, scalar values, arrays or objects.

## EO data (Collections)

In our domain, different terms are used to describe EO data(sets). Within openEO, a **granule** (sometimes also called *item* or *asset* in the specification) typically refers to a limited area and a single overpass leading to a very short observation period (seconds) or a temporal aggregation of such data (e.g. for 16-day MODIS composites). A **collection** is a sequence of granules sharing the same product specification. It typically corresponds to the series of products derived from data acquired by a sensor on board a satellite and having the same mode of operation.

The [CEOS OpenSearch Best Practice Document v1.2](http://ceos.org/ourwork/workinggroups/wgiss/access/opensearch/) lists the following synonyms used by other organizations:

- **granule**: dataset (ESA, ISO 19115), granule (NASA), product (ESA, CNES), scene (JAXA)
- **collection**: dataset series (ESA, ISO 19115), collection (CNES, NASA), dataset (JAXA), product (JAXA)

In openEO, a back-end offers a set of collections to be processed. All collections can be requested using a client and are described using the [STAC (SpatioTemporal Asset Catalog) metadata specification](https://github.com/radiantearth/stac-spec) as STAC collections. A user can load (a subset of) a collection using a special process, which returns a (spatial) datacube. All further processing is then applied to the datacube on the back-end.

## Spatial datacubes

A spatiotemporal datacube is a multidimensional array with one or more spatial or temporal dimensions. In the EO domain, it is common to be implicit about the temporal dimension and just refer to them as spatial datacubes in short. Special cases are raster and vector datacubes. Learn more about datacubes in the [datacube documentation](https://openeo.org/documentation/1.0/datacubes.html).

## Vector data

In general, **vector data** represent specific things (also called "features") in a space, e.g. on the surface of the Earth.

A **coordinate** represents a specific point in space.

A **feature** is usually a geometry and it may have additional properties assigned, e.g. a name, a color or a temperature (at a certain time).

**Geometries** consist of one or more coordinates that may be connected and then form a specific type of geometry, e.g. two points can be connected to a straight line and four straight lines can be connected to rectangle.

Commonly used types of geometries are:
- Points
- Lines / LineStrings
- Polygons (e.g., a Triangle or Rectangle)

Multiple geometries of the same type can be combined to a group of geometries, e.g. to a so called "Multi Point" or a "Multi Polygon".

Features and geometries are specified by the OGC in the [Simple Feature Access specification](https://www.ogc.org/standards/sfa) (and ISO 19125). See the specification for more details.

## User-defined function (UDF)

The abbreviation **UDF** stands for **user-defined function**. With this concept, users are able to upload custom code and have it executed e.g. for every pixel of a scene, or applied to a particular dimension or set of dimensions, allowing custom server-side calculations. See the section on [UDFs](./udfs.md) for more information.

## Data Processing modes

Processes can run in three different ways:

1. Results can be pre-computed by creating a ***batch job***.  They are submitted to the back-end's processing system, but will remain inactive until explicitly put into the processing queue. They will run only once and store results after execution. Results can be downloaded. Batch jobs are typically time consuming and user interaction is not possible although log files are generated for them. This is the only mode that allows to get an estimate about time, volume and costs beforehand.
2. A more dynamic way of processing and accessing data is to create a **secondary web service**. They allow web-based access using different protocols such as [OGC WMS](http://www.opengeospatial.org/standards/wms) (Open Geospatial Consortium Web Map Service), [OGC WCS](http://www.opengeospatial.org/standards/wcs) (Web Coverage Service) or [XYZ tiles](https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames). These protocols usually allow users to change the viewing extent or level of detail (zoom level). Therefore, computations often run *on demand* so that the requested data is calculated during the request. Back-ends should make sure to cache processed data to avoid additional/high costs and reduce waiting times for the user.
3. Processes can also be executed **on-demand** (i.e. synchronously). Results are delivered with the request itself and no job is created. Only lightweight computations, for example previews, should be executed using this approach as timeouts are to be expected for [long-polling HTTP requests](https://www.pubnub.com/blog/2014-12-01-http-long-polling/).
