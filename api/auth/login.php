<?php

require_once "../config/config.php";

$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    error("Invalid request.");
}

$email = clean($input["email"] ?? "");
$password = $input["password"] ?? "";

if (!required($email) || !required($password)) {
    error("Email and password are required.");
}

$stmt = $conn->prepare("
SELECT
    id,
    full_name,
    email,
    phone,
    address,
    role,
    wallet_balance,
    status,
    password
FROM users
WHERE email = ?
LIMIT 1
");

$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows == 0) {
    error("Invalid email or password.");
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user["password"])) {
    error("Invalid email or password.");
}

if ($user["status"] != "active") {
    error("Your account has been disabled.");
}

unset($user["password"]);

success("Login successful.", $user);