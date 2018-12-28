<?php
session_start();

if (empty($_SESSION['csrf-secret'])) {
	exit;
}

$salt = "dfgrt";
$csrf_token = $salt.':'.md5($salt .':'. $_SESSION['csrf-secret']);

if ($_POST['csrf_token'] != $csrf_token) {
	exit;
}

require_once $_SERVER['DOCUMENT_ROOT'] ."/config.php";
require_once $_SERVER['DOCUMENT_ROOT'] ."/DbConnect.php";

$response = '';
$email = $_POST['email'];
$name = $_POST['name'];

$db = DbConnect::getInstance();
$db = $db->getDb();
$add_subscriber = $db->prepare('INSERT INTO info_subscribers (email,name,interest) VALUES (:email,:name,:interest) ON DUPLICATE KEY UPDATE interest=:u_interest');
$add_subscriber->execute(array(
	'email' => $email,
	'name' => $name,
	'interest' => '',
	'u_interest' => ''
));

require_once $_SERVER['DOCUMENT_ROOT'] ."/mailer.php";
?>