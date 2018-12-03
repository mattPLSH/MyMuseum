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

        $stmt = $conn->prepare("SELECT favoritid, artid FROM Favorites WHERE userid = (?);");
        $stmt->bind_param("s", $user);
        $user = $vals["userId"];

        $stmt->execute();
        $stmt->bind_result($result);
        $stmt->fetch();
        $stmt->close();
        $conn->close();

        echo($result);
    }

?>