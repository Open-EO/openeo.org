## Spatial data cubes

A *spatiotemporal* data cube is a multidimensional array with one or more spatial or temporal dimensions.
In the EO domain, it is common to be implicit about the temporal dimension and just refer to them as *spatial* data cubes in short.
Special cases are raster and vector data cubes.

The figure below shows the data of
a four-dimensional (8 x 8 x 2 x 2) raster data cube, with dimension names
and labels:

| #    | dimension name | dimension labels |
| ---- | -------------- | ---------------- |
| 1    | x              | 288790.5, 288819, 288847.5, 288876, 288904.5, 288933, 288961.5, 288990 |
| 2    | y              | 9120747, 9120718, 9120690, 9120661, 9120633, 9120604, 9120576, 9120547 |
| 3    | band           | `red`, `green` |
| 4    | time           | `2018-02-10`, `2018-02-17` |

<figure>
  <img src="./datacube-example.png" alt="Data cube example">
  <figcaption>Dimensions x and time are aligned along the x-axis; y and band are aligned along the y-axis.</figcaption>
</figure>

Data cubes as defined here have a _single value_ (scalar) for each
unique combination of dimension labels.  The value pointed to by
arrows corresponds to the combination of x=288847.5 (red arrow),
y=9120661 (yellow arrow), band=red (blue arrow), time=2018-02-17 (green arrow),
and its value is 84 (brown arrow).

If the data concerns grayscale imagery, we could call this _single_
value a _pixel value_. One should keep in mind that it is _never_
a tuple of, say, `{red, green, blue}` values.  "Cell value of a
single raster layer" would be a better analogy; _data cube cell
value_ may be a good compromise.

A data cube stores some additional properties per dimension such as:

