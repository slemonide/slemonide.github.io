<?php

if (!apc_exists("chat_log")) {
    apc_store("chat_log", "")
}


if (isset($_REQUEST["q"])) {
    apc_store("chat_log", apc_fetch("chat_log") . "123")
}

echo apc_fetch("chat_log");
?>
