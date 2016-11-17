var FOCUS_PAGE = document.getElementById('home-page');
//function(name, age, area) {
    
//}

//("mkando", 23, "lusaka");


function slideTo(id) {
    if (FOCUS_PAGE == document.getElementById(id)) {
        //alert('skipped');
        return;
    }

    var classes = document.getElementById(id).className.split(' ');
    var stageType = classes.indexOf('stage-left');
    if (FOCUS_PAGE == null) {
        FOCUS_PAGE = document.getElementById('home-page');
    }
    //alert(stageType);
    if (stageType > 0) {
        FOCUS_PAGE = 'page transition stage-right';
    } else {
        FOCUS_PAGE.className = 'page transition stage-right';
    }

    FOCUS_PAGE = document.getElementById(id);
    FOCUS_PAGE.className = 'page transition stage-center';
}






