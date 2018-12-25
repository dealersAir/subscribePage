// global variables
; var browser, ajax, animate;

(function() {
	"use strict";

	// Get useragent
	document.documentElement.setAttribute('data-useragent', navigator.userAgent.toLowerCase());

	// Browser identify
	browser = (function(userAgent) {
		userAgent = userAgent.toLowerCase();

		if (/(msie|rv:11\.0)/.test(userAgent)) {
			return 'ie';
		}
	})(navigator.userAgent);

	// Add support CustomEvent constructor for IE
	try {
		new CustomEvent("IE has CustomEvent, but doesn't support constructor");
	} catch (e) {
		window.CustomEvent = function(event, params) {
			var evt;

			params = params || {
				bubbles: false,
				cancelable: false,
				detail: undefined
			};

			evt = document.createEvent("CustomEvent");

			evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

			return evt;
		}

		CustomEvent.prototype = Object.create(window.Event.prototype);
	}

	// Window Resized Event
	var winResizedEvent = new CustomEvent('winResized'),
	rsz = true;

	window.addEventListener('resize', function() {
		if (rsz) {
			rsz = false;

			setTimeout(function() {
				window.dispatchEvent(winResizedEvent);
				rsz = true;
			}, 1021);
		}
	});

	// Closest polyfill
	if (!Element.prototype.closest) {
		(function(ElProto) {
			ElProto.matches = ElProto.matches || ElProto.mozMatchesSelector || ElProto.msMatchesSelector || ElProto.oMatchesSelector || ElProto.webkitMatchesSelector;

			ElProto.closest = ElProto.closest || function closest(selector) {
				if (!this) {
					return null;
				}

				if (this.matches(selector)) {
					return this;
				}

				if (!this.parentElement) {
					return null;
				} else {
					return this.parentElement.closest(selector);
				}
			};
		})(Element.prototype);
	}

	// Check element for hidden
	Element.prototype.elementIsHidden = function() {
		var elem = this;

		while (elem) {
			if (!elem) break;

			var compStyle = getComputedStyle(elem);

			if (compStyle.display == 'none' || compStyle.visibility == 'hidden' || compStyle.opacity == '0') {
				return true;
			}

			elem = elem.parentElement;
		}

		return false;
	}

	// Ajax
	ajax = function(options) {
		var xhr = new XMLHttpRequest();

		xhr.open('POST', options.url);

		if (typeof options.send == 'string') {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}
		
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				options.success(xhr.response);
			} else if (xhr.readyState == 4 && xhr.status != 200) {
				options.error(xhr.response);
			}
		}

		xhr.send(options.send);
	}

	/*
	Animation
	animate(function(takes 0...1) {}, Int duration in ms[, Str easing[, Fun animation complete]]);
	*/
	animate = function(draw, duration, ease, complete) {
		var start = performance.now();

		requestAnimationFrame(function anim(time) {
			var timeFraction = (time - start) / duration;

			if (timeFraction > 1) {
				timeFraction = 1;
			}

			var progress = (ease) ? easing(timeFraction, ease) : timeFraction;

			draw(progress);

			if (timeFraction < 1) {
				requestAnimationFrame(anim);
			} else {
				if (complete != undefined) {
					complete();
				}
			}
		});
	}

	function easing(timeFraction, ease) {
		switch (ease) {
			case 'easeInQuad':
			return quad(timeFraction);
			
			case 'easeOutQuad':
			return 1 - quad(1 - timeFraction);
			
			case 'easeInOutQuad':
			if (timeFraction <= 0.5) {
				return quad(2 * timeFraction) / 2;
			} else {
				return (2 - quad(2 * (1 - timeFraction))) / 2;
			}
		}
	}

	function quad(timeFraction) {
		return Math.pow(timeFraction, 2)
	}
})();
; var MobNav;

(function() {
	"use strict";

	//fix header
	var headerElem = document.querySelector('.header');

	window.addEventListener('scroll', function() {
		if (window.pageYOffset > 21) {
			headerElem.classList.add('header_fixed');
		} else if (!document.body.classList.contains('popup-is-opened') && !document.body.classList.contains('mob-nav-is-opened')) {
			headerElem.classList.remove('header_fixed');
		}
	});

	//mob menu
	MobNav = {
		options: null,
		winScrollTop: 0,

		fixBody: function(st) {
			if (st) {
				this.winScrollTop = window.pageYOffset;

				document.body.classList.add('mob-nav-is-opened');
				document.body.style.top = -this.winScrollTop +'px';
			} else {
				document.body.classList.remove('mob-nav-is-opened');

				window.scrollTo(0, this.winScrollTop);
			}
		},

		open: function(btnElem) {
			var headerElem = document.getElementById(this.options.headerId);

			if (!headerElem) return;

			if (btnElem.classList.contains('opened')) {
				this.close();
			} else {
				btnElem.classList.add('opened');
				headerElem.classList.add('opened');
				this.fixBody(true);
			}
		},

		close: function() {
			var headerElem = document.getElementById(this.options.headerId);

			if (!headerElem) return;

			headerElem.classList.remove('opened');

			var openBtnElements = document.querySelectorAll(this.options.openBtn);

			for (var i = 0; i < openBtnElements.length; i++) {
				openBtnElements[i].classList.remove('opened');
			}

			this.fixBody(false);
		},

		init: function(options) {
			this.options = options;

			document.addEventListener('click', (e) => {
				var openElem = e.target.closest(options.openBtn),
				closeElem = e.target.closest(options.closeBtn),
				menuLinkElement = e.target.closest(options.menuLinkSelector);

				if (openElem) {
					e.preventDefault();
					this.open(openElem);
				} else if (closeElem) {
					e.preventDefault();
					this.close();
				} else if (menuLinkElement) {
					this.close();
				}
			});
		}
	};
})();
/*
* call Menu.init(Str menu item selector, Str sub menu selector);
*/
var Menu;

