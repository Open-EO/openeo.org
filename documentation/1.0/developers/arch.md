# Architecture

The openEO API defines a language how clients communicate to back-ends in order to analyze large Earth observation datasets. The API will be implemented by drivers for specific back-ends. Some first architecture considerations are listed below.

1. The openEO API is a contract between clients and back-ends that describes the communication only
2. Each back-end runs its own API instance including the specific back-end driver. There is no API instance that runs more than one driver.
3. Clients in R, Python, and JavaScript connect directly to the back-ends and communicate with the back-ends over *HTTPS* according to the openEO API specification.
4. API instances can run on back-end servers or additional intermediate layers, which then communicate to back-ends in a back-end specific way.
5. Back-ends may add functionality and extend the API wherever there is need.
6. There will be a central back-end registry service (openEO Hub), to allow users to search for back-ends with specific functionality and or data. 
7. The openEO API may define *profiles* in order to group specific functionality.

![Architecture - openEO API shown in dark blue](./arch.png)

# Microservices

To simplify and structure the development, the API is divided into a few microservices.

| Microservice           | Description |
| ---------------------- | ----------- |
| Capabilities           | This microservice reports on the capabilities of the back-end, i.e. which API endpoints are implemented, which authentication methods are supported, and whether and how UDFs can be executed at the back-end. |
| EO Data Discovery      | Describes which collections are available at the back-end. |
| Process Discovery      | Provides services to find out which processes a back-end provides, i.e., what users can do with the available data. |
| Data Processing        | Organizes and manages data processing on the back-end, either as synchronous on-demand computation or batch jobs. |
| File Storage           | Organizes and manages user-uploaded files. |
| User-Defined Processes | Organizes and manages user-defined processes (process graphs). |
| Secondary Services     | External web services to access data and job results such as a OGC WMTS service. |
| Account Management     | User management, accounting and authentication. |
| UDF Runtime            | Execution of user-defined functions, not part of the Core API. See the [UDF documentation](../udf.md) for more information. |
