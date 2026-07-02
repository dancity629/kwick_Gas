<?php

require_once "../config/config.php";

$result = $conn->query("
SELECT
    id,
    business_name AS name,
    address,
    100 AS stock,
    1500 AS pricePerKg,
    1 AS active
FROM vendors
ORDER BY business_name
");

$vendors = [];

while ($row = $result->fetch_assoc()) {
    $vendors[] = $row;
}

success("Vendors loaded.", $vendors);