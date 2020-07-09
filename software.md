# Software

All developed software is organized within the [openEO GitHub organization](https://github.com/open-eo/).

## Clients

Software that allows remote sensers and other users to access the openEO back-ends:

| Client software    | Package Manager / Hosted Version                             | GitHub                                                       |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| JavaScript library | npm: [@openeo/js-client](https://www.npmjs.com/package/@openeo/js-client) | [openeo-js-client](https://github.com/Open-EO/openeo-js-client) |
| Python library     | PyPI: [openeo](https://pypi.org/project/openeo/)             | [openeo-python-client](https://github.com/Open-EO/openeo-python-client) |
| QGIS plugin        | QGIS plugin repository: [openeo-qgis-plugin-master](https://plugins.qgis.org/plugins/openeo-qgis-plugin-master/) | [openeo-qgis-plugin](https://github.com/Open-EO/openeo-qgis-plugin) |
| R library          | CRAN: Not available yet                                      | [openeo-r-client](https://github.com/Open-EO/openeo-r-client) |
| Web Editor         | [Hosted Version](https://editor.openeo.org)                  | [openeo-web-editor](https://github.com/Open-EO/openeo-web-editor) |

See the <a :href="$site.themeConfig.docPath + 'getting-started.html'">**getting started guide for users**</a> for more information.
Users considering to implement a new client library should read the <a :href="$site.themeConfig.docPath + 'developers/clients/getting-started.html'">**getting started guide for client developers**</a>.

## Back-ends

Data and infrastructure providers can host their own instance of the openEO API:

* [GeoPySpark (Geotrellis)](https://github.com/Open-EO/openeo-geopyspark-driver) (by VITO) - has [integration tests](https://github.com/Open-EO/openeo-geopyspark-integrationtests), requires [GeoTrellis extensions](https://github.com/Open-EO/openeo-geotrellis-extensions).
* [Google Earth Engine](https://github.com/Open-EO/openeo-earthengine-driver) (by WWU)
* [GRASS GIS](https://github.com/Open-EO/openeo-grassgis-driver) (by mundialis)
* [JEODPP](https://github.com/Open-EO/openeo-jeodpp-driver) (by JRC)
* [OpenDataCube](https://github.com/SARScripts/openeo_odc_driver) (by EURAC, funded by ESA)
* [RedHat OpenShift Origin](https://github.com/Open-EO/openeo-openshift-driver) (by EODC)
* [Sentinel Hub](https://github.com/Open-EO/openeo-sentinelhub-python-driver) (by Sinergise)
* [WCPS (rasdaman)](https://github.com/Open-EO/openeo-wcps-driver) (by EURAC)
* [R back-end](https://github.com/Open-EO/openeo-r-backend) (by WWU) - discontinued until further notice (last version: 0.3)

See the **[getting started guide for back-end providers](https://open-eo.github.io/openeo-api/gettingstarted-backends/)** for more information.

To start developing a new back-end driver, you may start with any of the common functionalities implemented in several programming languages:

* [Python API Commons](https://github.com/Open-EO/openeo-python-driver)
* [Python Process Graph Parser](https://github.com/Open-EO/openeo-pg-parser-python)
* [JavaScript Process Graph Parser](https://github.com/Open-EO/openeo-js-commons)

Our approach to tackle language-agnostic user-defined functions can be found in the following repositories:

* [UDF Python reference implementation](https://github.com/Open-EO/openeo-udf)
* [UDF R reference implementation](https://github.com/Open-EO/openeo-r-udf)

## Specification

The API specification is available in the **[openEO API repository](https://github.com/Open-EO/openeo-api)**.
The process definitions are available in the **[openEO processes repository](https://github.com/Open-EO/openeo-processes)**.

## Ecosystem

* [Back-end validator](https://github.com/Open-EO/openeo-backend-validator) - Validation for back-end implementations. [Image-based validation of EO processing results](https://github.com/Open-EO/openeo-result-validation-engine) is also worked on.
* [openEO Hub](https://hub.openeo.org) ([GitHub](https://github.com/Open-EO/openeo-hub)) - The central platform for openEO services.
* [Processes DocGen](https://github.com/Open-EO/openeo-processes-docgen) - A tool to generate a visual interface for openEO process definitions.
* [Vue.js Components](https://github.com/Open-EO/openeo-vue-components) - Common Vue.js 2 components for openEO
* [JavaScript Commons](https://github.com/Open-EO/openeo-js-commons) - Common JavaScript functionality for openEO clients and back-ends
