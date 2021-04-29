# OpenEO Cookbook

This is the openEO cookbook that you can refer to to get a first idea on how to solve problems with openEO in the three client languages Python, R and JavaScript. It describes how to implement simple use cases in a pragmatic way.

Please refer to the getting started guides for [JavaScript](../javascript/index.md), [Python](../python/index.md) and [R](../r/index.md) if you have never worked with one of the openEO client libraries before. This guide requires you to have a basic idea of how to establish a connection to a back-end and how to explore that back-end.

::: tip References
* [openEO processes documentation](../processes.md)
* [openEO Hub](https://hub.openeo.org) to discover back-ends with available data and processes
* [openEO Web Editor](https://editor.openeo.org) to visually build and execute processing workflows
:::

Throughout these guides, code examples for all three client languages are given. Select your preferred language with the code switcher on the right-hand side to set all examples to that language.

# First Example: Output Formats

In this example, we want to explore the different output formats that are possible with openEO. For that, we load and filter a collection (a datacube) of satellite data and calculate the temporal mean of that data. Different steps (e.g. a linear scaling) are done to prepare for the data to be output in one of the formats: Raster or text data.

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

**Note:** Many functions in _callbacks_ (see below), are instances of this `ProcessBuilder` import.

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

Before loading a collection, we need to find out the exact name of a collection we want to use (back-end-specific, see references [at the top](#openeo-cookbook)). We assign the spatial and temporal extent to variables, so that we can re-use them on other collections we might want to load. Let's look for a Sentinel 2 (preprocessed level 2A preferably) collection and load the RGB (bands 2-4) and the first near-infrared band (band 8). Check with the back-end (refer to collection description) for the correct naming of bands (`B08` vs `B8`).

<CodeSwitcher>
<template v-slot:py>

```python
# make dictionary, containing bounding box
brussels = {"west":4.2369, "south":50.7816, "east":4.5277, "north":50.9305}
# make list, containing the temporal interval
t = ["2020-06-01", "2020-06-15"]

# load first datacube
cube_s2_b8 = con.load_collection(
    "SENTINEL2_L2A_SENTINELHUB",
    spatial_extent = brussels,
    temporal_extent = t,
    bands = ["B02", "B03", "B04", "B08"]
)
```

</template>
<template v-slot:r>

```r
# create variables for loading collection
brussels <- list(west=4.2369, south=50.7816, east=4.5277, north=50.9305)
t <- c("2020-06-01", "2020-06-15")

# load first datacube
cube_s2_b8 <- p$load_collection(
  id = "SENTINEL2_L2A_SENTINELHUB",
  spatial_extent = brussels,
  temporal_extent = t,
  bands=c("B02", "B03", "B04", "B08")
)
```

</template>
<template v-slot:js>

```js
// make spatial and temporal extent
let brussels = {"west":4.2369, "south":50.7816, "east":4.5277, "north":50.9305};
let t = ["2020-06-01", "2020-06-15"];   

// load first cube
var cube_s2_b8 = builder.load_collection(
    "SENTINEL2_L2A_SENTINELHUB",
    spatial_extent = brussels,
    temporal_extent = t,
    bands = ["B02", "B03", "B04", "B08"]
);
```

</template>
</CodeSwitcher>

## Filter Bands: `filter_bands`

To go through the desired output formats, we'll need one collection with three bands, and one collection with only one band. Here we use `filter_bands`, when of course we could also just define two separate collections with the corresponding bands. After this, we have two collections spanning the same spatial and temporal extent, but with different bands.

<CodeSwitcher>
<template v-slot:py>

```python
# filter for band 8
cube_s2_b8 = cube_s2.filter_bands(bands = ["B08"])

# filter for bands 2, 3, 4  
cube_s2_b234 = cube_s2.filter_bands(bands = ["B02", "B03", "B04"])
```

</template>
<template v-slot:r>

```r
# filter for band 8
cube_s2_b8 <- p$filter_bands(data = cube_s2, bands = c("B08"))

# filter for bands 2, 3, 4
cube_s2_b234 <- p$filter_bands(data = cube_s2, bands = c("B02", "B03", "B04"))
```

</template>
<template v-slot:js>

```js
// filter for band 8
var cube_s2_b8 = builder.filter_bands(data = cube_s2, bands = ["B08"])

// filter bands 2, 3, 4
var cube_s2_b234 = builder.filter_bands(data = cube_s2, bands = ["B02", "B03", "B04"]);
```

</template>
</CodeSwitcher>

## Temporal Mean: `reduce_dimension`

As we don't want to download the raw collection of satellite data, we need to reduce that data somehow. That means, we want to get rid of one dimension. Let's say we calculate a `mean` over all timesteps, and then drop the temporal dimension (as it's empty then anyway). This can be done via `reduce_dimension()`. The function requires a reducer, in our case a `mean` process, and the dimension over which to reduce, given as a string (`"t"`). 

:::tip Callbacks
Here, we need to define a **callback**: A function that is called by (or passed to) another function, and then works on a subset of the datacube. In this case: We want `reduce_dimension` to use the `mean` function to average all timesteps of each pixel. Not any function can be used as a callback, it must be defined by openEO, of course.

All clients have more or less different specifics when defining a callback. As you can observe directly below, one way to define a callback is to pass the callback function directly inside the "parent"-function.

For a more clean way to define a callback, see the chapter below.
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
cube_s2_b234_red = cube_s2_b234.mean_time()
```

**Note:** In python, the callback function can be a string.

</template>
<template v-slot:r>

```r
# reduce dimension, first collection
cube_s2_b8_red <- p$reduce_dimension(data = cube_s2_b8, reducer = function(data, context) { p$mean(data) }, dimension = "t")

# reduce, second collection
cube_s2_b234_red <- p$reduce_dimension(data = cube_s2_rgb, reducer = function(data, context) { p$mean(data) }, dimension = "t")
```

**Note:** In R, we can select a callback from the `p` helper object.

</template>
<template v-slot:js>

```js
// reduce dimension
var cube_s2_b8_red = builder.reduce_dimension(data = cube_s2_b8, reducer = new Formula("mean(data)"), dimension = "t");

// second collection
var cube_s2_b234_red = builder.reduce_dimension(data = cube_s2_b234, reducer = new Formula("mean(data)"), dimension = "t");
```

**Note:** In Javascript, `new Formula()` and a string can be used as callback.

</template>
</CodeSwitcher>

## Scale All Pixels Linearly: `apply`, `linear_scale_range`

To create a PNG output, we need to scale the satellite data we have down to the 8bit range of a PNG image. For this, the scale range of our imagery has to be known. For Sentinel 2 over urban and agricultural areas, we can use `6000` as a maximum.

We'll use the process `linear_scale_range`. It takes a number and the four borders of the intervals as input. Because it works on a number and not a datacube as all processes discussed so far, we need to nest the process into an `apply`, once again defining a callback. `apply` applies a unary process to all pixels of a datacube.

This time we'll also define our callbacks externally, as to not get confused in too much code nesting.

<CodeSwitcher>
<template v-slot:py>

```python
# define callback, use ProcessBuilder
def scale_(x: ProcessBuilder):
    return x.linear_scale_range(0, 6000, 0, 255)

# apply scale_ to all pixels
cube_s2_b234_red_lin = cube_s2_b234_red.apply(scale_)
```

**Resource:** Refer to the [Python client documentation](https://open-eo.github.io/openeo-python-client/processes.html#processes-with-child-callbacks) to learn more about Python callbacks.

</template>
<template v-slot:r>

```r
# define callback function
scale_ <- function(x, context) {
  p$linear_scale_range(x, inputMin = 0, inputMax = 6000, outputMin = 0, outputMax = 255)
}

# apply scale range to all pixels
cube_s2_b234_red_lin <- p$apply(data = cube_s2_b234_red, process = scale_)
```

</template>
<template v-slot:js>

```js
// define callback function
var scale_ = function(x, context) {
    return this.linear_scale_range(x, 0, 6000, 0, 255)
}

// apply callback to all pixels
var cube_s2_b234_red_lin = builder.apply(data = cube_s2_rgb_red, scale_);
```

</template>
</CodeSwitcher>

## Output: `save_result`

To get a result, we first need to create a `save_result` node, in which we state the desired output format and potential parameters, both dependent on the back-end you are connected to. The output formats and their parameters can e.g. be explored via the Web Editor along with available processes and collections.

We then proceed to send that job to the back-end, _without executing it_. Refer to the getting started guides on how to process results as batch or synchronous jobs. The way it is stated here allows us to log in to the Web Editor and look at, change, and execute the job from there.

### Raster Formats: GTiff, NetCDF

In the example, GeoTiff files are produced. Refer to the back-end for the available formats, options, and their correct naming. Check the [PNG section](#raster-formats-png) for passing options.

<CodeSwitcher>
<template v-slot:py>

```python
# save using save_result, give format as string
res = cube_s2_b8_red.save_result(format = "GTiff")

# send job to back-end, do not execute
job = res.send_job(title = "calc_mean_via_python")
```

</template>
<template v-slot:r>

```r
# use list_file_formats() to be able to choose from a list
formats <- list_file_formats()

# save using save_result, give format via list
res <- p$save_result(data = cube_s2_b8_red, format = formats$output$GTiff)

# send job to back-end
job <- create_job(graph = res, title = "calc_mean_via_r")
```

</template>
<template v-slot:js>

```js
// save using save_result, give fomat as string
result = builder.save_result(data = cube_s2_b8_red, format = "GTiff");

// send job to back-end, but don't execute yet
var job = await con.createJob(result, "calc_mean_via_javascript");
```

</template>
</CodeSwitcher>

### Raster Formats: PNG

For a PNG output, we'll use the datacube with the bands 2, 3 and 4 (blue, green and red) that we've been working on simultaneously with the cube used above. As we have scaled it down to 8bit using a [linear scale](#scale-all-pixels-linearly-apply-linear_scale_range), nothing stands in the way of downloading the data as PNG. Check with the back-end for available options. 

<CodeSwitcher>
<template v-slot:py>

```python
# save result cube as PNG
res = cube_s2_b234_red_lin.save_result(format = "PNG", options = {
        "red": "B4",
        "green": "B3",
        "blue": "B2"
      })

# send job to backend
job = res.send_job(title = "ex1_png_opt_py")
```

In python, options are passed as a dictionary

</template>
<template v-slot:r>

```r
# use list_file_formats() to be able to choose from a list
formats <- list_file_formats()

# save result as PNG
res <- p$save_result(data = cube2_lin, format = formats$output$PNG, 
                      options = list(red="B4", green="B3", blue="B2"))

# send job to backend
job <- create_job(graph = res, title = "ex1_png_red_r")
```

In R, options are passed as a list.

</template>
<template v-slot:js>

```js
// save result as PNG
result = builder.save_result(data = cube_s2_b234_red_lin, format = "PNG", options = {
    red: "B4",
    green: "B3",
    blue: "B2"
});
    
// send job to backend
var job = await con.createJob(result, "b234_lin_png_js");
```

In JavaScript, options are passed as objects.

</template>
</CodeSwitcher>

### Text Formats: *JSON, CSV


You have **feedback or** noticed an **error**? Feel free to open an issue in the [github repository](https://github.com/Open-EO/openeo.org) or use the [other communication channels](https://openeo.org/contact.html)

