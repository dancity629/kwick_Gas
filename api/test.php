<?php

header("Content-Type: application/json");

require "config/database.php";

echo json_encode([
    "success" => true,
    "message" => "Database Connected Successfully"
]);