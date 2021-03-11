# Datacubes

Generic Intro

TODOs / Questions:

* color palettes: 
  + bright/dark = high/low values or other way around?
  + lighter or darker in general?
* address as "we"

## What are Datacubes?

Datacubes are multidimensional arrays with one or more spatial or temporal dimension(s). Most importantly, they are the way in which data is represented in OpenEO. They provide a nice and tidy interface for spatiotemproal data and the operations you may want to execute on it. As they are arrays, it might be easiest to look at raster data as an example, even though datacubes can hold vector data as well: Then, the dimensions would have a different meaning. Instead of `x` and `y` they could e.g. represent stations with a number of sensors. Our example data however consists of a 6x7 raster with 4 bands [`red`, `green`, `blue`, `near-infrared`] and 3 time steps [`2020-10-01`, `2020-10-13`, `2020-10-25`], displayed here in an orderly, time series like manner:

<figure>
    <img src="./datacubes/dc_timeseries.png" alt="Datacube timeseries">
    <figcaption>Example datacube</figcaption>
</figure>

It is important to understand that datacubes are designed to make things easier for us, and are not literally a cube, meaning that the above plot is just as good a way to represent the dimensionality than any other. That is why we can display the data how we want and play around a bit with the dimensions, including this view:

<figure>
    <img src="./datacubes/dc_flat.png" alt="Datacube timeseries">
    <figcaption>This is the 'raw' data collection that is included in our example datacube. The grayscale values of the imagery are colored for understandability.</figcaption>
</figure>

## Dimensions
A dimension refers to a certain extent of a datacube. There are the obvious spatial dimensions x and y, and also the temporal dimension t. Furthermore there is the bands dimension, extending into the realm of _what_ is contained in the datacube.

There are multiple additional properties stored for each dimension:

* name
* axis / number
* type
* extents _or_ nominal dimension labels
* reference system / projections
* resolution

Here is an overview of the dimensions contained in our example datacube above:

| # | dimension name | dimension labels | resolution |
|---|----------------|------------------| ---------- |
| 1 | x              | 466380, 466580, 466780, 466980, 467180, 467380, | 10m |
| 2 | y              | 7167130, 7166930, 7166730, 7166530, 7166330, 7166130, 7165930 | 10m |
| 3 | bands          | `blue`, `green`, `red`, `nir` | 4 bands |
| 4 | time           | `2020-10-01`, `2020-10-13`, `2020-10-25` | 12 days |

### Processes on Dimensions
Some processes are typically applied "along a dimension". You can imagine said dimension as an arrow and whatever is happening as a parallel process to that arrow. It simply means: "we focus on _this_ dimension right now".

### Resolution
The resolution of a dimension gives information about what interval lies between observations. This is most obvious with the temporal resolution, where the intervals depict how often obervations were made. Spatial resolution gives information about the pixel spacing, meaning how many 'real world meters' are contained in a pixel. You can also think of how many bands you have as the resolution in the band dimension (i.e. spectral resolution).

## Functions on Datacubes

### Filter

When filtering data, only the data within the filter interval is returned. That can be a time interval, coordinates or specific bands. The datacube is then smaller, according to the selected data.

In the image, the example datacube can be seen in top with labeled dimansions. The filtering techniques are displayed separately below. First, the Datacube is filtered temporally, e.g. with the interval `["2020-10-15", "2020-10-27"]`. The result is a cube with only the rasters for the timestep that lies within that interval (`"2020-10-25"`) and unchanged bands and spatial dimensions. Consecutively, the original cube is filtered for a specific band `[nir]` and a specific region (TODO).

<figure>
    <img src="./datacubes/dc_filter.png" alt="Datacube timeseries">
    <figcaption>Filtering a sample datacube. The input datacube carries all dimension labels.</figcaption>
</figure>

### Apply

The `apply*()` functions employs a process on the datacube, calculating new pixel values for each pixel, based on n other pixels.

For the case n = 1 this is called an unary function and means that only the pixel itself is considered when calculating the new pixel value. A prominent example is the `abs()` function, calculating the absolute value of the input pixel value. 

<figure>
    <img src="./datacubes/dc_apply_unary.png" alt="Datacube timeseries">
    <figcaption>Applying a unary process. Only one band is shown for simplicity.</figcaption>
</figure>

