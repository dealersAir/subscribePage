// global variables
;var browser, elemIsHidden, ajax, animate;

(function () {
	"use strict";

	// Get useragent

	document.documentElement.setAttribute('data-useragent', navigator.userAgent.toLowerCase());

	// Browser identify
	browser = function (userAgent) {
		userAgent = userAgent.toLowerCase();

		if (/(msie|rv:11\.0)/.test(userAgent)) {
			return 'ie';
		}
	}(navigator.userAgent);

	// Add support CustomEvent constructor for IE
	try {
		new CustomEvent("IE has CustomEvent, but doesn't support constructor");
	} catch (e) {
		window.CustomEvent = function (event, params) {
			var evt;

			params = params || {
				bubbles: false,
				cancelable: false,
				detail: undefined
			};

			evt = document.createEvent("CustomEvent");

			evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

			return evt;
		};

		CustomEvent.prototype = Object.create(window.Event.prototype);
	}

	// Window Resized Event
	var winResizedEvent = new CustomEvent('winResized'),
	    rsz = true;

	window.addEventListener('resize', function () {
		if (rsz) {
			rsz = false;

			setTimeout(function () {
				window.dispatchEvent(winResizedEvent);
				rsz = true;
			}, 1021);
		}
	});

	// Closest polyfill
	if (!Element.prototype.closest) {
		(function (ElProto) {
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
	elemIsHidden = function elemIsHidden(elem) {
		while (elem) {
			if (!elem) break;

			var compStyle = getComputedStyle(elem);

			if (compStyle.display == 'none' || compStyle.visibility == 'hidden' || compStyle.opacity == '0') return true;

			elem = elem.parentElement;
		}

		return false;
	};

	// Ajax
	ajax = function ajax(options) {
		var xhr = new XMLHttpRequest();

		xhr.open('POST', options.url);

		if (typeof options.send == 'string') {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}

		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				options.success(xhr.response);
			} else if (xhr.readyState == 4 && xhr.status != 200) {
				options.error(xhr.response);
			}
		};

		xhr.send(options.send);
	};

	/*
 Animation
 animate(function(takes 0...1) {}, Int duration in ms[, Str easing[, Fun animation complete]]);
 */
	animate = function animate(draw, duration, ease, complete) {
		var start = performance.now();

		requestAnimationFrame(function anim(time) {
			var timeFraction = (time - start) / duration;

			if (timeFraction > 1) {
				timeFraction = 1;
			}

			var progress = ease ? easing(timeFraction, ease) : timeFraction;

			draw(progress);

			if (timeFraction < 1) {
				requestAnimationFrame(anim);
			} else {
				if (complete != undefined) {
					complete();
				}
			}
		});
	};

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
		return Math.pow(timeFraction, 2);
	}
})();
var Popup;

