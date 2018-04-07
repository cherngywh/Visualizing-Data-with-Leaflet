// create links to fetch geojson data of earthquakes and plate boundary
var earthquakesUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var platesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// create a function to scale the magnitdue
function markerSize(magnitude) {
    return magnitude * 3;
};

var earthquakeLayer = new L.LayerGroup()

// perform a GET request to the query URL: earthquakesUrl
d3.json(earthquakesUrl, function (geoJson) {
    // once we get a response, send the geoJson.features array of objects object to the createFeatures function
    
    L.geoJSON(geoJson.features, {
        // using the pointToLayer option to create a CircleMarker
        // By default simple markers are drawn for GeoJSON Points. We can alter this by passing a pointToLayer 
        // function in a GeoJSON options object when creating the GeoJSON layer
        pointToLayer: function (geoJsonPoint, latlng) {
            return L.circleMarker(latlng, {radius: markerSize(geoJsonPoint.properties.mag)});
        },

        style: function (geoJsonStyle) {
            return {
                fillColor: magColor(geoJsonStyle.properties.mag),
                fillOpacity: 0.7,
                weight: 0.1,
                color: 'black'
            }
        },

        onEachFeature: function (feature, layer) {
            // Giving each feature a pop-up with information pertinent to it
            layer.bindPopup(
                "<h5 style='text-align:center;'>" + new Date(feature.properties.time) +
                "</h5><hr><h5 style='text-align:center;'>" + feature.properties.title + "</h5>");
        }
    }).addTo(earthquakeLayer);
});

// create a layer group for faultlines
var plateLayer = new L.LayerGroup();

// perform a GET request to the query URL: platesUrl
d3.json(platesUrl, function (geoJson) {
    // once we get a response, send the geoJson.features array of objects object to the L.geoJSON method
    L.geoJSON(geoJson.features, {
        style: function (geoJsonFeature) {
            return {
                weight: 1,
                color: 'brown'
            }
        },
    }).addTo(plateLayer);
});

// create a fuction to change color by magnitude
function magColor(mag) {
    return mag > 8 ? "#800026":
            mag > 7 ? "#bd0026":
            mag > 6 ? "#e31a1c":
            mag > 5 ? "#fc4e2a":
            mag > 4 ? "#fd8d3c":
            mag > 3 ? "#feb24c":
            mag > 2 ? "#fed976":
            mag > 1 ? "#ffeda0":
                      "#ffffcc";
};

// define a function to create the map
function createMap() {
    // define street, outdoor, satellite maps
    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/cherngywh/cjfkdlw8x057v2smizo9hqksx/tiles/256/{z}/{x}/{y}?" +
        "access_token=pk.eyJ1IjoiY2hlcm5neXdoIiwiYSI6ImNqZXZvcGhhYTcxdm4ycm83bjY1bnV3amgifQ.MOA-PIHTOV90Ql8_Tg2bvQ");

    var dark = L.tileLayer("https://api.mapbox.com/styles/v1/cherngywh/cjfon2bd904iy2spdjzs1infc/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiY2hlcm5neXdoIiwiYSI6ImNqZXZvcGhhYTcxdm4ycm83bjY1bnV3amgifQ.MOA-PIHTOV90Ql8_Tg2bvQ");

    var street = L.tileLayer("https://api.mapbox.com/styles/v1/cherngywh/cjfokxy6v0s782rpc1bvu8tlz/tiles/256/{z}/{x}/{y}?" +
        "access_token=pk.eyJ1IjoiY2hlcm5neXdoIiwiYSI6ImNqZXZvcGhhYTcxdm4ycm83bjY1bnV3amgifQ.MOA-PIHTOV90Ql8_Tg2bvQ");

    // define a baselayer object to hold our base layer objects
    var baseLayers = {
        "Street": street,     
        "Dark": dark,
        "Satellite": satellite
    };

    // define a overlay object to hold our overlay layer objects
    var overlays = {
        "Earthquakes": earthquakeLayer,
        "Plate Boundaries": plateLayer,
    };

    // initialize the map on the "map" div with a given center and zoom
    mymap = L.map('map', {
        center: [30, 0],
        zoom: 2,
        layers: [street, earthquakeLayer]
    })

    // create the legend to show diffent colors corresponding to the level of magnitude
    L.control.layers(baseLayers, overlays).addTo(mymap);

    var legend = L.control({position: "bottomright"});

    legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "info legend"),
            grades = [0, 1, 2, 3, 4, 5, 6, 7, 8],
            labels =[];
            
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
            '<i style="background:' + magColor(grades[i]) + '"></i> ' +
            grades[i] + (grades[i+1] ? '&ndash;' + grades[i+1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(mymap);
};

// call the create map function
createMap();



