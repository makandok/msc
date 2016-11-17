var map;

var styleCache = {};
//var geoLayer = new ol.layer.Vector({
//    source: new ol.source.GeoJSON({
//        projection: 'EPSG:900913',
//        url: './myGeoJson.geojson'
//    }),
//    style: function (feature, resolution) {
//        var text = resolution < 5000 ? feature.get('name') : '';
//        if (!styleCache[text]) {
//            styleCache[text] = [new ol.style.Style({
//                fill: new ol.style.Fill({
//                    color: 'rgba(255, 255, 255, 0.1)'
//                }),
//                stroke: new ol.style.Stroke({
//                    color: '#319FD3',
//                    width: 1
//                }),
//                text: new ol.style.Text({
//                    font: '12px Calibri,sans-serif',
//                    text: text,
//                    fill: new ol.style.Fill({
//                        color: '#000'
//                    }),
//                    stroke: new ol.style.Stroke({
//                        color: '#fff',
//                        width: 3
//                    })
//                }),
//                zIndex: 999
//            })];
//        }
//        return styleCache[text];
//    }
//});

function init() {
    map = new ol.Map({
        target: 'map',
        renderer: 'canvas',
        view: new ol.View2D({
            projection: 'EPSG:900913',
            center: [-8015003.33712, 4160979.44405],
            zoom: 5
        })
    });

    var newLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    map.addLayer(newLayer);

    //var vectorLayer = new ol.layer.Tile({
    //    source: new ol.source.TileWMS({
    //        preload: Infinity,
    //        url: 'http://felek.cns.umass.edu:8080/geoserver/wms',
    //        serverType: 'geoserver',
    //        params: {
    //            'LAYERS': "Streams:Developed",
    //            'TILED': true
    //        }
    //    })
    //});

    //map.addLayer(vectorLayer);

    //var vectorLayer_2 = new ol.layer.Tile({
    //    source: new ol.source.TileWMS({
    //        preload: Infinity,
    //        url: 'http://felek.cns.umass.edu:8080/geoserver/wms',
    //        serverType: 'geoserver',
    //        params: {
    //            'LAYERS': "Streams:Deposition_of_Nitrogen",
    //            'TILED': true
    //        }
    //    })
    //});

    //map.addLayer(vectorLayer_2);

    //map.addLayer(geoLayer);

}

function removeTopLayer() {
    var layers = map.getLayers();
    layers.pop();
}

function swapTopLayer() {
    var layers = map.getLayers();
    var topLayer = layers.removeAt(2);
    layers.insertAt(1, topLayer);
}