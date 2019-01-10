<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require $_SERVER['DOCUMENT_ROOT'] .'/PHPMailer/Exception.php';
require $_SERVER['DOCUMENT_ROOT'] .'/PHPMailer/PHPMailer.php';
require $_SERVER['DOCUMENT_ROOT'] .'/PHPMailer/SMTP.php';

$subject = 'Бесплатный видеокурс «6 шагов оздоровительного похудения»';

$utext = 'Здравствуйте'. ((!empty($rec_name)) ? ', '. $rec_name : '') .'!<br> 
Курс доступен по ссылке: <b><a href="https://shop.hudeem99.ru/aff/free/400101839/lufter/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=email&aff_campaign=6steps" target="_blank">Получить бесплатный видеокурс «6 шагов оздоровительного похудения»</a></b><br><br> 
По данным некоторых опросов, вот с какими проблемами встречаются женщины, которые хотят похудеть, но не садятся не на одну систему питания:<br><br>
- Я не готова к однообразным тренировкам<br>
- Не могу отказаться от своих любимых продуктов, не могу с собой ничего сделать<br>
- Я не готова к мучительному чувству голода<br>
- Я боюсь, что кожа обвиснет, и я стану выглядеть старше<br>
- Я против приема таблеток, БАДов, сжиросжигателей<br>
- Я не готова литрами поглощать воду<br>
- У меня не хватает самодисциплины<br>
- Сейчас шашлычный сезон. А в шашлычный сезон похудеть невозможно<br>
- И самое главное я боюсь опять поверить в какую-то систему, придерживаться ее несколько месяцев, а потом может наступить стресс, во мне проснется аппетит, и за несколько месяцев вес вернется.<br><br>
Если Вы все равно хотите похудеть, то приглашаю Вас пройти <a href="https://shop.hudeem99.ru/aff/free/400101839/lufter/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=email&aff_campaign=6steps" target="_blank">Бесплатный курс «6 шагов оздоровительного похудения»</a>, 73,4% женщин, прослушавших такой курс, похудели сразу же за следующую неделю.<br><br>
Это письмо отправлено автоматически. Если у вас возникли неотложные вопросы, просто нажмите <b>Ответить</b>, не меняйте тему письма.<br> 
Отказаться от получения писем можно тут: <a href="https://info.dealersair.com/unsubscribe.php?email='. urlencode($rec_email) .'">Отписаться</a><br><br>
<img src="data:image/png;base64,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" alt="iNFO.dealersAir">';

$plain_text = 'Здравствуйте'. ((!empty($rec_name)) ? ', '. $rec_name : '') .'!  
Курс доступен по ссылке: **[Получить бесплатный видеокурс «6 шагов оздоровительного похудения»](https://shop.hudeem99.ru/aff/free/400101839/lufter/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=email&aff_campaign=6steps)**  

По данным некоторых опросов, вот с какими проблемами встречаются женщины, которые хотят похудеть, но не садятся не на одну систему питания:

- Я не готова к однообразным тренировкам
- Не могу отказаться от своих любимых продуктов, не могу с собой ничего сделать
- Я не готова к мучительному чувству голода
- Я боюсь, что кожа обвиснет, и я стану выглядеть старше
- Я против приема таблеток, БАДов, сжиросжигателей
- Я не готова литрами поглощать воду
- У меня не хватает самодисциплины
- Сейчас шашлычный сезон. А в шашлычный сезон похудеть невозможно
- И самое главное я боюсь опять поверить в какую-то систему, придерживаться ее несколько месяцев, а потом может наступить стресс, во мне проснется аппетит, и за несколько месяцев вес вернется.

Если Вы все равно хотите похудеть, то приглашаю Вас пройти *[Бесплатный курс «6 шагов оздоровительного похудения»](https://shop.hudeem99.ru/aff/free/400101839/lufter/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=email&aff_campaign=6steps)* , 73,4% женщин, прослушавших такой курс, похудели сразу же за следующую неделю.

Это письмо отправлено автоматически. Если у вас возникли неотложные вопросы, просто нажмите *Ответить*, не меняйте тему письма. 
Отказаться от получения писем можно тут: [Отписаться](https://info.dealersair.com/unsubscribe.php?email='. urlencode($rec_email) .') 

[iNFO.dealersAir]';

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
	echo 'Message could not be sent. Mailer Error: ', $mail -> ErrorInfo;
}
?>