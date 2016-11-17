//define a map here
//var map = L.map('map').setView([-15.412714, 28.30715], 17);
//var map = L.map('map').setView([-15.44161, 28.32357], 14);
var map = L.map('map').setView([-15.42323, 28.33589], 13);
//var map = L.map('map').setView([-15.51770, 28.27681], 15);

map.on(
{
    "showProjectFeatures": onClickShowProjectFeatures,
    //"resize": doSomethingMapResized,
    "mousemove": showMouseCoordinates,
    //"overlayadd": onLayerAdded,
    //"overlayremove": onLayerRemoved
});

//shows helpful information about each feature selected
var infoWindow = L.control();

var addProjectsControl;
var roadslayer;
var picturesLayer;
var defaultroadstylesfunction;
var currentProjectName = "allprojects";

var defaultTask = 0;
var taskGetFeaturesOnClick = 1;
var taskEnableCommentsAndPhotos = 2;
var currentTask = defaultTask;

var newprojectadded;
var defaultDivIcon = L.divIcon({ className: 'roadmarker' });
var myFeatureDivIcon = L.divIcon({ className: 'myroadmarker' });

function doSomethingMapResized(e) {
    if (e) {
        console.log(e);
    }
};

function showMouseCoordinates(e) {
    if (e) {
        var coordslabel = document.getElementById("mousecoords");
        if (coordslabel) {
            //console.log(e);
            var mouselat = Number(e.latlng.lat);
            var mouselng = Number(e.latlng.lng);
            if (mouselat != NaN && mouselng != NaN) {
                coordslabel.innerText = "(" + mouselng.toPrecision(7) + ", " + mouselat.toPrecision(7) + ")";
            }
        }
    }
};

//L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
//    maxZoom: 18,
//    attribution:
//        ''
//        //'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
//        //'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//        //'Imagery © <a href="http://mapbox.com">Mapbox</a>'

//    ,id: 'examples.map-20v6611k'
//}).addTo(map);


//map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.

//var baseballIcon = L.icon({
//    iconUrl: 'baseball-marker.png',
//    iconSize: [32, 37],
//    iconAnchor: [16, 37],
//    popupAnchor: [0, -28]
//});

function defaultRoadStyle(feature) {
    switch (feature.properties.surf) {
    case 'tup':
        return roads_tup;
    case 'tp':
        return roads_tp;
    case 'uu':
        return roads_uu;
    case 'up':
        //if (feature.properties.unique_id == "1300" || feature.properties.unique_id == "237") {
        //    return selected_feature;
        //} else
            return roads_up;
    case 'uui':
        return roads_uui;
    case 'upi':
        //if (feature.properties.unique_id == "237") {
        //    return selected_feature;
        //} else
            return roads_upi;
    default:
    {
        return roads_unclass;
    }
    }
};

function highlightProjectRoads(feature) {
    if (feature.properties.unique_id % 11 == 11) {
        return selected_feature;
    } else
        return defaultRoadStyle(feature);
};

function showproject(projectname) {
    //console.log("Button clicked for project " + projectname);
    //console.log(map);
    map.fire("showProjectFeatures", { projname: projectname });
};

function onClickShowProjectFeatures(project) {
    var newStyle;
    if (project) {
        if (project.projname) {
            //console.log("Event Fired. Selected project is: " + currentProjectName);
            if (currentProjectName == project.projname) {
                //means a user clicked the same button twice, so we hide and reset the current
                currentProjectName = "";
                newStyle = function(f) {
                    return defaultRoadStyle(f);
                };
            } else {
                currentProjectName = project.projname;
                if (project.projname == "pave_zambia_2000") {
                    newStyle = function(f) {
                        if (f.properties.unique_id < currentProjectName.length) {
                            return selected_feature;
                        } else
                            return defaultRoadStyle(f);
                    };
                } else if (project.projname == "l400") {
                    newStyle = function(f) {
                        if (f.properties.unique_id < currentProjectName.length) {
                            return selected_feature;
                        } else
                            return defaultRoadStyle(f);
                    };
                } else if (project.projname == "link_zambia_8000") {
                    newStyle = function(f) {
                        if (f.properties.unique_id < currentProjectName.length) {
                            return selected_feature;
                        } else
                            return defaultRoadStyle(f);
                    };
                } else if (project.projname == "allprojects") {
                    newStyle = function(f) {
                        if (f.properties.unique_id % 23 == 0 || f.properties.unique_id % 29 == 0 || f.properties.unique_id % 13 == 0) {
                            return selected_feature;
                        } else
                            return defaultRoadStyle(f);
                    };
                } else {
                    newStyle = highlightProjectRoads;
                }
            }

            if (roadslayer) {
                //roadslayer.eachLayer(function (lyr) { lyr.setStyle(newStyle); });
                roadslayer.setStyle(newStyle);
                ////console.log("setting style");
                //var crntlyrs = roadslayer.getLayers();
                //for (var lindx in crntlyrs) {
                //    crntlyrs[lindx].setStyle(newStyle);
                //}
            }
        }
    }
    else
        console.log("Event Fired. No params passed");
};

