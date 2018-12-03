<?php

    if($_POST){
        $vals = array(
            "username" => $_POST["username"],
            "password" => $_POST["password"],
        );
        $function = $_POST["function"];

        //create connection
        $conn = new mysqli("127.0.0.1", "root", "", "MyMuseum");

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        if($function == "login"){
            if(!($stmt = $conn->prepare("SELECT userid, usertype FROM User WHERE username = ? AND password = ?;"))){
                $error = Array(
                    "error" => "Request Failed",
                    "message" => "Something went wrong"
                );
                print($error);
            }
            $user = $vals["username"];
            $pass = $vals["password"];
            $stmt->bind_param("ss", $user, $pass);
        
            $stmt->execute();
            $stmt->bind_result($userid, $usertype);
            $stmt->fetch();

            $stmt->close();
            $conn->close();

            if(count($userid) == 1){
                $result = Array(
                    "userid" => $userid,
                    "usertype" => $usertype
                );
                $_SESSION["userid"] = $result["userid"];
                $_SESSION["usertype"] = $result["usertype"];
                echo(json_encode($result));

            }
            else{
                $error = Array(
                    "error" => "Authentication Failed",
                    "message" => "Authentication Failed: username or password incorrect."
                );
                print(json_encode($error));

            }
        }
        else if ($function == "register"){
            if(!($stmt = $conn->prepare("SELECT userid, usertype FROM User WHERE username = ?;"))){
                $error = Array(
                    "error" => "Request Failed",
                    "message" => "Something went wrong"
                );
                print($error);
            }
            $user = $vals["username"];
            $stmt->bind_param("s", $user);
        
            $stmt->execute();
            $stmt->bind_result($userid, $usertype);
            $stmt->fetch();

            $stmt->close();

            if(count($userid) >= 1){
                $error = Array(
                    "error" => "Registration Failed",
                    "message" => "Registration Failed: username already in use."
                );
                print(json_encode($error));
            }
            else{
                $pass = $vals["password"];
                $stmt2 = $conn->prepare("INSERT INTO User (username, password, usertype) VALUES(?, ?, 1)");
                $stmt2->bind_param("ss", $user, $pass);
                

                if($stmt2->execute()){

                    $return_data = Array(
                        "success" => true,
                        "userid" => mysqli_insert_id($conn),
                        "usertype" => 1
                    );
                    $_SESSION["userid"] = $return_data["userid"];
                    $_SESSION["usertype"] = $return_data["usertype"];
                    $stmt2->close();
                    $conn->close();
                    echo(json_encode($return_data));
                }
                else{
                    var_dump($conn->error);
                    $stmt2->close();
                    $conn->close();
                    $error = Array(
                        "error" => "Registration Failed",
                        "message" => "Registration Failed: Failed to add account"
                    );
                    echo(json_encode($error));
                }
            }
        }

    }
?>