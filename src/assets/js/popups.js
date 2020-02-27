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

	function openPopup(popup) {
		if (hasOpenPopup()) {
			return;
		}

		popup.classList.add('active');
		body.classList.add('popup-open');
		disableBodyScroll();
	}

	for (let i = 0; i < popupTriggers.length; i++) {
		const popupTrigger = popupTriggers[i];
		const target = popupTrigger.getAttribute('data-target');
		const popup = document.querySelector(target);
		

		popupTrigger.addEventListener('click', function() {
			event.preventDefault();

			if (!popup) {
				return;
			} 

			if (!popup.classList.contains('active')) {
				closeAllPopups();
				openPopup(popup);
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
