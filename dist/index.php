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

require_once $_SERVER['DOCUMENT_ROOT'] .'/inc/header.php';
?>

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
							<div class="col-12 form__txt ta-c">
								Оставьте ваш e-mail и мы пришлем письмо со ссылками<br> <b>сразу на все материалы (9 видео-уроков)</b> прямо сейчас!<br> 
								Ознакомьтесь с <a href="#program" data-popup="#program" class="js-open-popup link link_dash">программой курса</a><br> 
								Мы не рассылаем спам, в каждом нашем письме есть кнопка "Отписаться".
							</div>
							<div class="col-12 ta-c pt-0">
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

<?php require_once $_SERVER['DOCUMENT_ROOT'] .'/inc/footer.php'; ?>