//NOTE: these styles are defined in leaflet/road_styles.js
var districts_style = {
    style:
        function (feature) {
            return adjacent_districts;

            switch (feature.properties.name1_) {
                case 'Lusaka District':
                    return lusaka_district;
                default:
                    {
                        return adjacent_districts;
                    }
            }
        },
    //hides lusaka district feature
    filter: function (feature, layer) {
        if (feature.properties.name1_ == 'Lusaka District')
            return false;
        else
            return true;
    },
    //onEachFeature: function() {},
    //pointToLayer: function (feature, latlng) {
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

function onEachRoadFeature(feature, layer) {
    layer.on(
        {
            "mouseover": showinfobox,
            //"mouseout": closeinfobox,
            //mouseover: highlightFeature,
            //mouseout: resetHighlight,
            click: zoomAndShowInfoMarkers
        }
    );
};

//roadslayer = L.geoJson([
//        lsk_roads_trunks, lsk_roads_up, lsk_roads_uu
//    ],
//    {
//        style: defaultRoadStyle,
//        onEachFeature: onEachRoadFeature,
//    }
//);

var trunkroads = L.geoJson([lsk_roads_trunks],
    {
        style: defaultRoadStyle,
        onEachFeature: onEachRoadFeature,
    }
);
var pavedurban = L.geoJson([lsk_roads_up],
    {
        style: defaultRoadStyle,
        onEachFeature: onEachRoadFeature,
    }
);
var unpavedurban = L.geoJson([lsk_roads_uu],
    {
        style: defaultRoadStyle,
        onEachFeature: onEachRoadFeature,
    }
);

//roadslayer = L.layerGroup([pavedurban,trunkroads, unpavedurban]);
roadslayer = L.featureGroup([pavedurban, trunkroads, unpavedurban]);



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
};

function urlChanged(e) {
    console.log("URL has been changed");
    if (e.files && e.files[0]) {
        var reader = new FileReader();
        reader.onload = imgLoaded;
        reader.readAsDataURL(e.files[0]);
    }
};

var popupHtml = '<div style="width:300px; background-color:red"><p>Poop</p></div>';
//var addCommentsAndPictureHtml = '<h4>Add a comment or photo</h4><label>Select picture</label><input type = "file" onChange = "urlChanged(this)"/><label>Image Selected</label><img id="theimg" src="#" alt="image selected"/><label>Comments: </label><input type = "text" id="otherCommentsTxt"><input id="saveCommentAndImageBtn" type = "submit" value = "Save" class="btn btn-lg" onclick=saveImageAndComments()> <input type = "submit" value = "Cancel" class="btn btn-lg" onclick=cancelImageAndComments()>';


function makeAjaxRequest() {
    $.ajax({
        url: "http://localhost:8079/students/add/",
        type: "POST",
        crossDomain: true,
        data: JSON.stringify(somejson),
        dataType: "json",
        success: function (response) {
            var resp = JSON.parse(response);
            alert(resp.status);
        },
        error: function (xhr, status) {
            alert("error");
        }
    });
};

function sendresponse(response) {
    response = HttpResponse(json.dumps('{"status" : "success"}'));
    response.__setitem__("Content-type", "application/json");
    response.__setitem__("Access-Control-Allow-Origin", "*");
    return response;
};

