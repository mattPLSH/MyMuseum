<?php
    if($_POST){
        $vals = array(
            "userId" => $userId
        );

        //create connection
        $conn = new mysqli("localhost", "", "", "MyMuseum");

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $stmt = $conn->prepare("SELECT * FROM Favorites WHERE userid = ?;");
        $stmt->bind_param("s", $user);
        $user = $vals["userId"];

        $stmt->execute();
        $stmt->bind_result($favoriteid, $userid, $artid, $imgurl, $author, $title, $date);
        $stmt->fetch();
        $stmt->close();
        $conn->close();

        $result = Array(
            "favoriteid" => $favoriteid,
            "userid" => $userid,
            "artid" => $artid,
            "imgurl" => $imgurl,
            "author" => $author,
            "title" => $title,
            "date" => $date
        );

        echo(json_encode($result));
    }

?>