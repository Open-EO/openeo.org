---
layout: page
title: Software
permalink: /software/
order: 2
---

All developed software is organized under the openEO [github organisation](https://github.com/open-eo/).

The API specification and project documentation is available in the **[openEO API repository](https://github.com/Open-EO/openeo-api)**.

## Clients

Software that allows remote sensers and other users to access the openEO back-ends:

* [JavaScript library](https://github.com/Open-EO/openeo-js-client)
* [Python library](https://github.com/Open-EO/openeo-python-client)
* [R library](https://github.com/Open-EO/openeo-r-client)
* [Web Editor](https://github.com/Open-EO/openeo-web-editor) - has a [demo](https://open-eo.github.io/openeo-web-editor/demo/).

See the **[getting started guide for users](https://open-eo.github.io/openeo-api/gettingstarted-users/)** for more information.
Users considering to implement a new client library should read the **[getting started guide for client developers](https://open-eo.github.io/openeo-api/gettingstarted-users/)**.

## Back-ends

Data and infrastructure providers can host their own instance of the openEO API:

* [GeoPySpark (Geotrellis)](https://github.com/Open-EO/openeo-geopyspark-driver) (by VITO) - has [integration tests](https://github.com/Open-EO/openeo-geopyspark-integrationtests).
* [Google Earth Engine](https://github.com/Open-EO/openeo-earthengine-driver) (by WWU)
* [GRASS GIS](https://github.com/Open-EO/openeo-grassgis-driver) (by mundialis)
* [JEODPP](https://github.com/Open-EO/openeo-jeodpp-driver) (by JRC)
* [R back-end](https://github.com/Open-EO/openeo-r-backend) (by WWU)
* [RedHat OpenShift Origin](https://github.com/Open-EO/openeo-openshift-driver) (by EODC)
* [Sentinel Hub](https://github.com/Open-EO/openeo-sentinelhub-driver) (by Sinergise)
* [WCPS (rasdaman)](https://github.com/Open-EO/openeo-wcps-driver) (by EURAC)

See the **[getting started guide for back-end providers](https://open-eo.github.io/openeo-api/gettingstarted-backends/)** for more information.

To start developing a new back-end driver, you may start with any of the common functionalities implemented in several programming langauges:

* [NodeJS Commons](https://github.com/Open-EO/openeo-nodejs-commons)
* [Python Commons](https://github.com/Open-EO/openeo-python-driver)

Our approach to tackle language-agnostic user-defined functions can be found in the **[UDF repository](https://github.com/Open-EO/openeo-udf)**.

## Ecosystem

* [Back-end validator](https://github.com/Open-EO/openeo-backend-validator) - Validation for back-end implementations (planned).
* [openEO Hub](https://github.com/Open-EO/openeo-hub) - The central platform for openEO services (planned).
* [Processes DocGen](https://github.com/Open-EO/openeo-processes-docgen) - A tool to generate a visual interface for openEO process definitions.
