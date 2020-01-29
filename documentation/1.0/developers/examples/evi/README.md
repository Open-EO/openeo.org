# EVI (Enhanced Vegetation Index)

This example derives minimum EVI measurements over pixel time series of Sentinel 2 imagery. The EVI is defined as follows: `(2.5 * (nir - red)) / ((nir + 6.0 * red - 7.5 * blue) + 1.0)`

The process graph could be visualized as follows:

![Graph visualization](./visual.png)

This process graph is meant to be used as batch job or can be lazy evaluated. It returns a GeoTiff file with the computed results.

This process graph assumes the dataset is called `Sentinel-2`. The temporal extent covered is January 2018 and bands `B02` (blue), `B04` (red) and `B08` (nir) are used for the computation.

## Process Graph

```json
{
  "dc": {
    "process_id": "load_collection",
    "description": "Loading the data.",
    "arguments": {
      "id": "Sentinel-2",
      "spatial_extent": {
        "west": 16.1,
        "east": 16.6,
        "north": 48.6,
        "south": 47.2
      },
      "temporal_extent": ["2018-01-01", "2018-02-01"],
      "bands": ["B02", "B04", "B08"]
    }
  },
  "evi": {
    "process_id": "reduce_dimension",
    "description": "Compute the EVI. Formula: 2.5 * (NIR - RED) / (1 + NIR + 6*RED + -7.5*BLUE)",
    "arguments": {
      "data": {"from_node": "dc"
      },
      "dimension": "bands",
      "reducer": {
        "process_graph": {
          "nir": {
            "process_id": "array_element",
            "arguments": {
              "data": {"from_parameter": "data"},
              "label": "B08"
            }
          },
          "red": {
            "process_id": "array_element",
            "arguments": {
              "data": {"from_parameter": "data"},
              "label": "B04"
            }
          },
          "blue": {
            "process_id": "array_element",
            "arguments": {
              "data": {"from_parameter": "data"},
              "label": "B02"
            }
          },
          "sub": {
            "process_id": "subtract",
            "arguments": {
              "x": {"from_node": "nir"},
              "y": {"from_node": "red"}
            }
          },
          "m1": {
            "process_id": "multiply",
            "arguments": {
              "x": 6,
              "y": {"from_node": "red"}
            }
          },
          "m2": {
            "process_id": "multiply",
            "arguments": {
              "x": -7.5,
              "y": {"from_node": "blue"}
            }
          },
          "sum": {
            "process_id": "sum",
            "arguments": {
              "data": [1, {"from_node": "nir"}, {"from_node": "m1"}, {"from_node": "m2"}]
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
              "x": 2.5,
              "y": {"from_node": "div"}
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
      "format": "GTiff"
    },
    "result": true
  }
}
```

## Result

TBD