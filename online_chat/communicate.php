<?php
$chat_log = "";

if ($_REQUEST["q")) {
    $text = htmlspecialchars($_REQUEST["q"]);
    chat_log += "<li>$text</li>"
}

echo chat_log;
?>