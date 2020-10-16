# Python Client

This How-To page will give you just a simple overview of the capabilities of the Python client.
For a more detailed introduction or if you are already certain that you want to use the Python 
client we recommend to visit directly the [official documentation](https://open-eo.github.io/openeo-python-client/).

## Installation

Before you install the Python client module into your Python environment, please make sure that you have at least Python version 3.5.

The [latest stable release](https://pypi.org/project/openeo/) can be installed via [PyPi](https://pypi.org/) by using the following command:

```shell script
pip install openeo
```

If you want to install the development version, please have a look at the [official documentation](https://open-eo.github.io/openeo-python-client/).
It may contain more features, but may also be unstable.

You can check the installation by trying to import the openeo module in the Python console:

```python
import openeo
```
If this gives you the following output, something went wrong with the installation, please check again the requirements. 
If you have still troubles installing the Python module, feel free to [contact us](../../../contact.md) or leave an issue at the [GitHub project](https://github.com/Open-EO/openeo-python-client/issues).

```shell script
>>> import openeo
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ModuleNotFoundError: No module named 'openeo'
```

Now that the installation was successfully finished, we can now connect to openEO compliant back-ends. 
In the following chapters we quickly walk through the main features of the Python client. 

## Exploring a back-end

If you do not know an openEO back-end that you want to connect to yet, you can have a look at the [openEO Hub](https://hub.openeo.org/), to find all known back-ends with information on their capabilities.

For this tutorial we will use the openEO instance of Google Earth Engine, which is available at `https://earthengine.openeo.org`.
Note that the code snippets in this guide work the same way for the other back-ends listed in the openEO Hub. Just the collection identifier and band names might differ.

First we need to establish a connection to the back-end. 

```python
import openeo
connection = openeo.connect("https://earthengine.openeo.org")
```

The [`connection` object](https://open-eo.github.io/openeo-python-client/api.html#module-openeo.rest.connection) bundles information about the back-end, so that the provided data and capabilities can be accessed. 

The capabilities of the back-end is publicly available and therefore you do not need to have an account on the back-end for reading them.

### Collections

Collections represent the basic data the back-end provides (e.g. Sentinel 2 collection).
Collections are used as input data for job executions ([more info on collections](../glossary.md#eo-data-collections)).
With the following code snippet you can get all available collection names and their description.

```python
# List of available data collections and some metadata (dict)
print("Available Collections")
print(connection.list_collections())

# Dictionary of the full metadata of the "COPERNICUS/S2" collection (dict)
print("Describe COPERNICUS/S2")
print(connection.describe_collection("COPERNICUS/S2"))
```
The execution of the code above results in:
```shell script
Available Collections
[{'id': 'AAFC/ACI', 'title': 'Canada AAFC Annual Crop Inventory', ...}, { 'id': 'COPERNICUS/S2', ...}]
Describe COPERNICUS/S2
{'id': 'COPERNICUS/S2', 'title': ..., 'description': ..., 'bands': ..., ...}
```

By calling [`list_collections`](https://open-eo.github.io/openeo-python-client/api.html#openeo.rest.connection.Connection.list_collections), a list of collection dictionaries is returned. 
The collections in the list have a general description, but to get the full collection metadata you need to call the [`describe_collection`](https://open-eo.github.io/openeo-python-client/api.html#openeo.rest.connection.Connection.describe_collection) method. 


### Processes

Processes in openEO are tasks that can be applied on (EO) data.
The input of a process might be the output of another process, so that several connected processes form a new (user-defined) process itself.
Therefore, a process resembles the smallest unit of task descriptions in openEO ([more details on processes](../glossary.md#processes)).
The following code snippet shows how to get the available processes.

```python
print("Available Processes")

# List of available openEO processes with full metadata (dict)
print(connection.list_processes())

# List of available openEO processes by identifiers (string)
print([process["id"] for process in connection.list_processes()])
```
Resulting in:
```shell script
Available Processes
[{'id': 'absolute', 'summary': 'Absolute value', 'description': 'Computes the absolute value of a real number `x`, which is the "unsigned" portion of x and often denoted as *|x|*.\n\nThe no-data value `null` is passed through and therefore gets propagated.', ... ]
['absolute', 'add', 'add_dimension', 'aggregate_temporal_frequency', 'anomaly', 'apply', 'arccos',... ]
```

The [`list_processes`](https://open-eo.github.io/openeo-python-client/api.html#openeo.rest.connection.Connection.list_processes) method returns a list of dictionaries with all openEO processes that the back-end provides.
Each dictionary in the list contains the process identifier and metadata about the process, such as expected arguments and return types. 
In the third print statement of the code block, just the identifiers of the supported processes are listed.
For a graphical overview of the openEO processes, there is an [online documentation](../processes.md) for general process descriptions and the [openEO Hub](https://hub.openeo.org/) for back-end specific process descriptions. 

## Authentication 

In the code snippets above, authentication is usually not necessary, since we only fetch general information about the back-end.
To run your own jobs at the back-end or to access job results, you need to authenticate at the back-end.

Depending on the back-end, there might be two different approaches to authenticate. 
You need to inform yourself at your back-end provider of choice, which authentication approach you have to carry out. 
You can also have a look at the [openEO Hub](https://hub.openeo.org/) to see the available authentication types of the back-ends.
For Google Earth Engine, only [Basic Authentication](#basic-authentication) is supported at the moment.

A detailed description of why and how to use the authentication methods is on the [official documentation](https://open-eo.github.io/openeo-python-client/auth.html#authentication-and-account-management).

### OpenID Connect Authentication
The OIDC ([OpenID Connect](https://openid.net/connect/)) authentication can be used to authenticate via an external service given a client ID.
The following code snippet shows how to log in via OIDC authentication:

```python
print("Authenticate with OIDC authentication")
connection.authenticate_OIDC("Client ID")
```

Calling this method opens your system web browser, with which you can authenticate yourself on the back-end authentication system. 
After that the website will give you the instructions to go back to the python client, where your connection has logged your account in. 
This means, that every call that comes after that via the connection variable is executed by your user account.

### Basic Authentication

The Basic authentication method is a common way of authenticate HTTP requests given username and password.

::: warning
The preferred authentication method is OpenID Connect due to better security mechanisms implemented in the OpenID Connect protocol.
If possible, use OpenID Connect instead of HTTP Basic authentication. 
::: 

The following code snippet shows how to log in via Basic authentication:
```python
print("Authenticate with Basic authentication")
connection.authenticate_basic("username", "password")
```
After successfully calling the [`authenticate_basic`](https://open-eo.github.io/openeo-python-client/api.html#openeo.rest.connection.Connection.authenticate_basic) method, you are logged into the back-end with your account. 

This means, that every call that comes after that via the connection variable is executed by your user account.


## Creating a Datacube

Now that we know how to discover the back-end and how to authenticate, lets continue by creating a new batch job to process some data.
First you need to initialize a datacube by selecting a collection from the back-end via calling [`load_collection`](https://open-eo.github.io/openeo-python-client/api.html#openeo.rest.datacube.DataCube.load_collection):

```python
datacube = connection.load_collection(
  "COPERNICUS/S1_GRD",
  spatial_extent={"west": 16.06, "south": 48.06, "east": 16.65, "north": 48.35},
  temporal_extent=["2017-03-01", "2017-04-01"],
  bands=["VV", "VH"]
)
```

This results in a [`datacube` object](https://open-eo.github.io/openeo-python-client/api.html#module-openeo.rest.datacube) containing the "COPERNICUS/S1_GRD" data restricted to the given spatial extent, the given temporal extend and the given bands .

::: tip
You can also filter the datacube at a later stage by using the following filter methods:

```python
datacube = datacube.filter_bbox(west=16.06, south=48.06, east=16.65, north=48.35)
datacube = datacube.filter_temporal(start_date="2017-03-01", end_date="2017-04-01")
datacube = datacube.filter_bands(["VV", "VH"])
```

Still, it is recommended to always use the filters in [load_collection](https://open-eo.github.io/openeo-python-client/api.html#openeo.rest.datacube.DataCube.load_collection) to avoid loading too much data upfront.
:::

Having the input data ready, we want to apply a process on the datacube.
Therefore, we can call the process directly on the datacube object, which then returns a datacube with the process applied. 

```python
datacube = datacube.max_time()
```
The datacube is now reduced by the time dimension, by taking the maximum value of the timeseries values.
Now the datacube has no time dimension left.
Other so called "reducer" processes exist, e.g. for computing minimum and mean values.
A list of supported processes using the Python client datacube can be found on the [official documentation](https://open-eo.github.io/openeo-python-client/).

Applying a process not supported by the Python client can be added to the datacube manually:

```python
datacube = datacube.process(process_id="ndvi", 
                            args={ "data": {"from_node": datacube._pg}, 
                                   "nir": "B8", 
                                   "red": "B4"})
```

This applies the [`ndvi` process](../processes.md#ndvi) to the datacube with the arguments of "nir" and "red". 
The "data" argument defines the input of the process and we chose latest added process of the datacube.


::: tip Note
Everything applied to the datacube at this point is neither executed locally on your machine nor executed on the back-end.
It just defines the input data and process chain the back-end needs to apply, when sending and executing the datacube at the back-end.
How this can be done is the topic of the next chapter. 
:::
::: tip Note
Still unsure on how to make use of processes with the Python client? Visit the [official documentation](https://open-eo.github.io/openeo-python-client/processes.html#working-with-processes).
:::

## Batch Job Management

Assuming that the definition of the datacube object and all related processes is finished, we can now send it to the back-end and start the execution. 
In openEO, an execution of a (user-defined) process (here defined in the datacube object) is called a [(batch) job](../glossary.md#data-processing-modes).
Therefore, we need to create a job at the back-end using our datacube.

```python
# Creating a new job at the back-end by sending the datacube information.
job = datacube.send_job()
```

The [`send_job`](https://open-eo.github.io/openeo-python-client/api.html#openeo.rest.datacube.DataCube.send_job) method sends all necessary information to the back-end and creates a new job, which gets returned.

After this, the job is just created, but has not started the execution at the back-end yet.
To start the job and let your Python script wait until the job has finished then 
download it automatically, you can use the `start_and_wait` method. 

```python
# Starts the job and waits until it finished to download the result.
job.start_and_wait().download_results()
```

Now you know the general workflow of job executions. More information on job management with the Python client can be 
found on the [official documentation](https://open-eo.github.io/openeo-python-client/basics.html#managing-jobs-in-openeo) 

## Full Example

In this chapter we will show a full example of an earth observation use case using the Python client and the Google Earth Engine back-end.

::: tip Use Case
We want to produce a monthly RGB composite of Sentinel 1 backscatter data over the area of Vienna, Austria for three 
months in 2017. This can be used for classification and crop monitoring.
:::

In the following code example, we use inline code comments to describe what we are doing.

::: warning
The username and password in the example above work at the time of writing, but may be invalid at the time you read this. Please [contact us](../../../contact.md) for credentials.
:::

```python
import openeo

# First, we connect to the back-end and authenticate ourselves via Basic authentication. 
con = openeo.connect("https://earthengine.openeo.org")
con.authenticate_basic("group11", "test123")

# Now that we are connected, we can initialize our datacube object with the area around Vienna 
# and the time range of interest using Sentinel 1 data.
datacube = con.load_collection("COPERNICUS/S1_GRD",
                               spatial_extent={"west": 16.06, "south": 48.06, "east": 16.65, "north": 48.35},
                               temporal_extent=["2017-03-01", "2017-06-01"],
                               bands=["VV"])

# Since we are creating a monthly RGB composite, we need three (R, G and B) separated time ranges.
# Therefore, we split the datacube into three datacubes by filtering temporal for March, April and May. 
march = datacube.filter_temporal("2017-03-01", "2017-04-01")
april = datacube.filter_temporal("2017-04-01", "2017-05-01")
may = datacube.filter_temporal("2017-05-01", "2017-06-01")

# Now that we split it into the correct time range, we have to aggregate the timeseries values into a single image.
# Therefore, we make use of the Python Client function `mean_time`, which reduces the time dimension, 
# by taking for every timeseries the mean value.

mean_march = march.mean_time()
mean_april = april.mean_time()
mean_may = may.mean_time()

# Now the three images will be combined into the temporal composite. 
# Before merging them into one datacube, we need to rename the bands of the images, because otherwise, 
# they would be overwritten in the merging process.  
# Therefore, we rename the bands of the datacubes using the `rename_labels` process to "R", "G" and "B".
# After that we merge them into the "RGB" datacube, which has now three bands ("R", "G" and "B")

R_band = mean_march.rename_labels(dimension="bands", target=["R"])
G_band = mean_april.rename_labels(dimension="bands", target=["G"])
B_band = mean_may.rename_labels(dimension="bands", target=["B"])

RG = R_band.merge(G_band)
RGB = RG.merge(B_band)


# Last but not least, we add the process to save the result of the processing. There we define that 
# the result should be a GeoTiff file.
# We also set, which band should be used for "red", "green" and "blue" color in the options.

datacube = datacube.save_result(format="GTIFF-THUMB")

# With the last process we have finished the datacube definition and can create and start the job at the back-end.

job = datacube.send_job()
job.start_and_wait().download_results()
```

Now the resulting GTiff file of the RGB backscatter composite is in your current directory. 

![RGB composite](../getting-started-result-example.png "RGB composite")

The [source code](https://github.com/Open-EO/openeo-python-client/blob/c21b928ab5f4b4561bb07b7c4a934f0ea9b4f0b8/examples/gee_uc1_temp.py) of this example can be found on GitHub.

## User Defined Functions

If your use case can not be accomplished with the [default processes](../processes.md) of openEO, you can define a [user defined function](../glossary.md#user-defined-function-udf).
Therefore, you can create a Python function that will be executed at the back-end and functions as a process in your process graph.

Detailed information about Python UDFs can be found in the [official documentation](https://open-eo.github.io/openeo-python-client/udf.html) as well as examples in the [Python client repository](https://github.com/Open-EO/openeo-python-client/tree/master/examples/udf). 

## Additional Information

* [Examples](https://github.com/Open-EO/openeo-python-client/tree/master/examples)
* [Jupyther Notebooks](https://github.com/Open-EO/openeo-python-client/tree/master/examples/notebooks)
* [Official Documentation](https://open-eo.github.io/openeo-python-client/)
* [Repository](https://github.com/Open-EO/openeo-python-client)