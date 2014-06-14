var timeStyle = function() {
    var d = new Date();
    var h = d.getTime();
    var hour = (Math.floor (h / 3600000) % 24) - 7;

    if (13 > hour > 8) {
        $('#header').class  = "afternoon";
    }else {
        if (5 < hour < 14) {
            $('#header').class  = "morning";
        } else{
            $('#header').class  = "night";
        };
    }
}