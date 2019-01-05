<?php
require_once $_SERVER['DOCUMENT_ROOT'] ."/SendMailSmtpClass.php";

$mailSMTP = new SendMailSmtpClass(SMTP_EMAIL, SMTP_PASSWORD, 'ssl://smtp.yandex.ru', 465, "UTF-8");

$subject = 'Бесплатный видеокурс «6 шагов оздоровительного похудения»';

$utext = 'Приветствуем '. ((!empty($name)) ? $name : 'Вас') .'! Курс доступен по ссылке:<br>';
$utext .= '<b><a href="https://shop.hudeem99.ru/aff/free/400101839/lufter/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=email">Получить бесплатный видеокурс «6 шагов оздоровительного похудения»</a></b>';

$from = array(
    "iNFO.dealersAir",
    "info@dealersair.com"
);

$result = $mailSMTP->send($email, $subject, $utext, $from);

if ($result === true) {
    echo 'sent';
} else {
    echo 'Error: '. $result;
}
?>