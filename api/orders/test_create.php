<?php

$data = [

    "customer_id" => 1,
    "vendor_id" => 1,
    "product_id" => 1,
    "quantity" => 2,
    "delivery_address" => "Lafia",
    "payment_method" => "Cash",
    "notes" => "Call before delivery"

];

$ch = curl_init("http://localhost/Kwick_Gas/api/orders/create.php");

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json"
]);

echo curl_exec($ch);