<?php 
                // Check if a cart exists for the session
        if( !isset($_SESSION["userid"]) ){
            return 1;
        }
        else{
            return 0;
        }  
?>