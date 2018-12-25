<?php
session_start();

if (empty($_SESSION['csrf-secret'])) {
   exit;
}

$salt = "dfgrt";
$csrf_token = $salt.':'.md5($salt.':'.$_SESSION['csrf-secret']);

if ($_POST['csrf_token'] != $csrf_token) {
    exit;
}

$response = '';
$email = $_POST['email'];

require_once $_SERVER['DOCUMENT_ROOT'] . "/mailer.php";
?>