<?php
    $conn = new mysqli("127.0.0.1", "root", "", "MyMuseum");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if(!($stmt = $conn->prepare("SELECT artid, imgurl, author, title, date FROM Favorites JOIN User ON Favorites.userid=User.userid WHERE usertype = 0;"))){
        $error = Array(
            "error" => "Request Failed",
            "message" => "Something went wrong"
        );
        print($error);
    }
    else{
        if($stmt->execute()){
            $result = $stmt->get_result();
            $ret;
            while ($data = $result->fetch_assoc())
            {
                $ret[] = $data;
            }
            $stmt->close();
            $conn->close();

            echo(json_encode($ret));
        }else{
            $error = Array(
                "error" => "Execution Failed",
                "message" => "Something went wrong"
            );
        }
    }
?>