function saveImageAndComments() {
    console.log("Photo Saved. Implement this method saveImageAndComments()");

    var image = $("#imageAdded").val();
    var comments = $("#otherCommentsTxt").val();

    var selector = $("#fileselector");
    //console.log(selector);
    //console.log(selector.value);

    var theurl = "http://localhost:52378/api/userinfo/";

    //$.get(url, function (data, status) { alert("succeeded"); });

    $.ajax(
        {
            url: theurl,
            successs:
                function(result) {
                    alert("result");
                }
        }
    );

   // makeAjaxRequest();

    if (selector[0] && selector[0].value) {
        console.log("Comments: "+comments + ". Image: " + selector[0].value);
    } else
        console.log(comments);
};

function clickFileSelector() {
    $('#fileselector').click();
};

function imgLoaded(e) {
    console.log("img Loaded: " + e);
    $('#imageAdded').attr('src', e.target.result);
};

function addMarkerAndPhotoCommentsToMap(options) {
    var marker = L.marker(options.latlng, { icon: options.divIcon == undefined ? defaultDivIcon : options.divIcon });
    marker.addTo(map);

    var popupDiv;
    //console.log("created popup div");
    popupDiv = L.DomUtil.create('div', 'panel panel-default');
    popupDiv.style.width = "300px";
    //popupDiv

    if (options.customHtml == undefined) {
        popupDiv.innerHTML =
            $('#hidden_addphototext')[0].innerHTML;
    } else {
        popupDiv.innerHTML = options.customHtml;
    }

    if (options.markerId != undefined) {
        console.log("setting id: " + options.markerId);
        popupDiv.setAttribute("data-markerid", options.markerId);
    }

    if (options.openPopup != undefined && !options.openPopup) {
        marker.bindPopup(popupDiv);
    } else
        marker.bindPopup(popupDiv).openPopup();
};

function abs(num) { return num < 0 ? num * -1 : num; };


function zoomAndShowInfoMarkers(e) {
    if (currentTask == taskGetFeaturesOnClick) {
        addRoadToProject(e);
    }
    else if (currentTask == taskEnableCommentsAndPhotos) {
        console.log("coords: " + e.latlng);
        var lat = e.latlng.lat * 100000;
        var lng = e.latlng.lng * 100000;

        var uniquekey = abs(lat.toPrecision(7)) + "" + abs(lng.toPrecision(7));

        addMarkerAndPhotoCommentsToMap({ latlng: e.latlng, divIcon: myFeatureDivIcon, markerId: Number(uniquekey) });

        //var marker = L.marker(e.latlng, { icon: defaultDivIcon });
        //marker.addTo(map);

        ////console.log($('#hidden_addphototext'));

        //var popupDiv;
        //    //console.log("created popup div");
        //    popupDiv = L.DomUtil.create('div', 'panel panel-default');
        //    popupDiv.style.width = "300px";
        //    popupDiv.innerHTML =
        //    $('#hidden_addphototext')[0].innerHTML;
        //marker.bindPopup(popupDiv).openPopup();

    }
    else {
        console.log("General Click");
        zoomToFeature(e);

        //for this feature, we update the pictures layer to show pictures and icons for this layer

        //showFeatureInfoMarkers(e.target.feature.properties.unique_id);
    }
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
};

function showFeatureInfoMarkers(featureUniqueId) {
    //we retrieve these from the database and display as a separate layer

}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
};

//draw a couple of markers on the map
//var countr = 0;
//for (var pnt in otherpoints) {
//    if (countr % 10 != 0) {
//        countr++;
//        continue;
//    }

//    var p = otherpoints[pnt];
//    var marker = L.marker([p[1], p[0]], { icon: defaultDivIcon });
//    marker.addTo(map);
//    console.log(countr % 10);
//    countr++;
//}

//we add some markers based on ids that we already have
//currentPictures
var allPictureLocations = currentPictures;
//var allPictureLocations = pictureLayer["features"];

for (var i in allPictureLocations) {
    var coord = allPictureLocations[i];
    addMarkerAndPhotoCommentsToMap(
        { latlng: { lat: coord[2], lng: coord[1] }, customHtml: undefined, divIcon: defaultDivIcon, markerId: coord[0], openPopup: false }
    );
}

roadslayer.addTo(map);
L.geoJson([old_districts_lusaka], districts_style).addTo(map);

//overlays control
var baselayers = {};
var roadslayers = {
    "Urban (unpaved)": unpavedurban,
    "Urban (paved)": pavedurban,
    "Trunk": trunkroads,
    "All Roads": roadslayer,
    //"Road Info": picturesLayer,
};

