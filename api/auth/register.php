<?php

require_once "../config/config.php";

$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    error("Invalid request.");
}

$full_name = clean($input["full_name"] ?? "");
$phone = clean($input["phone"] ?? "");
$email = clean($input["email"] ?? "");
$address = clean($input["address"] ?? "");
$password = $input["password"] ?? "";

if (
    !required($full_name) ||
    !required($phone) ||
    !required($email) ||
    !required($address) ||
    !required($password)
)
{
    error("All fields are required.");
} 
if (!validPhone($phone)) {
    error("Phone number must be 11 digits.");
}

if (!validEmail($email)) {
    error("Invalid email address.");
}


if (!passwordLength($password)) {
    error("Password must be at least 6 characters.");
}

// Check email
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    error("Email already exists.");
}

// Check phone
$stmt = $conn->prepare("SELECT id FROM users WHERE phone = ?");
$stmt->bind_param("s", $phone);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    error("Phone number already exists.");
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("
INSERT INTO users
(full_name,phone,email,address,password)
VALUES (?,?,?,?,?)
");

$stmt->bind_param(
    "sssss",
    $full_name,
    $phone,
    $email,
    $address,
    $hashedPassword
);

if ($stmt->execute()) {

    success("Registration successful.", [
        "user_id" => $conn->insert_id
    ]);

}

error("Registration failed.",500);