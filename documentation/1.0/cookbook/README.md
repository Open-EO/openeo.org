# OpenEO Cookbook

This is the openEO cookbook that you can refer to to get a first idea on how to solve problems with openEO in the three client languages Python, R and JavaScript. It describes how to implement simple use cases in a pragmatic way.

Please refer to the getting started guides for [JavaScript](../javascript/index.md), [Python](../python/index.md) and [R](../r/index.md) if you have never worked with one of the openEO client libraries before. This guide requires you to have a basic idea of how to establish a connection to a back-end and how to explore that back-end.

::: tip References
* [openEO processes documentation](../processes.md)
* [openEO Hub](https://hub.openeo.org) to discover back-ends with available data and processes
* [openEO Web Editor](https://editor.openeo.org) to visually build and execute processing workflows
_____________________
* [Python client documentation](https://open-eo.github.io/openeo-python-client/index.html)
* [JavaScript client documentation](https://open-eo.github.io/openeo-js-client/1.3.1/index.html)
:::

In this example, we want to explore the different output formats that are possible with openEO. For that, we load and filter a collection (a datacube) of satellite data and calculate the temporal mean of that data. Different steps (e.g. a linear scaling) are done to prepare for the data to be output in one of the formats: Raster or text data.

Throughout these guides, code examples for all three client languages are given. Select your preferred language with the code switcher on the right-hand side to set all examples to that language.

## Connecting to a back-end

Click the link below to see how to connect to a back-end (via OpenID Connect). You can call the connection object `con` as it is done in all following code, to avoid confusion throughout the rest of the tutorials.

<CodeSwitcher>
<template v-slot:py>

[Getting started: Authentication](../python/#openid-connect-authentication)

</template>

<template v-slot:r>

[Getting started: Authentication](../r/#openid-connect-authentication)

</template>

<template v-slot:js>

[Getting started: Authentication](../javascript/#openid-connect-authentication)

</template>

</CodeSwitcher>

In R and JavaScript it is very useful to assign a graph-building helper object to a variable, to easily access all openEO processes and add them to the process graph that you will be building. These objects will be used throughout this guide. In Python, it also helps to import a helper object, even though we'll need it less often.

<CodeSwitcher>
<template v-slot:py>

```python
# import ProcessBuilder functions
from openeo.processes import ProcessBuilder
```

**Note:** Many functions in _child processes_ (see below), are instances of this `ProcessBuilder` import.

</template>
<template v-slot:r>

```r
# assign the graph-building helper object to "p" for easy access to all openEO processes, see > ?processes()
p <- processes()
```

**Note:** In all R code, `p` is used to select openEO processes.

</template>
<template v-slot:js>

```js
// assign the graph-building helper object to "builder" for easy access to all openEO processes
var builder = await con.buildProcess();
```

**Note:** In all JavaScript code, `builder` is used to select openEO processes.

</template>
</CodeSwitcher>

## Input: `load_collection`

Before loading a collection, we need to find out the exact name of a collection we want to use (back-end-specific, see references [at the top](#openeo-cookbook)). We assign the spatial and temporal extent to variables, so that we can re-use them on other collections we might want to load. Let's look for a Sentinel 2 (preprocessed level 2A preferably) collection and load the green, red and a near-infrared band (bands 3, 4 and 8). Also check with the back-end (refer to collection description) for the correct naming of bands (`B08` vs `B8`).

We'll name our collection very explicitly `cube_s2_b348` as to not get confused later on.

<CodeSwitcher>
<template v-slot:py>

```python
# make dictionary, containing bounding box
urk = {"west": 5.5661, "south": 52.6457, "east": 5.7298, "north": 52.7335}
# make list, containing the temporal interval
t = ["2021-04-26", "2021-04-30"]

# load first datacube
cube_s2_b348 = con.load_collection(
    "SENTINEL2_L2A_SENTINELHUB",
    spatial_extent = urk,
    temporal_extent = t,
    bands = ["B3", "B4", "B8"]
)
```

</template>
<template v-slot:r>

```r
# create variables for loading collection
urk <- list(west = 5.5661, south = 52.6457, east = 5.7298, north = 52.7335)

t <- c("2021-04-26", "2021-04-30")

# load first datacube
cube_s2_b348 <- p$load_collection(
  id = "SENTINEL2_L2A_SENTINELHUB",
  spatial_extent = urk,
  temporal_extent = t,
  bands=c("B3", "B4", "B8")
)
```

</template>
<template v-slot:js>

```js
// make spatial and temporal extent
let urk = {"west": 5.5661, "south": 52.6457, "east": 5.7298, "north": 52.7335};

let t = ["2021-04-26", "2021-04-30"];   

// load first cube
var cube_s2_b348 = builder.load_collection(
    "SENTINEL2_L2A_SENTINELHUB",
    urk,
    t,
    ["B3", "B4", "B8"]
);
```

**Note:** JavaScript doesn't use parameter names (like Python and R), so the parameters need to be in the order that they are defined in the [openEO processes documentation](../processes.md).

</template>
</CodeSwitcher>

## Filter Bands: `filter_bands`

To go through the desired output formats, we'll need one collection with three bands, and one collection with only one band. Here we use `filter_bands`, when of course we could also just define a separate collection via `load_collection`. As our input datacube already has the required three bands, we filter it for a single band to create an additional datacube with the same spatial and temporal extent, but with only one band (band 8). 

We'll name this one `cube_s2_b8` to distinguish it from the original `cube_s2_b348`.

<CodeSwitcher>
<template v-slot:py>

```python
# filter for band 8
cube_s2_b8 = cube_s2_b348.filter_bands(bands = ["B8"])
```

</template>
<template v-slot:r>

```r
# filter for band 8
cube_s2_b8 <- p$filter_bands(data = cube_s2_b348, bands = c("B8"))
```

</template>
<template v-slot:js>

```js
// filter for band 8
var cube_s2_b8 = builder.filter_bands(cube_s2_b348, ["B08"])
```

</template>
</CodeSwitcher>

## Temporal Mean: `reduce_dimension`

As we don't want to download the raw collection of satellite data, we need to reduce that data somehow. That means, we want to get rid of one dimension. Let's say we calculate a `mean` over all timesteps, and then drop the temporal dimension (as it's empty then anyway, see explanation in the [datacube guide](../datacubes.md#reduce)). This can be done via `reduce_dimension()`. The function requires a reducer, in our case a `mean` process, and the dimension over which to reduce, given as a string (`"t"`). 

:::tip Child Processes
Here, we need to define a child process: A function that is called by (or passed to) another function, and then works on a subset of the datacube (somewhat similar to the concept of callbacks in JavaScript). In this case: We want `reduce_dimension` to use the `mean` function to average all timesteps of each pixel. Not any function can be used like this, it must be defined by openEO, of course.

All clients have more or less different specifics when defining a child process. As you can observe directly below, one way to define one is to define the function directly inside the parent process.

For a more clean way to define a child process, see the chapter below.
:::

<CodeSwitcher>
<template v-slot:py>

```python
# reduce all timesteps
# mean_time() is a shortcut function
cube_s2_b8_red = cube_s2_b8.mean_time()

# alternatively, 'reduce_dimension' can be used
cube_s2_b8_red = cube_s2_b8.reduce_dimension(dimension="t", reducer="mean")

# additionally, reduce second collection
cube_s2_b348_red = cube_s2_b348.mean_time()
```

**Note:** In python, the child process can be a string.

</template>
<template v-slot:r>

```r
# reduce dimension, first collection
cube_s2_b8_red <- p$reduce_dimension(data = cube_s2_b8, reducer = function(data, context) { p$mean(data) }, dimension = "t")

# reduce, second collection
cube_s2_b348_red <- p$reduce_dimension(data = cube_s2_b348, reducer = function(data, context) { p$mean(data) }, dimension = "t")
```

**Note:** In R, we can select a child process from the `p` helper object.

</template>
<template v-slot:js>

```js
// reduce dimension
var cube_s2_b8_red = builder.reduce_dimension(cube_s2_b8, (data, _, child) => child.mean(data), "t");

// second collection
var cube_s2_b348_red = builder.reduce_dimension(cube_s2_b348, (data, _, child) => child.mean(data), "t");
```

**Note:** In JavaScript, arrow functions can be used as child processes.

</template>
</CodeSwitcher>

## Scale All Pixels Linearly: `apply`, `linear_scale_range`

To create a PNG output, we need to scale the satellite data we have down to the 8bit range of a PNG image. For this, the scale range of our imagery has to be known. For Sentinel 2 over urban and agricultural areas, we can use `6000` as a maximum.

We'll use the process `linear_scale_range`. It takes a number and the four borders of the intervals as input. Because it works on a number and not a datacube as all processes discussed so far, we need to nest the process into an `apply`, once again defining a child process. `apply` applies a unary process to all pixels of a datacube.

This time we'll also define our child processes externally, as to not get confused in too much code nesting.

<CodeSwitcher>
<template v-slot:py>

```python
# define child process, use ProcessBuilder
def scale_(x: ProcessBuilder):
    return x.linear_scale_range(0, 6000, 0, 255)

# apply scale_ to all pixels
cube_s2_b348_red_lin = cube_s2_b348_red.apply(scale_)
```

**Resource:** Refer to the [Python client documentation](https://open-eo.github.io/openeo-python-client/processes.html#processes-with-child-callbacks) to learn more about child processes in Python.

</template>
<template v-slot:r>

```r
# define child process
scale_ <- function(x, context) {
  p$linear_scale_range(x, inputMin = 0, inputMax = 6000, outputMin = 0, outputMax = 255)
}

# apply scale range to all pixels
cube_s2_b348_red_lin <- p$apply(data = cube_s2_b348_red, process = scale_)
```

</template>
<template v-slot:js>

```js
// define child process (long way)
var scale_ = function(x, context) {
    return this.linear_scale_range(x, 0, 6000, 0, 255)
}

// we could also use an arrow function here to abbreviate
// var scale_ = (x, context, child) => child.linear_scale_range(x, 0, 6000, 0, 255)

// apply child process to all pixels
var cube_s2_b348_red_lin = builder.apply(cube_s2_b348_red, scale_);
```

**Note:** Given the two ways of defining a child process above, we can see that in the long way, the builder is available as `this`, while in arrow functions, it has to be passed as the last argument (here called `child`).

</template>
</CodeSwitcher>

## Spatial Aggregation: `aggregate_spatial`

To look at text output formats we first need to "de-spatialize" our data. Or put another way: If we're interested in e.g. timeseries of various geometries, text output might be very interesting for us.

To aggregate over certain geometries, we use the process `aggregate_spatial`. It takes valid GeoJSON as input. We can pass a GeoJSON `FeatureCollection` in Python and JavaScript, but we need to introduce two packages in R, `sf` and `geojsonsf`, to convert the `FeatureCollection` `string` to a `simple feature collection`.

<CodeSwitcher>
<template v-slot:py>

```python
# polygons as (geojson) dict
pols = { "type": "FeatureCollection", "features": [ { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [ [ [ 5.636715888977051, 52.6807532675943 ], [ 5.629441738128662, 52.68157281641395 ], [ 5.633561611175536, 52.67787822078012 ], [ 5.636715888977051, 52.6807532675943 ] ] ] } }, { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [ [ [ 5.622982978820801, 52.68595649102906 ], [ 5.6201934814453125, 52.68429152697491 ], [ 5.628776550292969, 52.683719180920846 ], [ 5.622982978820801, 52.68595649102906 ] ] ] } } ]}

# aggregate spatial
cube_s2_b8_agg = cube_s2_b8.aggregate_spatial(geometries = pols, reducer = "mean")

# alternatively, the python client has a shortcut function for this special case
# cube_s2_b8_agg = cube_s2_b8.polygonal_mean_timeseries(polygon = pols)
```

</template>
<template v-slot:r>

```r
# load sf and geojsonsf
library(sf)
library(geojsonsf)

# create string containing the geojson FeatureCollection
pol_string <- '{ "type": "FeatureCollection", "features": [ { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [ [ [ 5.636715888977051, 52.6807532675943 ], [ 5.629441738128662, 52.68157281641395 ], [ 5.633561611175536, 52.67787822078012 ], [ 5.636715888977051, 52.6807532675943 ] ] ] } }, { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [ [ [ 5.622982978820801, 52.68595649102906 ], [ 5.6201934814453125, 52.68429152697491 ], [ 5.628776550292969, 52.683719180920846 ], [ 5.622982978820801, 52.68595649102906 ] ] ] } } ]}'
# convert to sf object
pols <- geojson_sf(pol_string)

# add any attribute as a workaround, empty simple features are not accepted
pols$anAttribute <- c(4,5)

# aggregate spatially
cube_s2_b8_agg <- p$aggregate_spatial(data = cube_s2_b8, reducer = function(data, context) { p$mean(data) }, geometries = pols)
```

**Note:** At the time of writing this, empty simple features are not accepted and produce an error. To work around this issue, simply add a random attribute to the `sf` object. Above we are assigning the (randomly chosen) values `4` and `5` to the two polygons in the collection.

</template>
<template v-slot:js>

```js
// define polygons as geojson
var pols = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              5.636715888977051,
              52.6807532675943
            ],
            [
              5.629441738128662,
              52.68157281641395
            ],
            [
              5.633561611175536,
              52.67787822078012
            ],
            [
              5.636715888977051,
              52.6807532675943
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              5.622982978820801,
              52.68595649102906
            ],
            [
              5.6201934814453125,
              52.68429152697491
            ],
            [
              5.628776550292969,
              52.683719180920846
            ],
            [
              5.622982978820801,
              52.68595649102906
            ]
          ]
        ]
      }
    }
  ]
}
   
// aggregate spatial
var cube_s2_b8_agg = builder.aggregate_spatial(cube_s2_b8, pols, (data, _, child) => child.mean(data))
```

</template>
</CodeSwitcher>

## Output: `save_result`

To get a result, we first need to create a `save_result` node, in which we state the desired output format and potential parameters, both dependent on the back-end you are connected to. The output formats and their parameters can e.g. be explored via the Web Editor along with available processes and collections.

We then proceed to send that job to the back-end, _without executing it_. Refer to the getting started guides on how to process results as batch or synchronous jobs. The way it is stated here allows us to log in to the Web Editor and look at, change, and execute the job from there.

### Raster Formats: GTiff, NetCDF

In the example, GeoTiff files are produced. Refer to the back-end for the available formats, options, and their correct naming. Check the [PNG section](#raster-formats-png) for passing options. 

Different from the creation of a PNG image, the raster format doesn't need scaling and the original datacube can be downloaded as is. However, we need to be careful with the dimensionality of the datacube: How a 4+ - dimensional datacube is handled when converted to a raster format is back-end dependent. That is why we [made sure](#temporal-mean-reduce_dimension) that our cube would only contain one additional dimension, apart from the spatial `x` and `y`.

<CodeSwitcher>
<template v-slot:py>

```python
# save using save_result, give format as string
res = cube_s2_b8_red.save_result(format = "GTiff")

# send job to back-end, do not execute
job = res.send_job(title = "temporal_mean_as_GTiff_py")
```

</template>
<template v-slot:r>

```r
# use list_file_formats() to be able to choose from a list
formats <- list_file_formats()

# save using save_result, give format via list
res <- p$save_result(data = cube_s2_b8_red, format = formats$output$GTiff)

# send job to back-end
job <- create_job(graph = res, title = "temporal_mean_as_GTiff_r")
```

</template>
<template v-slot:js>

```js
// save using save_result, give fomat as string
result = builder.save_result(cube_s2_b8_red, "GTiff");

// send job to back-end, but don't execute yet; set title
var job = await con.createJob(result, "temporal_mean_as_GTiff_js");
```

</template>
</CodeSwitcher>

### Raster Formats: PNG

For a PNG output, we'll use the datacube with the bands 3, 4 and 8 (green, red and near-infrared) that we've been working on simultaneously with the datacube used above. As we have scaled the data down to 8bit using a [linear scale](#scale-all-pixels-linearly-apply-linear_scale_range), nothing stands in the way of downloading the data as PNG.

We want to produce a false-color composite highlighting the vegetation in red (as seen below the code). For that, we want to assign the infrared band (`B8`) to the red channel, the red band (`B4`) to the green channel and the green band (`B3`) to the blue channel. Some back-ends may offer to pass along this desired band order as it is shown below. Check with the back-end for available options.

If no options can be passed, handling of the bands for PNG output is internal and should be documented by the back-end. You might also be able to tell how this is done by how your PNG looks: As explained in the [datacube guide](../datacubes.md#dimensions), the order of the `bands` dimension is defined when the values are loaded or altered (in our example: `filter_bands`). As we filter bands in the order `"B3", "B4", "B8"` vegetation might be highlighted in blue, given that the back-end uses the input order for the RGB channels.

<CodeSwitcher>
<template v-slot:py>

```python
# save result cube as PNG
res = cube_s2_b348_red_lin.save_result(format = "PNG", options = {
        "red": "B8",
        "green": "B4",
        "blue": "B3"
      })

# send job to back-end
job = res.send_job(title = "temporal_mean_as_PNG_py")
```

In python, options are passed as a dictionary

</template>
<template v-slot:r>

```r
# use list_file_formats() to be able to choose from a list
formats <- list_file_formats()

# save result as PNG
res <- p$save_result(data = cube_s2_b348_red_lin, format = formats$output$PNG, 
                      options = list(red="B8", green="B4", blue="B3"))

# send job to back-end
job <- create_job(graph = res, title = "temporal_mean_as_PNG_r")
```

In R, options are passed as a list.

</template>
<template v-slot:js>

```js
// save result as PNG
result = builder.save_result(cube_s2_b348_red_lin, "PNG", {
    red: "B8",
    green: "B4",
    blue: "B3"
});
    
// send job to back-end
var job = await con.createJob(result, "temporal_mean_as_PNG_js");
```

In JavaScript, options are passed as objects.

</template>
</CodeSwitcher>

![Example PNG: false color composite highlighting vegetation in red.](../cookbook/urk.png)
Image above: Example PNG output with the vegetation highlighted in red.


### Text Formats: JSON, CSV

We can now save the timeseries in the [aggregated](#spatial-aggregation-aggregate_spatial) datacube as e.g. JSON.

<CodeSwitcher>
<template v-slot:py>

```python
# save result cube as JSON
res = cube_s2_b8_agg.save_result(format = "JSON")

# send job to back-end
job = res.send_job(title = "timeseries_as_JSON_py")
```

</template>
<template v-slot:r>

```r
# use list_file_formats() to be able to choose from a list
formats <- list_file_formats()

# save result as JSON
res <- p$save_result(data = cube_s2_b8_agg, format = formats$output$JSON)

# send job to back-end
job <- create_job(graph = res, title = "timeseries_as_JSON_r")
```

**Note:** Because the R client rounds coordinates to four digits, slightly different results are received in comparison to the other clients.

</template>
<template v-slot:js>

```js
// save as CSV
result = builder.save_result(cube_s2_b8_agg, "JSON");

// send job to back-end
var job = await con.createJob(result, "timeseries_as_JSON_js");
```

</template>
</CodeSwitcher>

## Endnote

You have **feedback or** noticed an **error**? Feel free to open an issue in the [github repository](https://github.com/Open-EO/openeo.org) or use the [other communication channels](https://openeo.org/contact.html)
