<?php header('Content-Type: application/json'); ?>
<?php 
    function getDist($json1,$json2){
        $j1 = json_decode($json1);
        $x1 = $j1->latitude;
        $y1 = $j1->longitude;
        
        $j2 = json_decode($json2);
        $x2 = $j2->latitude;
        $y2 = $j2->longitude;
        
        return sqrt( pow(($x2-$x1), 2) + pow(($y2-$y1), 2) );
        
    }

    function resToJSON($result){
        $num=mysql_numrows($result);
        $total = array();
        $i=0;
        while ($i < $num) {
            $tmp = array();
            $tmp['id']=mysql_result($result,$i,"id");
            $tmp['username']=mysql_result($result,$i,"username");
            $tmp['userid']=mysql_result($result,$i,"userid");
            $tmp['text']=mysql_result($result,$i,"text");
            $tmp['tags']=mysql_result($result,$i,"tags");
            $tmp['geoloc']=mysql_result($result,$i,"geoloc");
            $tmp['likedby']=mysql_result($result,$i,"likedby");
            $tmp['example']=mysql_result($result,$i,"example");
            
            array_push($total,$tmp);
            
            $i++;
        }
        
        return json_encode($total);

    }

    require 'sql.php';

    if(!isset($_GET['by'])){
        die('by');
    } elseif($_GET['by'] == 'id'){ // GET BY ID & ID = POST ID
        
        if(!isset($_GET['id'])){
            die('missing');   
        }
        $id = mysql_real_escape_string($_GET['id']);
        $query = "SELECT * FROM posts WHERE id = $id";
        $res = mysql_query($query);
        
        echo resToJSON($res);
    } elseif($_GET['by'] == 'all'){ // GET BY ALL
        
        $query = "SELECT * FROM posts LIMIT 50";
        $res = mysql_query($query);
        echo resToJSON($res);
    } elseif($_GET['by'] == 'user'){ // GET BY USER & USERID = USERID
        if(!isset($_GET['userid'])){
            die('missing');   
        }
        
        $id = mysql_real_escape_string($_GET['userid']);
        $query = "SELECT * FROM posts WHERE userid = '$id' LIMIT 50";
        $res = mysql_query($query);
        
        echo resToJSON($res);   
    } elseif($_GET['by'] == 'geo'){ //GET BY GEO AND POST USER GEO
        if(!isset($_POST['geo'])){
            die('missing');   
        }
        
        $mgeo = $_POST['geo']
        
        $query = "SELECT * FROM posts LIMIT 50";
        $result = mysql_query($query);
        
        
        $total = array();
        
        
        $num=mysql_numrows($result);
        $total = array();
        $i=0;
        
        while ($i < $num) {
            $geo=mysql_result($result,$i,"geoloc");
            echo getDist($mgeo,$geo);
            
            $i++;
        }
        
        
        
        
    }

?>