<?php
session_start();

$csrf_secret = '';

if (!empty($_SESSION['csrf-secret'])) {
	$csrf_secret = $_SESSION['csrf-secret'];
} else {
	$csrf_secret = $_SESSION['csrf-secret'] = sha1(mt_rand());
}

$salt = "dfgrt";
$csrf_token = $salt . md5($salt . $csrf_secret) . $salt;

setcookie('d_air_interest', 'internet_earnings', time() + 31104000, '/', 'dealersair.com');
?>
<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">
	<link rel="stylesheet" href="/css/style.css">
	<title>100 процентная, рабочая схема, заработка в интернете</title>
</head>
<body>

<!--MAIN/-->
<main class="main">
	<div class="full-page full-page_middle">
		<div class="full-page_middle__inner">
			<div class="row">
				<div class="col-12">
					<h1 class="title">100% рабочая схема заработка в интернете<br> от 1000$ и выше, даже без вложений</h1>
				</div>
				<div class="col-12">
					<?php include $_SERVER['DOCUMENT_ROOT'] .'/inc/subscribe-block.php'; ?>
				</div>
			</div>
		</div>
	</div>
</main>
<!--/MAIN-->

<!--POPUPs/-->
<div class="popup">

	<div id="privacy-policy" class="popup__window">
		<button class="js-popup-close popup-close-btn"></button>
		<div class="popup__inner">
			<div class="popup__title">
				Политика конфиденциальности
			</div>
			<p>
				Соблюдение Вашей конфиденциальности важно для нас. По этой причине, мы разработали Политику Конфиденциальности, которая описывает, как мы используем и храним вашу информацию. Пожалуйста, ознакомьтесь с нашими правилами соблюдения конфиденциальности.
			</p>
			<h2>Сбор и использование персональной информации</h2>
			<p>
				Когда вы оставляете заявку на сайте, мы можем собирать различную информацию, например ваши имя и адрес электронной почты.
			</p>
			<p>
				Собираемая нами персональная информация позволяет нам связываться с Вами и сообщать об уникальных предложениях, акциях и других мероприятиях и ближайших событиях.
			</p>
			<p>
				Мы можем использовать вашу персональную информацию для отправки Вам важных уведомлений и сообщений.
			</p>
			<h2>Раскрытие информации третьим лицам</h2>
			<p>
				Мы не раскрываем полученную от Вас информацию третьим лицам.
			</p>
			<h2>Защита персональной информации</h2>
			<p>
				Мы предпринимаем меры предосторожности — включая административные, технические и физические — для защиты Вашей персональной информации от утраты, кражи, и недобросовестного использования, а также от несанкционированного доступа, раскрытия, изменения и уничтожения.
			</p>
		</div>
	</div>

	<div id="email-alternative" class="popup__window">
		<button class="js-popup-close popup-close-btn"></button>
		<div class="popup__inner">
			<div class="popup__title">
				Здравствуйте<span id="subscriber-name"></span>!
			</div>
			<p>
				Почтовый сервер перегружен и не может отправить вам письмо.
			</p>
			<p>
				Мы не хотим оставлять вас без этого замечательного курса и предоставляем ссылку, для доступа к курсу, тут же:
			</p>
			<p>
				<b><a href="https://shop.hudeem99.ru/aff/free/400101839/lufter/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=6steps" target="_blank" class="link">Получить бесплатный видеокурс «6 шагов оздоровительного похудения»</a></b>
			</p>
			<p>
				Желаем успехов!
			</p>
		</div>
	</div>

	<!--Message Popup/-->
	<div id="message-popup" class="popup-message popup__window">
		<button class="js-popup-close popup-close-btn"></button>
		<div class="popup__inner">
			<!-- message html -->
		</div>
	</div>
	<!--/Message Popup-->

</div>
<!--/POPUPs-->

<script src="js/script.js"></script>
<script src="js/common.js"></script>

</body>
</html>