document.addEventListener('DOMContentLoaded', function() {
	(function initFun() {
		if (window.innerWidth < 1200) {
			var fsElem = document.querySelector('.first-screen');
			
			if (fsElem) {
				fsElem.style.height = window.innerHeight +'px';
			}
		}
		
		window.addEventListener('winResized', initFun);
	})();
	
	// init toggle button
	Toggle.init('.js-toggle', '.js-document-toggle-off');
	
	Toggle.onChange = function(tgl, state) {
		
	}
	
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
	Anchor.init('.js-anchor', 700, 100);
	
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