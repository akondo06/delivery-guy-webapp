import Vue from 'vue';

import Buefy from 'buefy';

import App from './App.vue';
import router from './router';
import store from './store';

import api from './api';

import './directives/focus';
import './directives/window-scroll';

import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(Buefy);

router.beforeEach((to, from, next) => {
	const isLoggedIn = store.getters.isLoggedIn;
	if(to.matched.some((record) => record.meta.requiresAuth)) {
		if(!isLoggedIn) {
			next({
				name: 'signin',
				query: { redirect: to.fullPath }
			});
		} else {
			next();
		}
	} else if((to.name === 'signin') && isLoggedIn) {
		next({ name: 'auth' });
	} else {
		next();
	}
});

store.dispatch('bootUp').then(() => {
	document.querySelector('html').classList.remove('is-starting-up');

	new Vue({
		router,
		store,
		render: (h) => h(App)
	}).$mount('#app');
});

// Vue.config.errorHandler = function(err, vm, info) {
// 	console.log('Vue.config.errorHandler');
// 	// err: error trace
// 	// vm: component in which error occured
// 	// info: Vue specific error information such as lifecycle hooks, events etc.

// 	// TODO: Perform any custom logic or log to server
// };

// window.onerror = function(message, source, lineno, colno, error) {
// 	console.log('onerror');
// 	// TODO: write any custom logic or logs the error
// };

// window.addEventListener('unhandledrejection', (event) => {
// 	console.log('unhandledrejection');

// 	// console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
// });

api.addResponseInterceptor((response) => response, (error) => {
	if(error.response && error.response.status === 401) {
		store.dispatch('signOut');
	}
	return Promise.reject(error);
});
