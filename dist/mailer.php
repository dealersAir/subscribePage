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

$subject = '100% рабочая схема для заработка в интернете. Бесплатный видео-курс';

$utext = 'Здравствуйте!<br>
Представляем вам ссылки на все видео-уроки бесплатного курса "100% рабочая схема для заработка в интернете":<br><br>
1. <a href="https://timofeev-vitali.ru/shema100/base/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100" target="_blank">Общий принцип</a><br>
2. <a href="https://timofeev-vitali.ru/shema100/action/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100" target="_blank">Что нужно делать</a><br>
3. <a href="https://timofeev-vitali.ru/shema100/traf/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100" target="_blank">Где и как брать трафик</a><br>
4. <a href="https://timofeev-vitali.ru/shema100/big/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100" target="_blank">Тренды, или как получать лучшее</a><br>
5. <a href="https://timofeev-vitali.ru/shema100/pa/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100" target="_blank">Про активы</a><br>
6. <a href="https://timofeev-vitali.ru/shema100/new/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100" target="_blank">Новинка в теме партнерок</a><br>
7. <a href="https://timofeev-vitali.ru/shema100/vigoda/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100" target="_blank">Взаимовыгодная схема в партнерках</a><br>
8. <a href="https://timofeev-vitali.ru/shema100/100/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100" target="_blank">100% схема в партнерках</a><br>
9. <a href="https://timofeev-vitali.ru/shema100/system/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100" target="_blank">Важные составляющие денежной воронки продаж</a><br><br>
<b>А также, вы можете получить готовые и уже проверенные на практике кейсы, всего за <i>490руб.</i></b><br>
<b><a href="https://timofeev-vitali.ru/start/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100&aff_term=paid_start" target="_blank">Кейсы для старта заработка с минимальными вложениями до 1000 руб.</a></b><br><br>
Желаем успехов!<br><br>
Это письмо отправлено автоматически. Если у вас возникли неотложные вопросы, просто нажмите <b>Ответить</b>, не меняйте тему письма.<br>
Отказаться от получения писем можно тут: <a href="https://info.dealersair.com/unsubscribe.php?email='. urlencode($rec_email) .'" target="_blank">Отписаться</a><br><br>
<a href="https://info.dealersair.com" target="_blank"><img src="https://info.dealersair.com/static/images/info-dealersair.png" alt="iNFO.dealersAir"></a><br><br>
<a href="https://scheme100.info.dealersair.com/#disclaimer" target="_blank">Отказ от ответственности</a>';

$plain_text = 'Здравствуйте!
Представляем вам ссылки на все видео-уроки бесплатного курса "100% рабочая схема для заработка в интернете":

1. [Общий принцип](https://timofeev-vitali.ru/shema100/base/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100)
2. [Что нужно делать](https://timofeev-vitali.ru/shema100/action/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100)
3. [Где и как брать трафик](https://timofeev-vitali.ru/shema100/traf/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100)
4. [Тренды, или как получать лучшее](https://timofeev-vitali.ru/shema100/big/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100)
5. [Про активы](https://timofeev-vitali.ru/shema100/pa/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100)
6. [Новинка в теме партнерок](https://timofeev-vitali.ru/shema100/new/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100)
7. [Взаимовыгодная схема в партнерках](https://timofeev-vitali.ru/shema100/vigoda/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100)
8. [100% схема в партнерках](https://timofeev-vitali.ru/shema100/100/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100)
9. [Важные составляющие денежной воронки продаж](https://timofeev-vitali.ru/shema100/system/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100)

А также, вы можете получить готовые и уже проверенные на практике кейсы, всего за 490руб.
[Кейсы для старта заработка с минимальными вложениями до 1000 руб.](https://timofeev-vitali.ru/start/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100&aff_term=paid_start)

Желаем успехов!

Это письмо отправлено автоматически. Если у вас возникли неотложные вопросы, просто нажмите **Ответить**, не меняйте тему письма.
Отказаться от получения писем можно тут:[Отписаться](https://info.dealersair.com/unsubscribe.php?email='. urlencode($rec_email) .')

[iNFO.dealersAir](https://info.dealersair.com)

[Отказ от ответственности](https://scheme100.info.dealersair.com/#disclaimer)';

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

// Recipients
$mail -> setFrom('free@info.dealersair.com', 'iNFO.dealersAir');
$mail -> addAddress($rec_email);
$mail -> addReplyTo('free@info.dealersair.com', 'iNFO.dealersAir');
$mail -> addCustomHeader('List-Unsubscribe', '<mailto:free@info.dealersair.com?body=unsubscribe>, <https://info.dealersair.com/unsubscribe.php?email='. urlencode($rec_email) .'>');

// Content
$mail -> isHTML(true);
$mail -> Subject = $subject;
$mail -> Body = $utext;
$mail -> AltBody = $plain_text;

if ($mail -> send()) {
	echo 'sent';
} else {
	echo 'Mailer Error';
}
?>