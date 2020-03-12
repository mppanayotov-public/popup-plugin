// Popups
export default function initPopups() {
	const body = document.querySelector('body');
	const popups = document.querySelectorAll('.js-popup');
	const popupTriggers = document.querySelectorAll('.js-popup-trigger');
	const popupCloses = document.querySelectorAll('.js-popup-close');
	let cachedScrollPos;

	function isBodyScrollDisabled() {
		return body.classList.contains('freeze'); 
	}

	function enableBodyScroll() {
		if (! isBodyScrollDisabled()) {
			return;
		}

		body.classList.remove('freeze'); 
		body.style.top = 'auto';
		window.scrollTo(0, cachedScrollPos);
	}

	function disableBodyScroll() {
		if (isBodyScrollDisabled()) {
			return;
		}

		cachedScrollPos = window.pageYOffset;
		body.style.top = -cachedScrollPos + 'px';
		body.classList.add('freeze');
	}

	function hasOpenPopup() {
		return body.classList.contains('popup-open');		
	}

	function closeAllPopups() {
		if (! hasOpenPopup()) {
			return;
		}

		for (let i = 0; i < popups.length; i++) {
			const popup = popups[i];

			closePopup(popup);
		}

		enableBodyScroll();
	}

	function closePopup(popup) {
		popup.classList.remove('active');
		body.classList.remove('popup-open');
	}

	function openPopup(popup, animation) {
		if (hasOpenPopup()) {
			return;
		}

		const popupEl = new popupInstance(popup, animation);

		popupEl.element.classList.add('active');
		popupEl.isActive = true;
		 if (! animation) {
			animation = "fade";
		}
		popupEl.animation = animation;
		popupEl.element.classList.add(animation);

		body.classList.add('popup-open');
		disableBodyScroll();

		console.log('isActive: ', popupEl.isActive);
		console.log('animation: ', popupEl.animation);
		console.log(popupEl.element);
	}

	function popupInstance(popup, animation) {
		this.element = popup;
		this.isActive = false;
		this.animation = "fade";
	}

	for (let i = 0; i < popupTriggers.length; i++) {
		const popupTrigger = popupTriggers[i];
		const target = popupTrigger.getAttribute('data-target');
		const popup = document.querySelector(target);
		const animation = popupTrigger.getAttribute('data-animation');

		popupTrigger.addEventListener('click', function() {
			event.preventDefault();

			if (!popup) {
				return;
			} 

			if (!popup.classList.contains('active')) {
				closeAllPopups();
				openPopup(popup, animation);
			}
		});
	}

	for (let i = 0; i < popupCloses.length; i++) {
		const popupClose = popupCloses[i];

		popupClose.addEventListener('click', function() {
			event.preventDefault();
			closeAllPopups();
		});
	}
}
