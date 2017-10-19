<?php
$text = $_REQUEST["q"];
file_put_contents("log.txt", $text, FILE_APPEND)
?>