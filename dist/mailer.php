<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require $_SERVER['DOCUMENT_ROOT'] .'/PHPMailer/Exception.php';
require $_SERVER['DOCUMENT_ROOT'] .'/PHPMailer/PHPMailer.php';
require $_SERVER['DOCUMENT_ROOT'] .'/PHPMailer/SMTP.php';

$subject = 'Бесплатный видеокурс «6 шагов оздоровительного похудения»';

$utext = 'Здравствуйте'. ((!empty($rec_name)) ? ', '. $rec_name : '') .'!<br> 
Курс доступен по ссылке: <b><a href="https://shop.hudeem99.ru/aff/free/400101839/lufter/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=email&aff_campaign=6steps" target="_blank">Получить бесплатный видеокурс «6 шагов оздоровительного похудения»</a></b><br><br> 
Если у вас возникли вопросы, просто нажмите кнопку <b>Ответить</b>, не меняйте тему письма.<br><br> 
<img src="https://info.dealersair.com/info-dealersair.png" alt="iNFO.dealersAir">';

$plain_text = 'Здравствуйте'. ((!empty($rec_name)) ? ', '. $rec_name : '') .'!  
Курс доступен по ссылке: **[Получить бесплатный видеокурс «6 шагов оздоровительного похудения»](https://shop.hudeem99.ru/aff/free/400101839/lufter/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=email&aff_campaign=6steps)**  

Если у вас возникли вопросы, просто нажмите кнопку **Ответить**, не меняйте тему письма.  

![iNFO.dealersAir](https://info.dealersair.com/info-dealersair.png)';

$mail = new PHPMailer();
$mail -> CharSet = 'UTF-8';

// Server   
$mail -> isSMTP();                                      
$mail -> Host = 'info.dealersair.com';
$mail -> SMTPAuth = true;
$mail -> Username = SMTP_EMAIL;
$mail -> Password = SMTP_PASSWORD;
$mail -> SMTPSecure = 'ssl';
$mail -> Port = 465;

//Recipients
$mail -> setFrom('free@info.dealersair.com', 'iNFO.dealersAir');
$mail -> addAddress($rec_email, $rec_name);
$mail -> addReplyTo('free@info.dealersair.com', 'Free Course');

//Content
$mail -> isHTML(true);
$mail -> Subject = $subject;
$mail -> Body = $utext;
$mail -> AltBody = $plain_text;

if ($mail -> send()) {
	echo 'sent';
} else {
	echo 'Message could not be sent. Mailer Error: ', $mail -> ErrorInfo;
}
?>