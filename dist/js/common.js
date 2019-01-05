document.addEventListener('DOMContentLoaded', function() {
	// popup init
	Popup.init('.js-open-popup');
	MediaPopup.init('.js-open-media-popup');
	
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
	
	Form.onSubmit = function(form, callback) {
		ajax({
			url: form.action,
			send: new FormData(form),
			success: function(response) {
				if (response == 'sent') {
					Popup.message('#message-popup', 'Форма отправлена');
					
					callback({clearForm: true, unlockSubmitButton: true});
				} else {
					console.log(response);
				}
			},
			error: function(response) {
				console.log(response);
			}
		});
		
		return false;
	}
});