# Getting started with openEO and OpenDataCube

As a back-end provider who wants to provide its datasets, processes and infrastructure to a broader audience through a
standardized interface you may want to implement a driver for openEO.

First of all, you should read carefully the [getting started guide for service providers](./getting-started.md).

Please note: OpenDataCube is not an openEO back-end, but can be part of the infrastructure for the data management part.
In detail it can be used as data source for [EO-Data-Discovery](https://api.openeo.org/#tag/EO-Data-Discovery) and e.g.
in combination with a dask cluster as processing backend for [Data-Processing](https://api.openeo.org/#tag/Data-Processing).
In any case a REST interface must be available in front of ODC to properly answer OpenEO requests.
Currently the EODC back-end uses ODC.

There are three main repositories involved with ODC / OpenEO:
1. Python process graph parser [openeo-pg-parser-python](https://github.com/openeo-pg-parser-python)
2. openEO process mapper [openeo-odc](https://github.com/openeo-odc)
3. Python implementation of openEO processes [openeo-processes-python](https://github.com/openeo-processes-python)

## openEO Process Graph Parser

The process graph parser translates a process graph in json / dict format into a traversable python object. It
automatically validates that only collections and processes are used which are available at the backend.

## openEO Processes Python

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


## openEO ODC Process Mapper

openeo-odc maps an openEO process graph to an  executable Python file and thereby ties together the other two packages.
The input is a plain openeo process graph in json / dict format (see below) and the output is a python file composed of
one function call per process (see below).  In detail each process in the process graph is mapped to a function call to
[openeo-processes-python](https://github.com/openeo-processes-python) packages.

For this translation openeo-odc uses internally the [openeo-pg-parser-python](https://github.com/openeo-pg-parser-python)
packages. Leveraging the resulting python representation of the process graph [openeo-odc](https://github.com/openeo-odc)
each process in the process graph is mapped separately. Next to the correct mapping of the process itself the main task
of [openeo-odc](https://github.com/openeo-odc) is to correctly understand and pass given parameters and arguments
(this can be simple values but also references previous nodes).

*Note: opendatacube, xarray and openeo-processes-python are **not** dependencies because this package simply creates a
python file that can be executed in the correct environment where these dependencies are resolved.*

Sample process graph for an EVI calculation (Input):
```json
{
  "process": {
    "process_graph": {
      "dc": {
        "process_id": "load_collection",
        "description": "Loading the data; The order of the specified bands is important for the following reduce operation.",
        "arguments": {
          "id": "boa_sentinel_2",
          "spatial_extent": {
            "west": 11.2,
            "east": 12.9,
            "north": 47.1,
            "south": 50.5
          },
          "temporal_extent": ["2018-06-15", "2018-06-17"],
          "bands": ["B08", "B04", "B02"]
        }
      },
      "evi": {
        "process_id": "reduce_dimension",
        "description": "Compute the EVI. Formula: 2.5 * (NIR - RED) / (1 + NIR + 6*RED + -7.5*BLUE)",
        "arguments": {
          "data": {"from_node": "dc"},
          "dimension": "spectral",
          "reducer": {
            "process_graph": {
              "nir": {
                "process_id": "array_element",
                "arguments": {
                  "data": {"from_parameter": "data"},
                  "index": 0
                }
              },
              "red": {
                "process_id": "array_element",
                "arguments": {
                  "data": {"from_parameter": "data"},
                  "index": 1
                }
              },
              "blue": {
                "process_id": "array_element",
                "arguments": {
                  "data": {"from_parameter": "data"},
                  "index": 2
                }
              },
              "sub": {
                "process_id": "subtract",
                "arguments": {
                  "x": {"from_node": "nir"},
                  "y": {"from_node": "red"}
                }
              },
              "p1": {
                "process_id": "multiply",
                "arguments": {
                  "x": {"from_node": "red"},
                  "y": 6
                }
              },
              "p2": {
                "process_id": "multiply",
                "arguments": {
                  "x": {"from_node": "blue"},
                  "y": -7.5
                }
              },
              "sum": {
                "process_id": "sum",
                "arguments": {
                  "data": [10000, {"from_node": "nir"}, {"from_node": "p1"}, {"from_node": "p2"}]
                }
              },
              "div": {
                "process_id": "divide",
                "arguments": {
                  "x": {"from_node": "sub"},
                  "y": {"from_node": "sum"}
                }
              },
              "p3": {
                "process_id": "multiply",
                "arguments": {
                  "x": {"from_node": "div"},
                  "y": 2.5
                },
                "result": true
              }
            }
          }
        }
      },
      "mintime": {
        "process_id": "reduce_dimension",
        "description": "Compute a minimum time composite by reducing the temporal dimension",
        "arguments": {
          "data": {"from_node": "evi"},
          "dimension": "temporal",
          "reducer": {
            "process_graph": {
              "min": {
                "process_id": "min",
                "arguments": {
                  "data": {"from_parameter": "data"}
                },
                "result": true
              }
            }
          }
        }
      },
      "save": {
        "process_id": "save_result",
        "arguments": {
          "data": {"from_node": "mintime"},
          "format": "netCDF"
        },
        "result": true
      }
    }
  }
}
```

Sample python output file, calling a number of processes implemented within
[openeo-processes-python](https://github.com/openeo-processes-python) - notice that the output of a previous function
call can easily be used as input for another one.
```python

from dask.distributed import Client
import datacube
import openeo_processes as oeop

# Initialize ODC instance
cube = datacube.Datacube(app='app_1', env='default')
# Connect to Dask Scheduler
client = Client('tcp://xx.yyy.zz.kk:8786')

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
   **TODO: Sample of implemented process taking care of the openEO parameters.**
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

* Make sure you always have the latest version of [openeo-processes-python](https://github.com/openeo-processes-python)
  installed when you test your code.
* **TODO ...**

## How to test if everything works?
You need an instance of ODC running. The collection name used in openEO is the product name in ODC.
....
