import initPopups from './popups.js';

;(function(window, document, $) {
	$('.test-popup-link-1').magnificPopup({
		type: 'image'
	});
})(window, document, window.jQuery);



;(function() {
	window.addEventListener('load', function() {
		initPopups();
	});
})();