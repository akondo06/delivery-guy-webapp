import Vue from 'vue';

import Buefy from 'buefy';

import App from './App.vue';
import router from './router';
import store from './store';

import './directives/focus';

import './registerServiceWorker';

import AsideMenuList from '@/components/AsideMenuList';

router.afterEach(() => {
	store.commit('asideMobileStateToggle', false);
});

Vue.config.productionTip = false;

Vue.component('AsideMenuList', AsideMenuList);

Vue.use(Buefy);

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
