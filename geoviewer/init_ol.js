// API key for http://openlayers.org. Please get your own at
// http://bingmapsportal.com/ and use that instead.

var apiKey = "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf";

var hybrid = new OpenLayers.Layer.Bing({
    key: apiKey,
    type: "AerialWithLabels",
    name: "Bing Aerial With Labels"
});

//var vector = new OpenLayers.Layer.Vector("GeoJSON", {
//    projection: "EPSG:4326",
//    strategies: [new OpenLayers.Strategy.Fixed()],
//    protocol: new OpenLayers.Protocol.HTTP({
//        url: "data/old_districts_lusaka.geojson",
//        format: new OpenLayers.Format.GeoJSON()
//    })
//});

var center = new OpenLayers.LonLat(28.30715, -15.42714).transform("EPSG:4326", "EPSG:900913");
var map = new OpenLayers.Map({
    div: "map",
    layers: [
        //new OpenLayers.Layer.OSM(),

        new OpenLayers.Layer.Google(
                "Google Streets", // the default
                {numZoomLevels: 20}
            ),

        //hybrid,
        //, vector
        //createGeojsonLayer("data/lusakaroads/lsk_roads_trunk.geojson")
        //createGeojsonLayer("data/old_districts_lusaka.geojson")
    ],
    center: center,
    zoom: 12
});

function createGeojsonLayer(layerPath) {
    var vector = new OpenLayers.Layer.Vector("GeoJSON", {
        projection: "EPSG:4326",
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.HTTP({
            url: layerPath,
            format: new OpenLayers.Format.GeoJSON()
        })
    });

    return vector;
}