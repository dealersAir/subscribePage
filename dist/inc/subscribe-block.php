<div class="subscribe">
	<div class="subscribe__head">
		Получите <strong>бесплатно</strong> видеокурс «6 шагов оздоровительного похудения»
		<p>
			Оставьте свой e-mail и мы пришлем ссылку на курс прямо сейчас!
		</p>
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