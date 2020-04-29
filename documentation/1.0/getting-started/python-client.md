# Python Client

## Installation

Before you install the Python client module into your Python environment, please make sure that you have at least Python version 3.5.

There are two versions of the module available, the released version, which is the most stable one and the less stable latest available version with the newest features.

The [latest release](https://pypi.org/project/openeo/) can be installed via [PyPi](https://pypi.org/) by using the following command:

```shell script
pip install openeo
```

If you want to install the latest (unreleased) version you have to clone it from the [GitHub project](https://github.com/Open-EO/openeo-python-client) and install it locally: 

```shell script
cd DIR_OF_CHOICE
git clone https://github.com/Open-EO/openeo-python-client.git
cd openeo-python-client
pip install -e .
```

You can check the installation by trying to import the openeo module in the Python console:

```python
import openeo
```
If this gives you the following output, something went wrong with the installation, please check again the requirements. 
If you have still troubles installing the Python module, feel free to [contact us](https://openeo.org/contact.html) or leave an issue at the [GitHub project](https://github.com/Open-EO/openeo-python-client/issues).

```shell script
>>> import openeo
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ModuleNotFoundError: No module named 'openeo'
```

Now that the installation was successfully finished, we can now connect to openEO compliant backends. 
In the following chapters we quickly walk through the main features of the Python client. 

## Exploring a backend

If you do not know an openEO backend that you want to connect to yet, you can have a look at the [openEO Hub](https://hub.openeo.org/), to find all known backends with information on their capabilities.

For this tutorial we will use the Google Earth Engine openEO driver (https://earthengine.openeo.org/v1.0). 

First we need to connect to the backend. 

```python
import openeo
connection = openeo.connect("https://earthengine.openeo.org/v1.0")
```

The connection object bundles information about the backend, so that the provided data and capabilities can be accessed. The capabilities of the backend is publicly available and therefore you do not need to have an account on the backend.

### Collections

Collections represent the basic data the backend provides (e.g. Sentinel 2 collection).
Collections are used as input data for job executions ([more info on collections](https://openeo.org/documentation/1.0/glossary.html#eo-data-collections)).
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
By calling "list_collection", a list of collection dictionaries is returned. 
The collections in the list have a general description, but to get the full collection metadata you need to call the "describe_collection" method. 

### Processes

Processes in openEO are tasks that can be applied on (EO) data. The input of a process might be the output of another process, so that several connected processes form a process graph. Therefore, a process resembles the smallest unit of task descriptions in openEO ([more info on processes](https://openeo.org/documentation/1.0/glossary.html#processes)).
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
 
The "list_processes" method returns a list of dictionaries with all openEO processes that the backend provides.
Each dictionary in the list contains the process identifier and metadata about the process, such as expected arguments and return types. 
In the third print statement of the code block, just the identifiers of the supported processes are listed.
For a graphical overview of the openEO processes, there is an [online documentation](https://openeo.org/documentation/1.0/processes.html) for general process descriptions and the [openEO Hub](https://hub.openeo.org/) for backend specific process descriptions. 

## Authentication 

In the code snippets above, authentication is not necessary, since we only fetch general information about the backend.
To run your own jobs at the backend or to access job results, you need to authenticate at the backend.

Depending on the backend, there might be two different approaches to authenticate. 
You need to inform yourself at your backend provider of choice, which authentication approach you have to carry out. 
You can also have a look at the [openEO Hub](https://hub.openeo.org/) to see the available authentication types of the backends.     

### Basic Authentication

The basic authentication method is a common way of authenticate HTTP requests given username and password. 
The following code snippet shows how to log in via basic authentication:

```python
print("Authenticate with basic authentication")
connection.authenticate_basic("username", "password")
```
After successfully calling the "authenticate_basic" method, you are logged into the backend with your account. 
This means, that every call that comes after that via the connection variable is executed by your user account.

### OIDC Authentication
The OIDC ([OpenID Connect](https://openid.net/connect/)) authentication can be used to authenticate via an external service given a client ID.
The following code snippet shows how to log in via oidc authentication:

```python
print("Authenticate with OIDC authentication")
connection.authenticate_OIDC("Client ID")
```

Calling this method opens your system web browser, with which you can authenticate yourself on the backend authentication system. 
After that the website will give you the instructions to go back to the python client, where your connection has logged your account in. 
This means, that every call that comes after that via the connection variable is executed by your user account.

## Creating a Datacube

Now that we know how to discover the backend and how to authenticate, lets continue by defining creating a new job.
First you need to initialize a datacube by selecting a collection from the backend via the "load_collection" method:

```python
datacube = connection.load_collection("COPERNICUS/S1_GRD")
```

This results in a [datacube object](https://openeo.org/documentation/1.0/glossary.html#spatial-data-cubes) with the complete dataset of the "COPERNICUS/S1_GRD" collection.
You might want to limit the datasets extent already when loading it. This can be done by setting the extent of the spatial and temporal dimensions as well as by filtering the bands dimension.
 
```python
datacube = connection.load_collection("COPERNICUS/S1_GRD",
                                      spatial_extent={"west": 16.06, "south": 48.06, "east": 16.65, "north": 48.35, "crs": "EPSG:4326"},
                                      temporal_extent=["2017-03-01", "2017-04-01"],
                                      bands=["VV", "VH"])
```

You can also filter the datacube on a later point by using the following filter methods:

```python
datacube = datacube.filter_bbox(west=16.06, south=48.06, east=16.65, north=48.35, crs="EPSG:4326")
datacube = datacube.filter_temporal(start_date="2017-03-01", end_date="2017-04-01")
datacube = datacube.filter_bands(["VV", "VH"])
```

Now if you want to apply a process on the datacube, you can just call the process directly on the datacube. 
Every datacube object contains a process graph, describing the processes that will be applied to it.
By calling a process on the datacube it returns a datacube with the process added to its process graph. 

```python
datacube = datacube.max_time()
```
Now the datacube process graph includes a reducer on the temporal dimension using the maximum value.
For a list of supported processes on the Python client datacube object see the [official documentation](https://open-eo.github.io/openeo-python-client/).

Applying a process not supported by the Python client can be added to the datacube manually:

```python
datacube = datacube.process(process_id="ndvi", args={ "data": {"from_node": datacube._pg}, 
                                                      "nir": "B8", 
                                                      "red": "B4"})
```

This applies the ["ndvi" process](https://openeo.org/documentation/1.0/processes.html#ndvi) to the datacube with the arguments of "nir" and "red". 
The "data" argument defines the input of the process and we choose latest added process of the datacube.

## Job Management

Assuming that the definition of the datacube object and all related processes is finished, we will now send it to the backend and start the execution. 
In openEO, an execution of a process graph (here defined in the datacube object) is called a [job](https://openeo.org/documentation/1.0/glossary.html#data-processing-modes). Therefore, we need to create a job at the backend using our datacube.

```python
# Creating a new job at the backend by sending the datacube information.
job = datacube.send_job()
```

The "send_job" method sends all necessary information to the backend and creates a new job, which gets returned. 
After calling this, the job is just created, but has not started the execution at the backend. 

```python
# Starting the execution of the job at the backend.
job.start_job()

# Get job description

job.describe_job()
```
The "start_job" method starts the execution of the job at the backend. 
You can use the "describe_job" method to get the current status (e.g. "error", "running", "finished") of the job. 
When the job is finished, you can download the result with the following command:

```python
# Download job results
job.download_results("download_path")
```
This only works if the job execution has already finished. If you want the program to wait until the job finished and then download it automatically, you can use the "start_and_wait" method.

```python
# Starts the job and waits until it finished to download the result.
job.start_and_wait().download_results("download_path")
```

## Example Walkthrough

In this chapter we will walk through an example earth observation use case using the Python client and the Google Earth Engine backend.
We want to produce a monthly RGB composite of Sentinel 1 backscatter data over the area of Vienna, Austria for three months in 2017. This can be used for classification and crop monitoring.
It is also one of the Use Cases defined for the openEO project ([see proposal](https://zenodo.org/record/1065474#.Xql0cfmxVhE)). 

First, we connect to the backend and authenticate ourselves via basic authentication. 

```python
import openeo

con = openeo.connect(GEE_DRIVER_URL)
con.authenticate_basic(user, password)
```

Now that we are connected, we can initialize our datacube object with the area around Vienna and the time range of interest using Sentinel 1 data.

```python
datacube = con.load_collection("COPERNICUS/S1_GRD",
                               spatial_extent={"west": 16.06, "south": 48.06, "east": 16.65, "north": 48.35, "crs": "EPSG:4326"},
                               temporal_extent=["2017-03-01", "2017-06-01"],
                               bands=["VV"])
```
Since we are creating a monthly RGB composite, we need three (R, G and B) separated time ranges.
Therefore, we split the datacube into three datacubes by filtering temporal for March, April and May. 

```python
march = datacube.filter_temporal("2017-03-01", "2017-04-01")
april = datacube.filter_temporal("2017-04-01", "2017-05-01")
may = datacube.filter_temporal("2017-05-01", "2017-06-01")
```

Now that we split it into the correct time range, we have to aggregate the timeseries values into a single image.
Therefore, we make use of the Python Client function "mean_time", which reduces the time dimension, by taking for every timeseries the mean value.

_Note: The dimension parameter is needed for the current version of the Python client with the GEE backend, but might be unnecessary in the future._

```python
mean_march = march.mean_time(dimension="t")
mean_april = april.mean_time(dimension="t")
mean_may = may.mean_time(dimension="t")
```

Now we have the three images that will be combined into the temporal composite. 
But before merging them into one datacube object, we need to rename the bands of the images, because otherwise, they would be overwritten in the merging process.  
This is because at the moment the three datacubes have one band named "VV" (see "load_collection" statement above). 
If we would now merge two of them, it would overwrite the "VV" band of one of the originals and keep the band from the other cube (see ["merge_cubes" description](https://openeo.org/documentation/1.0/processes.html#merge_cubes)).
Therefore, we rename the bands of the datacubes using the "rename_labels" process to "R", "G" and "B".
After that we merge them into the "RGB" datacube, which has now three bands ("R", "G" and "B")

```python
R_band = mean_march.rename_labels(dimension="bands", target=["R"])
G_band = mean_april.rename_labels(dimension="bands", target=["G"])
B_band = mean_may.rename_labels(dimension="bands", target=["B"])

RG = R_band.merge(G_band)
RGB = RG.merge(B_band)
```

To make the values match the RGB values from 0 to 255, we need to scale them linear. Therefore, we apply the "linear_scale" process to the datacube. 
It is not part of the implemented functions of the Python client, therefore, we need to define it manually. This might change in future versions of the client. 

```python
from openeo.internal.graph_building import PGNode
# defining linear scale range for apply process
lin_scale = PGNode("linear_scale_range", arguments={"x": {"from_parameter": "x"},
                                                    "inputMin": -20, "inputMax": -5, "outputMin": 0, "outputMax": 255})

datacube = RGB.apply(lin_scale)
```
Last but not least, we add the process to save the result of the processing. There we define that the result should be a PNG file.
We also set, which band should be used for "red", "green" and "blue" colour in the options.

```python
datacube = datacube.save_result(format="PNG", options={"red": "R", "green": "G", "blue": "B"})
```

With the last process we have finished the datacube definition and can create and start the job at the backend.

```python
job = datacube.send_job()

res = job.start_and_wait().download_results("/tmp")
```

Now in our "/tmp" folder there is the resulting PNG file of the RGB backscatter composite. 

The [source code](https://github.com/Open-EO/openeo-python-client/blob/master/examples/gee_uc1_temp.py) of this example can be found on GitHub.

## User Defined Function

If the use case you want to realize with openEO can not be accomplished with the [default processes](https://openeo.org/documentation/1.0/processes.html), you can define a [user defined function](https://openeo.org/documentation/1.0/glossary.html#user-defined-function-udf).
Therefore, you can create a Python function that will be executed at the backend and functions as a process in your process graph.

Some examples using UDFs can be found in the [Python Client Repository](https://github.com/Open-EO/openeo-python-client/tree/master/examples/udf). 

## Additional Information

* [Python Client Examples](https://github.com/Open-EO/openeo-python-client/tree/master/examples)
* [Python Client Jupyther Notebooks](https://github.com/Open-EO/openeo-python-client/tree/master/examples/notebooks)
* [Python Client Documentation](https://open-eo.github.io/openeo-python-client/)
* [Python Client Repository](https://github.com/Open-EO/openeo-python-client)