(function() {
	"use strict";

	Menu = {
		toggle: function(elem, elementStr, subMenuStr) {
			var subMenuElem = elem.querySelector(subMenuStr);

			if (!subMenuElem) {
				return;
			}

			if (elem.classList.contains('active')) {
				subMenuElem.style.height = 0;

				elem.classList.remove('active');
			} else {
				var mainElem = elem.closest('.menu'),
				itemElements = mainElem.querySelectorAll(elementStr),
				subMenuElements = mainElem.querySelectorAll(subMenuStr);

				for (var i = 0; i < itemElements.length; i++) {
					itemElements[i].classList.remove('accord__button_active');
					subMenuElements[i].style.height = 0;
				}

				subMenuElem.style.height = subMenuElem.scrollHeight +'px';

				elem.classList.add('active');
			}
		},

		init: function(elementStr, subMenuStr) {
			document.addEventListener('click', (e) => {
				var elem = e.target.closest(elementStr);

				if (!elem) {
					return;
				}

				this.toggle(elem, elementStr, subMenuStr);
			});
		}
	};
})();
/*
Toggle.init(Str toggleSelector[, onDocClickToggleOffSelecor[, Str toggledClass (default - 'toggled')]]);

Toggle.onChange = function(toggleElem, state) {
	// code...
}
*/

; var Toggle;

(function() {
	"use strict";
	
	Toggle = {
		toggledClass: 'toggled',
		onChange: null,
		
		target: function(toggleElem, state) {
			var targetElements = document.querySelectorAll(toggleElem.getAttribute('data-target-elements'));
			
			if (!targetElements.length) return;
			
			if (state) {
				for (var i = 0; i < targetElements.length; i++) {
					targetElements[i].classList.add(this.toggledClass);
				}
				
				//dependence elements
				if (toggleElem.hasAttribute('data-dependence-target-elements')) {
					var dependenceTargetElements = document.querySelectorAll(toggleElem.getAttribute('data-dependence-target-elements'));
					
					for (var i = 0; i < dependenceTargetElements.length; i++) {
						dependenceTargetElements[i].classList.remove(this.toggledClass);
					}
				}
			} else {
				for (var i = 0; i < targetElements.length; i++) {
					targetElements[i].classList.remove(this.toggledClass);
				}
			}
		},
		
		toggle: function(toggleElem, off) {
			var state;
			
			if (toggleElem.classList.contains(this.toggledClass)) {
				toggleElem.classList.remove(this.toggledClass);
				
				state = false;
				
				if (toggleElem.hasAttribute('data-first-text')) {
					toggleElem.innerHTML = toggleElem.getAttribute('data-first-text');
				}
			} else if (!off) {
				toggleElem.classList.add(this.toggledClass);
				
				state = true;
				
				if (toggleElem.hasAttribute('data-second-text')) {
					toggleElem.setAttribute('data-first-text', toggleElem.innerHTML);
					
					toggleElem.innerHTML = toggleElem.getAttribute('data-second-text');
				}
			}
			
			//target
			if (toggleElem.hasAttribute('data-target-elements')) {
				this.target(toggleElem, state);
			}
			
			//call onChange
			if (this.onChange) {
				this.onChange(toggleElem, state);
			}
		},
		
		onDocClickOff: function (e, onDocClickOffSelector) {
			var toggleElements = document.querySelectorAll(onDocClickOffSelector + '.' +this.toggledClass);
			
			for (var i = 0; i < toggleElements.length; i++) {
				var elem = toggleElements[i];
				
				if (elem.hasAttribute('data-target-elements')) {
					var targetSelectors = elem.getAttribute('data-target-elements');
					
					if (!e.target.closest(targetSelectors)) {
						this.toggle(elem, true);
					}
				}
			}
		},
		
		init: function(toggleSelector, onDocClickOffSelector, toggledClass) {
			if (toggledClass) {
				this.toggledClass = toggledClass;
			}
			
			document.addEventListener('click', (e) => {
				var toggleElem = e.target.closest(toggleSelector);
				
				if (toggleElem) {
					e.preventDefault();
					
					this.toggle(toggleElem);
				} else {
					this.onDocClickOff(e, onDocClickOffSelector);
				}
			});
		}
	};
})();
var Popup, MediaPopup;

