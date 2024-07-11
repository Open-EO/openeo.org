(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{285:function(e,t,a){e.exports=a.p+"assets/img/dc_timeseries.c2c7a902.png"},286:function(e,t,a){e.exports=a.p+"assets/img/dc_flat.01dc91de.png"},287:function(e,t,a){e.exports=a.p+"assets/img/vector.201588fe.png"},288:function(e,t,a){e.exports=a.p+"assets/img/dc_filter.bdafa6d0.png"},289:function(e,t,a){e.exports=a.p+"assets/img/dc_apply_unary.f69f840c.png"},290:function(e,t,a){e.exports=a.p+"assets/img/dc_apply_kernel.4013a72c.png"},291:function(e,t,a){e.exports=a.p+"assets/img/dc_apply_ts.4f9449f6.png"},292:function(e,t,a){e.exports=a.p+"assets/img/dc_apply_dim_ts.c895aa81.png"},293:function(e,t,a){e.exports=a.p+"assets/img/dc_resample_time.987e797c.png"},294:function(e,t,a){e.exports=a.p+"assets/img/dc_resample_space.417f814b.png"},295:function(e,t,a){e.exports=a.p+"assets/img/dc_reduce.872f16c2.png"},296:function(e,t,a){e.exports=a.p+"assets/img/dc_aggregate_space.ae550945.png"},469:function(e,t,a){"use strict";a.r(t);var s=a(4),i=Object(s.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"datacubes"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#datacubes"}},[e._v("#")]),e._v(" Datacubes")]),e._v(" "),t("h2",{attrs:{id:"what-are-datacubes"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#what-are-datacubes"}},[e._v("#")]),e._v(" What are Datacubes?")]),e._v(" "),t("p",[e._v("Data is represented as datacubes in openEO, which are multi-dimensional arrays with additional information about their dimensionality. Datacubes can provide a nice and tidy interface for spatiotemporal data as well as for the operations you may want to execute on them. As they are arrays, it might be easiest to look at raster data as an example, even though datacubes can hold vector data as well. Our example data however consists of a 6x7 raster with 4 bands ["),t("code",[e._v("blue")]),e._v(", "),t("code",[e._v("green")]),e._v(", "),t("code",[e._v("red")]),e._v(", "),t("code",[e._v("near-infrared")]),e._v("] and 3 timesteps ["),t("code",[e._v("2020-10-01")]),e._v(", "),t("code",[e._v("2020-10-13")]),e._v(", "),t("code",[e._v("2020-10-25")]),e._v("], displayed here in an orderly, timeseries-like manner:")]),e._v(" "),t("figure",[t("img",{attrs:{src:a(285),alt:"Raster datacube timeseries: 12 imagery tiles are depicted, grouped by 3 dates along a timeline (time dimension). Each date has a blue, green, red and near-infrared band (bands dimension). Each single tile has the dimensions x and y (spatial dimensions)."}}),e._v(" "),t("figcaption",[e._v("An examplary raster datacube with 4 dimensions: x, y, bands and time.")])]),e._v(" "),t("p",[e._v("It is important to understand that datacubes are designed to make things easier for us, and are not literally a cube, meaning that the above plot is just as good a representation as any other. That is why we can switch the dimensions around and display them in whatever way we want, including the view below:")]),e._v(" "),t("figure",[t("img",{attrs:{src:a(286),alt:"Raster datacube flat representation: The 12 imagery tiles are now laid out flat as a 4 by 3 grid (bands by timesteps). All dimension labels are depicted (The timestamps, the band names and the x, y coordinates)."}}),e._v(" "),t("figcaption",[e._v("This is the 'raw' data collection that is our example datacube. The grayscale images are colored for understandability, and dimension labels are displayed.")])]),e._v(" "),t("p",[e._v("A vector datacube on the other hand could look like this:")]),e._v(" "),t("figure",[t("img",{attrs:{src:a(287),alt:"An examplary vector datacube with 3 dimensions: 2 geometries are given for the `geometries` dimension, along with 3 timesteps for the temporal dimension `time` and 4 bands in the `bands` dimension."}}),e._v(" "),t("figcaption",[e._v("An examplary vector datacube with 3 dimensions: 2 geometries are given for the "),t("code",[e._v("geometries")]),e._v(" dimension, along with 3 timesteps for the temporal dimension "),t("code",[e._v("time")]),e._v(" and 4 bands in the "),t("code",[e._v("bands")]),e._v(" dimension.")])]),e._v(" "),t("p",[t("a",{attrs:{href:"https://r-spatial.org/r/2022/09/12/vdc.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Vector datacubes"),t("OutboundLink")],1),e._v(" and raster datacubes are common cases of datacubes in the EO domain.\nA raster datacube has at least two spatial dimensions (usually named "),t("code",[e._v("x")]),e._v(" and "),t("code",[e._v("y")]),e._v(") and a vector datacube has at least one geometry dimension (usually named "),t("code",[e._v("geometry")]),e._v(').\nThe purpose of these distinctions is simply to make it easier to describe "special" cases of datacubes, but you can also define other types such as a temporal datacube that has at least one temporal dimension (usually named '),t("code",[e._v("t")]),e._v(").")]),e._v(" "),t("p",[e._v("The following additional information are usually available for datacubes:")]),e._v(" "),t("ul",[t("li",[e._v("the dimensions (see "),t("a",{attrs:{href:"#dimensions"}},[e._v("below")]),e._v(")")]),e._v(" "),t("li",[e._v("a sampling method (see "),t("a",{attrs:{href:"#values-in-a-data-cube"}},[e._v("below")]),e._v(")")]),e._v(" "),t("li",[e._v("a unit for the values")])]),e._v(" "),t("h2",{attrs:{id:"dimensions"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dimensions"}},[e._v("#")]),e._v(" Dimensions")]),e._v(" "),t("p",[e._v("A dimension refers to a certain axis of a datacube. This includes all variables (e.g. bands), which are represented as dimensions. Our exemplary raster datacube has the spatial dimensions "),t("code",[e._v("x")]),e._v(" and "),t("code",[e._v("y")]),e._v(", and the temporal dimension "),t("code",[e._v("t")]),e._v(". Furthermore, it has a "),t("code",[e._v("bands")]),e._v(" dimension, extending into the realm of "),t("em",[e._v("what kind of information")]),e._v(" is contained in the cube.")]),e._v(" "),t("p",[e._v("The following properties are usually available for dimensions:")]),e._v(" "),t("ul",[t("li",[e._v("name")]),e._v(" "),t("li",[e._v("type (potential types include: spatial (raster or vector data), temporal and other data such as bands)")]),e._v(" "),t("li",[e._v("axis (for spatial dimensions) / number")]),e._v(" "),t("li",[e._v("labels (usually exposed through textual or numerical representations, in the metadata as nominal values and/or extents)")]),e._v(" "),t("li",[e._v("reference system / projection")]),e._v(" "),t("li",[e._v("resolution / step size")]),e._v(" "),t("li",[e._v("unit for the labels (either explicitly specified or implicitly provided by the reference system)")]),e._v(" "),t("li",[e._v("additional information specific to the dimension type (e.g. the geometry types for a dimension containing geometries)")])]),e._v(" "),t("p",[e._v("Here is an overview of the dimensions contained in our example raster datacube above:")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("#")]),e._v(" "),t("th",[e._v("name")]),e._v(" "),t("th",[e._v("type")]),e._v(" "),t("th",[e._v("labels")]),e._v(" "),t("th",[e._v("resolution")]),e._v(" "),t("th",[e._v("reference system")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("1")]),e._v(" "),t("td",[t("code",[e._v("x")])]),e._v(" "),t("td",[e._v("spatial")]),e._v(" "),t("td",[t("code",[e._v("466380")]),e._v(", "),t("code",[e._v("466580")]),e._v(", "),t("code",[e._v("466780")]),e._v(", "),t("code",[e._v("466980")]),e._v(", "),t("code",[e._v("467180")]),e._v(", "),t("code",[e._v("467380")])]),e._v(" "),t("td",[e._v("200m")]),e._v(" "),t("td",[t("a",{attrs:{href:"https://epsg.io/32627",target:"_blank",rel:"noopener noreferrer"}},[e._v("EPSG:32627"),t("OutboundLink")],1)])]),e._v(" "),t("tr",[t("td",[e._v("2")]),e._v(" "),t("td",[t("code",[e._v("y")])]),e._v(" "),t("td",[e._v("spatial")]),e._v(" "),t("td",[t("code",[e._v("7167130")]),e._v(", "),t("code",[e._v("7166930")]),e._v(", "),t("code",[e._v("7166730")]),e._v(", "),t("code",[e._v("7166530")]),e._v(", "),t("code",[e._v("7166330")]),e._v(", "),t("code",[e._v("7166130")]),e._v(", "),t("code",[e._v("7165930")])]),e._v(" "),t("td",[e._v("200m")]),e._v(" "),t("td",[t("a",{attrs:{href:"https://epsg.io/32627",target:"_blank",rel:"noopener noreferrer"}},[e._v("EPSG:32627"),t("OutboundLink")],1)])]),e._v(" "),t("tr",[t("td",[e._v("3")]),e._v(" "),t("td",[t("code",[e._v("bands")])]),e._v(" "),t("td",[e._v("bands")]),e._v(" "),t("td",[t("code",[e._v("blue")]),e._v(", "),t("code",[e._v("green")]),e._v(", "),t("code",[e._v("red")]),e._v(", "),t("code",[e._v("nir")])]),e._v(" "),t("td",[e._v("4 bands")]),e._v(" "),t("td",[e._v("-")])]),e._v(" "),t("tr",[t("td",[e._v("4")]),e._v(" "),t("td",[t("code",[e._v("t")])]),e._v(" "),t("td",[e._v("temporal")]),e._v(" "),t("td",[t("code",[e._v("2020-10-01")]),e._v(", "),t("code",[e._v("2020-10-13")]),e._v(", "),t("code",[e._v("2020-10-25")])]),e._v(" "),t("td",[e._v("12 days")]),e._v(" "),t("td",[e._v("Gregorian calendar / UTC")])])])]),e._v(" "),t("p",[e._v('Dimension labels are usually either numerical or text (also known as "strings"), which also includes textual representations of timestamps or geometries for example.\nFor example, temporal labels are usually encoded as '),t("a",{attrs:{href:"https://en.wikipedia.org/wiki/ISO_8601",target:"_blank",rel:"noopener noreferrer"}},[e._v("ISO 8601"),t("OutboundLink")],1),e._v(" compatible dates and/or times and similarly geometries can be encoded as "),t("a",{attrs:{href:"https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry",target:"_blank",rel:"noopener noreferrer"}},[e._v("Well-known Text (WKT)"),t("OutboundLink")],1),e._v(" or be represented by their IDs.")]),e._v(" "),t("p",[e._v("Dimensions with a natural/inherent order (usually all temporal and spatial raster dimensions) are always sorted. Dimensions without inherent order (usually "),t("code",[e._v("bands")]),e._v("), retain the order in which they have been defined in metadata or processes (e.g. through "),t("a",{attrs:{href:"https://processes.openeo.org/#filter_bands",target:"_blank",rel:"noopener noreferrer"}},[t("code",[e._v("filter_bands")]),t("OutboundLink")],1),e._v("), with new labels simply being appended to the existing labels.")]),e._v(" "),t("p",[e._v("A geometry dimension is not included in the example raster datacube above and it is not used in the following examples, but to show how a vector dimension with two polygons could look like:")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("name")]),e._v(" "),t("th",[e._v("type")]),e._v(" "),t("th",[e._v("labels")]),e._v(" "),t("th",[e._v("reference system")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[t("code",[e._v("geometry")])]),e._v(" "),t("td",[e._v("vector")]),e._v(" "),t("td",[t("code",[e._v("POLYGON((-122.4 37.6,-122.35 37.6,-122.35 37.64,-122.4 37.64,-122.4 37.6))")]),e._v(", "),t("code",[e._v("POLYGON((-122.51 37.5,-122.48 37.5,-122.48 37.52,-122.51 37.52,-122.51 37.5))")])]),e._v(" "),t("td",[t("a",{attrs:{href:"https://epsg.io/4326",target:"_blank",rel:"noopener noreferrer"}},[e._v("EPSG:4326"),t("OutboundLink")],1)])])])]),e._v(" "),t("p",[e._v("A dimension with geometries can consist of points, linestrings, polygons, multi points, multi linestrings, or multi polygons.\nIt is not possible to mix geometry types, but the single geometry type with their corresponding multi type can be combined in a dimension (e.g. points and multi points).\nEmpty geometries (such as GeoJSON features with a "),t("code",[e._v("null")]),e._v(" geometry or GeoJSON geometries with an empty coordinates array) are allowed and can sometimes also be the result of certain vector operations such as a negative buffer.")]),e._v(" "),t("h3",{attrs:{id:"applying-processes-on-dimensions"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#applying-processes-on-dimensions"}},[e._v("#")]),e._v(" Applying Processes on Dimensions")]),e._v(" "),t("p",[e._v('Some processes are typically applied "along a dimension". You can imagine said dimension as an arrow and whatever is happening as a parallel process to that arrow. It simply means: "we focus on '),t("em",[e._v("this")]),e._v(' dimension right now".')]),e._v(" "),t("h3",{attrs:{id:"resolution"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#resolution"}},[e._v("#")]),e._v(" Resolution")]),e._v(" "),t("p",[e._v("The resolution of a dimension gives information about what interval lies between observations. This is most obvious with the temporal resolution, where the intervals depict how often observations were made. Spatial resolution gives information about the pixel spacing, meaning how many 'real world meters' are contained in a pixel. The number of bands and their wavelength intervals give information about the spectral resolution.")]),e._v(" "),t("h3",{attrs:{id:"coordinate-reference-system-as-a-dimension"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#coordinate-reference-system-as-a-dimension"}},[e._v("#")]),e._v(" Coordinate Reference System as a Dimension")]),e._v(" "),t("p",[e._v("In the example above, "),t("em",[e._v("x")]),e._v(" and "),t("em",[e._v("y")]),e._v(" dimension values have a "),t("em",[e._v("unique")]),e._v(" relationship to world coordinates through their coordinate reference system (CRS). This implies that a single coordinate reference system is associated with these "),t("em",[e._v("x")]),e._v(" and "),t("em",[e._v("y")]),e._v(" dimensions. If we want to create a data cube from multiple tiles spanning different coordinate reference systems (e.g. Sentinel-2: different UTM zones), we would "),t("em",[e._v("have")]),e._v(" to resample/warp those to a single coordinate reference system. In many cases, this is wanted because we want to be able to "),t("em",[e._v("look")]),e._v(" at the result, meaning it is available in a single coordinate reference system.")]),e._v(" "),t("p",[e._v("Resampling is however costly, involves (some) data loss, and is in general not reversible. Suppose that we want to work only on the spectral and temporal dimensions of a data cube, and do not want to do any resampling. In that case, one could create one data cube for each coordinate reference system. An alternative would be to create one "),t("em",[e._v("single")]),e._v(" data cube containing all tiles that has an "),t("em",[e._v("additional dimension")]),e._v(" with the coordinate reference system. In that data cube, "),t("em",[e._v("x")]),e._v(" and "),t("em",[e._v("y")]),e._v(" no longer point to a unique world coordinate, because identical "),t("em",[e._v("x")]),e._v(" and "),t("em",[e._v("y")]),e._v(" coordinate pairs occur in each UTM zone. Now, only the combination ("),t("em",[e._v("x")]),e._v(", "),t("em",[e._v("y")]),e._v(", "),t("em",[e._v("crs")]),e._v(") has a unique relationship to the world coordinates.")]),e._v(" "),t("p",[e._v("On such a "),t("em",[e._v("crs-dimensioned data cube")]),e._v(", several operations make perfect sense, such as "),t("code",[e._v("apply")]),e._v(" or "),t("code",[e._v("reduce_dimension")]),e._v(" on spectral and/or temporal dimensions. A simple reduction over the "),t("code",[e._v("crs")]),e._v(" dimension, using "),t("em",[e._v("sum")]),e._v(" or "),t("em",[e._v("mean")]),e._v(' would typically not make sense. The "reduction" (removal) of the '),t("code",[e._v("crs")]),e._v(" dimension that is meaningful involves the resampling/warping of all sub-cubes for the "),t("code",[e._v("crs")]),e._v(" dimension to a single, common target coordinate reference system.")]),e._v(" "),t("h2",{attrs:{id:"values-in-a-datacube"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#values-in-a-datacube"}},[e._v("#")]),e._v(" Values in a datacube")]),e._v(" "),t("p",[e._v("openEO datacubes contain scalar values (e.g. strings, numbers or boolean values), with all other associated attributes stored in dimensions (e.g. coordinates or timestamps). Attributes such as the CRS or the sensor can also be turned into dimensions. Be advised that in such a case, the uniqueness of pixel coordinates may be affected. When usually, "),t("code",[e._v("(x, y)")]),e._v(" refers to a unique location, that changes to "),t("code",[e._v("(x, y, CRS)")]),e._v(" when "),t("code",[e._v("(x, y)")]),e._v(" values are reused in other coordinate reference systems (e.g. two neighboring UTM zones).")]),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[e._v("Be Careful with Data Types")]),e._v(" "),t("p",[e._v("As stated above, datacubes only contain scalar values. However, implementations may differ in their ability to handle or convert them. Implementations may also not allow mixing data types in a datacube. For example, returning a boolean value for a reducer on a numerical datacube may result in an error on some back-ends. The recommendation is to not change the data type of values in a datacube unless the back-end supports it explicitly.")])]),e._v(" "),t("p",[e._v("Data cube values can be sampled in two different ways. The values are either area or point samples.")]),e._v(" "),t("ul",[t("li",[e._v("Area sampling aggregates measurements over defined regions, i.e. the grid cells for raster data or polygons/lines for vector data.")]),e._v(" "),t("li",[e._v("Point sampling collects data at specific locations, providing detailed information for specific points.")])]),e._v(" "),t("h2",{attrs:{id:"processes-on-datacubes"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#processes-on-datacubes"}},[e._v("#")]),e._v(" Processes on Datacubes")]),e._v(" "),t("p",[e._v("In the following part, the basic processes for manipulating datacubes are introduced.")]),e._v(" "),t("h3",{attrs:{id:"filter"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#filter"}},[e._v("#")]),e._v(" Filter")]),e._v(" "),t("p",[e._v("When filtering data (e.g. "),t("a",{attrs:{href:"https://processes.openeo.org/#filter_spatial",target:"_blank",rel:"noopener noreferrer"}},[t("code",[e._v("filter_spatial")]),t("OutboundLink")],1),e._v(", "),t("a",{attrs:{href:"https://processes.openeo.org/#filter_temporal",target:"_blank",rel:"noopener noreferrer"}},[t("code",[e._v("filter_temporal")]),t("OutboundLink")],1),e._v(", "),t("a",{attrs:{href:"https://processes.openeo.org/#filter_bands",target:"_blank",rel:"noopener noreferrer"}},[t("code",[e._v("filter_bands")]),t("OutboundLink")],1),e._v("), only the data that satisfies a condition is returned. For example, this condition could be a timestamp or interval, (a set of) coordinates, or specific bands. By applying filtering the datacube becomes smaller, according to the selected data.")]),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[e._v("Simplified")]),e._v(" "),t("p",[t("span",{attrs:{title:"Filtering vegetarian options from [corn, potato, pig] returns [corn, potato].\n"}},[t("code",[e._v("filter([🌽, 🥔, 🐷], isVegetarian) => [🌽, 🥔]")])])])]),e._v(" "),t("p",[e._v("In the image, the example datacube can be seen at the top with labeled dimensions. The filtering techniques are displayed separately below. On the left, the datacube is filtered temporally with the interval "),t("code",[e._v('["2020-10-15", "2020-10-27"]')]),e._v(". The result is a cube with only the rasters for the timestep that lies within that interval ("),t("code",[e._v('"2020-10-25"')]),e._v(") and unchanged bands and spatial dimensions. Likewise, the original cube is filtered for a specific band "),t("code",[e._v('["nir"]')]),e._v(" in the middle and a specific spatial region "),t("code",[e._v("[Polygon(...)]")]),e._v(" on the right.")]),e._v(" "),t("figure",[t("img",{attrs:{src:a(288),alt:"Datacube filtering: From the datacube 4 by 3 grid, arrows depict what happens if the grid is filtered. Temporal filtering results in data for one timestep with all four bands, filtering bands results in data with one band with all three timesteps, and spatial filtering results in all timesteps and bands being preserved, but all with a smaller area."}}),e._v(" "),t("figcaption",[e._v("Filtering the sample datacube. It is displayed at the top with dimensions labels. Filtered results are shown at the bottom.")])]),e._v(" "),t("h3",{attrs:{id:"apply"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#apply"}},[e._v("#")]),e._v(" Apply")]),e._v(" "),t("p",[e._v("The "),t("code",[e._v("apply*")]),e._v(" functions (e.g. "),t("a",{attrs:{href:"https://processes.openeo.org/#apply",target:"_blank",rel:"noopener noreferrer"}},[t("code",[e._v("apply")]),t("OutboundLink")],1),e._v(", "),t("a",{attrs:{href:"https://processes.openeo.org/#apply_neighborhood",target:"_blank",rel:"noopener noreferrer"}},[t("code",[e._v("apply_neighborhood")]),t("OutboundLink")],1),e._v(", "),t("a",{attrs:{href:"https://processes.openeo.org/#apply_dimension",target:"_blank",rel:"noopener noreferrer"}},[t("code",[e._v("apply_dimension")]),t("OutboundLink")],1),e._v(") employ a process on the datacube that calculates new pixel values for each pixel, based on "),t("code",[e._v("n")]),e._v(" other pixels. Please note that several programming languages use the name "),t("code",[e._v("map")]),e._v(" instead of "),t("code",[e._v("apply")]),e._v(", but they describe the same type of function.")]),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[e._v("Simplified")]),e._v(" "),t("p",[t("span",{attrs:{title:"Applying the process 'cook' to [corn, potato, pig] returns [popcorn, fries, meat]."}},[t("code",[e._v("apply([🌽, 🥔, 🐷], cook) => [🍿, 🍟, 🍖]")])])])]),e._v(" "),t("p",[e._v("For the case "),t("code",[e._v("n = 1")]),e._v(" this is called a unary function and means that only the pixel itself is considered when calculating the new pixel value. A prominent example is the "),t("code",[e._v("absolute()")]),e._v(" function, calculating the absolute value of the input pixel value.")]),e._v(" "),t("figure",[t("img",{attrs:{src:a(289),alt:"Datacube apply unary: 3 example tiles hold values below and above 0. after applying the process 'absolute', all values in the three example tiles have changed to their absolute values above 0."}}),e._v(" "),t("figcaption",[e._v("Applying an unary process. Only the pixel itself is considered for calculating the new pixel value.")])]),e._v(" "),t("p",[e._v("If "),t("code",[e._v("n")]),e._v(" is larger than 1, the function is called n-ary. In practice, this means that the pixel neighbourhood is taken into account to calculate the new pixel value. Such neighbourhoods can be of spatial and/or temporal nature. A spatial function works on a kernel that weights the surrounding pixels (e.g. smoothing values with nearby observations), a temporal function works on a time series at a certain pixel location (e.g. smoothing values over time). Combinations of types to n-dimensional neighbourhoods are also possible.")]),e._v(" "),t("p",[e._v("In the example below, an example weighted kernel (shown in the middle) is applied to the cube (via "),t("a",{attrs:{href:"https://processes.openeo.org/#apply_kernel",target:"_blank",rel:"noopener noreferrer"}},[t("code",[e._v("apply_kernel")]),t("OutboundLink")],1),e._v("). To avoid edge effects (affecting pixels on the edge of the image with less neighbours), a padding has been added in the background.")]),e._v(" "),t("figure",[t("img",{attrs:{src:a(290),alt:"Datacube apply spatial kernel: Three example tiles hold some values with a lot of variance. A spatial kernel (a cell plus it's 4 direct neighbours) is applied to all pixels, and the result appears to be spatially smoothed, with less variance."}}),e._v(" "),t("figcaption",[e._v("Applying a spatial kernel. For calculating each new pixel value, the defined weighted neighbourhood is used.")])]),e._v(" "),t("p",[e._v("Of course this also works for temporal neighbourhoods (timeseries), considering neighbours before and after a pixel. To be able to show the effect, two timesteps were added in this example figure. A moving average of window size 3 is then applied, meaning that for each pixel the average is calculated out of the previous, the next, and the timestep in question (t"),t("sub",[e._v("n-1")]),e._v(", t"),t("sub",[e._v("n")]),e._v(" and t"),t("sub",[e._v("n+1")]),e._v("). No padding was added which is why we observe edge effects (NA values are returned for t"),t("sub",[e._v("1")]),e._v(" and t"),t("sub",[e._v("5")]),e._v(", because their temporal neighbourhood is missing input timesteps).")]),e._v(" "),t("figure",[t("img",{attrs:{src:a(291),alt:"Datacube apply temporal moving average: Smoothing is applied to 5 example tiles by calculating the mean of 3 timesteps of every single pixel. The resulting tiles for the timestamps look much more alike."}}),e._v(" "),t("figcaption",[e._v("Applying a moving average (temporal smoothing) by averaging the direct temporal neighbourhoods of pixels. No padding is used, which leads to edge effects.")])]),e._v(" "),t("p",[e._v("Alternatively, a process can also be applied along a dimension of the datacube, meaning the input is no longer a neighbourhood of some sort but all pixels along that dimension ("),t("code",[e._v("n")]),e._v(" equals the complete dimension). If a process is applied along the "),t("code",[e._v("time")]),e._v(" dimension (e.g. a breakpoint detection), the complete pixel timeseries are the input. If a process is applied along the "),t("code",[e._v("spatial")]),e._v(" dimensions (e.g. a "),t("code",[e._v("mean")]),e._v("), all pixels of an image are the input. The process is then applied to all pixels along that dimension and the dimension continues to exist. This is in contrast to "),t("a",{attrs:{href:"#reduce"}},[e._v("reduce")]),e._v(". In the image below, a "),t("code",[e._v("mean")]),e._v(" is applied to the "),t("code",[e._v("time")]),e._v(" dimension. An example pixel timeseries is highlighted by a green line and processed step-by-step.")]),e._v(" "),t("figure",[t("img",{attrs:{src:a(292),alt:"Datacube apply dimension time: The mean of all 5 timesteps is calculated for every single pixel. The resulting 5 tiles look exaclty the same, as they have been averaged."}}),e._v(" "),t("figcaption",[e._v("Applying a mean to the temporal dimension.")])]),e._v(" "),t("h3",{attrs:{id:"resample"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#resample"}},[e._v("#")]),e._v(" Resample")]),e._v(" "),t("p",[e._v("In a resampling processes (e.g. "),t("a",{attrs:{href:"https://processes.openeo.org/#resample_cube_spatial",target:"_blank",rel:"noopener noreferrer"}},[t("code",[e._v("resample_cube_spatial")]),t("OutboundLink")],1),e._v(", "),t("a",{attrs:{href:"https://processes.openeo.org/#resample_cube_temporal",target:"_blank",rel:"noopener noreferrer"}},[t("code",[e._v("resample_cube_temporal")]),t("OutboundLink")],1),e._v("), the "),t("em",[e._v("layout")]),e._v(" of a certain dimension is changed into another "),t("em",[e._v("layout")]),e._v(", most likely also changing the resolution of that dimension. This is done by mapping values of the source (old) datacube to the new layout of the target (new) datacube. During that process, resolutions can be "),t("em",[e._v("upscaled")]),e._v(" or "),t("em",[e._v("downscaled")]),e._v(" (also called "),t("em",[e._v("upsampling")]),e._v(" and "),t("em",[e._v("downsampling")]),e._v("), depending on whether they have a finer or a coarser spacing afterwards. A function is then needed to translate the existing data into the new resolution. A prominent example is to reproject a datacube into the coordinate reference system of another datacube, for example in order to merge the two cubes.")]),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[e._v("Simplified")]),e._v(" "),t("p",[t("span",{attrs:{title:"Downscaling a raster image (to infinity) returns one pixel."}},[t("code",[e._v("resample(🖼️, downscale) => 🟦")])])]),e._v(" "),t("p",[t("span",{attrs:{title:"Reprojecting a globe results into a map."}},[t("code",[e._v("resample(🌍, reproject) => 🗺️")])])])]),e._v(" "),t("p",[e._v("The first figure gives an overview of temporal resampling. How exactly the input timesteps are rescaled to the output timesteps depends on the resampling function.")]),e._v(" "),t("figure",[t("img",{attrs:{src:a(293),alt:"Datacube temporal resampling (up and down): Downsampling: To a timeline-representation of the example tiles, another timeline with only 2 steps at different dates is applied. The result has tiles only at those new timesteps. In Upsampling, the existing 3 timesteps are sampled into 5 result timesteps."}}),e._v(" "),t("figcaption",[e._v("Temporal downsampling is seen on the left, upsampling on the right. The temporal layout that the cubes are resampled to is displayed in the middle.")])]),e._v(" "),t("p",[e._v("The second figure displays spatial resampling. Observe how in the upsampling process, the output datacube has not gained in information value. The resulting grid still carries the same pixel information, but in higher spatial resolution. Other upsampling methods may yield smoother results, e.g. by using interpolation.")]),e._v(" "),t("figure",[t("img",{attrs:{src:a(294),alt:"Datacube spatial resampling (up and down): Downsampling: The resulting tiles have a lower spatial resolution than the input tiles. Upsampling: The resulting tiles have a higher spatial resolution than the input tiles, but contain the same image than before (no information added)."}}),e._v(" "),t("figcaption",[e._v("Spatial resampling. The geometry which the input cube is resampled to is displayed in the middle. The output cube then contains the same information, but in the resampled spatial layout.")])]),e._v(" "),t("h3",{attrs:{id:"reduce"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#reduce"}},[e._v("#")]),e._v(" Reduce")]),e._v(" "),t("p",[e._v("The "),t("a",{attrs:{href:"https://processes.openeo.org/#reduce_dimension",target:"_blank",rel:"noopener noreferrer"}},[t("code",[e._v("reduce_dimension")]),t("OutboundLink")],1),e._v(" process "),t("em",[e._v("collapses")]),e._v(" a whole dimension of the datacube. It does so by using some sort of "),t("strong",[e._v("reducer")]),e._v(", which is a function that calculates a single result from an amount of values, as e.g. "),t("code",[e._v("mean()")]),e._v(", "),t("code",[e._v("min()")]),e._v(" and "),t("code",[e._v("max()")]),e._v(" are. For example we can reduce the time dimension ("),t("code",[e._v("t")]),e._v(") of a timeseries by calculating the mean value of all timesteps for each pixel. We are left with a cube that has no time dimension, because all values of that dimension are compressed into a single mean value. The same goes for e.g. the spatial dimensions: If we calculate the mean along the "),t("code",[e._v("x")]),e._v(" and "),t("code",[e._v("y")]),e._v(" dimensions, we are left without any spatial dimensions, but a mean value for each instance that previously was a raster is returned. In the image below, the dimensions that are reduced are crossed out in the result.")]),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[e._v("Simplified")]),e._v(" "),t("p",[t("span",{attrs:{title:"Reducing [mixed greens, cucumber, tomato, onion] returns a salad."}},[t("code",[e._v("reduce([🥬, 🥒, 🍅, 🧅], prepare) => 🥗")])])])]),e._v(" "),t("p",[e._v("Think of it as a waste press that does math instead of using brute force. Given a representation of our example datacube, let's see how it is affected.")]),e._v(" "),t("figure",[t("img",{attrs:{src:a(295),alt:"Datacube reduce: Three arrows depict what happens to the 12 example tiles, if they are reduced: Reducing timesteps leads to four tiles (one for each band), and the time dimension is deleted. Reducing bands lead to one tile per timestep, and the bands dimension is deleted. Reducing spatially leads to the original 4 by 3 bands by time layout, but the result has no spatial dimension and thus, the tiles have been turned into single values, per tile."}}),e._v(" "),t("figcaption",[e._v("Overview of reducing the sample datacube. Dimensions that are reduced are crossed out in the result images. Their information value has been compressed by a reducer function.")])]),e._v(" "),t("h3",{attrs:{id:"aggregate"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#aggregate"}},[e._v("#")]),e._v(" Aggregate")]),e._v(" "),t("p",[e._v("An aggregation of a datacube can be thought of as a grouped reduce. That means it consists of two steps:")]),e._v(" "),t("ol",[t("li",[e._v("Grouping via a grouping variable, i.e. spatial geometries or temporal intervals")]),e._v(" "),t("li",[e._v("Reducing these groups along the grouped dimension with a certain reducer function, e.g. calculating the mean pixel value per polygon or the maximum pixel values per month")])]),e._v(" "),t("p",[e._v("While the layout of the reduced dimension is changed, other dimensions keep their resolution and geometry. But in contrast to pure "),t("code",[e._v("reduce")]),e._v(", the dimensions along which the reducer function is applied still exist after the operation.")]),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[e._v("Simplified")]),e._v(" "),t("p",[t("span",{attrs:{title:"Aggregating different family representations with 3, 2 and 4 members with the function 'countFamilyMembers' returns [3, 2, 4]."}},[t("code",[e._v("aggregate(👪 👩‍👦 👨‍👩‍👦‍👦, countFamilyMembers) => [3️⃣, 2️⃣, 4️⃣]")])])])]),e._v(" "),t("p",[e._v("A temporal aggregation (e.g. "),t("a",{attrs:{href:"https://processes.openeo.org/#aggregate_temporal",target:"_blank",rel:"noopener noreferrer"}},[t("code",[e._v("aggregate_temporal")]),t("OutboundLink")],1),e._v(") is similar to the downsampling process, as it can be seen in the according image above. Intervals for grouping can either be set manually, or periods can be chosen: monthly, yearly, etc. All timesteps in an interval are then collapsed via a reducer function ("),t("code",[e._v("mean")]),e._v(", "),t("code",[e._v("max")]),e._v(", etc.) and assigned to the given new labels.")]),e._v(" "),t("p",[e._v("A spatial aggregation (e.g. "),t("a",{attrs:{href:"https://processes.openeo.org/#aggregate_spatial",target:"_blank",rel:"noopener noreferrer"}},[t("code",[e._v("aggregate_spatial")]),t("OutboundLink")],1),e._v(") works in a similar manner. Polygons, lines and points can be selected for grouping. Their spatial dimension is then reduced by a given process and thus, a vector cube is returned. The vector cube then has dimensions containing features, attributes and time. In the graphic below, the grouping is only shown for the first timestep.")]),e._v(" "),t("figure",[t("img",{attrs:{src:a(296),alt:"Datacube spatial aggregation: A line and a polygon are selected from the original example tiles. The pixels covered by these geometries are aggregated and the result consists no longer of imagery tiles but of an array with values for 2 geometries by 4 bands by 3 timesteps."}}),e._v(" "),t("figcaption",[e._v("When aggregating spatially, pixels are grouped (cut out) based on geometries, and then collapsed with a reducer function. A vector datacube is returned (as shown with dimensions names and labels). Please note that this visualization shows aggregation on a data cube with four dimensions, but "),t("code",[e._v("aggregate_spatial")]),e._v(" specifically can only handle data cubes with three dimensions as of now.")])])])}),[],!1,null,null,null);t.default=i.exports}}]);