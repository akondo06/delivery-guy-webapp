import Vue from 'vue';

Vue.directive('focus', {
	inserted(el) {
		const element = el.querySelector('input,textarea');
		if(element) {
			element.focus();
			return;
		}

		el.focus();
	}
});
