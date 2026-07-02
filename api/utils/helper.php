<?php

function clean($input)
{
    return htmlspecialchars(trim($input));
}

function generateReference($prefix = "GG")
{
    return $prefix . strtoupper(bin2hex(random_bytes(5)));
}