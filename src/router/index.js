import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';

Vue.use(VueRouter);

// route level code-splitting
// this generates a separate chunk (orders.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () => import(/* webpackChunkName: "orders" */ '../views/Orders.vue')

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/orders',
		name: 'orders',
		component: () => import(/* webpackChunkName: "orders" */ '../views/Orders.vue')
	},
	{
		path: '/routes',
		name: 'routes',
		component: () => import(/* webpackChunkName: "routes" */ '../views/Routes.vue')
	},
	{
		path: '/settings',
		name: 'settings',
		component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue')
	}
];

const router = new VueRouter({
	routes,

	linkActiveClass: 'is-active',
	linkExactActiveClass: 'is-active-exact'
});

export default router;
