# Python Client

## Installation

Before you install the Python client module into your Python environment, please make sure that you are using at least Python 3.5.

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

You can check if the installation worked if you try to impoprt the openeo module in the Python console:

```python
import openeo
```
If this gives you the following output, something went wrong with the installation, please check that your Python version is above 3.5.

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
connection = openeo.connect(https://earthengine.openeo.org/v1.0)
```

The connection object bundles information about the backend, so the provided data and capabilities. The capabilities of the backend is publicly available and therefore you do not need to have an account on the backend.

### Collections

Collections represent the basic data (e.g. Satellites) the backend provides (e.g. Sentinel 2 collection).
The collection is used as input data for job executions ([more info on collections](https://openeo.org/documentation/1.0/glossary.html#eo-data-collections)).
With the following code snipped you can get all available collection names and their description.

```python
# List of available data collections and some metadata (dict)
print("Available Collections")
print(connection.list_collections())

# Dictionary of the full metadata of the "COPERNICUS/S2" collection (dict)
print("Describe COPERNICUS/S2")
print(connection.describe_collection("COPERNICUS/S2"))
```
This code results in:
```shell script
Available Collections
[{'id': 'AAFC/ACI', 'title': 'Canada AAFC Annual Crop Inventory', ...}, { 'id': 'COPERNICUS/S2', ...}]
Describe COPERNICUS/S2
{'id': 'COPERNICUS/S2', 'title': ..., 'description': ..., 'bands': ..., ...}
```
By calling "list_collection", a list of collection dictionaries is returned. 
The collections have basic description metadata, but to get the full collection metadata you can call the "describe_collection" method. 

### Processes

Processes in openEO can be described as a task that can be applied on (EO) data, the input of a process might be the output of another process, so that a process graph can be formed. So a process describes one task of a job the backend should apply ([more info on processes](https://openeo.org/documentation/1.0/glossary.html#processes)).
The following code snipped shows how to get the available processes. 

```python
print("Available Processes")

# List of available openEO processes with full metadata (dict)
print(connection.list_processes())

# List of available openEO processes by identifiers (string)
print([process["id"] for process in connection.list_processes()])
```
This code results in:
```shell script
Available Processes
[{'id': 'absolute', 'summary': 'Absolute value', 'description': 'Computes the absolute value of a real number `x`, which is the "unsigned" portion of x and often denoted as *|x|*.\n\nThe no-data value `null` is passed through and therefore gets propagated.', ... ]
['absolute', 'add', 'add_dimension', 'aggregate_temporal_frequency', 'anomaly', 'apply', 'arccos',... ]
```
 
The "list_processes" method returns a list of dictionaries with all openEO processes that the backend provides.
Each dictionary in the list contains the process identifier and metadata of the process, such as expected arguments and return types. 
In the third print statement of the code block, just the identifiers of the supported processes are listed.
For a graphical description of the openEO processes, there is an [online documentation](https://openeo.org/documentation/1.0/processes.html) for general process descriptions and the [openEO Hub](https://hub.openeo.org/) for backend specific process descriptions. 

## Authentication 

In the previous examples authentication was not necessary, since we only fetched general data about the backend capabilities.
To run your own jobs at the backend or to access results of previous jobs you need to authenticate yourself at the backend.

Depending on the backend, there might be two different approaches to authenticate. 
You need to inform yourself at the backend provider, which authentication you should use with your account. 
You can also have a look at the [openEO Hub](https://hub.openeo.org/) to see the available authentication types of your backend of choice.     

### Basic Authentication

The following code snipped shows how to log in via basic authentication:

```python
print("Authenticate with basic authentication")
connection.authenticate_basic("username", "password")
```
After successfully calling the "authenticate_basic" method, you are logged into the backend with your account. 
This means, that every call that comes after that via the connection variable is executed with your user account.

### OIDC Authentication

The following code snipped shows how to log in via oidc authentication:

```python
print("Authenticate with OIDC authentication")
connection.authenticate_OIDC("Client ID")
```

Calling this method should open your system browser, where you can authenticate yourself on the backend authentication system. 
After that the website will give you the instructions to go back to the python client, where your connection has logged your account in. 
This means, that every call that comes after that via the connection variable is executed with your user account.

## Applying processes


## Job Management


## Example Job


## User Defined Function


## Further Info