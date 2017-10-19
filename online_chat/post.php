<?php

$message = @$_POST["message"];

file_put_contents("log.txt", "<li>$message </li>", FILE_APPEND)

{
    header('Location: index.html');
}

?>