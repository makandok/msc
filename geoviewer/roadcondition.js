var menubarcontainer = document.getElementById("menubar");
//todo: logic to pull the available projects from the server and populate the list below
if (!document.getElementById("home")) {
    menubarcontainer.innerHTML += ' <input id="home" type="button" value="Home" class="btn btn-lg" onclick="location.href = \'index.html\'" /> ';
}

var elementsToAdd = [
    ["survey_2014", "2014 Survey"],
    ["survey_2010", "2010 Survey"]
];
for (var ti in elementsToAdd) {
    var elmtName = elementsToAdd[ti];
    if (document.getElementById(elmtName[0]))
        continue;
    menubarcontainer
        .innerHTML += ' <input id="' + elmtName[0] + '" type="button" value="' + elmtName[1] + '" class="btn btn-lg"  onclick=showproject("' + elmtName[0] + '") />';
}

if (!document.getElementById("googleplusbtn")) {
    menubarcontainer.innerHTML += ' <a id="googleplusbtn" class="btn btn-default btn-social btn-google-plus"><i class="fa fa-google-plus"></i> Share via Google+</a>';
}

if (!document.getElementById("facebookbtn")) {
    menubarcontainer.innerHTML += ' <a id="facebookbtn" class="btn btn-default btn-social btn-facebook"><i class="fa fa-facebook"></i> Share via Facebook</a>';
}