var overlayscontrol = L.control.layers(baselayers, roadslayers, { position: "topleft", collapsed: false, autoZIndex: true, width: "300" });
//overlayscontrol.update = function() {};
//overlayscontrol.onAdd = function (props) { console.log("layer control added to map"); };

//overlayscontrol.onAdd = function(layer, layername) {
//    console.log("added");
//    //div = L.DomUtil.create('canvas', 'info canvaslegend');
//    //div.setAttribute("width", "850");
//    //div.setAttribute("height", "40");
//    //div.setAttribute("id", "legendcanvas");
//    //return div;
//};
overlayscontrol.addTo(map);
//console.log(overlayscontrol);



//code to show a helper box that display certaain information about each road
infoWindow.onAdd = function(mymap) {
    this.divForInfoWindow = L.DomUtil.create("div", "infowindowclass");
    this.update();
    return this.divForInfoWindow;
};

infoWindow.update = function(props) { this.divForInfoWindow.innerHTML = '<h5>Road Details</h5>' + (props ? '<b>' + props.unique_id + '</b> <br/>' + props.surf + '.' : 'Move mouse over road'); };
infoWindow.addTo(map);

function showinfobox(e) {
    infoWindow.update(e.target.feature.properties);
};

function closeinfobox(e) {
    infoWindow.update();
};

function drawitem(ctx, label, preferredstyle, xc, yc, symbolsize) {
    ctx.strokeStyle = preferredstyle;
    ctx.beginPath();
    ctx.moveTo(xc, yc + symbolsize/2);
    ctx.moveTo(xc + symbolsize, yc + symbolsize / 2);
    ctx.stroke();
};

function drawLegendItems(mycanvas, mymap) {
    var ctx = mycanvas.getContext("2d");
    //before you edit, look at the rooad styles as defined under road_styles.js
    var symbols = [
        { type: "Project", symbolSize: 7, symbolColor: "#0000ff", opacity: 0.77 },
        { type: "Trunk (p)", symbolSize: 2.7, symbolColor: "#3B007F", opacity: 0.7 },
        { type: "Trunk (np)", symbolSize: 2.5, symbolColor: "#F84F40", opacity: 0.7 },
        { type: "Urban (p)", symbolSize: 2, symbolColor: "#F84F40", opacity: 0.7 },
        { type: "Urban (np)", symbolSize: 2, symbolColor: "#055D00", opacity: 0.7 },
        //includes Urban Paved Impassable and Urban Unpaved Impassable
        { type: "Urban-Imp", symbolSize: 1, symbolColor: "#229A00", opacity: 0.7 },
        { type: "other", symbolSize: 0.4, symbolColor: "green", opacity: 0.1}
    ];

    var xoffsset = 0;
    for (var indx in symbols) {
        drawSymbol({ myContext: ctx, xPos: xoffsset, yPos: 0 }, { lineWidth: 2, symbolSize: 30 }, { Color: symbols[indx].symbolColor, lineWidth: symbols[indx].symbolSize, symbolLabel: symbols[indx].type });
        //console.log(indx + ".  x: " + xoffsset);
        ctx.translate(-xoffsset, 0);
        xoffsset += 120;
    }
};

function drawSymbol(contextObject, symbolbackground, symbol) {
    var linewidth = symbolbackground.lineWidth;
    var symbolsize = symbolbackground.symbolSize;

    var ctx = contextObject.myContext;
    ctx.translate(contextObject.xPos, contextObject.yPos);

    ctx.strokeStyle = "black";
    ctx.beginPath();

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, symbolsize, symbolsize);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.fillRect(linewidth, linewidth, symbolsize - (2 * linewidth), symbolsize - (2 * linewidth));
    ctx.fill();


    //we draw the actual sign vehicle
    ctx.strokeStyle = symbol.Color;
    ctx.lineWidth = symbol.lineWidth;

    ctx.moveTo(symbolsize / 10, symbolsize/2.5);
    ctx.lineTo(symbolsize / 3.1, symbolsize / 5);
    ctx.lineTo(symbolsize / 1.42, symbolsize / 1.25);
    ctx.lineTo(symbolsize / 1.2, symbolsize / 2.5);
    ctx.stroke();

    ctx.fillStyle = "black";
    var fontsize = symbolsize * 0.4;
    ctx.font = fontsize + 'pt Calibri';
    ctx.fillText(symbol.symbolLabel, symbolsize+(symbolsize / 5), (symbolsize * 0.67));
};

