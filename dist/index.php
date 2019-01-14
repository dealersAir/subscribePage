<?php
session_start();

$csrf_secret = '';

if (!empty($_SESSION['csrf-secret'])) {
	$csrf_secret = $_SESSION['csrf-secret'];
} else {
	$csrf_secret = $_SESSION['csrf-secret'] = sha1(mt_rand());
}

$csrf_token = '';
$salt = "dfgrt";
$csrf_token = $salt .':'. md5($salt .':'. $csrf_secret) .':'. $salt;

setcookie('d_air_interest', 'losing_weight', time() + 31104000, '/', 'dealersair.com');
?>
<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">
	<link rel="stylesheet" href="/css/style.css">
	<title>Бесплатный видеокурс «6 шагов оздоровительного похудения»</title>
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
				<?php include $_SERVER['DOCUMENT_ROOT'] .'/inc/subscribe-block.php'; ?>
			</div>
		</div>
	</div>

	<div id="program-anchor" class="section bg-gray0">
		<div class="row row_wrp">
			<div class="col-12">
				<h2 class="title">Программа курса</h2>
			</div>
			<div class="col-12 ta-c">
				<strong>Курс рассчитан на 6 дней и состоит из 6-ти видео уроков</strong>
			</div>
			<div class="col-7 col_center">
				<ol class="list">
					<li>
						Энергетический сеанс “Освобождение от сладкомании”
					</li>
					<li>
						Как сделать так, чтобы Ваш организм худел “сам”?
					</li>
					<li>
						Избавление от  пищевой зависимости
					</li>
					<li>
						Оздоровительное похудание проходит без особых усилий
					</li>
					<li>
						Упражнение от целлюлита
					</li>
					<li>
						О том, как худеть радостно
					</li>
				</ol>
			</div>
		</div>
		<div class="row row_wrp mt-30">
			<div class="col-5 col_center">
				<?php include $_SERVER['DOCUMENT_ROOT'] .'/inc/subscribe-block.php'; ?>
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
			<div class="col-10 col_center">
				<div class="article">
					<p>
						<strong>Галина Николаевна Гроссманн</strong> училась на биолога в Красноярском университете, позже защитила диссертацию. Научную карьеру начала в Институте Физики Академии Наук СССР. Принимала участие в космических программах в Институте Экспериментальной Биологии АН СССР.
					</p>
					<p>
						С 1996 года возглавляет Центр биологии и экологии человека в Эстонии, где продолжает свою исследовательскую и практическую деятельность. Она регулярно проводит сеансы по омоложению организма и сбросу лишнего веса.
					</p>
					<p>
						Помогла множеству людей победить недуг переедания и болезненной избыточности веса. Записала большое число видео курсов, регулярно проводит тренинги, мастер-классы и вебинары, даёт консультации.
					</p>
					<p>
						Сеансы омоложения Галины Николаевны и методика снятия возрастного комплекса помогают уменьшить влияние отрицательных факторов, продлить жизнь человека, замедлить процессы старения.
					</p>
				</div>
			</div>
		</div>
		<div class="row row_wrp mt-30">
			<div class="col-5 col_center">
				<?php include $_SERVER['DOCUMENT_ROOT'] .'/inc/subscribe-block.php'; ?>
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

<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js", "ym");

   ym(51865784, "init", {
        id:51865784,
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/51865784" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->

<script src="js/script.js"></script>
<script src="js/common.js"></script>

</body>
</html>