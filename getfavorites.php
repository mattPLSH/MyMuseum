<?php
    session_start();

    //create connection
    $conn = new mysqli("127.0.0.1", "root", "", "mymuseum");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if(!($stmt = $conn->prepare("SELECT * FROM favorites WHERE userid = ?;"))){
        $error = Array(
            "error" => "Request Failed",
            "message" => "Something went wrong"
        );
        print($error);
    }
    else{
        $user = $_SESSION["userid"];
        $stmt->bind_param("s", $user);

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