(function() {
	"use strict";

	//popup core
	Popup = {
		winScrollTop: 0,
		onClose: null,
		headerSelector: '.header',

		fixBody: function(st) {
			var headerElem = document.querySelector(this.headerSelector);

			if (st && !document.body.classList.contains('popup-is-opened')) {
				this.winScrollTop = window.pageYOffset;

				var offset = window.innerWidth - document.documentElement.clientWidth;

				document.body.classList.add('popup-is-opened');

				if (headerElem) {
					headerElem.style.right = offset +'px';
				}

				document.body.style.right = offset +'px';

				document.body.style.top = (-this.winScrollTop) +'px';
			} else if (!st) {
				if (headerElem) {
					headerElem.style.right = '';
				}
				
				document.body.classList.remove('popup-is-opened');

				window.scrollTo(0, this.winScrollTop);
			}
		},

		open: function(elementStr, callback) {
			var elem = document.querySelector(elementStr);

			if (!elem || !elem.classList.contains('popup__window')) {
				return;
			}

			this.close();

			var elemParent = elem.parentElement;
			
			elemParent.classList.add('popup_visible');

			elem.classList.add('popup__window_visible');

			if (callback) {
				this.onClose = callback;
			}

			this.fixBody(true);

			return elem;
		},

		message: function(elementStr, msg, callback) {
			var elem = this.open(elementStr, callback);

			elem.querySelector('.popup__inner').innerHTML = '<div class="popup__message">'+ msg +'</div>';
		},

		close: function() {
			var elements = document.querySelectorAll('.popup__window');

			if (!elements.length) {
				return;
			}

			for (var i = 0; i < elements.length; i++) {
				var elem = elements[i];

				if (!elem.classList.contains('popup__window_visible')) {
					continue;
				}

				elem.classList.remove('popup__window_visible');
				elem.parentElement.classList.remove('popup_visible');
			}

			if (this.onClose) {
				this.onClose();
				this.onClose = null;
			}
		},

		init: function(elementStr) {
			document.addEventListener('click', (e) => {
				var element = e.target.closest(elementStr),
				closeElem = e.target.closest('.js-popup-close');

				if (element) {
					e.preventDefault();

					this.open(element.getAttribute('data-popup'));
				} else if (closeElem || (!e.target.closest('.popup__window') && e.target.closest('.popup'))) {
					this.fixBody(false);

					this.close();
				}
			});

			if (window.location.hash) {
				this.open(window.location.hash);
			}
		}
	};

	//popup media
	MediaPopup = {
		image: function(args) {
			var elemPopup = Popup.open(args.popupStr),
			elemImg = elemPopup.querySelector('.popup-media__image');

			Popup.onClose = function() {
				elemImg.src = '#';
				elemImg.classList.remove('popup-media__image_visible'); 
			}

			elemImg.src = args.href;
			elemImg.classList.add('popup-media__image_visible');
			
		},

		video: function(args) {

		},

		next: function(elem) {
			if (!elem.hasAttribute('data-group')) {
				return;
			}

			var group = elem.getAttribute('data-group'),
			index = [].slice.call(document.querySelectorAll('[data-group="'+ group +'"]')).indexOf(elem);
		},

		init: function(elementStr) {
			document.addEventListener('click', (e) => {
				var element = e.target.closest(elementStr);

				if (!element) {
					return;
				}

				e.preventDefault();

				var type = element.getAttribute('data-type'),
				args = {
					href: element.href,
					caption: element.getAttribute('data-caption'),
					group: element.getAttribute('data-group'),
					popupStr: element.getAttribute('data-popup')
				};

				if (type == 'image') {
					this.image(args);
				} else if (type == 'video') {
					this.video(args);
				}

				this.next(element);
			});
		}
	};

})();



