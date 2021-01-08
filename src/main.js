import Vue from 'vue';

import Buefy from 'buefy';

import App from './App.vue';
import router from './router';
import store from './store';

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
