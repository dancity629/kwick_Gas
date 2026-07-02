<?php

$host = "localhost";
$dbname = "Kwick_Gas";
$username = "root";
$password = "";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode([
        "success" => false,
        "message" => "Database connection failed",
        "error" => $conn->connect_error
    ]));
}

$conn->set_charset("utf8mb4");