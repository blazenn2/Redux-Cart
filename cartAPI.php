<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "redux_cart";

$conn = new mysqli($servername, $username, $password, $dbname);

if (!$conn) {
    die("Database not connected" . mysqli_connect_error);
}


$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json-add-item") {
    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    // var_dump($decoded);
    $id = $decoded["value"]["id"];
    $price = $decoded["value"]['price'];
    $name = $decoded["value"]['name'];

    $sql = "SELECT * FROM cart WHERE product_id = '" . $id . "';";
    echo $sql;
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);
    if (mysqli_num_rows($result) > 0) {
        $sql = "UPDATE cart SET
        quantity = " . ((int)$row["quantity"] + 1) . " WHERE product_id = '" . $id . "'";
        $result = mysqli_query($conn, $sql);
    } else {
        $sql = "INSERT INTO cart (product_id, title, quantity, price) 
        VALUES ('" . $id . "', '" . $name . "', 1, '" . $price . "')";
        $result = mysqli_query($conn, $sql);
    }

    if ($result) echo "SUCCESS";
}

if ($contentType === "application/json-get-items") {
    $item_array = array();
    $sql = "SELECT * FROM cart";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            array_push($item_array, $row);
        }
    }
    echo json_encode($item_array);
}

if ($contentType === "application/json-delete") {
    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    $id = $decoded["value"]["id"];
    $quantity = (int)$decoded["value"]["quantity"];
    if ($quantity > 1) $sql = "UPDATE cart SET quantity = " . ($quantity - 1) . " WHERE product_id = '" . $id . "'";
    else $sql = "DELETE FROM cart WHERE product_id = '" . $id . "'";
    $result = mysqli_query($conn, $sql);
    if ($result) echo "SUCCESS";
}

// if ($contentType === "application/json-add") {
//     $content = trim(file_get_contents("php://input"));
//     $decoded = json_decode($content, true);
//     // var_dump($decoded);
//     $id = $decoded["value"]["id"];
//     $quantity = (int)$decoded["value"]["quantity"];
//     $sql = "UPDATE cart SET quantity = " . ($quantity + 1) . " WHERE product_id = '" . $id . "'";
//     $result = mysqli_query($conn, $sql);
// }

// echo json_encode("Hi");