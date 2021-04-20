# OpenEO Cookbook

This is the openEO cookbook that you can refer to to get a first idea on how to solve problems with the openEO API in the three client languages Python, R and JavaScript. It describes how to implement simple use cases in a pragmatic way.

Please refer to the getting started guides for [JavaScript](https://openeo.org/documentation/1.0/javascript), [Python](https://openeo.org/documentation/1.0/python/) and [R](https://openeo.org/documentation/1.0/r/) if you have never worked with the openEO API. This guide requires you to have a basic idea of how to establish a connection to a backend and how to explore that backend.

::: tip References
* [openEO processes documentation](https://openeo.org/documentation/1.0/processes.html)
* [openEO hub](https://openeo.org/documentation/1.0/processes.html) to discover backends with available data and processes
* [openEO web editor](https://editor.openeo.org) to visually build process graphs and execute jobs
:::

## Connecting to a Backend

Although already covered by the getting started guides, we want to go through our examples from the very beginning. So let's see how to connect to a backend of choice.

<CodeSwitcher>
<template v-slot:py>

```python
# import the openeo module
import openeo

# establish connection
con = openeo.connect("https://openeo.vito.be")

# authenticate
con.authenticate_basic("name", "pwd")
```

</template>
<template v-slot:r>

```r
# load module
library(openeo)

# establish connection
con <- connect(host = "https://openeo.vito.be")

# authenticate
login(login_type="basic",
      user="name",
      password="pwd")

# get a process graph builder, see ?processes
p <- processes()
```

**Note** how the `processes` function is assigned to a graph-building helper object `p`, to easily access all openEO functions.

</template>
<template v-slot:js>

```js
// load module
const { OpenEO, Formula } = require('@openeo/js-client');

// put all code in an async so we can catch errors
async function example() {

    // connect to backend
    con = await OpenEO.connect("https://openeo.vito.be");
    
    // autheticate
    await con.authenticateBasic("name", "pwd");

    // get process builder help
    var builder = await con.buildProcess();

    // add more code here later

    }

example().catch(error => console.error(error));
```

**Note** how the function `buildProcess()` is assigned to `builder`, in order to use it as a graph building helper object.

**Note** also that all additional code must be added below `// add more code here later`, so that it's all included in the `async`.

</template>
</CodeSwitcher>

## Input: `load_collection`

Before loading a collection, of course we need to find out the exact name of a collection we want to use (backend-specific, see references above). We assign the spatial and temporal extent to variables, so that we can re-use them on other collections we might want to load. 

<CodeSwitcher>
<template v-slot:py>

```python
# make dictionary, containing bounding box
brussel = {"west":4.2369, "south":50.7816, "east":4.5277, "north":50.9305}
# make list, containing the temporal interval
t = ["2020-06-01", "2020-09-01"]

# load first datacube
cube_s2 = con.load_collection(
    "SENTINEL2_L2A_SENTINELHUB",
    spatial_extent = brussel,
    temporal_extent = t,
    bands = ["B02", "B03", "B04", "B08"]
)
```

</template>
<template v-slot:r>

```r
# create variables for loading collection
brussel <- list(west=4.2369, south=50.7816, east=4.5277, north=50.9305)
t <- c("2020-06-01", "2020-09-01")

# load first datacube
cube_s2 <- p$load_collection(
  id = "SENTINEL2_L2A_SENTINELHUB",
  spatial_extent = iceland,
  temporal_extent = t,
  bands=c("B08")
)
```

</template>
<template v-slot:js>

```js
// make spatial and temporal extent
let brussel = {"west":4.2369, "south":50.7816, "east":4.5277, "north":50.9305};
let t = ["2020-06-01", "2020-09-01"];   

// load first cube
var cube_s2 = builder.load_collection(
    "SENTINEL2_L2A_SENTINELHUB",
    brussel,
    t,
    ["B02", "B03", "B04", "B08"]
);
```

</template>
</CodeSwitcher>

## Output: `save_result`

* `save_result` always the same, give graph, give output format
* job management: see getting started guides, but generally: execute as batch job or instantaneously

## Troubleshooting

- is the result properly saved?
- what is actually in the result? does it contain too many timesteps or bands? has the result been aggregated?
- have bands been renamed or are you trying to merge three cubes that all have the same band name? (of course monthly aggregation usuall done diffrently (agg_temp))


how to handle multiple ways to do things? mention but don't explain?

## Test

<CodeSwitcher>
<template v-slot:py>

```python
# Bye world in Python 3
print("Bye World")
```

</template>
<template v-slot:r>

```r
# Bye World in R
cat("Bye world\n")
```

</template>
<template v-slot:js>

```js
// Bye world in JavaScript
console.log("Bye World");
```

**Note:** JS is crazy!

</template>
</CodeSwitcher>