/*var pPopup = {
	closeCallback: function() {},
	play: null,
	ind: 0,
	group: null,
	position: 0,

	show: function(id, fun) {
		var _ = this,
		$popWin = $(id),
		$popup = $popWin.closest('.popup');
		
		if ($popWin.length && $popWin.hasClass('popup__window')) {

			_.position = $(window).scrollTop();
			$popup.fadeIn(321).scrollTop(0);
			$('.popup__window').removeClass('popup__window_visible');
			$popWin.addClass('popup__window_visible');
			$('body').css('top', -_.position).addClass('is-popup-opened');

			setTimeout(function() {
				CoverImg.reInit('#media-popup');
			}, 721);

		}

		_.closeCallback = fun || function() {};
	},

	hide: function() {
		var _ = this;
		$('.popup__window').removeClass('popup__window_visible');
		$('.popup').fadeOut(321);
		$('.popup__message').remove();
		$('body').removeClass('is-popup-opened').removeAttr('style');
		$('html, body').scrollTop(_.position);
		_.closeCallback();
	},

	message: function(id,msg,fun) {
		var _ = this;
		$(id).find('.popup__inner').prepend('<div class="popup__message">'+ msg +'</div>');
		_.show(id);
		_.closeCallback = fun || function() {};
	},

	resize: function($pop, $img) {
		var popH = $pop.innerHeight();
		if (popH > window.innerHeight) {
			$pop.css('max-width', (window.innerHeight * ($pop.innerWidth() / popH)));
		}
	},

	media: function(_$,args,show) {
		var _ = this,
		id = $(_$).attr('data-popup'),
		Pop = $(id),
		$box = Pop.find('.popup-media__box'),
		Img = Pop.find('.popup-media__image'),
		BtnPlay = Pop.find('.popup-media__play'),
		Iframe = Pop.find('.popup-media__iframe');

		if (args.data) {
			Pop.find('.popup-media__bar').css('display', 'block');
			var data = JSON.parse( args.data );
			for (var i = 0; i < data.length; i++) {
				Pop.find('.popup-media__data-'+ i).html(data[i]);
			}
		}

		if (args.imgSize) {
			var imgSize = JSON.parse(args.imgSize);
			Img.attr('width', imgSize[0]).attr('height', imgSize[1]);
		} else {
			Img.attr('width', '').attr('height', '');
		}

		if (args.img) {
			Img.css({visibility: 'visible', marginLeft: '', marginTop: ''}).removeClass('cover-img_w cover-img_h').attr('src', args.img);
		}
		
		//Pop.css('max-width', '');
		Iframe.css('visibility', 'hidden').attr('src', '');
		BtnPlay.css('visibility', 'hidden');
		
		if (args.vid) {
			$box.removeClass('middle').addClass('cover-img-wrap');
			Img.removeClass('middle__img').addClass('cover-img');
			BtnPlay.css('visibility', 'visible').attr('href', args.vid);

			_.play = function() {
				var utm = args.vid.match(/(?:youtu\.be\/|youtube\.com\/watch\?v\=|youtube\.com\/embed\/)+?([\w-]+)/i),
				ifrSrc = 'https://www.youtube.com/embed/'+ utm[1] +'?autoplay=1';
				BtnPlay.css('visibility', 'hidden');
				Img.css('visibility', 'hidden');
				Iframe.css('visibility', 'visible').attr('src', ifrSrc);
			}

			if (!args.img) {
				_.play();
			} else {
				setTimeout(function() {
					CoverImg.init(id);
					Img.attr('src', args.img);
				}, 721);
			}

			

		} else {
			$box.removeClass('cover-img-wrap').addClass('middle');
			Img.removeClass('cover-img').addClass('middle__img');
		}



		if (args.group) {
			Pop.find('.popup-media__arr').css('display', 'block');
			_.group =  $(_$).attr('data-group');
			_.ind = $('[data-group="'+ _.group +'"]').index(_$);
		}

		if (show) {
			_.show(id);
		}

		if (!args.vid) {
			setTimeout(function() {
				_.resize(Pop, Img);
			}, 721);
		}

		_.closeCallback = function() {
			Img.css('visibility', 'hidden').attr('src', '');
			Iframe.css('visibility', 'hidden').attr('src', '');
			BtnPlay.css('visibility', 'hidden');
		}

	},

	next: function(dir) {
		var _ = this,
		$next,
		ind = _.ind;

		if (dir == 'next') {
			ind++;
			if ($('[data-group="'+ _.group +'"]').eq(ind).length) {
				$next = $('[data-group="'+ _.group +'"]').eq(ind);
			}
		} else if (dir == 'prev' && ind > 0) {
			ind--;
			if ($('[data-group="'+ _.group +'"]').eq(ind).length) {
				$next = $('[data-group="'+ _.group +'"]').eq(ind);
			}
		}

		if ($next) {
			var args;

			if ($next.hasClass('js-open-popup-image')) {
				args = {
					img: $next.attr('href'),
					imgSize: $next.attr('data-image-size'),
					group: $next.attr('data-group'),
					data: $next.attr('data-data')
				};
			} else if ($next.hasClass('js-open-popup-video')) {
				args = {
					vid: $next.attr('href'),
					img: $next.attr('data-preview'),
					imgSize: $next.attr('data-preview-size'),
					group: $next.attr('data-group'),
					data: $next.attr('data-data')
				};
			}

			_.media($next, args);
			
		}

	}

};*/


/*$(document).ready(function() {
	$('body').on('click', '.js-open-popup', function () {
		Popup.show($(this).attr('data-popup'));
		return false;
	});

	$('body').on('click', '.js-open-popup-image', function () {
		var args = {
			img: $(this).attr('href'),
			imgSize: $(this).attr('data-image-size'),
			group: $(this).attr('data-group'),
			data: $(this).attr('data-data')
		};
		Popup.media(this, args, true);
		return false;
	});

	$('body').on('click', '.js-open-popup-video', function () {
		var args = {
			vid: $(this).attr('href'),
			img: $(this).attr('data-preview'),
			imgSize: $(this).attr('data-preview-size'),
			group: $(this).attr('data-group'),
			data: $(this).attr('data-data')
		};
		Popup.media(this, args, true);
		return false;
	});

	$('body').on('click', '.popup-media__play', function () {
		Popup.play();
		return false;
	});

	$('body').on('click', '.popup-media__arr', function () {
		Popup.next($(this).attr('data-dir'));
		return false;
	});

	$('body').on('click', '.js-open-msg-popup', function () {
		Popup.message('#message-popup', 'Это всплывашка с сообщением.<br> вызов: <span class="c-red">Popup.message("#id", "Текст или html");</span>', function() { alert('После закрытия'); });
		return false;
	});

	$('body').on('click', '.popup__close', function () {
		Popup.hide();
		return false;
	});

	$('body').on('click', '.popup', function(e) {
		if (!$(e.target).closest('.popup__window').length) {
			Popup.hide();
		}
	});


	if (window.location.hash) {
		var hash = window.location.hash;
		if($(hash).length && $(hash).hasClass('popup__window')){
			Popup.show(hash);
		}
	}

});*/
; var Placeholder;

