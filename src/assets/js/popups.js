// Popups
export default function initPopups() {
	const body = document.querySelector('body');
	const popups = document.querySelectorAll('.js-popup');
	const popupTriggers = document.querySelectorAll('.js-popup-trigger');
	const popupCloses = document.querySelectorAll('.js-popup-close');

	// Add polyfill for closest  
	function closest() {
		if (!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.msMatchesSelector || 
										Element.prototype.webkitMatchesSelector;
		}

		if (!Element.prototype.closest) {
			Element.prototype.closest = function(s) {
				let el = this;

				do {
					if (el.matches(s)) return el;
					el = el.parentElement || el.parentNode;
				} while (el !== null && el.nodeType === 1);

				return null;
			};
		}
	}

	closest();

	function toggleScroll() {
		let cachedScrollPos;

		if (body.classList.contains('freeze')) {
			body.classList.remove('freeze'); 
			body.style.top = 'auto';
			window.scrollTo(0, cachedScrollPos);
		} else {
			cachedScrollPos = window.pageYOffset;
			body.classList.add('freeze');
			body.style.top = -cachedScrollPos + 'px';
		}
	}

	function determineTarget(popupTrigger) {
		let target;

		if (popupTrigger.getAttribute('data-target')) {
			target = popupTrigger.getAttribute('data-target');
			console.log('targetting popup by data-target: ' + target);
			console.log(target);

			return target;
		} else if (popupTrigger.getAttribute('href')) {
			target = popupTrigger.getAttribute('href');
			console.log('targetting popup by href: ' + target);
			console.log(target);
			
			return target;
		}
	}

	function closePopups() {
		for (let i = 0; i < popups.length; i++) {
			const popup = popups[i];

			if (popup.classList.contains('active')) {
				popup.classList.remove('active');
			}
		}

		if (body.classList.contains('popup-open')) {
			toggleScroll();
			body.classList.remove('popup-open'); 
		}
	}

	function openPopup(popupTrigger, popup) {
		if (!popup.classList.contains('active')) {
			popup.classList.add('active');
		}

		if (!body.classList.contains('popup-open')) {
			toggleScroll();
			body.classList.add('popup-open');
		}
	}

	function togglePopup(popupTrigger) {
		const target = determineTarget(popupTrigger);
		const popup = document.querySelector(target);

		if (!popup.classList.contains('active')) {
			closePopups();
			openPopup(popupTrigger, popup);
		} else {
			closePopups();
		}
	}

	for (let i = 0; i < popupTriggers.length; i++) {
		const popupTrigger = popupTriggers[i];

		popupTrigger.addEventListener('click', function() {
			event.preventDefault();
			togglePopup(popupTrigger);
		});
	}

	for (let i = 0; i < popupCloses.length; i++) {
		const popupClose = popupCloses[i];

		popupClose.addEventListener('click', function() {
			event.preventDefault();
			closePopups();
		});
	}
}
