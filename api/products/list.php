<?php

require_once "../config/config.php";

$vendor_id = intval($_GET["vendor_id"] ?? 0);

if (!$vendor_id) {
    error("Vendor ID is required.");
}

$stmt = $conn->prepare("
SELECT
    id,
    name,
    size,
    price,
    stock
FROM gas_products
WHERE vendor_id = ?
ORDER BY price ASC
");

$stmt->bind_param("i", $vendor_id);
$stmt->execute();

$result = $stmt->get_result();

$products = [];

while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

success("Products loaded.", $products);