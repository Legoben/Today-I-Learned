var pos;
var loc;

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


var populate = function() {
    
    getLocation();
    
    loadAll()
}

function makeList(){
    $('#listings').empty();
    for (var i = 0; i < json.length ; i++) {
        var listing = "<li style='display:none;' id=\"" + i + "\" onclick='slide("+i+")'><span class=\"content\" id=\"til" + i + "\">" + (json[i].text) + "</span><div class='hidden'> Published by <span class='dude' onclick='loadUser(\""+json[i].userid+"\")'>"+json[i].username +"</span>. Tagged as "+json[i].tags+". - <span class='like-this' onclick='favPost(\""+json[i].id+"\"); $(this).fadeOut();'>Favorite this?</span></div><hr></li>";
        $('#listings').prepend(listing);
    }
    console.log("it wurked");
}

function getAll(){
    var data;
    $.ajax({async: false, url:"http://til.helloben.co/server/getposts.php?by=all", success:function(d){data = d}})
    return data;
}


function getID(ids){
    var data;
    $.ajax({async: false, url:"http://til.helloben.co/server/getposts.php?by=id", data: {'id':ids}, type: 'post', complete:function(d){data = d;console.log(d)}})
    return data;
    makeList();
}

function getUser(uid){
    var data;
    $.ajax({async: false, url:"http://til.helloben.co/server/getposts.php?by=user", data: {'userid':uid}, type: 'post', complete:function(d){data = d;console.log(d)}})

    return data;
    makeList();
}

function getGeo(){
    var data;
    $.ajax({async: false, url:"http://til.helloben.co/server/getposts.php?by=geo", data:{"geo":pos}, type:"post", success:function(d){data = d;console.log(d)}})
    return data;   
}

function getTag(tag){
    var data;
    $.ajax({async: false, url:"http://til.helloben.co/server/getposts.php?by=tag&tag="+tag, success:function(d){data = d}})
    return data;
    makeList();
}

function loadAll(){
    $('#listings').empty();
    
    var json = getAll();
    
    
    for (var i = 0; i < json.length ; i++) {
        var listing = "<li style='display:none;' id=\"" + i + "\" onclick='slide("+i+")'><span class=\"content\" id=\"til" + i + "\">" + (json[i].text) + "</span><div class='hidden'> Published by <span class='dude' onclick='loadUser(\""+json[i].userid+"\")'>"+json[i].username +"</span>. Tagged as "+json[i].tags+". - <span class='like-this' onclick='favPost(\""+json[i].id+"\"); $(this).fadeOut();'>Favorite this?</span></div><hr></li>";
        $('#listings').prepend(listing);
        $('#' + i).fadeIn();
        
    }
}

function loadGeo(){
    $('#listings').empty();
    
    var json = getGeo();
    
    
    for (var i = 0; i < json.length; i++) {
        var listing = "<li style='display:none;' id=\"" + i + "\" onclick='slide("+i+")'><span class=\"content\" id=\"til" + i + "\">" + (json[i].text) + "</span><div class='hidden'> Published by <span class='dude' onclick='loadUser(\""+json[i].userid+"\")'>"+json[i].username +"</span>. Tagged as "+json[i].tags+". - <span class='like-this' onclick='favPost(\""+json[i].id+"\"); $(this).fadeOut();'>Favorite this?</span></div><hr></li>";
        $('#listings').prepend(listing);
        $('#' + i).fadeIn();
    }
    
       
}

function loadFollowing(){
    $('#listings').empty();
    
    var j = JSON.parse(localStorage.getItem('following'))
    var json = getUser(j);
    json = json.responseJSON;
    
    for (var i = 0; i < json.length; i++) {
       var listing = "<li style='display:none;' id=\"" + i + "\" onclick='slide("+i+")'><span class=\"content\" id=\"til" + i + "\">" + (json[i].text) + "</span><div class='hidden'> Published by <span class='dude' onclick='loadUser(\""+json[i].userid+"\")'>"+json[i].username +"</span>. Tagged as "+json[i].tags+". - <span class='like-this' onclick='favPost(\""+json[i].id+"\"); $(this).fadeOut();'>Favorite this?</span></div><hr></li>";
        $('#listings').prepend(listing);
        $('#' + i).fadeIn();
    }
       
}