(function () {
	"use strict";

	// popup core

	Popup = {
		winScrollTop: 0,
		onClose: null,
		headerSelector: '.header',

		fixBody: function fixBody(st) {
			var headerElem = document.querySelector(this.headerSelector);

			if (st && !document.body.classList.contains('popup-is-opened')) {
				this.winScrollTop = window.pageYOffset;

				var offset = window.innerWidth - document.documentElement.clientWidth;

				document.body.classList.add('popup-is-opened');

				if (headerElem) {
					headerElem.style.right = offset + 'px';
				}

				document.body.style.right = offset + 'px';

				document.body.style.top = -this.winScrollTop + 'px';
			} else if (!st) {
				if (headerElem) {
					headerElem.style.right = '';
				}

				document.body.classList.remove('popup-is-opened');

				window.scrollTo(0, this.winScrollTop);
			}
		},

		open: function open(elementStr, callback) {
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

		message: function message(elementStr, msg, callback) {
			var elem = this.open(elementStr, callback);

			elem.querySelector('.popup__inner').innerHTML = '<div class="popup__message">' + msg + '</div>';
		},

		close: function close() {
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

		init: function init(elementStr) {
			var _this = this;

			document.addEventListener('click', function (e) {
				var element = e.target.closest(elementStr),
				    closeElem = e.target.closest('.js-popup-close');

				if (element) {
					e.preventDefault();

					_this.open(element.getAttribute('data-popup'));
				} else if (closeElem || !e.target.closest('.popup__window') && e.target.closest('.popup')) {
					_this.fixBody(false);

					_this.close();
				}
			});

			if (window.location.hash) {
				this.open(window.location.hash);
			}
		}
	};
})();
;var Placeholder;

(function () {
	'use strict';

	Placeholder = {
		init: function init(elementsStr) {
			var _this = this;

			var elements = document.querySelectorAll(elementsStr);

			if (!elements.length) return;

			for (var i = 0; i < elements.length; i++) {
				var elem = elements[i];

				if (elem.placeholder) {

					var elemFor = elem.id ? elem.id : 'placeholder-index-' + i,
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
			document.addEventListener('focus', function (e) {
				var elem = e.target.closest(elementsStr);

				if (elem) {
					_this.hide(elem, true);
				}
			}, true);

			document.addEventListener('blur', function (e) {
				var elem = e.target.closest(elementsStr);

				if (elem) {
					_this.hide(elem, false);
				}
			}, true);
		},

		hide: function hide(elem, _hide) {
			var label = document.querySelector('label.placeholder[for="' + elem.id + '"]');

			if (!label) {
				return;
			}

			var lSt = label.style;

			if (_hide) {

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
	document.addEventListener('DOMContentLoaded', function () {
		Placeholder.init('input[type="text"], input[type="password"], textarea');
	});
})();
var ValidateForm, Form;

(function () {
	'use strict';

	// validate form

	ValidateForm = {
		input: null,

		errorTip: function errorTip(err, errInd, errorTxt) {
			var field = this.input.closest('.form__field') || this.input.parentElement,
			    errTip = field.querySelector('.field-error-tip');

			if (err) {
				field.classList.remove('field-success');
				field.classList.add('field-error');

				if (!errTip) return;

				if (errInd) {
					if (!errTip.hasAttribute('data-error-text')) {
						errTip.setAttribute('data-error-text', errTip.innerHTML);
					}
					errTip.innerHTML = errInd != 'custom' ? errTip.getAttribute('data-error-text-' + errInd) : errorTxt;
				} else if (errTip.hasAttribute('data-error-text')) {
					errTip.innerHTML = errTip.getAttribute('data-error-text');
				}
			} else {
				field.classList.remove('field-error');
				field.classList.add('field-success');
			}
		},

		customErrorTip: function customErrorTip(input, errorTxt) {
			if (!input) return;

			this.input = input;

			this.errorTip(true, 'custom', errorTxt);
		},

		txt: function txt() {
			var err = false;

			if (!/^[0-9a-zа-яё_,.:;@-\s]*$/i.test(this.input.value)) {
				this.errorTip(true, 2);
				err = true;
			} else {
				this.errorTip(false);
			}

			return err;
		},

		num: function num() {
			var err = false;

			if (!/^[0-9.,-]*$/.test(this.input.value)) {
				this.errorTip(true, 2);
				err = true;
			} else {
				this.errorTip(false);
			}

			return err;
		},

		name: function name() {
			var err = false;

			if (!/^[a-zа-яё'-]{3,21}(\s[a-zа-яё'-]{3,21})?(\s[a-zа-яё'-]{3,21})?$/i.test(this.input.value)) {
				this.errorTip(true, 2);
				err = true;
			} else {
				this.errorTip(false);
			}

			return err;
		},

		date: function date() {
			var err = false,
			    errDate = false,
			    matches = this.input.value.match(/^(\d{2}).(\d{2}).(\d{4})$/);

			if (!matches) {
				errDate = 1;
			} else {
				var compDate = new Date(matches[3], matches[2] - 1, matches[1]),
				    curDate = new Date();

				if (this.input.hasAttribute('data-min-years-passed')) {
					var interval = curDate.valueOf() - new Date(curDate.getFullYear() - +this.input.getAttribute('data-min-years-passed'), curDate.getMonth(), curDate.getDate()).valueOf();

					if (curDate.valueOf() < compDate.valueOf() || curDate.getFullYear() - matches[3] > 100) {
						errDate = 1;
					} else if (curDate.valueOf() - compDate.valueOf() < interval) {
						errDate = 2;
					}
				}

				if (compDate.getFullYear() != matches[3] || compDate.getMonth() != matches[2] - 1 || compDate.getDate() != matches[1]) {
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

		email: function email() {
			var err = false;

			if (!/^[a-z0-9]+[\w\-\.]*@[\w\-]{2,}\.[a-z]{2,6}$/i.test(this.input.value)) {
				this.errorTip(true, 2);
				err = true;
			} else {
				this.errorTip(false);
			}

			return err;
		},

		url: function url() {
			var err = false;

			if (!/^(https?\:\/\/)?[a-zа-я0-9\-\.]+\.[a-zа-я]{2,11}$/i.test(this.input.value)) {
				this.errorTip(true, 2);
				err = true;
			} else {
				this.errorTip(false);
			}

			return err;
		},

		tel: function tel() {
			var err = false;

			if (!/^\+7\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/.test(this.input.value)) {
				this.errorTip(true, 2);
				err = true;
			} else {
				this.errorTip(false);
			}

			return err;
		},

		pass: function pass() {
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

		checkbox: function checkbox(elem) {
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

		radio: function radio(elem) {
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

		select: function select(elem) {
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

		file: function file(elem, filesArr) {
			this.input = elem;

			var err = false,
			    errCount = { ext: 0, size: 0 },
			    maxFiles = +this.input.getAttribute('data-max-files'),
			    extRegExp = new RegExp('(?:\\.' + this.input.getAttribute('data-ext').replace(/,/g, '|\\.') + ')$', 'i'),
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

		validateOnInput: function validateOnInput(elem) {
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

		validate: function validate(formElem) {
			var err = 0;

			// text, password, textarea
			var elements = formElem.querySelectorAll('input[type="text"], input[type="password"], textarea');

			for (var i = 0; i < elements.length; i++) {
				var elem = elements[i];

				if (elemIsHidden(elem)) {
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

				if (elemIsHidden(elem.parentElement)) {
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

				if (elemIsHidden(elem)) {
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

			for (var _i = 0; _i < groups.length; _i++) {
				var group = groups[_i],
				    checkedElements = 0;

				if (elemIsHidden(group)) {
					continue;
				}

				group.setAttribute('data-tested', 'true');

				var elements = group.querySelectorAll('input[type="checkbox"]');

				for (var _i2 = 0; _i2 < elements.length; _i2++) {
					if (elements[_i2].checked) {
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

			for (var _i3 = 0; _i3 < groups.length; _i3++) {
				var group = groups[_i3],
				    checkedElement = false;

				if (elemIsHidden(group)) {
					continue;
				}

				group.setAttribute('data-tested', 'true');

				var elements = group.querySelectorAll('input[type="radio"]');

				for (var _i4 = 0; _i4 < elements.length; _i4++) {
					if (elements[_i4].checked) {
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

				if (elemIsHidden(elem)) {
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

				if (elemIsHidden(elem)) {
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

			return err ? false : true;
		},

		init: function init(formSelector) {
			var _this = this;

			document.addEventListener('input', function (e) {
				var elem = e.target.closest(formSelector + ' input[type="text"],' + formSelector + ' input[type="password"],' + formSelector + ' textarea');

				if (elem && elem.hasAttribute('data-tested')) {
					_this.validateOnInput(elem);
				}
			});

			document.addEventListener('change', function (e) {
				var elem = e.target.closest(formSelector + ' input[type="radio"],' + formSelector + ' input[type="checkbox"]');

				if (elem) {
					_this[elem.type](elem);
				}
			});
		}
	};

	// variable height textarea
	var varHeightTextarea = {
		setHeight: function setHeight(elem) {
			var mirror = elem.parentElement.querySelector('.var-height-textarea__mirror'),
			    mirrorOutput = elem.value.replace(/\n/g, '<br>');

			mirror.innerHTML = mirrorOutput + '&nbsp;';
		},

		init: function init() {
			var _this2 = this;

			document.addEventListener('input', function (e) {
				var elem = e.target.closest('.var-height-textarea__textarea');

				if (!elem) {
					return;
				}

				_this2.setHeight(elem);
			});
		}
	};

	// next fieldset
	var NextFieldset = {
		next: function next(btnElem, fwd) {
			var nextFieldset = btnElem.hasAttribute('data-go-to-fieldset') ? document.querySelector(btnElem.getAttribute('data-go-to-fieldset')) : null;

			if (!nextFieldset) return;

			var currentFieldset = btnElem.closest('.fieldset__item'),
			    goTo = fwd ? ValidateForm.validate(currentFieldset) : true;

			if (goTo) {
				currentFieldset.classList.add('fieldset__item_hidden');
				nextFieldset.classList.remove('fieldset__item_hidden');
			}
		},

		init: function init(nextBtnSelector, prevBtnSelector) {
			var _this3 = this;

			document.addEventListener('click', function (e) {
				var nextBtnElem = e.target.closest(nextBtnSelector),
				    prevBtnElem = e.target.closest(prevBtnSelector);

				if (nextBtnElem) {
					_this3.next(nextBtnElem, true);
				} else if (prevBtnElem) {
					_this3.next(prevBtnElem, false);
				}
			});
		}
	};

	// form
	Form = {
		onSubmit: null,

		submit: function submit(e, formElem) {
			formElem.classList.add('form_sending');

			if (!this.onSubmit) {
				formElem.submit();
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

					if (!elemIsHidden(elem)) {
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
			} else {
				formElem.submit();
			}
		},

		init: function init(formSelector) {
			var _this4 = this;

			if (!document.querySelector(formSelector)) return;

			ValidateForm.init(formSelector);

			// submit event
			document.addEventListener('submit', function (e) {
				var formElem = e.target.closest(formSelector);

				if (!formElem) return;

				if (ValidateForm.validate(formElem)) {
					_this4.submit(e, formElem);
				} else {
					e.preventDefault();
				}
			});

			// keyboard event
			document.addEventListener('keydown', function (e) {
				var formElem = e.target.closest(formSelector);

				if (!formElem) return;

				var key = e.which || e.keyCode || 0;

				if (e.ctrlKey && key == 13) {
					e.preventDefault();

					if (ValidateForm.validate(formElem)) {
						_this4.submit(e, formElem);
					}
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
			    forID = elem.hasAttribute('id') ? elem.id : 'keylabel-' + i;

			if (label && !label.hasAttribute('for')) {
				label.htmlFor = forID;
				elem.id = forID;
			}
		}
	}

	// duplicate form
	var DuplicateForm = {
		add: function add(btnElem) {
			var modelElem = btnElem.hasAttribute('data-form-model') ? document.querySelector(btnElem.getAttribute('data-form-model')) : null,
			    destElem = btnElem.hasAttribute('data-duplicated-dest') ? document.querySelector(btnElem.getAttribute('data-duplicated-dest')) : null;

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
						elem.htmlFor += '-' + i + '-' + j;
					}
				}

				for (var j = 0; j < inputElements.length; j++) {
					var elem = inputElements[j];

					if (elem.id != '') {
						elem.id += '-' + i + '-' + j;
					}
				}
			}
		},

		remove: function remove(btnElem) {
			var duplElem = btnElem.closest('.duplicated');

			if (duplElem) {
				duplElem.innerHTML = '';
			}
		},

		init: function init(addBtnSelector, removeBtnSelector) {
			var _this5 = this;

			document.addEventListener('click', function (e) {
				var addBtnElem = e.target.closest(addBtnSelector),
				    removeBtnElem = e.target.closest(removeBtnSelector);

				if (addBtnElem) {
					_this5.add(addBtnElem);
				} else if (removeBtnElem) {
					_this5.remove(removeBtnElem);
				}
			});
		}
	};

	// set tabindex
	/*function SetTabindex(elementsStr) {
 	var elements = document.querySelectorAll(elementsStr);
 	
 	for (let i = 0; i < elements.length; i++) {
 		var elem = elements[i];
 		
 		if (!elemIsHidden(elem)) {
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
/*
new Alert({
	content: 'We use coockie',
	position: 'top', // default - bottom
	showOnce: true // default - false
});
*/

;var Alert;

(function () {
	'use strict';

	var alertIndex = 0;

	Alert = function Alert(opt) {
		opt = opt || {};

		var alertId = 'alert-id-' + alertIndex++;

		if (opt.showOnce) {
			var hiddenAlert = window.localStorage.getItem('notShowAlert=' + alertId);

			if (hiddenAlert !== null && hiddenAlert === 'true') {
				return false;
			}
		}

		//add alert to DOM
		var alertElem = document.createElement('div');

		alertElem.className = 'alert';

		alertElem.id = alertId;

		alertElem.innerHTML = '<div></div><button class="alert-close-btn"></button>';

		document.body.appendChild(alertElem);

		if (opt.position == 'top') {
			alertElem.classList.add('alert_top');
		}

		// set content
		this.setContent = function (content) {
			alertElem.querySelector('div').innerHTML = content;
		};

		if (opt.content) {
			this.setContent(opt.content);
		}

		// hide permanently
		function hidePermanently() {
			window.localStorage.setItem('notShowAlert=' + alertId, 'true');
		}

		// hide
		function hide() {
			alertElem.classList.add('alert_hidden');

			if (opt.showOnce) {
				hidePermanently();
			}
		}

		alertElem.querySelector('.alert-close-btn').addEventListener('click', hide);
	};
})();
//# sourceMappingURL=script.js.map
