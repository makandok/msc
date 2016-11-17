function setElementState(element) {
    var elmt = document.getElementById(element.elementName);
    //console.log("change state for" + elmt);
    if (elmt) {
        elmt.style.visibility = element.visibility;
        //console.log("State changed to " + element.visibility);
    }
};
function enableShowAndHideLegendButtons() {
    setElementState({ elementName: "hideLegendBtn", visibility: "visible" });
    setElementState({ elementName: "showLegendBtn", visibility: "visible" });
};


function showAddProjectDialog() {
    //we allow defining new projects and assigning roads to a given project.
    //show a map and allow a user to click and assign to the named project
    showAddProjectControl();
};

function saveMap() {
    //div to image
    //or we redraaw the map
    console.log("Save the current map");
};

function addInfoAndPhoto() {
    console.log("add own photo and other information");
};


