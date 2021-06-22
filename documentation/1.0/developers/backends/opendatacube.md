# Getting started with openEO and OpenDataCube

As a back-end provider who wants to provide its datasets, processes and infrastructure to a broader audience through a
standardized interface you may want to implement a driver for openEO.

First of all, you should read carefully the [getting started guide for service providers](./getting-started.md).

Please note: OpenDataCube is not an openEO back-end, but can be part of the infrastructure for the data management part.
In detail it can be used as data source for [EO-Data-Discovery](https://api.openeo.org/#tag/EO-Data-Discovery) and e.g.
in combination with a dask cluster as processing backend for [Data-Processing](https://api.openeo.org/#tag/Data-Processing).
In any case a REST interface must be available in front of ODC to properly answer OpenEO requests.
Currently the [EODC](https://openeo.eodc.eu/v1.0) and [EURAC](https://openeo.eurac.edu/) back-ends use ODC.

There are three main repositories involved with ODC / OpenEO:
1. Python process graph parser [openeo-pg-parser-python](https://github.com/Open-EO/openeo-pg-parser-python)
2. Python implementation of openEO processes [openeo-processes-python](https://github.com/Open-EO/openeo-processes-python)
3. openEO process mapper [openeo-odc](https://github.com/Open-EO/openeo-odc)

## [openEO Process Graph Parser](https://github.com/Open-EO/openeo-pg-parser-python)

The process graph parser translates a process graph in json / dict format into a traversable python object. It
automatically validates that only collections and processes are used which are available at the backend.

For example, this [EVI process graph](https://github.com/Open-EO/openeo-odc/blob/master/tests/process_graphs/evi.json) can be
translated using the openEO Process Graph Parser in the following way:

```python
from openeo_pg_parser.translate import translate_process_graph
import urllib.request
import json

eviJsonProcessGraphURL = 'https://raw.githubusercontent.com/Open-EO/openeo-odc/master/tests/process_graphs/evi.json'
jsonUrl = urllib.request.urlopen(eviJsonProcessGraphURL)
data = jsonUrl.read()
jsonProcessGraph = json.loads(data)
processGraph = translate_process_graph(jsonProcessGraph).sort(by='result')
for node in processGraph:
    print(node.process_id)
```

## [openEO Processes Python](https://github.com/Open-EO/openeo-processes-python)

This is a python implementation of a number of openeo processes (Complete list of all processes defined within OpenEO
can be found here: [processes.openeo.org](https://processes.openeo.org/)).

This package includes implementations based on numbers, numpy and xarray. Based on the type of your input data the
algorithm automatically chooses the right implementation. E.g. if your input is an `xarray.Dataarray` it will use the
xarray implementation of the called process. Independent of the input data type a process can therefore simply be
called by:

```python
import openeo_processes as oeop
oeop.subtract(**{'x': 3,'y': 5})
```

which in this case would use the number implementation and substract 5 from 3. The exact same function could also be
called with two `xarray.Dataarray`s as input.

From a technical perspective each process is implemented as a function and a corresponding class with up to four static
functions `exec_num`, `exec_np`, `exec_xar`, and `exec_da`. Within the  context of OpenDataCube the most important
one is `exec_xar` - the xarray implementation.
*Note: The different data type implementations of a single process are completely independent. So one can easily add the
xarray implementation without editing the implementations for the other data types.*

Implemented ODC processes
* load_collection
* load_result

Implemented xarray processes:
* array_element
* is_nodata
* is_nan
* is_valid
* gt
* reduce_dimension
* apply
* save_result
* absolute
* sgn
* sqrt
* mean
* min
* max
* median
* sd
* variance
* quantiles
* cummin
* cummax
* cumproduct
* cumsum
* sum
* product
* add
* substract
* multiply
* divide
* apply_kernel


## [openEO ODC Process Mapper](https://github.com/Open-EO/openeo-odc)

openeo-odc maps an openEO process graph to an  executable Python file and thereby ties together the other two packages.
The input is a plain openeo process graph in json / dict format (see below) and the output is a python file composed of
one function call per process (see below).  In detail each process in the process graph is mapped to a function call to
[openeo-processes-python](https://github.com/openeo-processes-python) package.

For this translation openeo-odc uses internally the [openeo-pg-parser-python](https://github.com/openeo-pg-parser-python)
packages. Leveraging the resulting python representation of the process graph [openeo-odc](https://github.com/openeo-odc)
each process in the process graph is mapped separately. Next to the correct mapping of the process itself the main task
of [openeo-odc](https://github.com/openeo-odc) is to correctly understand and pass given parameters and arguments
(this can be simple values but also references previous nodes).

*Note: opendatacube, xarray and openeo-processes-python are **not** dependencies because this package simply creates a
python file that can be executed in the correct environment where these dependencies are resolved.*

[Sample process graph for an EVI calculation (Input).](https://github.com/Open-EO/openeo-odc/blob/master/tests/process_graphs/evi.json)

Sample python output file, generated using the [testing script](https://github.com/Open-EO/openeo-odc/blob/master/tests/test_odc.py),
calling a number of processes implemented within [openeo-processes-python](https://github.com/openeo-processes-python) - notice that the
output of a previous function call can easily be used as input for another one.
```python

from dask.distributed import Client
import datacube
import openeo_processes as oeop

# Initialize ODC instance
cube = datacube.Datacube()
# Connect to Dask Scheduler
client = Client('tcp://xxx.yyy.zzz.kkk:8786')

dc_0 = oeop.load_collection(odc_cube=cube, **{'product': 'boa_sentinel_2', 'x': (11.2, 12.9), 'y': (47.1, 50.5), 'time': ['2018-06-15', '2018-06-17'], 'dask_chunks': {'time': 'auto', 'x': 1000, 'y': 1000}, 'measurements': ['B08', 'B04', 'B02']})
nir_2 = oeop.array_element(**{'data': dc_0, 'index': 0, 'dimension': 'bands'})
red_3 = oeop.array_element(**{'data': dc_0, 'index': 1, 'dimension': 'bands'})
blue_4 = oeop.array_element(**{'data': dc_0, 'index': 2, 'dimension': 'bands'})
sub_5 = oeop.subtract(**{'x': nir_2,'y': red_3})
p1_6 = oeop.multiply(**{'x': red_3,'y': 6})
p2_7 = oeop.multiply(**{'x': blue_4,'y': -7.5})
sum_8 = oeop.sum(**{'data': [10000, nir_2, p1_6, p2_7]})
div_9 = oeop.divide(**{'x': sub_5,'y': sum_8})
p3_10 = oeop.multiply(**{'x': div_9,'y': 2.5})
evi_1 = oeop.reduce_dimension(**{'data': p3_10, 'dimension': 'spectral', 'reducer': {}})
min_12 = oeop.min(**{'data': evi_1, 'dimension': 'time'})
mintime_11 = oeop.reduce_dimension(**{'data': min_12, 'dimension': 'temporal', 'reducer': {}})
save_13 = oeop.save_result(**{'data': mintime_11, 'format': 'netCDF'})
```

## How to add a new process which can be used with ODC/Xarray/Dask?

### [openeo-processes-python](https://github.com/openeo-processes-python):
1. Select a process from [processes.openeo.org](https://processes.openeo.org/) which does not yet have a xarray
   implementation in [openeo-processes-python](https://github.com/openeo-processes-python).
1. Clone [openeo-processes-python](https://github.com/openeo-processes-python), checkout a new branch, and start
   implementing the missing process. If a function and class already exists for this process just implement the
   `exec_xar` method, if not you also need to implement the function and class itself. Make sure you properly handle
   all parameters defined for this process. Add a test for your process with xarray data as input (in the `conftest.py`
   the `test_data`-fixture is available).
1. Push your code and open a PR.
### [openeo-odc](https://github.com/openeo-odc):
1. Clone [openeo-odc](https://github.com/openeo-odc) and checkout a new branch.
1. Ensure that there is a mapper available for your newly implemented process. Currently the mapping is done based
   on the input parameters, so some processes may automatically be supported, for some others an additional
   mapper function must be implemented.
1. Check your mapping works by adding a test for the new process which correctly translates its dict representation
   to the oeop function call.
1. Push your code and open a PR.
### [openeo-pg-parser-python](https://github.com/openeo-pg-parser-python): no changes are required

### Common mistakes

* Make sure you always have the latest version of the required repositories [openEO Process Graph Parser](https://github.com/Open-EO/openeo-pg-parser-python), [openEO Processes Python](https://github.com/Open-EO/openeo-processes-python) and [openEO ODC Process Mapper](https://github.com/Open-EO/openeo-odc) installed when you test your code.

## How to test if everything works?
1. You can create a process graph using the [openEO Web Editor](https://editor.openeo.org/?server=https://openeo.eodc.eu/v1.0&discover=1) and store the corresponding JSON locally.
2. Modify the collection in load_collection with one available in your local OpenDataCube instance. Check that bands, temporal and spatial extent are available in your ODC product. Translate the process graph into an executable Python script:

```python
from openeo_odc.map_to_odc import map_to_odc
from openeo_pg_parser.translate import translate_process_graph

process_graph_json = 'your_test_process_graph.json'
odc_url = 'tcp://10.8.244.123:8786'
graph = translate_process_graph(process_graph_json,
                                process_defs).sort(by='result')
nodes = map_to_odc(graph, None, odc_url)
# Write to disk
with open(process_graph + ".py", "w") as f:
    for node in nodes:
        f.write(nodes[node])
```
3. Execute the obtained script and check if it succeeds.