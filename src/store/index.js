import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null,
		orders: null,

		isNavBarVisible: true,

		isAsideVisible: true,
		isAsideMobileExpanded: false
	},
	mutations: {
		basic(state, payload) {
			state[payload.key] = payload.value;
		},
		user(state, payload) {
			state.user = payload;
		},
		orders(state, payload) {
			state.orders = payload;
		},
		asideMobileStateToggle(state, payload = null) {
			const htmlClassName = 'has-aside-mobile-expanded';

			const isShow = payload !== null ? payload : !state.isAsideMobileExpanded;

			if(isShow) {
				document.documentElement.classList.add(htmlClassName);
			} else {
				document.documentElement.classList.remove(htmlClassName);
			}

			state.isAsideMobileExpanded = isShow;
		}
	},
	actions: {
	},
	modules: {
	}
});
