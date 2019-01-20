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
	<link href="https://fonts.googleapis.com/css?family=Roboto:400,700&amp;subset=cyrillic" rel="stylesheet">
	<link rel="stylesheet" href="/css/style.css">
	<title>100 процентная, рабочая схема для заработка в интернете. Бесплатный видео-курс</title>
</head>
<body>

<!--MAIN/-->
<main class="main row row_col-middle">
	<div class="col-12 p-0">
		
			<div class="row">
				<div class="col-12">
					<h1 class="title">Бесплатный видео-курс<br> 100% рабочая схема для заработка в интернете<br> от 1000$ и выше, даже без вложений</h1>
				</div>
				<div class="col-12">
					<div class="title title_h3">Посмотреть первый видео-урок вы можете <a href="https://timofeev-vitali.ru/shema100/base/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100" target="_blank" class="link">здесь</a></div>
				</div>
				<div class="col-12">
				<div class="subscribe">
					<form action="/subscribe.php" method="POST" class="form">
						<input type="hidden" name="csrf_token" value="<?php echo $csrf_token; ?>">
						<div class="row">
							<div class="col col_grow">
								<div class="form__field">
									<input type="text" name="email" data-type="email" data-required="true" placeholder="Введите ваш e-mail" class="form__text-input" value="">
									<div class="field-error-tip" data-error-text-2="Введите корректный e-mail">Введите ваш e-mail</div>
								</div>
							</div>
							<div class="col">
								<button type="submit" class="form__submit btn">Получить схему</button>
							</div>
						</div>
						<div class="row">
							<div class="col-12 form__txt ta-c p-y-0">
								Оставьте ваш e-mail и мы пришлем письмо со ссылками<br> <b>сразу на все материалы (9 видео-уроков)</b> прямо сейчас!<br> 
								Мы не рассылаем спам, в каждом нашем письме есть кнопка "Отписаться".
							</div>
							<div class="col-12 ta-c">
								<a href="#privacy-policy" data-popup="#privacy-policy" class="js-open-popup link link_dash fs-12">Ваши данные защищены!</a>
							</div>
						</div>
					</form>
				</div>
				</div>
				<div class="col-12">
					<div class="title title_h2">- или -</div>
				</div>
				<div class="col-12">
					<div class="goto">
						<p>
							Посетите страницу автора, оставьте на ней ваш e-mail и получайте письма с видео-уроками. Автор отправляет по 1-му уроку в день.
						</p>
						<p class="ta-c">
							<a href="https://timofeev-vitali.ru/shema100/?utm_medium=affiliate&utm_source=lufter&aff_medium=cpc&aff_source=landing_page&aff_campaign=scheme100" target="_blank" class="arrow-btn">На страницу автора</a>
						</p>
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
				Здравствуйте!
			</div>
			<p>
				Почтовый сервер перегружен и не может отправить вам письмо.
			</p>
			<p>
				Мы не хотим оставлять вас без этого замечательного курса и предоставляем ссылки, для доступа ко всем видео-урокам:
			</p>
			<p>
				<b><a href="#" class="js-all-res link">100% рабочая схема для заработка в интернете. Все видео-уроки</a></b>
			</p>
			<p>
				Желаем успехов!
			</p>
		</div>
	</div>

	<div id="email-alternative-2" class="popup__window">
		<button class="js-popup-close popup-close-btn"></button>
		<div class="popup__inner">
			<div class="popup__title">
				Здравствуйте!
			</div>
			<p>
				Произошла ошибка, письмо не может быть отправлено. Возможно у вас пропал доступ в интеренет.
			</p>
			<p>
				Мы не хотим оставлять вас без этого замечательного курса и предоставляем ссылки, для доступа ко всем видео-урокам, попробуйте перейти по ссылке ниже. Если у вас пропал доступ в интеренет, сохраните страницу в закладки и вернитесь позже.
			</p>
			<p>
				<b><a href="#" class="js-all-res link">100% рабочая схема для заработка в интернете. Все видео-уроки</a></b>
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