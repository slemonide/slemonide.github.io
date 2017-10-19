<?php

$message = $_REQUEST["q"];

file_put_contents("log.txt", "<li>$message </li>", FILE_APPEND)

// Go back
header('Location: index.html');

?>