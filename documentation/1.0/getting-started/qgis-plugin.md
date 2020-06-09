# QGIS Plugin

## Installation

There are two different versions of the QGIS Plugin available:
 
1. For getting the **latest stable version**, you can use the plugin 
manager of QGIS (Plugins -> Manage and Install Plugins). Note that you have to activate the option on showing experimental 
plugins (Settings -> Show also experimental plugins). After that, you can search for 
"OpenEO", install and activate the plugin.
2. For getting the **latest version**, you can go to the official
[GitHub repository](https://github.com/Open-EO/openeo-qgis-plugin) and download the zip archive. 
Now, open the plugin manager of QGIS (Plugins -> Manage and Install Plugins) and select "Install from ZIP". 
There you can browse for the downloaded zip archive, install and activate it.   

This tutorial shows the capabilities of version 0.9. Make sure you have installed at least version 0.9 by checking in 
your plugin manager.   

After taking one of the previous steps, there should be the openEO logo in your toolbar:

![QGIS Plugin Icon](./images/qgis_button.png "Button to start the plugin")

Simply click on the icon to start the plugin.

## Connecting

When starting the plugin, a login dialog appears. In the backend dropdown menu the available openEO compliant 
backends from the [openEO Hub](https://hub.openeo.org/) are listed. By default, the plugin will choose the latest 
compatible version from the selected provider. If you want to choose a specific version of a backend, you can uncheck 
the checkbox labeled "Only Latest versions". It is also possible to type manually a backend url into the selection field, 
in case it is not registered at the hub yet.
 
![QGIS Login Dialog](./images/login_dialog.png "Login Dialog")

Now that you chose your backend, you con log in via username and password, which you got from the backend provider.
Note that the QGIS plugin only supports Basic authentication and not [OpenID Connect](https://openid.net/connect/) yet. 

If logging in successfully, the main window of the plugin appears with three tabs 
to choose from ("Backend Info", "Jobs", "Services"). The following sections will go through the capabilities of these tabs. 

## Tab1: Backend Info

The first tab shows information about the backend and the available collections and processes. 
On the top, there is a basic description about the backend you are connected to.
Next, you can choose a collection in the drop down menu to see a description of that dataset.

![QGIS Backend Info](./images/backend_info.png "Backend Info tab")

On the bottom, there is a drop down menu to choose one of the available processes from the backend. 
After selection, the parameters of the process are shown in the table below. The first column contains the 
parameter name. The parameter name is bold if required and otherwise optional when using the process.
Second column shows the type of the parameter and the third column a short description. 
To learn more about the process, you can click on the info button next to the drop down menu 
(marked red in the figure below). The return type of the process is written next to the info box.

## Tab2: Jobs

The "Jobs" tab lists all of your [jobs](https://openeo.org/documentation/1.0/glossary.html#data-processing-modes) 
at the backend. In openEO a job describes what the backend needs to process 
(e.g. defining a [process graph](https://openeo.org/documentation/1.0/glossary.html#processes)) as well as 
additional information. The first two columns shows the title and the date and time it got created at the backend. 
The other elements of this window are numbered at the screenshot below and described in the following list: 

![QGIS Jobs](./images/jobs.png "Jobs tab")

1. **Status** - Shows in which lifecycle state the job is in at the moment. The first status is "created", 
if the job got just sent to the backend, but not executed yet. After the job gets executed it will be 
"queued" if the backend plans to executes it, but has not started yet. If the execution started but hasn't finished yet, 
it has the status of "running". Last but not least it will have either "canceled", if it was stopped during execution, 
"finished" if the execution was successfully or "error", if an error occurred during execution.    
2. **Execute** - By clicking on the "Play" button, the plugin will notify the backend to execute the job. 
Already finished jobs will be executed again.
3. **Display** - By clicking on the "Eye" button, the plugin downloads the resulting image of the job from the backend 
and creates a new layer in QGIS named after the title and the creation date containing the image. Note that if the result 
is not geo referenced, you might get a dialog from QGIS to choose a coordinate reference system.
4. **Adapt** - By clicking on the "Pencil" button a new dialog appears, where you can adapt the job title and 
description as well as the processes and extent of the job. How this works in detail is described in the following sections.
5. **Information** - By clicking on the "Info" button a window with additional information on the job opens up, like a 
description, a cost plan etc., if this information is provided by the backend.
6. **Delete** - By clicking on the "Trash" button the job gets deleted from the backend, after being asked if you are 
really sure to do that.
7. **Load Job from openEO Hub** - This button opens a new window with a list of shared jobs from the openEO Hub 
(see figure below). You can select one of these jobs, adapt them to your needs and create a new "duplicate" job at 
your backend. More information on that workflow can be found in the next sections.    
![QGIS Jobs](./images/openeohub.png "Jobs tab")
8. **Create new Job** - Similar to loading a job from the Hub, you can also create a job from scratch using this button. 
More information in the next sections.  
9. **Create new Job in Web Editor** - This button opens the [openEO web editor](https://editor.openeo.org/) in your 
system browser, so you can create a new job from there. This is the recommended way on creating a new job, since it has 
a graphical and therefore more convenient way of creating a job. 
10. **Refresh Table** - This button refreshes the list of jobs manually.

### Adapting existing Jobs

### Creating new Jobs

There are four ways to creating new jobs using this plugin, depending on wether you want to start from scratch or just 
change existing jobs:

* Web editor
* From scratch
* From openEO Hub
* From existing Job 

## Tab3: Services

## Additional Information

* [openEO QGIS Plugin Github](https://github.com/Open-EO/openeo-qgis-plugin)
* [openEO QGIS Plugin Page](https://plugins.qgis.org/plugins/openeo-qgis-plugin-master/)