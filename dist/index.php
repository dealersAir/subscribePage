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
	<link rel="stylesheet" href="css/style.css">
	<link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico">
	<title>Home page | startTemplate</title>
</head>
<body>

<!--HEADER/-->
<header id="header" class="header">
	<div class="row row_wrp row_col-middle header__row">
		<div class="col p-y-0">
			<a href="index.html" class="header__logo"><img src="images/logo.svg" alt="logo"></a>
		</div>
		<div class="col col_grow p-y-0">
			<div class="row row_col-middle">
				<nav class="col">
					<!--Menu/-->
					<ul class="menu">
						<li class="menu__item">
							<a href="grid.html" class="menu__a">Grid</a>
						</li>
					</ul>
					<!--/Menu-->
				</nav>
				<div class="col col-right p-0">
					
				</div>
			</div>
		</div>

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
				<h1 class="title"></h1>
			</div>
		</div>
		<div class="row row_wrp row_col-middle">
			<div class="col-6">
				
			</div>
			<div class="col-6">
				<form action="/subscribe.php" method="POST" class="form">
					<input type="hidden" name="csrf_token" value="<?php echo $csrf_token; ?>">
					<div class="row">
						<div class="col-12">
							<div class="form__field">
								<input type="text" name="email" data-type="email" data-required="true" placeholder="Ваш E-mail" class="form__text-input" value="">
								<div class="field-error-tip" data-error-text-2="Введите корректный e-mail">Введите ваш e-mail</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-12">
							<button type="submit" class="form__submit btn">Получить курс бесплатно</button>
						</div>
					</div>
				</form>
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

	<div id="popup-1" class="popup__window" style="max-width: 550px;">
		<button class="js-popup-close popup-close-btn"></button>
		<div class="popup__inner" style="height: 100px;">
			<a href="#message-popup" class="js-open-msg-popup">POPUP с сообщением</a>
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

<script src="js/jquery-3.1.1.min.js"></script>
<!--script src="js/easing.min.js"></script-->
<script src="js/maskinput.min.js"></script>

<script src="js/script.js"></script>
<script src="js/common.js"></script>
<script async src="https://get.dealersair.com/api/geo/?key=lufter21"></script>

</body>
</html>