function followUser(uid){
    if(localStorage.getItem('following') == '' || localStorage.getItem('following') == undefined){
        localStorage.setItem('following', '[]');  
    }
    
    var j = JSON.parse(localStorage.getItem('following'))
    console.log(j);
    if($.inArray(uid) == -1){
        j.push(uid);
        $('.follow-button').text('Unfollow')
    } else {
        j.splice($.inArray(uid));
        $('.follow-button').text('Follow')
    }
    localStorage.setItem('following', JSON.stringify(j));
    
}

function favPost(pid){
    if(localStorage.getItem('faved') == '' || localStorage.getItem('faved') == undefined){
        localStorage.setItem('faved', '[]');  
    }
    
    var j = JSON.parse(localStorage.getItem('faved'))
    console.log(j);
    if($.inArray(pid) == -1){
        j.push(pid);
        $('.follow-button').text('Unfollow')
    } else {
        j.splice($.inArray(pid));
        $('.follow-button').text('Follow')
    }
    localStorage.setItem('faved', JSON.stringify(j));
    
}

function loadUser(uid){
     $('#listings').empty();

    var json = getUser([uid]);
    json = json.responseJSON;
    
    console.log(uid,json)
    
    var j = JSON.parse(localStorage.getItem('following'))
    
    for (var i = 0; i < json.length; i++) {
        console.log('Hayo')
       var listing = "<li style='display:none;' id=\"" + i + "\" onclick='slide("+i+")'><span class=\"content\" id=\"til" + i + "\">" + (json[i].text) + "</span><div class='hidden'> Published by <span class='dude' onclick='loadUser(\""+json[i].userid+"\")'>"+json[i].username +"</span>. Tagged as "+json[i].tags+". - <span class='like-this' onclick='favPost(\""+json[i].id+"\"); $(this).fadeOut();'>Favorite this?</span></div><hr></li>";
        $('#listings').prepend(listing);
        $('#' + i).fadeIn();
    }
    if($.inArray(json[0].userid) == -1){
        $('#listings').prepend("<button class='follow-button' onclick='followUser(\""+json[0].userid+"\")'>Follow "+json[0].username+"</button><br><br>");
    } else {
        $('#listings').prepend("<button class='follow-button' onclick='followUser(\""+json[0].userid+"\")'>Unfollow "+json[0].username+"</button><br><br>");
    }
}

function loadSearch(){
        $('#listings').html("<li style='display:none;' id='search-hold'><input id='search-text'><button onclick='doSearch()'>Search!</button></li>");
        $('#search-hold').fadeIn();
}

function doSearch(){
    var tag = $('#search-text').val();
    var json = getTag(tag)
    console.log('tag',json)
    for (var i = 0; i < json.length; i++) {
              
        var listing = "<li style='display:none;' id=\"" + i + "\" onclick='slide("+i+")'><span class=\"content\" id=\"til" + i + "\">" + (json[i].text) + "</span><div class='hidden'> Published by <span class='dude' onclick='loadUser(\""+json[i].userid+"\")'>"+json[i].username +"</span>. Tagged as "+json[i].tags+". - <span class='like-this' onclick='favPost(\""+json[i].id+"\"); $(this).fadeOut();'>Favorite this?</span></div><hr></li>";
        $('#listings').append(listing);
        $('#' + i).fadeIn();
    }
    
    
    
}

$("#search-text").keypress(function (e) {
            if (e.which == 13) {
                doSearch();   
            }
        });



function loadFavorites(){
     $('#listings').empty();
    
    var j = JSON.parse(localStorage.getItem('faved'))
    console.log(j);
    var json = getID(j);
    json = json.responseJSON;
    
    for (var i = 0; i < json.length; i++) {
       var listing = "<li style='display:none;' id=\"" + i + "\" onclick='slide("+i+")'><span class=\"content\" id=\"til" + i + "\">" + (json[i].text) + "</span><div class='hidden'> Published by <span class='dude' onclick='loadUser(\""+json[i].userid+"\")'>"+json[i].username +"</span>. Tagged as "+json[i].tags+". - <span class='like-this' onclick='favPost(\""+json[i].id+"\"); $(this).fadeOut();'>Favorite this?</span></div><hr></li>";
        $('#listings').prepend(listing);
        $('#' + i).fadeIn();
    }
}

function slide(num){
    /*console.log('Hai', num)
    $('.hidden', '#'+num).slideToggle();*/   
}


window.onload = populate;