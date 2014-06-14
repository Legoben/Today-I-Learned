<?php 
    require 'sql.php';
    
    $text = htmlspecialchars(mysql_real_escape_string($_POST['text']));
    $tags = htmlspecialchars(mysql_real_escape_string($_POST['tags']));
    $username = htmlspecialchars(mysql_real_escape_string($_POST['username']));
    $userid = htmlspecialchars(mysql_real_escape_string($_POST['userid']));
    $geoloc = mysql_real_escape_string($_POST['geoloc']);

    if(!isset($text) or $text == ''){
        echo 'text';
        die();
    }

    if(!isset($tags) or $tags == ''){
        echo 'tags';
        die();
    }

    $query = "INSERT INTO posts VALUES ('', '$username', '$userid', '$text', '$tags', '$geoloc', '0','')";
    mysql_query($query);

?>