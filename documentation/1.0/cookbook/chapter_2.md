# OpenEO Cookbook - Chapter 2

In this second part of the cookbook, things are a bit less linear. We'll mostly explore bandmath, masking and `apply_*` functionality, only that processes are less interconnected than in the first tutorial. As before, you can change your preferred client language in the top right corner of all code examples. 

Of course we'll load a collection to work with (Sentinel 2, bands 2, 4 and 8). let's call it `cube_s2`.

<CodeSwitcher>
<template v-slot:py>

```python
urk = {"west": 5.5661, "south": 52.6457, "east": 5.7298, "north": 52.7335}
t = ["2021-04-26", "2021-04-29"]

cube_s2 = con.load_collection(
    "SENTINEL2_L2A_SENTINELHUB",
    spatial_extent = urk,
    temporal_extent = t,
    bands = ["B02", "B04", "B08", "SCL"]
)
```

</template>
<template v-slot:r>

```r
urk <- list(west = 5.5661, south = 52.6457, east = 5.7298, north = 52.7335)
t <- c("2021-04-26", "2021-04-29")

cube_s2 <- p$load_collection(
  id = "SENTINEL2_L2A_SENTINELHUB",
  spatial_extent = urk,
  temporal_extent = t,
  bands=c("B02", "B04", "B08", "SCL")
)
```

</template>
<template v-slot:js>

```js
let urk = {"west": 5.6061, "south": 52.6957, "east": 5.7298, "north": 52.7335};
let t = ["2021-04-26", "2021-04-29"];   

var cube_s2 = builder.load_collection(
    "SENTINEL2_L2A_SENTINELHUB",
    urk,
    t,
    ["B02", "B04", "B08", "SCL"]
);
```

</template>
</CodeSwitcher>

