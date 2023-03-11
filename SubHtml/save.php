<?php
if (
    $_SERVER['REQUEST_METHOD'] === 'POST'
    && isset($_POST["username"])
    && isset($_POST["password"])
) {
    $json = json_encode($_POST);
    // Save JSON to file
    file_put_contents("user.json", $json);
    // Return some data back to the AJAX request.
    echo $json;
    // PS it's not wise to send passwords that way. 
}