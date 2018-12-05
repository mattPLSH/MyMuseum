<?php
                // Check if a cart exists for the session
        if( !isset($_SESSION["userid"]) ){
            print 1;
        }
        else{
            print 0;
        }
?>
