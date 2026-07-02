<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

date_default_timezone_set("Africa/Lagos");

require_once "database.php";
require_once dirname(__DIR__) . "/utils/response.php";
require_once dirname(__DIR__) . "/utils/validator.php";
require_once dirname(__DIR__) . "/utils/helper.php";