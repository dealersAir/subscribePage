document.addEventListener('DOMContentLoaded', function () {
	// popup init
	Popup.init('.js-open-popup');

	// menu
	if (window.innerWidth < 1000) {
		Menu.init('.menu__item_has-children', '.menu__sub-menu');
	}

	// mobile nav
	MobNav.init({
		openBtn: '.js-open-menu',
		closeBtn: '.js-close-menu',
		headerId: 'header',
		menuLinkSelector: '.menu a'
	});

	// anchor
	Anchor.init('.js-anchor', 700, 80);

	// alert
	new Alert({
		content: 'На нашем веб-сайте используются файлы cookies, которые позволяют улучшить Ваше взаимодействие с сайтом.<br> Когда вы посещаете данный веб-сайт, Вы даете согласие на использование файлов cookies.',
		showOnce: true
	});

	// submit form
	Form.init('.form');

	Form.onSubmit = function (form, callback) {
		ajax({
			url: form.action,
			send: new FormData(form),
			success: function success(response) {
				if (response == 'sent') {
					Popup.message('#message-popup', 'Мы отправили письмо со ссылкой на курс на указанный вами e-mail.<br> <span class="c-red">Иногда, письмо может попадать в папку <b>спам</b>.</span>');

					callback({ clearForm: true, unlockSubmitButton: true });
				} else {
					console.log(response);
				}
			},
			error: function error(response) {
				console.log(response);
			}
		});

		return false;
	};
});