function submit() {
    var text = $('#knowledge').val();
    var tags = $('#tags').val();
    
    var d = {"text":text, "tags":tags}
    
    $.ajax({"url":"http://localhost/SoHacksProject/server/makepost.php"})
}

function getLocation() { //Get the user's GeoLocation
    navigator.geolocation.getCurrentPosition(function (position) { // on success
        var currentPosition = position;
        console.log(currentPosition.timestamp);
        console.log(position);
        return position;
    }, function () { // on failure
        console.log("Phone Gap location API failed");
        console.log("code: " + error.code);
        console.log("message: " + error.message);
    });
}