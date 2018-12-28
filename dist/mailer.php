<?php
require_once $_SERVER['DOCUMENT_ROOT'] ."/SendMailSmtpClass.php";

$mailSMTP = new SendMailSmtpClass(SMTP_EMAIL, SMTP_PASSWORD, 'ssl://smtp.yandex.ru', 465, "UTF-8");

$from = array(
    "Ecologic Room 2",
    "test@ecologic-room.com"
);

$to = (!empty($email)) ? $email . ',dealersair@gmail.com' : 'dealersair@gmail.com';

$result = $mailSMTP->send($to, 'Тема письма', 'Текст письма', $from);

if ($result === true) {
    echo 'sent';
} else {
    echo 'Error: '. $result;
}
?>