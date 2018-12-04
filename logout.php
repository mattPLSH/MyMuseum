<?php
    session_start();
    session_unset();
    $ret = array(
        "success" => true,
        "message" => "Successfully logged out"
    );
    echo(json_encode($ret));
?>