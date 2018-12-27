<?php
session_start();

$csrf_token = '';
if (!empty($_SESSION['csrf-secret'])) {
	$salt = "dfgrt";
	$csrf_token = $salt.':'.md5($salt.':'.$_SESSION['csrf-secret']);
} else {
	$_SESSION['csrf-secret'] = sha1(mt_rand());
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">
	<link rel="stylesheet" href="css/style.css">
	<link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico">
	<title>Home page | startTemplate</title>
</head>
<body>

<!--HEADER/-->
<header id="header" class="header">
	<div class="row row_wrp row_col-middle header__row">
		<div class="col p-y-0">
			<div class="header__logo"><img src="images/6steps-logo.png" alt="6 steps logo"></div>
		</div>
		<nav class="col col_right">
			<!--Menu/-->
			<ul class="menu">
				<li class="menu__item">
					<a href="#program" class="js-anchor menu__a">Программа курса</a>
				</li>
				<li class="menu__item">
					<a href="#author" class="js-anchor menu__a">О авторе</a>
				</li>
			</ul>
			<!--/Menu-->
		</nav>
		<button class="js-close-menu menu-close-btn"></button>
	</div>
	<button class="js-open-menu open-menu-btn"><span></span><span></span><span></span><span></span></button>
</header>
<!--/HEADER-->

<!--MAIN/-->
<main class="main">
	<div class="section">
		<div class="row row_wrp">
			<div class="col-12">
				<h1 class="title"><span class="c-green2">Бесплатный</span> видеокурс<br> <span class="c-red2">«6 шагов оздоровительного похудения»</span></h1>
			</div>
		</div>
		<div class="row row_wrp row_col-middle">
			<div class="col-7">
				<img src="/images/6steps-package.jpg" alt="6 steps" class="fullwidth-img">
			</div>
			<div class="col-5">

				<div class="subscribe">
					<div class="subscribe__head">
						Получите <strong>бесплатно</strong> видеокурс «6 шагов оздоровительного похудения»
					</div>
					<form action="/subscribe.php" method="POST" class="form">
						<input type="hidden" name="csrf_token" value="<?php echo $csrf_token; ?>">
						<div class="row">
							<div class="col-12">
								<div class="form__field">
									<input type="text" name="name" data-type="name" placeholder="Ваше имя" class="form__text-input" value="">
									<div class="field-error-tip" data-error-text-2="Введите корректное имя">Введите ваше имя</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-12">
								<div class="form__field">
									<input type="text" name="email" data-type="email" data-required="true" placeholder="Ваш E-mail*" class="form__text-input" value="">
									<div class="field-error-tip" data-error-text-2="Введите корректный e-mail">Введите ваш e-mail</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-12 ta-c">
								<button type="submit" class="form__submit btn">Получить курс бесплатно</button>
							</div>
						</div>
						<div class="row">
							<div class="col-12 ta-c form__txt p-y-0">
								Нажимая кнопку, вы соглашаетесь<br> с <a href="#privacy-policy" data-popup="#privacy-policy" class="js-open-popup link link_dash">политикой конфиденциальности</a>
							</div>
						</div>
					</form>
				</div>
				
			</div>
		</div>
	</div>

	<div id="program-anchor" class="section bg-gray0">
		<div class="row row_wrp">
			<div class="col-12">
				<h2 class="title">Программа курса</h2>
			</div>
			<div class="col-12 ta-c">
				<strong>Курс состоит из 6-ти видео уроков</strong>
			</div>
			<div class="col-7 col_center">
				<ol class="list">
					<li>
						Снижении тяги к сладкой пище.
					</li>
					<li>
						Главная ошибка при похудании, о которой забывают все!
					</li>
					<li>
						Ускорение обмена веществ.
					</li>
					<li>
						Как не испытывать силу воли при похудении.
					</li>
					<li>
						Уменьшении целлюлита без вреда для здоровья.
					</li>
					<li>
						Как сделать похудение наиболее легким и приятным.
					</li>
				</ol>
			</div>
		</div>
		<div class="row row_wrp mt-30">
			<div class="col-5 col_center">
				<div class="subscribe">
					<div class="subscribe__head">
						Получите <strong>бесплатно</strong> видеокурс «6 шагов оздоровительного похудения»
					</div>
					<form action="/subscribe.php" method="POST" class="form">
						<input type="hidden" name="csrf_token" value="<?php echo $csrf_token; ?>">
						<div class="row">
							<div class="col-12">
								<div class="form__field">
									<input type="text" name="name" data-type="name" placeholder="Ваше имя" class="form__text-input" value="">
									<div class="field-error-tip" data-error-text-2="Введите корректное имя">Введите ваше имя</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-12">
								<div class="form__field">
									<input type="text" name="email" data-type="email" data-required="true" placeholder="Ваш E-mail*" class="form__text-input" value="">
									<div class="field-error-tip" data-error-text-2="Введите корректный e-mail">Введите ваш e-mail</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-12 ta-c">
								<button type="submit" class="form__submit btn">Получить курс бесплатно</button>
							</div>
						</div>
						<div class="row">
							<div class="col-12 ta-c form__txt p-y-0">
								Нажимая кнопку, вы соглашаетесь<br> с <a href="#privacy-policy" data-popup="#privacy-policy" class="js-open-popup link link_dash">политикой конфиденциальности</a>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

	<div id="author-anchor" class="section">
		<div class="row">
			<div class="col-12">
				<h2 class="title">О авторе курса</h2>
			</div>
		</div>
		<div class="row row_wrp">
			<div class="col-7 col_center">
				
			</div>
		</div>
	</div>
</main>
<!--/MAIN-->

<!--FOOTER/-->
<footer class="footer">
	<div class="row row_wrp">
		<div class="col-3">
			<div class="footer__logo">
				<a href="#"><img src="images/logo.svg" alt="logo"></a>
			</div>
		</div>
		<div class="col-8">
			<ul class="foot-nav">
				<li class="foot-nav__item"><a href="#" class="foot-nav__a">Item 1</a></li>
				<li class="foot-nav__item"><a href="#" class="foot-nav__a">Item 2</a></li>
				<li class="foot-nav__item"><a href="#" class="foot-nav__a">Item 3</a></li>
			</ul>
		</div>
	</div>
	<div class="row row_wrp">
		<div class="col-12">
			<div class="footer__txt">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
				quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
				consequat.
			</div>
		</div>
	</div>
</footer>
<!--/FOOTER-->

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

	<div id="popup-2" class="popup__window" style="max-width: 550px;">
		<button class="js-popup-close popup-close-btn"></button>
		<div class="popup__inner" style="height: 1300px;">
			
		</div>
	</div>

	<!--Media Popup/-->
	<div id="media-popup" class="popup-media popup__window">
		<button class="js-popup-close popup-close-btn"></button>
		<div class="popup__inner">

			<div class="popup-media__box middle">

				<img src="#" class="popup-media__image middle__img" alt="photo">

				<div class="popup-media__video">
					<a href="#" class="popup-media__play"></a>
					<iframe src="" class="popup-media__iframe" allowfullscreen></iframe>
				</div>
				
				<button class="popup-media__arr popup-media__arr_l" data-dir="prev"></button>
				<button class="popup-media__arr popup-media__arr_r" data-dir="next"></button>
				
			</div>
			
			<div class="popup-media__bar row-col-mid">
				<div class="popup-media__bar-date popup-media__data-0 col vw1000-col-12">
					<!--data string 1-->
				</div>
				<div class="popup-media__bar-tit popup-media__data-1 col vw1000-col-12">
					<!--data string 2-->
				</div>
			</div>
		</div>
	</div>
	<!--/Media Popup-->

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