(function (drawlegend) {
    var legend = L.control({ position: 'bottomright' });
    var drawsurface;
    legend.onAdd = function (map) {
        drawsurface = L.DomUtil.create('canvas', 'info canvaslegend');
        drawsurface.setAttribute("width", "850");
        drawsurface.setAttribute("height", "40");
        drawsurface.setAttribute("id", "legendcanvas");
        return drawsurface;
    };
    legend.addTo(map);
    drawlegend(drawsurface, map);
    enableShowAndHideLegendButtons();
})(drawLegendItems);


//add new projects behavior
function prepareAddProjectsView(targetdiv, currenntmap) {
    console.log("project control added and target div is " + targetdiv);
    targetdiv.innerHTML = $('#hidden_addnewprojecthtml')[0].innerHTML;
};

L.control.scale({ position: "bottomleft", metric: true, maxWidth: 300, imperial: false }).addTo(map);


function enableComments() {
    if (currentTask == taskEnableCommentsAndPhotos) {
        currentTask = defaultTask;
        //roadslayer.closePopup();
        return;
    }

    console.log("add commnent fired");
    currentTask = taskEnableCommentsAndPhotos;
};

function cancelAddProject() {
    clearAddProjectsControlAndHide();
    setElementState({ elementName: "showaddprjbtn", visibility: "visible" });
};

function clearAddProjectsControlAndHide() {
    currentTask = defaultTask;
    newprojectadded = getBlankProject();
    $("#prjname").val(newprojectadded.projectName);
    $("#prjstartdate").val(newprojectadded.projectStartDate);
    $("#roadsselectedcount").val(0);

    setElementState({ elementName: "addProjectsControldiv", visibility: "hidden" });
};

function getBlankProject() {
    return { currentProjectName: "", projectStartDate: "1900-01-01", projectRoads: [], isInitialised: false };
};

function doSaveNewProject(x) {
    console.log("Project Saved: " + x);
};

function validateAndAddPoject() {
    console.log("add new project button clicked");

    newprojectadded.currentProjectName = $("#prjname").val();
    newprojectadded.projectStartDate = $("#prjstartdate").val();
    newprojectadded.isInitialised = true;
    console.log(newprojectadded);

    //todo: logic to save comes here
    //lets save the data so far
    doSaveNewProject(newprojectadded);

    clearAddProjectsControlAndHide();
    setElementState({ elementName: "showaddprjbtn", visibility: "visible" });
};

function addRoadToProject(e) {
    console.log("feature selected is: " + e.target.feature.properties.unique_id);
    if (newprojectadded.projectRoads.indexOf(e.target.feature.properties.unique_id) != -1) {
        console.log("Feature already added: " + e.target.feature.properties.unique_id);
        return;
    }

    newprojectadded.projectRoads.push(e.target.feature.properties.unique_id);
    console.log("Current items in array: ", newprojectadded.projectRoads.length);
    $("#roadsselectedcount").val(newprojectadded.projectRoads.length);
};

function showAddProjectControl() {
    console.log("showAddProjectControl fired");
    currentTask = taskGetFeaturesOnClick;

    //we clear the current project details if any
    newprojectadded = getBlankProject();

    if (addProjectsControl) {
        setElementState({ elementName: "addProjectsControldiv", visibility: "visible" });
        //console.log("event skipped and it has already been fired");
        return;
    }

    addProjectsControl = L.control({ position: 'bottomleft' });
    var div;
    addProjectsControl.onAdd = function (map) {
        console.log("addProjectsControl added to map");
        
        //div = L.DomUtil.create('div', 'info addnewprojectdlg');
        div = L.DomUtil.create('div', 'panel panel-default');
        div.setAttribute("id", "addProjectsControldiv");
        div.style.width = "270px";
        div.style.bottom = "75px";
        return div;
    };
    addProjectsControl.addTo(map);
    //any other function we want to call which act on this div
    console.log(div);
    prepareAddProjectsView(div, map);

    setElementState({ elementName: "showaddprjbtn", visibility: "visible" });
};

//var coorsLayer = L.geoJson(coorsField, {
//    pointToLayer: function (feature, latlng) {
//        return L.marker(latlng, { icon: baseballIcon });
//    },
//    onEachFeature: onEachFeature
//}).addTo(map);