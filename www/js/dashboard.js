
var populate = function() {
    
    var json = [{"id":"3","username":"Ben","userid":"539b8d2092d6c","text":"Test","tags":"Test,tester","geoloc":"{\"latitude\":29.5083464,\"longitude\":-98.394077}","likedby":"0","example":""},{"id":"4","username":"Ben2","userid":"539be1a799fec","text":"First Test","tags":"tnk","geoloc":"{\"latitude\":29.508391300000003,\"longitude\":-98.3940331}","likedby":"0","example":""},{"id":"5","username":"Ben2","userid":"539be1a799fec","text":"First Test","tags":"tnk","geoloc":"{\"latitude\":29.508372299999998,\"longitude\":-98.3941035}","likedby":"0","example":""}]
    

    for (var i = 0; i < json.length ; i++) {
        var listing = "<li id=\"" + i + "\">Today I learned <span class=\"content\" id=\"til" + i + "\">that every day is Caturday!<a href=\"http://thecatapi.com\"><img src=\"http://thecatapi.com/api/images/get?format=src&type=gif\"></a></span><hr></li>";
        $('#listings').prepend(listing);
    };
}

window.onload = populate;