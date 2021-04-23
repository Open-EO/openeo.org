# OpenEO Cookbook

This is the openEO cookbook that you can refer to to get a first idea on how to solve problems with openEO in the three client languages Python, R and JavaScript. It describes how to implement simple use cases in a pragmatic way.

Please refer to the getting started guides for [JavaScript](../javascript/index.md), [Python](../python/index.md) and [R](../r/index.md) if you have never worked with one of the openEO client libraries before. This guide requires you to have a basic idea of how to establish a connection to a backend and how to explore that backend.

::: tip References
* [openEO processes documentation](../processes.md)
* [openEO Hub](https://hub.openeo.org) to discover backends with available data and processes
* [openEO Web Editor](https://editor.openeo.org) to visually build and execute processing workflows
:::

Throughout these guides, code examples for all three client languages are given. Select your preferred language with the code switcher on the right-hand side to set all examples to that language.

## Connecting to a Backend

Click the link below to see how to connect to a back-end (via OpenID Connect). You can call the connection object `con` to avoid confusion throughout the rest of the tutorials.

<CodeSwitcher>
<template v-slot:py>

[Getting started: Authentication](https://openeo.org/documentation/1.0/python/#openid-connect-authentication)

</template>

<template v-slot:r>

[Getting started: Authentication](https://openeo.org/documentation/1.0/r/#openid-connect-authentication)

</template>

<template v-slot:js>

[Getting started: Authentication](https://openeo.org/documentation/1.0/javascript/#openid-connect-authentication)

</template>

</CodeSwitcher>

In R and JavaScript it is very useful to assign a graph-building helper object to a variable, to easily access all openEO processes and add them to the process graph that you will be building. These objects will be used throughout this guide.

<CodeSwitcher>
<template v-slot:py>

No graph-building object is required. In python, all processes are just appended to each other.

</template>
<template v-slot:r>

```r
# get a process graph builder, see ?processes
p <- processes()
```

**Note:** In all R code, `p` is used to select openEO processes.

</template>
<template v-slot:js>

```js
// get process builder help
var builder = await con.buildProcess();
```

**Note:** In all JavaScript code, `builder` is used to select openEO processes.

</template>
</CodeSwitcher>

## Input: `load_collection`

Before loading a collection, we need to find out the exact name of a collection we want to use (backend-specific, see references [at the top](#openeo-cookbook)). We assign the spatial and temporal extent to variables, so that we can re-use them on other collections we might want to load. Let's look for a Sentinel 2 (preprocessed level 2A preferably) collection and load the first near-infrared band (band 8). Check with the backend (refer to collection description) for the correct naming of bands (`B08` vs `B8`).

<CodeSwitcher>
<template v-slot:py>

```python
# make dictionary, containing bounding box
brussel = {"west":4.2369, "south":50.7816, "east":4.5277, "north":50.9305}
# make list, containing the temporal interval
t = ["2020-06-01", "2020-09-01"]

# load first datacube
cube_s2_b8 = con.load_collection(
    "SENTINEL2_L2A_SENTINELHUB",
    spatial_extent = brussel,
    temporal_extent = t,
    bands = ["B08"]
)
```

</template>
<template v-slot:r>

```r
# create variables for loading collection
brussel <- list(west=4.2369, south=50.7816, east=4.5277, north=50.9305)
t <- c("2020-06-01", "2020-09-01")

# load first datacube
cube_s2_b8 <- p$load_collection(
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
var cube_s2_b8 = builder.load_collection(
    "SENTINEL2_L2A_SENTINELHUB",
    brussel,
    t,
    ["B08"]
);
```

</template>
</CodeSwitcher>

## Temporal Mean: `reduce_dimension`

We are interested in the mean of band 8 over the loaded time period, meaning we want to calculate the mean value of all timesteps per pixel and dispose of the `time` dimension afterwards (since it is empty anyway). This can be done via `reduce_dimension()`. The function requires a reducer, in our case a `mean` process, and the dimension over which to reduce, given as a string (`"t"`).

<CodeSwitcher>
<template v-slot:py>

```python
# reduce all timesteps
# mean_time() is a shortcut function
cube_s2_b8_red = cube_s2_b8.mean_time()

# alternatively, 'reduce_dimension' can be used
cube_s2_b8_red = cube_s2_b8.reduce_dimension(dimension="t", reducer="mean")
```

**Note:** In python, the predefined openEO function can be given as a string.

</template>
<template v-slot:r>

```r
# reduce dimension, use p$mean to give reducer
cube_s2_b8_red <- p$reduce_dimension(data = cube_s2_b8, reducer = p$mean, dimension = "t")
```

**Note:** `p$mean` means that we are using the predefined `mean` function provided by openEO.

</template>
<template v-slot:js>

```js
// reduce dimension, use builder$mean to give reducer
var cube_s2_b8_red = builder.reduce_dimension(data = cube_s2_b8, reducer = builder.mean, dimension = "t");
```

**Note:** `builder.mean` means that we are using the predefined `mean` function provided by openEO.

</template>
</CodeSwitcher>

## Output: `save_result`

To get a result, we first need to create a `save_result` node, in which we state the desired output format and potential parameters, both dependent on the backend you are connected to. The output formats and their parameters can e.g. be explored via the web editor: top-right corner, button "i Server".

We then proceed to send that job to the backend, _without executing it_. Refer to the getting started guides on how to process results as batch or synchronous jobs. The way it is stated here allows us to log in to the web editor and look at, change, and execute the job from there.

### Raster Formats: GTiff, NetCDF, PNG

In the example, GeoTiff files are produced. You can also replace `GTiff` with `NetCDF`.

<CodeSwitcher>
<template v-slot:py>

```python
# save using save_result, give format as string
res = cube_s2_b8_red.save_result(format = "GTiff")
# send job to backend, do not execute
job = res.send_job(title = "mean_cube_py")
```

</template>
<template v-slot:r>

```r
# use list_file_formats() to be able to choose from a list
formats <- list_file_formats()

# save using save_result, give format via list
res <- p$save_result(data = cube_s2_b8_red, format = formats$output$GTiff)

# send job to backend
job <- create_job(graph = res, title = "mean_cube_r")
```

</template>
<template v-slot:js>

```js
// save using save_result, give fomat as string
result = builder.save_result(data = cube_s2_b8_red, format = "GTiff");

// send job to backend, but don't execute yet
var job = await con.createJob(result, "mean_cube_js");
```

</template>
</CodeSwitcher>

For a `PNG` output, we need to create the three channels red, green and blue.

### Text Formats: *JSON, CSV



## Troubleshooting

Only a collection for now.

- is the result properly saved?
- what is actually in the result? does it contain too many timesteps or bands? has the result been aggregated?
- have bands been renamed or are you trying to merge three cubes that all have the same band name? (of course monthly aggregation usuall done diffrently (agg_temp))
- parameters that are named dependent on backend: collection name, exact band name, output format (?), 

You have **feedback or** noticed an **error**? Feel free to open an issue in the [github repository](https://github.com/Open-EO/openeo.org) or use the [other communication channels](https://openeo.org/contact.html)

* add filter bands to show python .bands and other filtr_bands?
