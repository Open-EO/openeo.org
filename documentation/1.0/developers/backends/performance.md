# Performance guide for openEO backends

## openEO API vision on performance & scalability

Given that the openEO API only defines a web service, it can in no way ensure the performance or scalability of an 
implementation. What it can do however, is avoiding API definitions that prevent an implementation from being efficient.
When openEO was designed, performance was one of the key design drivers, so here we try to explain how that is achieved.

### Bringing the processing to the data

Two evolutions created the need for an API designed for performance and scalability: EO programmes like Copernicus that 
pushed data volumes into the petabyte range, and a move towards ever larger cloud infrastructure and HPC processing capacity 
to analyze these volumes of data. OpenEO supports this by defining data access and processing into a single specification.
As a result, the openEO process graph allows the backend to choose any data access pattern that is optimal for 
the processing that is to be executed, and the dataset that is to be read.

A popular example of such a case, is infrastructures that store the data on the same machines that do the processing. 
In such a case, an openEO backend can choose to load and process the data directly on the machine that has the data stored.
Another example is adjusting and aligning the data chunks for the processing to the internal layout of the file format that 
stores the EO data. IO performance optimizations like this are only possible if the processing engine has deep knowledge 
of the data organization from storage system over networks to file formats.

### Datacube processing

The datacube view that openEO uses as a model to represent the data as it is transformed by various processes also has 
important performance and scalability implications.

The easiest way to understand this is to contrast it with a more traditional 'product-based' view of building workflows.
In a product or file based workflow, a process operates on a set of input files and generates a set of output files. Many
EO workflows have been written like this, but the consequence is that every process spends time on reading date into memory, and
writing it back to disk. Persistent storage is often the slowest component in a processing system, and thus these workflows
spend a lot of time on IO. In the openEO specification, a process transforms one datacube into another datacube.
Backend implementations are encouraged to avoid writing data to disk in between processing steps whenever possible. By
keeping the datacubes into memory, this avoids those costly IO operations.

Here it is important to note that openEO does not enforce or define how the datacube should look like on the backend. The 
datacube can be a set of files, or arrays in memory distributed over a cluster. These choices are left to the 
backend implementor, this guide only tries to highlight the possibilities.

For scalability, the openEO processes clearly define along which set of dimensions of the datacube they operate. When
a user writes a process graph, it should never instruct the backend to apply a black box algorithm or function on the 
entire datacube. For most algorithms, this is not necessary, and loading the complete datacube of a Copernicus mission at once
is simply not possible. Hence, users run '[user-defined (child) processes](https://openeo.org/documentation/1.0/developers/api/reference.html#section/Processes/Process-Graphs)' over a 1-dimensional array, or even multidimensional arrays or 'chunks'
of the datacube. Based on this information, the backend is able to define both a data access and processing strategy that is
optimal for the given process graph.

## Process graph execution

Here we go a bit more into detail about how a backend evaluates a process graph. Again, this is not normative or
mandated by the specification, but rather an explanation of one way to achieve optimal performance.

In general, process graphs are first analyzed as a whole before the actual processing starts. The analysis phase serves
to reveal the optimal processing strategy and parameters. 

These are a few examples of things that can be derived from a process graph and subsequent optimizations:
* **Masking:** when a  raster dataset is masked with another raster or polygons, then often the loading of the datacube to 
which the mask is applied can be limited to unmasked values.
* **Vector filtering:** various operations (aggregate_spatial, filter_spatial, mask_polygon) can restrict the datacube to a 
set of polygons, resulting in a rather sparse cube. Loading and processing of sparse cubes can be rather different from dense data cubes.
* **Resampling:** resampling operations can allow data to be loaded from overviews rather than original resolution. Applying
resampling and reprojection at load time can also be faster and save memory.
* **Multitemporal processing:** many EO algorithms work over the temporal dimension rather than spatial dimensions. The
type of algorithm can be inferred from the process graph, allowing to adjust the processing strategy accordingly.

## Performance FAQ

### I have a highly optimized workflow, can openEO expose it?

Basically openEO can expose anything as a custom 'process'. If your algorithm can not be expressed as an openEO process graph,
then you can just let your backend advertise your custom process. By doing this, you still benefit from a lot of the standardized
features in the openEO API, and most tools for openEO will also support working with custom processes. This is fairly similar
to exposing your process in other standards such as OGC Processes. 

We do expect however that it is much more likely that your workflow can still reuse a few standardized processes. For instance,
if it can be run on a geographical bounding box, the filter_bbox process would be a standardized way to specify that. Or
perhaps it can operate on any set of Sentinel-2 products, in which case you might fit in a load_collection to let your users
customize the input data. So usually, while you might start from a fully custom process, you'll notice that openEO offers 
ways to gradually standardize your workflow further in a stepwise manner.

### Can openEO be as fast as a hand-written workflow?

This question depends on which backend implementation you compare to which workflow, so there is no generic answer.
We do note that for writing non-trivial workflows in a cloud environment, you require a combination of algorithmic programming skills
and cloud engineering that usually requires a team of skilled persons spending (in total) multiple person months to years on the same workflow.
So if you know that many workflow patterns in the operational openEO backends have already been highly optimized, you may
want to consider if the potential of reducing processing cost with a few percentages justifies the effort. 

Also consider that next to the openEO API, there's also a community of open source backend implementations. So if you have
the skills to optimize processing pipelines to perfection, why don't you consider contributing to a backend that matches your
preferred technology stack?
