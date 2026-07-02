<?php

function required($value)
{
    return isset($value) && trim($value) !== "";
}

function validEmail($email)
{
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function validPhone($phone)
{
    return preg_match('/^[0-9]{11}$/', $phone);
}

function passwordLength($password)
{
    return strlen($password) >= 6;
}