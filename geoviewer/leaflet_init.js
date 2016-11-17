//define a map here



//var map = L.map('map').setView([-15.412714, 28.30715], 17);
var map = L.map('map').setView([-15.44161, 28.32357], 14);

L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution:
        ''
        //'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        //'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        //'Imagery © <a href="http://mapbox.com">Mapbox</a>'

    ,id: 'examples.map-20v6611k'
}).addTo(map);

//map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.

//var baseballIcon = L.icon({
//    iconUrl: 'baseball-marker.png',
//    iconSize: [32, 37],
//    iconAnchor: [16, 37],
//    popupAnchor: [0, -28]
//});

var prefstyl = {
    style:
        function (feature) {
            switch (feature.properties.surf) {
                case 'tup':
                    return roads_tup;
                case 'tp':
                    return roads_tp;
                case 'uu':
                    return roads_uu;
                case 'up':
                    if (feature.properties.unique_id == "1300" || feature.properties.unique_id == "237")
                    {
                        return selected_feature;
                    }
                    else
                        return roads_up;
                case 'uui':
                    return roads_uui;
                case 'upi':
                    if (feature.properties.unique_id == "237") {
                        return selected_feature;
                    }
                    else
                    return roads_upi;
                default:
                    {
                        return roads_unclass;
                    }
            }
        },
    onEachFeature: onEachFeature,
    //pointToLayer: function(feature, latlng) {
    //    return L.circleMarker(latlng, {
    //        radius: 8,
    //        fillColor: "#ff7800",
    //        //fillColor: null,
    //        color: "#000",
    //        weight: 1,
    //        opacity: 1,
    //        fillOpacity: 0.8
    //    });
    //}
};

//var highligh_feature= {


//    #minor_roads [zoom>8]
//{
//  #minor_roads::outline {
//    line-width:3;
//line-color:#168;
//}

//  #minor_roads::fill {
//      line-width:2;
//      line-color:#fff;
//  }
//}
//}

var districts_style = {
    style:
        function (feature) {
            switch (feature.properties.name1_) {
                case 'Lusaka District':
                    return lusaka_district;
                default:
                    {
                        return adjacent_districts;
                    }
            }
        },
    //onEachFeature: function() {},
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 8,
            fillColor: "#ff7800",
            //fillColor: null,
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        });
    }
};

function onEachFeature(feature, layer) {
    layer.on(

        {
            //mouseover: highlightFeature,
            //mouseout: resetHighlight,
            click: zoomToFeature
        }
    );
}

function highlightFeature(e) {
    //var layer = e.target;

    //layer.setStyle({
    //    weight: 5,
    //    color: '#666',
    //    dashArray: '',
    //    fillOpacity: 0.7
    //});

    //if (!L.Browser.ie && !L.Browser.opera) {
    //    layer.bringToFront();
    //}
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

L.geoJson([
        lsk_roads_trunks, lsk_roads_up, lsk_roads_uu
],
    prefstyl
).addTo(map);

L.geoJson([old_districts_lusaka], districts_style).addTo(map);


//var coorsLayer = L.geoJson(coorsField, {

//    pointToLayer: function (feature, latlng) {
//        return L.marker(latlng, { icon: baseballIcon });
//    },

//    onEachFeature: onEachFeature
//}).addTo(map);
