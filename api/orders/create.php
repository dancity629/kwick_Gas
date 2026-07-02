<?php

require_once "../config/config.php";

$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    error("Invalid request.");
}

// Get data
$customer_id = intval($input["customer_id"] ?? 0);
$vendor_id = intval($input["vendor_id"] ?? 0);
$product_id = intval($input["product_id"] ?? 0);
$quantity = intval($input["quantity"] ?? 1);
$delivery_address = clean($input["delivery_address"] ?? "");
$payment_method = clean($input["payment_method"] ?? "Cash");
$notes = clean($input["notes"] ?? "");

// Validation
if (
    !$customer_id ||
    !$vendor_id ||
    !$product_id ||
    !$delivery_address
) {

    error([
        "customer_id" => $customer_id,
        "vendor_id" => $vendor_id,
        "product_id" => $product_id,
        "delivery_address" => $delivery_address
    ]);

}

$stmt = $conn->prepare("
SELECT full_name, phone
FROM users
WHERE id = ?
");

$stmt->bind_param("i", $customer_id);
$stmt->execute();

$customer = $stmt->get_result()->fetch_assoc();

if (!$customer) {
    error("Customer not found.");
}


$stmt = $conn->prepare("
SELECT size, price
FROM gas_products
WHERE id = ?
");

$stmt->bind_param("i", $product_id);
$stmt->execute();

$product = $stmt->get_result()->fetch_assoc();

if (!$product) {
    error("Gas product not found.");
}

$total = $product["price"] * $quantity;

$orderNumber = "GG" . date("YmdHis") . rand(100,999);

$rider_id = null;              // No rider assigned yet
$delivery_fee = 500;           // Default delivery fee
$payment_status = "Pending";   // Initial payment status
$status = "Pending";           // Initial order status
/*
|--------------------------------------------------------------------------
| Insert order
|--------------------------------------------------------------------------
*/

$stmt = $conn->prepare("
INSERT INTO orders
(
order_number,
customer_id,
customer_name,
customer_phone,
vendor_id,
rider_id,
cylinder_size,
quantity,
total,
delivery_fee,
payment_method,
payment_status,
status,
delivery_address,
notes
)
VALUES
(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
");

$status = "Pending";

$stmt->bind_param(
    "sissiisiddsssss",
    $orderNumber,
    $customer_id,
    $customer["full_name"],
    $customer["phone"],
    $vendor_id,
    $rider_id,
    $product["size"],
    $quantity,
    $total,
    $delivery_fee,
    $payment_method,
    $payment_status,
    $status,
    $delivery_address,
    $notes
);

if($stmt->execute()){

    success("Order placed successfully.",[
        "order_number"=>$orderNumber,
        "order_id"=>$conn->insert_id
    ]);

}

error($stmt->error,500);