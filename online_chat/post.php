<?php
$text = $_REQUEST["q"];
file_put_contents("log.txt", "<li>$text</li>", FILE_APPEND)
?>