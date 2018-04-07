# Visualizing-Data-with-Leaflet
## Link: https://cherngywh.github.io/Visualizing-Data-with-Leaflet/

**Background**

*Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!*

*The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.*

**Step 1: Basic Visualization**

*The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and pick a data set to visualize. When you click on a data set, for example 'All Earthquakes from the Past 7 Days', you will be given a JSON representation of that data. You will be using the URL of this JSON to pull in the data for our visualization.*

*- data markers should reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.*<br/>
*- Include popups that provide additional information about the earthquake when a marker is clicked.*<br/>
*- Create a legend that will provide context for your map data.*

**Step 2: More Data**

*The USGS wants you to plot a second data set on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in a second data set and visualize it along side your original set of data. Data on tectonic plates can be found at https://github.com/fraxen/tectonicplates.*

*- Plot a second data set on our map.*<br/>
*- Add a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.*<br/>
*- Add layer controls to our map.*
