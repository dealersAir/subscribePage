<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$send_count_requets = $db -> prepare('SELECT * FROM options WHERE option_name=? OR option_name=?');
$send_count_requets -> execute(array('send_email_period_start', 'sent_emails_count'));
$send_count = $send_count_requets -> fetchAll(PDO::FETCH_OBJ);

$send_count_arr = array();

foreach ($send_count as $val) {
	$send_count_arr[$val -> option_name] = $val -> option_value;
}

$upd_opt = $db -> prepare('UPDATE options SET option_value=? WHERE option_name=?');

if (((int) $send_count_arr['send_email_period_start'] + 3600) < time()) {
	$upd_opt -> execute(array(time(), 'send_email_period_start'));
	$upd_opt -> execute(array(1, 'sent_emails_count'));
} else {
	if ((int) $send_count_arr['sent_emails_count'] < 100) {
		$upd_opt -> execute(array((int) $send_count_arr['sent_emails_count'] + 1, 'sent_emails_count'));
	} else {
		exit('Message could not be sent. Error: Limit is exceeded.');
	}
}

require $_SERVER['DOCUMENT_ROOT'] .'/PHPMailer/Exception.php';
require $_SERVER['DOCUMENT_ROOT'] .'/PHPMailer/PHPMailer.php';
require $_SERVER['DOCUMENT_ROOT'] .'/PHPMailer/SMTP.php';

$subject = 'Бесплатный видеокурс «6 шагов оздоровительного похудения»';

$utext = 'Здравствуйте!<br>

<br><br> 

Желаем успехов!<br><br> 

Это письмо отправлено автоматически. Если у вас возникли неотложные вопросы, просто нажмите <b>Ответить</b>, не меняйте тему письма.<br> 

Отказаться от получения писем можно тут: <a href="https://info.dealersair.com/unsubscribe.php?email='. urlencode($rec_email) .'" target="_blank">Отписаться</a><br><br>

<img src="" alt="iNFO.dealersAir">';

$plain_text = '';

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
$mail -> addAddress($rec_email);
$mail -> addReplyTo('free@info.dealersair.com', 'iNFO.dealersAir');
$mail -> addCustomHeader('List-Unsubscribe', '<mailto:free@info.dealersair.com?body=unsubscribe>, <https://info.dealersair.com/unsubscribe.php?email='. urlencode($rec_email) .'>');

//Content
$mail -> isHTML(true);
$mail -> Subject = $subject;
$mail -> Body = $utext;
$mail -> AltBody = $plain_text;

if ($mail -> send()) {
	echo 'sent';
} else {
	echo 'Error';
}
?>