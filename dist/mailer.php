<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/config.php";
require_once $_SERVER['DOCUMENT_ROOT'] . "/SendMailSmtpClass.php";

$mailSMTP = new SendMailSmtpClass($smtp_email, $smtp_pass, 'ssl://smtp.yandex.ru', 465, "UTF-8");

$from = array(
    "Ecologic Room 2",
    "test@ecologic-room.com"
);

$to = (!empty($email)) ? $email . ',dealersair@gmail.com' : 'dealersair@gmail.com';

$result = $mailSMTP->send($to, 'Тема письма', 'Текст письма', $from);

if ($result === true) {
    echo 'sent';
} else {
    echo 'Error: ' . $result;
}
?>