(function() {
	"use strict";

	Placeholder = {
		init: function(elementsStr) {
			var elements = document.querySelectorAll(elementsStr);

			if (!elements.length) return;

			for (var i = 0; i < elements.length; i++) {
				var elem = elements[i];

				if (elem.placeholder) {

					var elemFor = (elem.id) ? elem.id : 'placeholder-index-'+ i,
					label = document.createElement('label');

					label.htmlFor = elemFor;
					label.className = 'placeholder';
					label.innerHTML = elem.placeholder;

					elem.parentElement.insertBefore(label, elem);

					elem.removeAttribute('placeholder');
					
					if (!elem.id) {
						elem.id = elemFor;
					}

				}

				if (elem.value.length) {
					this.hide(elem, true);
				}
			}

			//events
			document.addEventListener('focus', (e) => {
				var elem = e.target.closest(elementsStr);

				if (elem) {
					this.hide(elem, true);
				}
			}, true);

			document.addEventListener('blur', (e) => {
				var elem = e.target.closest(elementsStr);

				if (elem) {
					this.hide(elem, false);
				}
			}, true);
		},
		
		hide: function(elem, hide) {
			var label = document.querySelector('label.placeholder[for="'+ elem.id +'"]');

			if (!label) {
				return;
			}

			var lSt = label.style;

			if (hide) {

				lSt.textIndent = '-9999px';
				lSt.paddingLeft = '0px';
				lSt.paddingRight = '0px';

			} else {

				if (!elem.value.length) {
					lSt.textIndent = '';
					lSt.paddingLeft = '';
					lSt.paddingRight = '';
				}

			}
		}
	};

	//init scripts
	document.addEventListener('DOMContentLoaded', function() {
		Placeholder.init('input[type="text"], input[type="password"], textarea');
	});
})();
var ValidateForm, Form;

