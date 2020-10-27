# Introduction

The openEO API defines a [HTTP API](./api/reference.md) that lets cloud back-ends with large Earth observation datasets communicate with front end analysis applications in an interoperable way.

As an overview, the openEO API specifies how to

- discover which Earth observation data and processes are available at cloud back-ends,
- execute (chained) processes on back-ends, 
- run [user-defined functions](../udfs.md) (UDFs) on back-ends where UDFs can be exposed to the data in different ways, 
- download (intermediate) results, and
- manage user content including billing.


The API is defined as an [OpenAPI 3.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md) YAML file.

## Additional information

* [Code of Conduct](/documentation/code-of-conduct.md)
* [Software Development Guidelines](/documentation/software-guidelines.md)