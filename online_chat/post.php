<?php
$text = filter_var($_REQUEST["q"], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH, FILTER_FLAG_STRIP_LOW);
file_put_contents("log.txt", "<li>$text</li>", FILE_APPEND)
?>