(function () {
	"use strict";
	
	// validate form
	ValidateForm = {
		input: null,
		
		errorTip: function (err, errInd, errorTxt) {
			var field = this.input.closest('.form__field') || this.input.parentElement,
			errTip = field.querySelector('.field-error-tip');
			
			if (err) {
				field.classList.remove('field-success');
				field.classList.add('field-error');
				
				if (!errTip) {
					return;
				}
				
				if (errInd) {
					if (!errTip.hasAttribute('data-error-text')) {
						errTip.setAttribute('data-error-text', errTip.innerHTML);
					}
					errTip.innerHTML = (errInd != 'custom') ? errTip.getAttribute('data-error-text-'+ errInd) : errorTxt;
				} else if (errTip.hasAttribute('data-error-text')) {
					errTip.innerHTML = errTip.getAttribute('data-error-text');
				}
			} else {
				field.classList.remove('field-error');
				field.classList.add('field-success');
			}
		},
		
		customErrorTip: function (input, errorTxt) {
			if (!input) {
				return;
			}
			
			this.input = input;
			
			this.errorTip(true, 'custom', errorTxt);
		},
		
		txt: function () {
			var err = false;
			
			if (!/^[0-9a-zа-яё_,.:;@-\s]*$/i.test(this.input.value)) {
				this.errorTip(true, 2);
				err = true;
			} else {
				this.errorTip(false);
			}
			
			return err;
		},
		
		num: function () {
			var err = false;
			
			if (!/^[0-9.,-]*$/.test(this.input.value)) {
				this.errorTip(true, 2);
				err = true;
			} else {
				this.errorTip(false);
			}
			
			return err;
		},
		
		name: function () {
			var err = false;
			
			if (!/^[a-zа-яё'-]{3,21}(\s[a-zа-яё'-]{3,21})?(\s[a-zа-яё'-]{3,21})?$/i.test(this.input.value)) {
				this.errorTip(true, 2);
				err = true;
			} else {
				this.errorTip(false);
			}
			
			return err;
		},
		
		date: function () {
			var err = false, 
			errDate = false, 
			matches = this.input.value.match(/^(\d{2}).(\d{2}).(\d{4})$/);
			
			if (!matches) {
				errDate = 1;
			} else {
				var compDate = new Date(matches[3], (matches[2] - 1), matches[1]),
				curDate = new Date();
				
				if (this.input.hasAttribute('data-min-years-passed')) {
					var interval = curDate.valueOf() - new Date(curDate.getFullYear() - (+this.input.getAttribute('data-min-years-passed')), curDate.getMonth(), curDate.getDate()).valueOf();
					
					if (curDate.valueOf() < compDate.valueOf() || (curDate.getFullYear() - matches[3]) > 100) {
						errDate = 1;
					} else if ((curDate.valueOf() - compDate.valueOf()) < interval) {
						errDate = 2;
					}
				}
				
				if (compDate.getFullYear() != matches[3] || compDate.getMonth() != (matches[2] - 1) || compDate.getDate() != matches[1]) {
					errDate = 1;
				}
			}
			
			if (errDate == 1) {
				this.errorTip(true, 2);
				err = true;
			} else if (errDate == 2) {
				this.errorTip(true, 3);
				err = true;
			} else {
				this.errorTip(false);
			}
			
			return err;
		},
		
		email: function () {
			var err = false;
			
			if (!/^[a-z0-9]+[\w\-\.]*@[\w\-]{2,}\.[a-z]{2,6}$/i.test(this.input.value)) {
				this.errorTip(true, 2);
				err = true;
			} else {
				this.errorTip(false);
			}
			
			return err;
		},
		
		url: function () {
			var err = false;
			
			if (!/^(https?\:\/\/)?[a-zа-я0-9\-\.]+\.[a-zа-я]{2,11}$/i.test(this.input.value)) {
				this.errorTip(true, 2);
				err = true;
			} else {
				this.errorTip(false);
			}
			
			return err;
		},
		
		tel: function () {
			var err = false;
			
			if (!/^\+7\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/.test(this.input.value)) {
				this.errorTip(true, 2);
				err = true;
			} else {
				this.errorTip(false);
			}
			
			return err;
		},
		
		pass: function () {
			var err = false,
			minLng = this.input.getAttribute('data-min-length');
			
			if (minLng && this.input.value.length < minLng) {
				this.errorTip(true, 2);
				err = true;
			} else {
				this.errorTip(false);
			}
			
			return err;
		},
		
		
		checkbox: function (elem) {
			this.input = elem;
			
			var group = elem.closest('.form__chbox-group');
			
			if (group && group.getAttribute('data-tested')) {
				var checkedElements = 0,
				elements = group.querySelectorAll('input[type="checkbox"]');
				
				for (var i = 0; i < elements.length; i++) {
					if (elements[i].checked) {
						checkedElements++;
					}
				}
				
				if (checkedElements < group.getAttribute('data-min')) {
					group.classList.add('form__chbox-group_error');
				} else {
					group.classList.remove('form__chbox-group_error');
				}
				
			} else if (elem.getAttribute('data-tested')) {
				if (elem.getAttribute('data-required') && !elem.checked) {
					this.errorTip(true);
				} else {
					this.errorTip(false);
				}
			}
		},
		
		radio: function (elem) {
			this.input = elem;
			
			var checkedElement = false,
			group = elem.closest('.form__radio-group'),
			elements = group.querySelectorAll('input[type="radio"]');
			
			for (var i = 0; i < elements.length; i++) {
				if (elements[i].checked) {
					checkedElement = true;
				}
			}
			
			if (!checkedElement) {
				group.classList.add('form__radio-group_error');
			} else {
				group.classList.remove('form__radio-group_error');
			}
		},
		
		select: function (elem) {
			var err = false;
			
			this.input = elem;
			
			if (elem.getAttribute('data-required') && !elem.value.length) {
				this.errorTip(true);
				err = true;
			} else {
				this.errorTip(false);
			}
			
			return err;
		},
		
		file: function (elem, filesArr) {
			this.input = elem;
			
			var err = false,
			errCount = {ext: 0, size: 0},
			maxFiles = +this.input.getAttribute('data-max-files'),
			extRegExp = new RegExp('(?:\\.'+ this.input.getAttribute('data-ext').replace(/,/g, '|\\.') +')$', 'i'),
			maxSize = +this.input.getAttribute('data-max-size'),
			fileItemElements = this.input.closest('.custom-file').querySelectorAll('.custom-file__item');;
			
			for (var i = 0; i < filesArr.length; i++) {
				var file = filesArr[i];
				
				if (!file.name.match(extRegExp)) {
					errCount.ext++;
					
					if (fileItemElements[i]) {
						fileItemElements[i].classList.add('file-error');
					}
					
					continue;
				}
				
				if (file.size > maxSize) {
					errCount.size++;
					
					if (fileItemElements[i]) {
						fileItemElements[i].classList.add('file-error');
					}
				}
			}
			
			if (maxFiles && filesArr.length > maxFiles) {
				this.errorTip(true, 4);
				err = true;
			} else if (errCount.ext) {
				this.errorTip(true, 2);
				err = true;
			} else if (errCount.size) {
				this.errorTip(true, 3);
				err = true;
			} else {
				this.errorTip(false);
			}
			
			return err;
		},
		
		validateOnInput: function (elem) {
			this.input = elem;
			
			var dataType = elem.getAttribute('data-type');
			
			if (elem.getAttribute('data-required') && !elem.value.length) {
				this.errorTip(true);
			} else if (elem.value.length) {
				if (dataType) {
					this[dataType]();
				} else {
					this.errorTip(false);
				}
			} else {
				this.errorTip(false);
			}
		},
		
		validate: function (formElem) {
			var err = 0;
			
			// text, password, textarea
			var elements = formElem.querySelectorAll('input[type="text"], input[type="password"], textarea');
			
			for (var i = 0; i < elements.length; i++) {
				var elem = elements[i];
				
				if (elem.elementIsHidden()) {
					continue;
				}
				
				this.input = elem;
				
				elem.setAttribute('data-tested', 'true');
				
				var dataType = elem.getAttribute('data-type');
				
				if (elem.getAttribute('data-required') && !elem.value.length) {
					this.errorTip(true);
					err++;
				} else if (elem.value.length) {
					if (dataType) {
						if (this[dataType]()) {
							err++;
						}
					} else {
						this.errorTip(false);
					}
				} else {
					this.errorTip(false);
				}
			}
			
			// select
			var elements = formElem.querySelectorAll('.custom-select__input');
			
			for (var i = 0; i < elements.length; i++) {
				var elem = elements[i];
				
				if (elem.parentElement.elementIsHidden()) {
					continue;
				}
				
				if (this.select(elem)) {
					err++;
				}
			}
			
			// checkboxes
			var elements = formElem.querySelectorAll('input[type="checkbox"]');
			
			for (var i = 0; i < elements.length; i++) {
				var elem = elements[i];
				
				if (elem.elementIsHidden()) {
					continue;
				}
				
				this.input = elem;
				
				elem.setAttribute('data-tested', 'true');
				
				if (elem.getAttribute('data-required') && !elem.checked) {
					this.errorTip(true);
					err++;
				} else {
					this.errorTip(false);
				}
			}
			
			// checkbox group
			var groups = formElem.querySelectorAll('.form__chbox-group');
			
			for (let i = 0; i < groups.length; i++) {
				var group = groups[i],
				checkedElements = 0;
				
				if (group.elementIsHidden()) {
					continue;
				}
				
				group.setAttribute('data-tested', 'true');
				
				var elements = group.querySelectorAll('input[type="checkbox"]');
				
				for (let i = 0; i < elements.length; i++) {
					if (elements[i].checked) {
						checkedElements++;
					}
				}
				
				if (checkedElements < group.getAttribute('data-min')) {
					group.classList.add('form__chbox-group_error');
					err++;
				} else {
					group.classList.remove('form__chbox-group_error');
				}
			}
			
			// radio group
			var groups = formElem.querySelectorAll('.form__radio-group');
			
			for (let i = 0; i < groups.length; i++) {
				var group = groups[i],
				checkedElement = false;
				
				if (group.elementIsHidden()) {
					continue;
				}
				
				group.setAttribute('data-tested', 'true');
				
				var elements = group.querySelectorAll('input[type="radio"]');
				
				for (let i = 0; i < elements.length; i++) {
					if (elements[i].checked) {
						checkedElement = true;
					}
				}
				
				if (!checkedElement) {
					group.classList.add('form__radio-group_error');
					err++;
				} else {
					group.classList.remove('form__radio-group_error');
				}
			}
			
			// file
			var elements = formElem.querySelectorAll('input[type="file"]');
			
			for (var i = 0; i < elements.length; i++) {
				var elem = elements[i];
				
				if (elem.elementIsHidden()) {
					continue;
				}
				
				this.input = elem;
				
				if (CustomFile.inputFiles(elem).length) {
					if (this.file(elem, CustomFile.inputFiles(elem))) {
						err++;
					}
				} else if (elem.getAttribute('data-required')) {
					this.errorTip(true);
					err++;
				} else {
					this.errorTip(false);
				}
			}
			
			// passwords compare
			var elements = formElem.querySelectorAll('input[data-pass-compare-input]');
			
			for (var i = 0; i < elements.length; i++) {
				var elem = elements[i];
				
				if (elem.elementIsHidden()) {
					continue;
				}
				
				this.input = elem;
				
				var val = elem.value;
				
				if (val.length) {
					var compElemVal = formElem.querySelector(elem.getAttribute('data-pass-compare-input')).value;
					
					if (val !== compElemVal) {
						this.errorTip(true, 2);
						err++;
					} else {
						this.errorTip(false);
					}
				}
			}
			
			if (err) {
				formElem.classList.add('form-error');
			} else {
				formElem.classList.remove('form-error');
			}
			
			return (err) ? false : true;
		},
		
		init: function (formSelector) {
			document.addEventListener('input', (e) => {
				var elem = e.target.closest(formSelector +' input[type="text"],'+ formSelector +' input[type="password"],'+ formSelector +' textarea');
				
				if (elem && elem.hasAttribute('data-tested')) {
					this.validateOnInput(elem);
				}
			});
			
			document.addEventListener('change', (e) => {
				var elem = e.target.closest(formSelector +' input[type="radio"],'+ formSelector +' input[type="checkbox"]');
				
				if (elem) {
					this[elem.type](elem);
				}
			});
		}
	};
	
	// variable height textarea
	var varHeightTextarea = {
		setHeight: function (elem) {
			var mirror = elem.parentElement.querySelector('.var-height-textarea__mirror'),
			mirrorOutput = elem.value.replace(/\n/g, '<br>');
			
			mirror.innerHTML = mirrorOutput +'&nbsp;';
		},
		
		init: function () {
			document.addEventListener('input', (e) => {
				var elem = e.target.closest('.var-height-textarea__textarea');
				
				if (!elem) {
					return;
				}
				
				this.setHeight(elem);
			});
		}
	};
	
	// next fieldset
	var NextFieldset = {
		next: function (btnElem, fwd) {
			var nextFieldset = (btnElem.hasAttribute('data-go-to-fieldset')) ? document.querySelector(btnElem.getAttribute('data-go-to-fieldset')) : null;
			
			if (!nextFieldset) return;
			
			var currentFieldset = btnElem.closest('.fieldset__item'),
			goTo = (fwd) ? ValidateForm.validate(currentFieldset) : true;
			
			if (goTo) {
				currentFieldset.classList.add('fieldset__item_hidden');
				nextFieldset.classList.remove('fieldset__item_hidden');
			}
		},
		
		init: function (nextBtnSelector, prevBtnSelector) {
			document.addEventListener('click', (e) => {
				var nextBtnElem = e.target.closest(nextBtnSelector),
				prevBtnElem = e.target.closest(prevBtnSelector);
				
				if (nextBtnElem) {
					this.next(nextBtnElem, true);
				} else if (prevBtnElem) {
					this.next(prevBtnElem, false);
				}
			});
		}
	};
	
	// form
	Form = {
		onSubmit: null,
		
		submit: function (e, formElem) {
			formElem.classList.add('form_sending');
			
			if (!this.onSubmit) {
				return;
			}
			
			// clear form
			function clear() {
				var elements = formElem.querySelectorAll('input[type="text"], input[type="password"], textarea');
				
				for (var i = 0; i < elements.length; i++) {
					var elem = elements[i];
					
					elem.value = '';
					
					if (window.Placeholder) {
						Placeholder.hide(elem, false);
					}
				}
				
				if (window.Select) {
					Select.reset();
				}
				
				var textareaMirrors = formElem.querySelectorAll('.form__textarea-mirror');
				
				for (var i = 0; i < textareaMirrors.length; i++) {
					textareaMirrors[i].innerHTML = '';
				}
			}
			
			// submit button
			function actSubmitBtn(st) {
				var elements = formElem.querySelectorAll('button[type="submit"], input[type="submit"]');
				
				for (var i = 0; i < elements.length; i++) {
					var elem = elements[i];
					
					if (!elem.elementIsHidden()) {
						if (st) {
							elem.removeAttribute('disabled');
						} else {
							elem.setAttribute('disabled', 'disable');
						}
					}
				}
			}
			
			// call onSubmit
			var ret = this.onSubmit(formElem, function (obj) {
				obj = obj || {};
				
				actSubmitBtn(obj.unlockSubmitButton);
				
				formElem.classList.remove('form_sending');
				
				if (obj.clearForm == true) {
					clear();
				}
			});
			
			if (ret === false) {
				e.preventDefault();
				
				actSubmitBtn(false);
			}
		},
		
		init: function (formSelector) {
			if (!document.querySelector(formSelector)) return;
			
			ValidateForm.init(formSelector);
			
			document.addEventListener('submit', (e) => {
				var formElem = e.target.closest(formSelector);
				
				if (!formElem) {
					return;
				}
				
				if (ValidateForm.validate(formElem)) {
					this.submit(e, formElem);
				} else {
					e.preventDefault();
				}
			});
		}
	};
	
	// bind labels
	function BindLabels(elementsStr) {
		var elements = document.querySelectorAll(elementsStr);
		
		for (var i = 0; i < elements.length; i++) {
			var elem = elements[i],
			label = elem.parentElement.querySelector('label'),
			forID = (elem.hasAttribute('id')) ? elem.id : 'keylabel-'+ i;
			
			if (label && !label.hasAttribute('for')) {
				label.htmlFor = forID;
				elem.id = forID;
			}
		}
	}

	// duplicate form
	var DuplicateForm = {
		add: function (btnElem) {
			var modelElem = (btnElem.hasAttribute('data-form-model')) ? document.querySelector(btnElem.getAttribute('data-form-model')) : null,
			destElem = (btnElem.hasAttribute('data-duplicated-dest')) ? document.querySelector(btnElem.getAttribute('data-duplicated-dest')) : null;
			
			if (!modelElem || !destElem) return;
			
			var duplicatedDiv = document.createElement('div');
			
			duplicatedDiv.className = 'duplicated';
			
			duplicatedDiv.innerHTML = modelElem.innerHTML;
			
			destElem.appendChild(duplicatedDiv);
			
			var dupicatedElements = destElem.querySelectorAll('.duplicated');
			
			for (var i = 0; i < dupicatedElements.length; i++) {
				var dupicatedElem = dupicatedElements[i],
				labelElements = dupicatedElem.querySelectorAll('label'),
				inputElements = dupicatedElem.querySelectorAll('input');
				
				for (var j = 0; j < labelElements.length; j++) {
					var elem = labelElements[j];
					
					if (elem.htmlFor != '') {
						elem.htmlFor += '-'+ i +'-'+ j;
					}
				}
				
				for (var j = 0; j < inputElements.length; j++) {
					var elem = inputElements[j];
					
					if (elem.id != '') {
						elem.id += '-'+ i +'-'+ j;
					}
				}
			}
		},
		
		remove: function (btnElem) {
			var duplElem =  btnElem.closest('.duplicated');
			
			if (duplElem) {
				duplElem.innerHTML = '';
			}
		},
		
		init: function (addBtnSelector, removeBtnSelector) {
			document.addEventListener('click', (e) => {
				var addBtnElem = e.target.closest(addBtnSelector),
				removeBtnElem = e.target.closest(removeBtnSelector);
				
				if (addBtnElem) {
					this.add(addBtnElem);
				} else if (removeBtnElem) {
					this.remove(removeBtnElem);
				}
			});
		}
	};
	
	// set tabindex
	/*function SetTabindex(elementsStr) {
		var elements = document.querySelectorAll(elementsStr);
		
		for (let i = 0; i < elements.length; i++) {
			var elem = elements[i];
			
			if (!elem.elementIsHidden()) {
				elem.setAttribute('tabindex', i + 1);
			}
		}
	}*/
	
	// init scripts
	document.addEventListener('DOMContentLoaded', function () {
		BindLabels('input[type="text"], input[type="checkbox"], input[type="radio"]');
		// SetTabindex('input[type="text"], input[type="password"], textarea');
		varHeightTextarea.init();
		NextFieldset.init('.js-next-fieldset-btn', '.js-prev-fieldset-btn');
		DuplicateForm.init('.js-dupicate-form-btn', '.js-remove-dupicated-form-btn');
	});
})();
//# sourceMappingURL=script.js.map