If n is larger than 1, the function is called n-ary. In practice, this means that the pixel neighbourhood is taken into account to calculate the new pixel value. Such nieghbourhoods can be of temporal and/or spatial nature. A temporal (e.g. smoothing) function works on a time series of the same pixel, a spatial function works on a kernel by weighting the surrounding pixels. Original dimensions and their resolutions usually remain unchanged when `apply()`-ing some process.

In the example below, an example weighted kernel (shown in the middle) is applied to the cube. To avoid edge effects (affecting pixels on the edge of the image with less neighbours), a padding has been added in the background.

<figure>
    <img src="./datacubes/dc_apply_kernel.png" alt="Datacube timeseries">
    <figcaption>Applying a spatial kernel. Only values for the first raster are shown as text, although the process is applied to the whole cube.</figcaption>
</figure>

Of course this also works for temporal neighbourhoods (time series), considering neighbours before and after a pixel. To be able to show the effect, two time steps were added in this example figure. A moving average of window size 3 is then applied. This process can be followed from left to right on the highlighted pixel time series. No padding was added which is why we observe edge effects (NA values are calculated for t<sub>1</sub> and t<sub>5</sub>, because they didn't have enough input time steps).

<figure>
    <img src="./datacubes/dc_apply_ts.png" alt="Datacube timeseries">
    <figcaption>Applying a moving average (temporal smoothing). No padding is used.</figcaption>
</figure>

### Resample

In a resampling process, the _layout_ of a certain dimension is changed into another _layout_, most likely also changing the resolution of that dimension. This is done by mapping values of the source (old) datacube to the new layout of the target (new) datacube. During that process, resolutions can be _upscaled_ or _downscaled_ (or ~_sampled_), depending on whether they have a finer or a coarser spacing afterwards. During that process, a function is needed to translate the existing data into the new resolution. A prominent example is to reproject a datacube into the coordinate reference system of another datacube, for example in order to merge the two cubes.

The first figure gives an overview of temporal resampling. How exactly the input time steps are rescaled to the output time steps, depend on the resampling function.

<figure>
    <img src="./datacubes/dc_resample_time.png" alt="Datacube timeseries">
    <figcaption>Temporal resampling</figcaption>
</figure>

The second figure displays spatial resampling. Common resampling methods are "near" and "bilinear". Observe how in the upsampling process, the output has not gained in information value. The resulting grid still carries the same pixel information, but in higher spatial resolution.

<figure>
    <img src="./datacubes/dc_resample_space.png" alt="Datacube timeseries">
    <figcaption>Spatial resampling</figcaption>
</figure>

### Reduce

The `reduce_dimension*()` process _collapses_ a whole dimension of the datacube. It does so by using some sort of _reducer_, which is a function that calculates a single result from an amount of values, as e.g. `mean()`, `min()` and `max()` are. For example can we reduce the time dimension of a time series by calculating the mean value out of all time steps for each pixel. We are left with a cube that has no time dimension, because all values are compressed into a single mean value. The same goes for e.g. the spatial dimensions: If we calculate the mean along the `x` and `y` dimensions, we are left without any spatial dimensions, but a mean value for each instance that previously was a raster. In the image below, the dimensions that are reduced are crossed out in the result (TODO: make explicit for space?).

Think of it as a waste press that does math instead of using brute force. Given a representation of our example data cube, let's see how it is affected.

<figure>
    <img src="./datacubes/dc_reduce.png" alt="Datacube timeseries">
    <figcaption>Overview of reducing a sample datacube. Dimensions that are reduced are crossed out in the result images</figcaption>
</figure>

### Aggregate

An aggregation of a datacube can be thought of as a grouped reduce. That means it consists of two steps: 

1. Grouping via a grouping variable, e.g. spatial geometries or temporal intervals
2. Reducing these groups along the grouped dimension with a certain reducer function, e.g. calculating the mean pixel value per polygon or the maximum pixel values per month

While the layout of the reduced dimension is changed, other dimensions keep their resolution and geometry.

A temporal aggregation is similar to a downsampling process, as it can be seen in the according image above. Intervals for grouping can either be set manually, or periods can be chosen: monthly, yearly, etc.. All timesteps in an interval are then collapsed via a reducer function (mean, max, etc.) and assigned to the new labels given.

A spatial agregation works in a similar manner. Polygons, lines and points can be selected for grouping. The spatial dimension is then reduced by a given process and a vector cube is returned. The vector cube then has dimensions containing features, attributes and time.

<figure>
    <img src="./datacubes/dc_aggregate_space.png" alt="Datacube timeseries">
    <figcaption>Aggregate spatial</figcaption>
</figure>