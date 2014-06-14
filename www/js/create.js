var pos;
var loc;

window.onload = function(){
    loc = getLocation();
    //console.log(loc)
    //pos = JSON.stringify({"latitude":loc['coords'].latitude, "longitude":loc.coords.longitude})
    //console.log(pos);
}


function submit() {
    var text = $('#knowledge').val();
    var tags = $('#tags').val();
    
    var d = {"text":text, "tags":tags,"username":localStorage.getItem("username"),"userid":localStorage.getItem("uid"), "geoloc":pos}
    
    $.ajax({"url":"http://til.helloben.co/server/makepost.php", data:d, type:"POST", success:function(d){console.log(d); document.location = "dashboard.html"}})
}

function getLocation() { //Get the user's GeoLocation
    navigator.geolocation.getCurrentPosition(function (position) { // on success
        var currentPosition = position;
        console.log(currentPosition.timestamp);
        console.log(position);
        loc = position;
        pos = JSON.stringify({"latitude":loc.coords.latitude, "longitude":loc.coords.longitude})
    }, function () { // on failure
        console.log("Phone Gap location API failed");
        console.log("code: " + error.code);
        console.log("message: " + error.message);
    });
}