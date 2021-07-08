# JavaScript Client

## Installation

The openEO JavaScript Client can be used in all modern browsers (excludes Internet Explorer) and all maintained Node.js versions (>= 10.x).
It can also been used for mobile app development with the [Ionic Framework](https://ionicframework.com/), for example.

The easiest way to try out the client is using one of the [examples](https://github.com/Open-EO/openeo-js-client/tree/v2.0.0/examples).
Alternatively, you can create an HTML file and include the client with the following HTML `script` tags:

```html
<script src="https://cdn.jsdelivr.net/npm/axios@0.21/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@openeo/js-client@2/openeo.min.js"></script>
```

This gives you a minified version for production environments. If you'd like a better development experience, use the following code:

```html
<script src="https://cdn.jsdelivr.net/npm/axios@0.21/dist/axios.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@openeo/js-client@2/openeo.js"></script>
```

If you are working on a Node.js application or you are using a Node.js-based build tool for web development (e.g. Webpack), you can install the client via [npm](https://npmjs.org/) by using the following command:

```shell script
npm install @openeo/js-client
```

Afterwards you can load the library. Depending on whether you are directly working in Node.js or are just using a Node.js build tool, the import can be different. Please inform yourself which import is suited for your project.

This is usually used directly in Node.js:
```js
const { OpenEO } = require('@openeo/js-client');
```

This may be used in build tools such as Webpack:
```js
import { OpenEO } from '@openeo/js-client';
```

Now that the installation was successfully finished, we can now connect to openEO compliant back-ends. 
In the following chapters we quickly walk through the main features of the JavaScript client. 

If you have trouble installing the client, feel free to [contact us](../../../contact.md) or leave an issue at the [GitHub project](https://github.com/Open-EO/openeo-js-client/issues).

## Exploring a back-end

If you do not know an openEO back-end that you want to connect to yet, you can have a look at the [openEO Hub](https://hub.openeo.org/), to find all known back-ends with information on their capabilities.

For this tutorial we will use the openEO instance of Google Earth Engine, which is available at `https://earthengine.openeo.org`.
Note that the code snippets in this guide works the same way for the other back-ends listed in the openEO Hub. Just the collection identifier and band names might differ.

First we need to establish a connection to the back-end.

```js
var con = await OpenEO.connect("https://earthengine.openeo.org");
```

::: tip Note
The JavaScript client uses [Promises (async/await)](https://medium.com/jspoint/javascript-promises-and-async-await-as-fast-as-possible-d7c8c8ff0abc). So there are two ways to express the code above:

Promises:
```js
OpenEO.connect("https://earthengine.openeo.org").then(function(con) {
  // Success
}).catch(function(error) {
  // Error
});
```

async/await:
```js
try {
  var con = await OpenEO.connect("https://earthengine.openeo.org");
  // Success
} catch (error) {
  // Error
}
```

To simplify the code here, we use async/await in all examples and don't catch errors. So we assume you run the code in an async function and also in a try/catch block.
:::

After establishing the connection to the back-end, it can be explored using the [Connection object](https://open-eo.github.io/openeo-js-client/2.0.0/Connection.html) returned. The basic service's metadata (capabilities) can be accessed via 
```js
var info = con.capabilities();
```

This allows to request a couple of [different information](https://open-eo.github.io/openeo-js-client/2.0.0/Capabilities.html), like API version, description, related links or the billing plans. You can print some of these information to the console as follows:

```js
console.log("API Version: ", info.apiVersion());
console.log("Description: ", info.description());

console.log("Billing plans:");
info.listPlans().forEach(plan => {
  console.log(`${plan.name}: ${plan.url}`);
});

console.log("Related links:");
info.links().forEach(link => {
  console.log(`${link.title}: ${link.href}`);
});
```

### Collections

Collections represent the basic data the back-end provides (e.g. Sentinel 2 collection).
Collections are used as input data for job executions ([more info on collections](../glossary.md#eo-data-collections)).
With the following code snippet you can print all 400+ available collection names and their summary.

```js
console.log("Available Collections:");
var response = await con.listCollections();
response.collections.forEach(collection => {
  console.log(`${collection.id}: ${collection.summary}`);
});
```

To get detailed information about a single collection, you can pass any of the collection IDs requested earlier to `describeCollection` and get a full object of [STAC compliant Collection metadata](https://github.com/radiantearth/stac-spec/tree/v0.9.0/collection-spec/collection-spec.md) back.
In this example we request information about the Sentinel-2 Level 1C data from Google:

```js
console.log(await con.describeCollection("COPERNICUS/S2"));
```

The collections descriptions returned by `listCollections` are usually not complete. To get the full set of metadata you should always use `describeCollection`.

### Processes

Processes in openEO are small tasks that can be applied on (EO) data.
The input of a process might be the output of another process, so that several connected processes form a new (user-defined) process itself.
Therefore, a process resembles the smallest unit of task descriptions in openEO ([more details on processes](../glossary.md#processes)).
With the following code snippet you can print all available process IDs and their summaries.

```js
console.log("Available Collections:");
var response = await con.listProcesses();
response.processes.forEach(process => {
  console.log(`${process.id}: ${process.summary}`);
});
```

In contrast to the collections, the process descriptions returned by `listProcesses` are complete.
There's no need to call `describeProcess` to get the full set of metadata.
`describeProcess` is just a convenience function to get a single process from `listProcesses`.
In this example we request the process specification for the `apply` process:

```js
console.log(await con.describeProcess("apply"));
```

For a graphical overview of the openEO processes, there is an [online documentation](../processes.md) for general process descriptions and the [openEO Hub](https://hub.openeo.org/) for back-end specific process descriptions. 

## Authentication 

In the code snippets above, authentication is usually not necessary, since we only fetch general information about the back-end.
To run your own jobs at the back-end or to access job results, you need to authenticate at the back-end.

Depending on the back-end, there might be two different approaches to authenticate. 
You need to inform yourself at your back-end provider of choice, which authentication approach you have to carry out. 
You can also have a look at the [openEO Hub](https://hub.openeo.org/) to see the available authentication types of the back-ends.
For Google Earth Engine, only [Basic Authentication](#basic-authentication) is supported at the moment.

### OpenID Connect Authentication

The OIDC ([OpenID Connect](https://openid.net/connect/)) authentication can be used to authenticate via an external service given a client ID.

::: tip Important
If you have included the library using HTML `script` tags, then you need to include the following OIDC client before the openEO client:

```html
<script src="https://cdn.jsdelivr.net/npm/oidc-client@1/lib/oidc-client.min.js"></script>
```

No further action is required, if you have installed the client via npm.
::: 

As OpenID Connect authentication is a bit more complex and depends on the environment your are using it in, please refer to the [JavaScript client documentation](https://open-eo.github.io/openeo-js-client/2.0.0/OidcProvider.html) for more information.


### Basic Authentication

The Basic authentication method is a common way of authenticate HTTP requests given username and password.

::: warning
The preferred authentication method is OpenID Connect due to better security mechanisms implemented in the OpenID Connect protocol.
If possible, use OpenID Connect instead of HTTP Basic authentication. 
::: 

The following code snippet shows how to log in via Basic authentication:

```js
await con.authenticateBasic("username", "password");
```

After successfully calling the `authenticateBasic` method, you are logged into the back-end with your account. 
This means, that every call that comes after that via the `con` variable is executed by your user account.


## Creating a (user-defined) process

Now that we know how to discover the back-end and how to authenticate, lets continue by creating a new batch job to process some data.
First we need to create a user-defined process and for that a process builder is the easiest method.

```js
var builder = await con.buildProcess();
```

With the builder, a data cube can be initialized by selecting a collection from the back-end with the process `load_collection`:

```js
var datacube = builder.load_collection(
  "COPERNICUS/S1_GRD",
  {west: 16.06, south: 48.06, east: 16.65, north: 48.35},
  ["2017-03-01", "2017-04-01"],
  ["VV", "VH"]
);
```

This results in a [datacube](../glossary.md#spatial-data-cubes) containing the "COPERNICUS/S1_GRD" data restricted to the given spatial extent, the given temporal extend and the given bands .

::: tip
You can also filter the datacube at a later stage by using the following filter methods:

```js
datacube = builder.filter_bbox(datacube, {west: 16.06, south: 48.06, east: 16.65, north: 48.35});
datacube = builder.filter_temporal(datacube, ["2017-03-01", "2017-04-01"]);
datacube = builder.filter_bands(datacube, ["VV", "VH"]);
```

Still, it is recommended to always use the filters in `load_collection` to avoid loading too much data upfront.
:::

Having the input data ready, we want to apply a process on the datacube, which returns a datacube with the process applied:

```js
var min = function(data) { return this.min(data); };
datacube = builder.reduce_dimension(datacube, min, "t");
```

The datacube is now reduced by the time dimension named `t`, by taking the maximum value of the timeseries values.
Now the datacube has no time dimension left.
Other so called "reducer" processes exist, e.g. for computing minimum and mean values.

::: tip Note
Everything applied to the datacube at this point is neither executed locally on your machine nor executed on the back-end.
It just defines the input data and process chain the back-end needs to apply, when sending and executing the datacube at the back-end.
How this can be done is the topic of the next chapter. 
:::

After applying all processes you want to execute, we need to tell the back-end to export the datacube, for example as GeoTiff:

```js
var result = builder.save_result(datacube, "GeoTiff");
```

## Batch Job Management

After you gave finished working on your (user-defined) process, we can now send it to the back-end and start the execution. 
In openEO, an execution of a (user-defined) process (here defined using the process builder) is called a [(batch) job](../glossary.md#data-processing-modes).
Therefore, we need to create a job at the back-end using our datacube, giving it the title `Example Title`.

```js
var job = await con.createJob(result, "Example Title");
```

The `createJob` method sends all necessary information to the back-end and creates a new job, which gets returned.
After this, the job is just created, but has not started the execution at the back-end yet.
It needs to be queued for processing explicitly:

```js
await job.startJob();
```

Now the execution of the job can be monitored by requesting the job status and the log files every once in a while (30 seconds in this example):

```js
let stopFn = job.monitorJob((job, logs) => {
  console.log(job.status);
  logs.forEach(log => console.log(`${log.level}: ${log.message}`));
}, 30);
```

The monitoring stops automatically once the job has finished, was canceled or errored out.
But with the return value of the `monitorJob` function, you can also stop monitoring the job manually:
```js
stopFn();
```

When the job is finished, calling `listResults` gets you the URLs to the results.

```js
var urls = await job.listResults();
```

::: tip
This only works if the job execution has finished.
We recommend to use `listResults` in combination with `monitorJob`, for example as follows:

```js
let stopFn = job.monitorJob(async (job, logs) => {
  if (job.status === "finished") {
    var urls = await job.listResults();
    urls.forEach(url => console.log(`Download result from: ${url}`));
  }
});
```
:::

::: tip Note
There's also the method `downloadResults` to download the results directly.
Unfortunately, you can only download files from a Node.js environment where file access to your local drive is possible. 
In a Browser environment, it is also an option to download the STAC Item for the results using the `getResultsAsItem` method and point a STAC client to it for downloading.
:::

Now you know the general workflow of job executions.

## Full Example

In this chapter we will show a full example of an earth observation use case using the JavaScript client in a Node.js environment and the Google Earth Engine back-end.
Instead of batch job processing, we compute the image synchronously. Synchronous processing means the result is directly returned in the response, which usually works only for smaller amounts of data.

::: tip Use Case
We want to produce a monthly RGB composite of Sentinel 1 backscatter data over the area of Vienna, Austria for three 
months in 2017. This can be used for classification and crop monitoring.
:::

In the following code example, we use inline code comments to describe what we are doing.

::: warning
The username and password in the example above work at the time of writing, but may be invalid at the time you read this. Please [contact us](../../../contact.md) for credentials.
:::

```js
// Make the client available to the Node.js script
// Also include the Formula library for simple math expressions
const { OpenEO, Formula } = require('@openeo/js-client');

async function example() {
  // Connect to the back-end
  var con = await OpenEO.connect("https://earthengine.openeo.org");
  // Authenticate ourselves via Basic authentication
  await con.authenticateBasic("group11", "test123");
  // Create a process builder
  var builder = await con.buildProcess();
  // We are now loading the Sentinel-1 data over the Area of Interest
  var datacube = builder.load_collection(
    "COPERNICUS/S1_GRD",
    {west: 16.06, south: 48.06, east: 16.65, north: 48.35},
    ["2017-03-01", "2017-06-01"],
    ["VV"]
  );

  // Since we are creating a monthly RGB composite, we need three separated time ranges (March aas R, April as G and May as G).
  // Therefore, we split the datacube into three datacubes using a temporal filter.
  var march = builder.filter_temporal(datacube, ["2017-03-01", "2017-04-01"]);
  var april = builder.filter_temporal(datacube, ["2017-04-01", "2017-05-01"]);
  var may = builder.filter_temporal(datacube, ["2017-05-01", "2017-06-01"]);

  // We aggregate the timeseries values into a single image by reducing the time dimension using a mean reducer.
  var mean = function(data) {
    return this.mean(data);
  };
  march = builder.reduce_dimension(march, mean, "t");
  april = builder.reduce_dimension(april, mean, "t");
  may = builder.reduce_dimension(may, mean, "t");

  // Now the three images will be combined into the temporal composite.
  // We rename the bands to R, G and B as otherwise the bands are overlapping and the merge process would fail.
  march = builder.rename_labels(march, "bands", ["R"], ["VV"]);
  april = builder.rename_labels(april, "bands", ["G"], ["VV"]);
  may = builder.rename_labels(may, "bands", ["B"], ["VV"]);

  datacube = builder.merge_cubes(march, april);
  datacube = builder.merge_cubes(datacube, may);

  // To make the values match the RGB values from 0 to 255 in a PNG file, we need to scale them.
  // We can simplify expressing math formulas using the openEO Formula parser.
  datacube = builder.apply(datacube, new Formula("linear_scale_range(x, -20, -5, 0, 255)"));

  // Finally, save the result as PNG file.
  // In the options we specify which band should be used for "red", "green" and "blue" color.
  datacube = builder.save_result(datacube, "PNG", {
    red: "R",
    green: "G",
    blue: "B"
  });

  // Now send the processing instructions to the back-end for (synchronous) execution and save the file as result.png
  await con.downloadResult(datacube, "result.png");
}

// Run the example, write errors to the console.
example().catch(error => console.error(error));
```

Now the resulting PNG file of the RGB backscatter composite is stored as `result.png` in the node.JS working directory and should look as follows:

![RGB composite](../getting-started-result-example.jpg "RGB composite")

## User Defined Functions

If your use case can not be accomplished with the [default processes](../processes.md) of openEO, you can define a [user defined function](../glossary.md#user-defined-function-udf).
Unfortunately, you can only create Python and R functions at the moment.
Therefore, this guide doesn't get into detail.
For more information check out the Python or R tutorials on UDFs.

## Additional Information

* [Examples](https://github.com/Open-EO/openeo-js-client/tree/v2.0.0/examples)
* [Documentation](https://open-eo.github.io/openeo-js-client/2.0.0/)
* [Repository](https://github.com/Open-EO/openeo-js-client)