## `apply`ing unary Processes
As we remember from the [datacube guide](../datacubes.md#apply), unary processes take only the pixel itself into account when calculating new pixel values. We can implement that with the `apply` function.

- sqrt
- log

## Calculations involving bands, aka Bandmath
More elaborate bandmath usually includes multiple bands and various mathematical operations. In openEO, this goes along with using `reduce_dimension` over the `bands` dimension, replacing multiple pixel values with the calculated value, to then eliminate the `bands` dimension altogether.

### NDVI

In [chapter one](), we already saw different ways of defining a child process: a) pass a simple `mean` to [reduce the time dimension](../cookbook/#temporal-mean-reduce-dimension), and b) to access and use the openEO defined `linear_scale_range` function [to scale all pixels](../cookbook/#scale-all-pixels-linearly-apply-linear-scale-range). In this chapter, we'll see even more ways to define a child process. It is up to you to choose one that's easiest for you.

The first method is universal to all clients: Defining a function and passing it to the process, in this case: `reduce_dimension`. The following section contains a more detailed description for each client.

<CodeSwitcher>
<template v-slot:py>

```python
# necessary imports
from openeo.processes import array_element, normalized_difference

# define an NDVI function
def ndvi_fun(data):
    B04 = array_element(data, index = 0) # array_element takes either an index ..
    B08 = array_element(data, label = "B08") # or a label

    # ndvi = (B08 - B04) / (B08 + B04) # implement NDVI as formula ..
    ndvi = normalized_difference(B08, B04) # or use the openEO "normalized_difference" process
    
    return ndvi

# supply the defined function to a reduce_dimension process, set dimension = "bands"
cube_s2_ndvi = cube_s2.reduce_dimension(reducer = ndvi_fun, dimension = "bands")
```

What we see above:
* access specific bands inside the child process: `array_element` (supply data and index/label)
* call openEO defined functions inside the child process by importing it: `from openeo.processes import normalized_difference`
* write math as formulas inside the child process: `ndvi = (B08 - B04) / (B08 + B04)`

The python client also hold a second possibility to do the above. It has a function `band` that does `array_element` and `reduce_dimension(dimension = "bands")` for us. When using it, we can type out the NDVI formula right in the script.

```python
# use "band()"
B04 = cube_s2.band("B04")
B08 = cube_s2.band("B08")

cube_s2_ndvi = (B08 - B04) / (B08 + B04) # type math formula
```

</template>
<template v-slot:r>

```r
# define an NDVI function
ndvi_fun <- function(data, context) {
  B04 <- data[2] # we can supply an index (1-based in R) ..
  B08 <- data["B08"] # or a label
  
  # ndvi <- (B08 - B04) / (B08 + B04) # implement NDVI as formula ..
  ndvi <- p$normalized_difference(B08, B04) # or use the openEO "normalized_difference" process
  # ndvi <- p$normalized_difference(data[2], data[3]) # or shorten all in one line

  return(ndvi)
}

# supply the defined function to a reduce_dimension process, set dimension = "bands"
cube_s2_ndvi <- p$reduce_dimension(data = cube_s2, reducer = ndvi_fun, dimension = "bands")
```

What we see above:
* access specific bands inside the child process by using array subset: `data[index]` or `data["bandname"]`
* call openEO defined functions inside the child process by calling it via the `p` processes environment: `p$normalized_difference`
* write math as formulas inside the child process: `ndvi <- (B08 - B04) / (B08 + B04)`

In R, there are no other ways to define a child process than through defining a function as seen above.

</template>
<template v-slot:js>

```js
// define NDVI function
var ndvi_fun = function(data, context) {
    B04 = data[0] // use array operator to extract bands
    B08 = data["B08"] // or supply label

    // Either approach down below works:

    // dif = this.subtract(B08, B04) // use "this" to access openEO processes inside this function
    // sum = this.sum(B08, B04)
    // ndvi = this.divide(dif, sum)

    ndvi = this.normalized_difference(B08, B04) // or use predefined "normalized_difference" instead of math

    // ndvi = this.normalized_difference(data[1], data[0]) // or shorten it all into one line
    
    return ndvi
}

// supply the defined function to a reduce_dimension process, set dimension = "bands"
cube_s2_ndvi = builder.reduce_dimension(cube_s2, ndvi_fun, "bands")
```

What we see above:
* access specific bands inside the child process by using array subset: `data[index]` or `data["bandname"]`
* call openEO defined functions inside the child process by calling it via `this`

We note that Javascript doesn't support just typing out math functions as R and Python do. But the JS client has another, even simpler way of defining quick bandmath: using `New Formula`.

```js
// using "New Formula()", both $index and $label are valid as seen here
cube_s2_ndvi = builder.reduce_dimension(cube_s2, new Formula("($B08 - $1) / ($B08 + $1)"), "bands")
```

We see that using `New Formula("")` is much faster than defining a whole child process. We use `$` to access bands. If we want to use openEO defined processes, there's also the arrow function to still be able to do that in-line.

```js
// using an arrow function to call openeo process "normalized_difference"
cube_s2_ndvi = builder.reduce_dimension(cube_s2, (data, _, child) => child.normalized_difference(data[2], data[1]), "bands")
```

In an arrow function, we have array subsets again.

</template>
</CodeSwitcher>

### EVI

The formula for EVI is a bit more complicated than the NDVI one, but we also don't necessarily need need a openEO defined function, but can concentrate on implementing a more complex formula. Here's the most efficient way to do this, per client.

<CodeSwitcher>
<template v-slot:py>

```python
# extract and reduce all bands via "band"
B02 = cube_s2.band("B02")
B04 = cube_s2.band("B04")
B08 = cube_s2.band("B08")

# write formula
evi_cube = (2.5 * (B08 - B04)) / ((B08 + 6.0 * B04 - 7.5 * B02) + 1.0)
```

</template>
<template v-slot:r>

```r
# in R, there's no shorter way to define bandmath
evi_ <- function(x, context) {
  b2 <- x[1]
  b4 <- x[2]
  b8 <- x[3]
  return((2.5 * (b8 - b4)) / ((b8 + 6 * b4 - 7.5 * b2) + 1))
}

# reduce_dimension bands with the defined formula
evi_cube <- p$reduce_dimension(data = cube_s2_b348, reducer = evi_, dimension = "bands")
```

</template>
<template v-slot:js>

```js
// "new Formula" is the quickest way to provide a bandmath formula
evi_cube = builder.reduce_dimension(cube_s2, new Formula("(2.5 * ($2 - $1)) / (($2 + 6 * $1 - 7.5 * $0) + 1)"), "bands")
```

</template>
</CodeSwitcher>

## Mask

In some cases we want to mask our data with other data. A common example is to mask out clouds, which optical satellites can not see through. Many Sentinel 2 collections also provide the `SCL` classification band (see class table [at the bottom here](https://sentinels.copernicus.eu/web/sentinel/technical-guides/sentinel-2-msi/level-2a/algorithm)). In this classification, vegetation is coded as `4` and non-vegetation as `5`, while e.g. clouds are coded as `8` t0 `10`.

In the following, we're building a mask using some logical operations to apply in a `reduce_dimension(dimension = "bands")` process. We are then masking our previously calculated NDVI with said mask.

<CodeSwitcher>
<template v-slot:py>

```python
# get classification band
SCL = cube.band("SCL")

# we wanna mask all other values, so NOT (4 OR 5)
mask = ~ ((SCL == 4) | (SCL == 5))

# masking
masked_ndvi = ndvi.mask(mask)
```

</template>
<template v-slot:r>

```r
# define filter function to create mask
filter_ <- function(data, context) {
  SCL <- data[4] # select SCL band
  vegetation <- p$eq(SCL, 4) # vegetation is 4
  non_vegetation <- p$eq(SCL, 5) # non-vegetation is 5
  # we wanna mask all other values, so NOT (4 OR 5)
  return(p$not(p$or(vegetation, non_vegetation)))
}

# create mask by reducing bands with our defined formula
cube_s2_mask <- p$reduce_dimension(data = cube_s2, reducer = filter_, dimension = "bands")

# mask the NDVI data
cube_s2_masked <- p$mask(cube_s2_ndvi, cube_s2_mask)
```

</template>
<template v-slot:js>

```js
// filter classification layer
var filter_ = function(data, context) {
  SCL = data[3]
  vegetation = this.eq(SCL, 4)
  non_vegetation = this.eq(SCL, 5)
  return this.not(this.or(vegetation, non_vegetation))
}

// create mask by reducing bands
cube_s2_mask = builder.reduce_dimension(cube_s2, filter_, "bands")

// mask
cube_s2_masked = builder.mask(cube_s2_ndvi, cube_s2_mask)
```

</template>
</CodeSwitcher>

## Calculations Involving Other Neighbourhoods



## `apply_kernel`



## `apply_dimension`