* name
* axis / number
* type
* extents *or* nominal dimension labels
* [reference systems / projections](#coordinate-reference-system-as-a-data-cube-dimension)
* resolutions

Having these properties available allows to easily resample from one data cube to another for example.

Dimension labels are either of type number or string, including all sub types such as integers or temporal strings.
Additional data types may be allowed in the future.
Dimensions with a natural/inherent label order (with a reference system this is each spatial and temporal dimensions) are always sorted.
Other dimensions where there is no inherent order, including bands, they have the order in which they have been defined in metadata or processes (e.g. `filter_bands`) and new labels are added at the end.

### apply: processes that process individual values

`apply` and the `apply_*` processes work on individual values (pixels) and 
usually don't reduce or change the array dimensions much.

The process [`apply`](processes.md#apply) can be used to apply (map) unary functions to all values in
a data cube without changing any dimensions at all.

The process [`apply_dimension`](processes.md#apply_dimension) applies an n-ary function to a particular
dimension.

::: tip Examples
- Simplified: `apply([🌽, 🥔, 🐔], cook) => [🍿, 🍟, 🍗]`
- `apply`: Apply a mathematical operation such as [`absolute`](processes.md#absolute), e.g. `apply([-1, 2, -3], absolute) => [1, 2, 3]`
- `apply_dimension`: apply a moving average filter along the time dimension to implement temporal smoothing
:::

### filter: subsetting dimensions by dimension label selection

The `filter_*` processes makes a cube smaller by selecting specific
value ranges for a particular dimension.

::: tip Examples
- Simplified: `filter([🌽, 🥔, 🐔], isVegetarian) => [🌽, 🥔]`
- [`filter_bands`](processes.md#filter_bands): a band filter that selects the `red` band
- [`filter_spatial`](processes.md#filter_spatial): a spatial filter that "crops" the data cube to the boundaries of Italy
- [`filter_temporal`](](processes.md#filter_temporal): a temporal filter that retains only the data for 2020
:::

### reduce: removing dimensions entirely by computation

The `reduce_*` processes remove a dimension by "rolling up" or summarizing
the values along that dimension to a single value.

::: tip Examples
- Simplified: `reduce(🥬, 🥒, 🍅, 🧅) => 🥗`
- [`reduce_dimension`](processes.md#reduce_dimension):
    - Eliminate the time dimension by calculating the [`mean`](processes.md#mean)
    - Eliminate the band dimension by calculating the [`NDVI`](processes.md#ndvi)
:::

### aggregate: reducing resolution

Aggregation computes new values from sets of values that are assigned to groups. The assignment to the groups is not necessarily unique. It involves a grouping predicate (e.g. monthly, 100 m x 100 m grid cells, or a set of non-overlapping spatial polygons), and an reducer (e.g., `mean`) that computes one or more new values from the original ones.

In effect, the `aggregate_*` processes combine the following three steps:

- _split_ the data cube in groups, based on dimension constraints (time intervals, band groups, spatial polygons)
- _apply_ a reducer to each group (similar to the `reduce_dimension` process, but reducing a group rather than an entire dimension)
- _combine_ the result to a new data cube, with some dimensions having reduced resolution (or e.g. raster to vector converted)

::: tip Examples
- Simplified: `aggregate(👪 👩‍👦 👨‍👩‍👦‍👦, countFamilyMembers) => [3️⃣, 2️⃣, 4️⃣]`
- [`aggregate_temporal_period`](processes.md#aggregate_temporal_period): a weekly time series may be aggregated to monthly values by computing the `mean` for all values in a month (grouping predicate: month)
- [`aggregate_spatial`](processes.md#aggregate_spatial): spatial aggregation that computes `mean` pixel values for each country (grouping predicate: country area)
:::

### resample: changing data cube geometry

Resampling - using the `resample_*` processes - considers the case where we have data at one resolution and coordinate reference system, and need values at another. In case we have values at a 100 m x 100 m grid and need values at a 10 m x 10 m grid, the original values will be reused many times, and may be simply assigned to the nearest high resolution grid cells (nearest neighbor method), or may be interpolated using various methods (e.g. by bilinear interpolation). This is often called _upsampling_ or _upscaling_. 

Resampling from finer to coarser grid is a special case of aggregation often called _downsampling_ or _downscaling_.

When the target grid or time series has a lower resolution (larger grid cells) or lower frequency (longer time intervals) than the source grid, aggregation might be used for resampling. For example, if the resolutions are similar, (e.g. the source collection provides 10 day intervals and the target needs values for 16 day intervals), then some form of interpolation may be more appropriate than aggregation as defined here.

Another use case of resampling in openEO is to change the projection of the data cube.

::: tip Examples
- Simplified:
    - `resample(🖼️, downscale) =>🟦`
    - `resample(🌍, reproject) => 🗺️`
- Downsample from 1 meter resolution to 100 meter resolution
- Upsample from 20 meter resolution to 10 meter resolution
- Reproject from WGS84 to Web Mercator projection
:::

### Coordinate reference system as a data cube dimension

In the data cube example above, _x_ and _y_ dimension values have a _unique_ relationship to world coordinates through their coordinate reference system (crs). This implies that a single coordinate reference system is associated with these _x_ and _y_ dimensions. If we want to create a data cube from multiple tiles spanning different coordinate reference systems (e.g. Sentinel-2: different UTM zones), we would _have_ to resample/warp those to a single coordinate reference system. In many cases, this is wanted because we want to be able to _look_ at the result, meaning it is available in a single coordinate reference system.

Resampling is however costly, involves (some) data loss, and is in general not reversible. Suppose that we want to work only on the spectral and temporal dimensions of a data cube, and do not want to do any resampling. In that case, one could create one data cube for each coordinate reference system. An alternative would be to create one _single_ data cube containing all tiles that has an _additional dimension_ with the coordinate reference system. In that data cube, _x_ and _y_ no longer point to a unique world coordinate, because identical _x_ and _y_ coordinate pairs occur in each UTM zone. Now, only the combination (_x_, _y_, _crs_) has a uniqe relationship to the world coordinates.

On such a _crs-dimensioned data cube_, several operations make perfect sense, such as `apply` or `reduce_dimension` on spectral and/or temporal dimensions. A simple reduction over the `crs` dimension, using _sum_ or _mean_ would typically not make sense. The "reduction" (removal) of the `crs` dimension that is meaningful involves the resampling/warping of all sub-cubes for the `crs` dimension to a single, common target coordinate reference system.
