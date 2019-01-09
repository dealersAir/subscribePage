<?php
session_start();

if (empty($_SESSION['csrf-secret'])) {
	exit;
}

$rec_email = $_POST['email'];

if (empty($rec_email)) {
	exit('Enter e-mail');
}

$salt = 'dfgrt';
$csrf_token = $salt.':'.md5($salt .':'. $_SESSION['csrf-secret']) .':'. $salt;

if ($_POST['csrf_token'] != $csrf_token) {
	exit;
}

require_once $_SERVER['DOCUMENT_ROOT'] .'/config.php';
require_once $_SERVER['DOCUMENT_ROOT'] .'/DbConnect.php';

$db = DbConnect::getInstance();
$db = $db->getDb();
$add_subscriber = $db->prepare('INSERT INTO info_subscribers (email,name,interest) VALUES (:email,:name,:interest) ON DUPLICATE KEY UPDATE interest=:u_interest');

$rec_name = $_POST['name'];

$add_subscriber->execute(array(
	'email' => $rec_email,
	'name' => $rec_name,
	'interest' => 'losing weight',
	'u_interest' => 'losing weight'
));

require_once $_SERVER['DOCUMENT_ROOT'] .'/mailer.php';
?>