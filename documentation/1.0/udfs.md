# User-defined functions

The abbreviation **UDF** stands for **user-defined function**. With this concept, users are able to upload custom code and have it executed e.g. for every pixel of a scene, allowing custom calculations on server-side data that are not (easily) covered with [pre-defined processes](processes.md) or user-defined processes. While openEO UDFs are in principle language-agnostic, we currently implement UDFs for Python and R.

## Users

You can run UDFs with any client (including JavaScript and Web Editor), but the code you can execute on the server will be limited to Python and R.
All openEO clients allow to run UDFs via the pre-defined process [`run_udf`](processes.md#run_udf) if the back-end implements UDFs. You can check the [openEO Hub](https://hub.openeo.org) for back-ends that support user-defined functions. There's also [`run_udf_externally`](processes.md#run_udf_externally) if you want to host UDFs yourself (see back-end instructions below), but the process is still experimental and not widely supported yet. If we refer to `run_udf` below and the back-end supports it, you can also use `run_udf_externally` without it being explicitly mentioned.

As data cubes can be very large, the back-end may only be able to run your code on a smaller chunk of the whole cube. So you need to help the server a bit, by designing your code to work on smaller piece of data. This can be done by using data cube processes that run the UDF on smaller chunks of the data. There are a number of pre-defined processes that can run UDFs on such chunks, for example:

* [`aggregate_spatial`](processes.md#aggregate_spatial): Reduces pixels withing geometries to a single value using an UDF
* [`apply`](processes.md#apply): Applies an UDF to each pixel (it might also be slow to make the chunks too small though)
* [`apply_dimension`](processes.md#apply_dimension): Applies an UDF to all pixels along a dimension, without changing the number of values
* [`apply_neighborhood`](processes.md#apply_neighborhood): Applies an UDF to all pixels in a multidimensional neighborhood
* [`merge_cubes`](processes.md#merge_cubes): Reduces overlapping pixels of the data cubes to a single value
* [`reduce_dimension`](processes.md#reduce_dimension): Reduces values along a dimension using an UDF

There are more processes that accept and run a sub-process. Each of them can also be used to run UDFs.

::: tip Note
Not all functions will require you to write a UDF. For instance, if you want to take the absolute value of your data cube, you can simply [`apply`](processes.md#apply) the predefined [`absolute`](processes.md#absolute)) process. In fact, it is recommended to try and use predefined functions first, as they can be more efficiently implemented.
:::

The following chapters have further information on UDF usage in the openEO clients:

### JavaScript

The easiest way to run UDFs in the JavaScript client is to use the [process builder](https://open-eo.github.io/openeo-js-client/latest/Builder.html). You can use the builder to execute the `run_udf` process. A simple example:

```javascript
// Connect to the back-end first and store the connection in the variable `con`...

// Discover UDF runtimes
console.log(await con.listUdfRuntimes());

// Upload a UDF file to the server as udf.py, the source can only be a local path in a NodeJS environment
await con.uploadFile('/home/user/myudf.py', 'udf.py');

// Create a process builder
var builder = await con.buildProcess();

// Load some data from the back-end
var datacube = builder.load_collection("Sentinel-2", null, ["2018", "2019"]);

// Create a sub-process that runs a UDF
var udfProcess = function(data) {
	// This assumes that a file udf.py with the Python UDF code has been uploaded to the server before, you can also directly insert the UDF code instead. 
	// You need to replace `Python` and `3.7` with the respective runtime identifier and version as returned in UDF discovery
	return this.run_udf(data, "udf.py", "Python");
};

// Call the UDF as part of the reduce_dimension process to reduce the bands to a single value
datacube = builder.reduce_dimension(datacube, udfProcess, "bands");

// Further process the data cube or save it using save_result...
```

### Python

The Python client has [separate documentation on UDFs](https://open-eo.github.io/openeo-python-client/udf.html).

### QGIS

QGIS doesn't natively support running UDFs yet, but you can use copy and paste user-defined processes that include UDFs.

### R

There's no dedicated UDF documentation for R yet, but you can have a look at the [getting started guide and examples in the UDF server repository](https://github.com/Open-EO/openeo-r-udf#usage) for now.

### Web Editor

Running UDFs in the Web Editor just requires you to drag the `run_udf` process into the model builder. Afterwards you can edit the process parameters to your needs. You have to set the environment / programming language to run the UDF with and then you can either directly program a UDF in the code editor or select an UDF file you have previously uploaded to the user workspace.

## Back-ends

If you'd like to offer user-defined functions for your users, you need to implement either the process [`run_udf`](processes.md#run_udf) or [`run_udf_externally`](processes.md#run_udf_externally) (or both). Both usually require you to access UDF servers via the [UDF API](https://open-eo.github.io/openeo-udf/api_docs/). For the process `run_udf` you may bypass the API and exchange data directly between the openEO back-end and the openEO UDF servers for performance reasons.

`run_udf` allows users to run their code on your infrastructure. This can be done using one of the UDF server implementations in [Python](https://github.com/Open-EO/openeo-udf) or [R](https://github.com/Open-EO/openeo-r-udf). Please note that both UDF servers are **drafts** and still need work to improve performance and make them secure! This is not yet an out-of-the-box solution for running UDFs securely and fast.