document.addEventListener('DOMContentLoaded', function() {
	// popup
	Popup.init('.js-open-popup');
	
	/* // alert
	new Alert({
		content: 'На нашем веб-сайте используются файлы cookies, которые позволяют улучшить Ваше взаимодействие с сайтом.<br> Когда вы посещаете данный веб-сайт, Вы даете согласие на использование файлов cookies.',
		showOnce: true
	}); */
	
	// add js-all-res link
	function setAllResLink(hrefStr) {
		var linkElements = document.querySelectorAll('.js-all-res');
		
		for (var i = 0; i < linkElements.length; i++) {
			linkElements[i].href = hrefStr;
		}
	}
	
	// submit form
	Form.init('.form');
	
	Form.onSubmit = function(form, callback) {
		ajax({
			url: form.action,
			send: new FormData(form),
			success: function(response) {
				if (response == 'sent') {
					Popup.message('#message-popup', 'Мы отправили письмо со ссылками на все видео-уроки на указанный вами e-mail.<br> <span class="c-red">Иногда, письмо может попадать в папку <b>спам</b>.</span><br> Если в течение 10-15 минут письмо не пришло, пожалуйста, отправьте ваш e-mail ещё раз.');
					
					callback({clearForm: false, unlockSubmitButton: true});
				} else {
					setAllResLink('/all-resources.php');

					Popup.open('#email-alternative');
					
					callback({clearForm: false, unlockSubmitButton: true});
				}

				ym(51992852, 'reachGoal', 'sent_form');
			},
			error: function() {
				setAllResLink('/all-resources.php');
				
				Popup.open('#email-alternative-2');
				
				callback({clearForm: false, unlockSubmitButton: true});
			}
		});
		
		return false;
	}
});