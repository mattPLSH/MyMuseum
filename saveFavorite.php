<?php
    session_start();
    if(!$_SESSION){
        $ret = array(
            "error" => "Not Logged In",
            "message" => "Not logged in: Must log in to save favorites"
        );
    }
    else if(!$_SESSION["userid"]){
        $error = array(
            "error" => "Session User Not Set",
            "messenger" => "You are not logged in. Please log in to save favorites."
        );
        echo(json_encode($error));
    }
    else if($_POST){
        $function = $_POST["function"];
        

        $conn = new mysqli("127.0.0.1", "root", "", "MyMuseum");

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        if($function == "add"){
            $userid = $_SESSION["userid"];
            $artid = $_POST["artid"];
            $imgurl = $_POST["imgurl"];
            $author = $_POST["author"];
            $title = $_POST["title"];
            $date = $_POST["date"];

            if(!($stmt = $conn->prepare("INSERT INTO Favorites (userid, artid, imgurl, author, title, date) VALUES (?, ?, ?, ?, ?, ?);"))){
                $error = Array(
                    "error" => "Request Failed",
                    "message" => "Statement failed"
                );
                echo(json_encode($error));
            }else{

                $stmt->bind_param("isssss", $userid, $artid, $imgurl, $author, $title, $date);
                if($stmt->execute()){
                    $result = array(
                        "success" => true,
                        "message" => "Successfully added to favorites!",
                        "favoriteid" => mysqli_insert_id($conn)
                    );
                    $stmt->close();
                    $conn->close();
                    echo(json_encode($result));
                }else{
                    $error = array(
                        "error" => "Failed to add to favorites",
                        "message" => "Failed to add the image to your favorites"
                    );
                    echo(json_encode($error));
                }
            }
        }
        else if ($function == "remove"){
            $userid = $_SESSION["userid"];
            $artid = $_POST["artid"];

            if(!($stmt = $conn->prepare("DELETE FROM Favorites WHERE userid = ? AND artid = ?;"))){
                $error = Array(
                    "error" => "Request Failed",
                    "message" => "Statement failed"
                );
                print(json_encode($error));
            }else{
                $stmt->bind_param("is", $userid, $artid);
                if($stmt->execute()){
                    $result = array(
                        "success" => true,
                        "message" => "Successfully removed from favorites!",
                    );
                    $stmt->close();
                    $conn->close();
                    echo(json_encode($result));
                }else{
                    $error = array(
                        "error" => "Failed to remove from favorites",
                        "message" => "Failed to remove the image from your favorites"
                    );
                    echo(json_encode($error));
                }
            }
        }
    }

?>