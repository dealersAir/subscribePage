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
			<div class="col-12 ta-c form__txt p-y-0">
				Оставьте свой e-mail и мы пришлем ссылку на материалы прямо сейчас!<br> 
				Мы не рассылаем спам, в каждом нашем письме есть кнопка "Отписаться".
			</div>
			<div class="col-12 ta-c">
				<a href="#privacy-policy" data-popup="#privacy-policy" class="js-open-popup link link_dash">Ваши данные защищены!</a>
			</div>
		</div>
	</form>
</div>