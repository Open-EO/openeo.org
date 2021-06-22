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
    bands = ["B02", "B04", "B08"]
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
  bands=c("B02", "B04", "B08")
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
    ["B02", "B04", "B08"]
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

The three clients each have slightly different methodology, which is why the following section is written completely client-dependent. So by choosing a client language, almost all text for the rest of this chapter changes.

The first method is universal to all clients: Writing a function and supplying it to `reduce_dimension`:

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

Above, we see ways to access specific bands of a datacube (`array_element`) by index and label, call openEO functions in child processes (`from openeo.processes import normalized_difference`), and write math as a formula (`(B08 - B04 ...`).

Second possibility:

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

We observe that we can access specific bands in child processes just by using an array subset (`data[2]`), that we can write math expressions in them simply as code (`(B08 - B04 ..`)) and that we can access openEO processes by using `p$..`.

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

We note that Javascript doesn't support just typing out math functions as R and Python do.

New Formula

```js
// using "New Formula()", both $index and $label are valid as seen here
cube_s2_ndvi = builder.reduce_dimension(cube_s2, new Formula("($B08 - $1) / ($B08 + $1)"), "bands")
```

Arrow function:

```js
// using an arrow function to call openeo process "normalized_difference"
cube_s2_ndvi = builder.reduce_dimension(cube_s2, (data, _, child) => child.normalized_difference(data[2], data[1]), "bands")
```


</template>
</CodeSwitcher>


## Mask



## Calculations Involving Other Neighbourhoods



## `apply_kernel`



## `apply_dimension`