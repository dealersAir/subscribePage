<?php
require_once $_SERVER['DOCUMENT_ROOT'] ."/SendMailSmtpClass.php";

$mailSMTP = new SendMailSmtpClass(SMTP_EMAIL, SMTP_PASSWORD, 'ssl://smtp.yandex.ru', 465, "UTF-8");

$subject = 'Бесплатный видеокурс «6 шагов оздоровительного похудения»';

$utext = '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Бесплатный видеокурс «6 шагов оздоровительного похудения»</title></head><body style="margin: 0; padding: 0;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td style="padding-top: 20px; padding-left: 20px; padding-right: 20px; padding-bottom: 20px; background-color: #f1f1f1;"><img src="https://info.dealersair.com/info-dealersair.png" alt="iNFO.dealersAir"></td></tr><tr><td style="padding-top: 20px; padding-left: 20px; padding-right: 20px; padding-bottom: 20px; font-size: 18px; line-height: 1.5;">Приветствуем '. ((!empty($name)) ? $name : 'Вас') .'!<br>Курс доступен по ссылке: <b><a href="';
$utext .= 'https://shop.hudeem99.ru/aff/free/400101839/lufter/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=email';
$utext .= '">Получить бесплатный видеокурс «6 шагов оздоровительного похудения»</a></b></td></tr></table></body></html>';

$from = array(
	"iNFO.dealersAir",
	"free@info.dealersair.com"
);

$result = $mailSMTP->send($email, $subject, $utext, $from);

if ($result === true) {
	echo 'sent';
} else {
	echo 'Error: '. $result;
}
?>