import Vue from 'vue';
import VueRouter from 'vue-router';

import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import TroubleSigningIn from '../views/TroubleSigningIn.vue';
import NotFound from '../views/NotFound.vue';
import Auth from '../views/Auth.vue';

Vue.use(VueRouter);

// route level code-splitting
// this generates a separate chunk (vehicles.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () => import(/* webpackChunkName: "vehicles" */ '../views/Vehicles.vue')

const routes = [
	{
		path: '/',
		name: 'auth',
		redirect: {
			name: 'vehicles'
		},
		meta: {
			requiresAuth: true
		},
		component: Auth,
		children: [
			{
				path: '/vehicles',
				name: 'vehicles',
				component: () => import(/* webpackChunkName: "vehicles" */ '../views/auth/Vehicles.vue'),
				children: [
					{
						path: 'create',
						name: 'vehicles.create',
						component: () => import(/* webpackChunkName: "vehiclesCreate" */ '../views/auth/vehicles/Create.vue')
					},
					{
						path: 'edit/:id',
						name: 'vehicles.edit',
						component: () => import(/* webpackChunkName: "vehiclesEdit" */ '../views/auth/vehicles/Edit.vue')
					},
					{
						path: ':id',
						name: 'vehicles.detail',
						component: () => import(/* webpackChunkName: "vehiclesDetail" */ '../views/auth/vehicles/Detail.vue')
					}
				]
			},
			{
				path: '/account',
				name: 'account',
				component: () => import(/* webpackChunkName: "account" */ '../views/auth/Account.vue'),
				children: [
					{
						path: 'change_details',
						name: 'account.change_details',
						component: () => import(/* webpackChunkName: "accountChangeDetails" */ '../views/auth/account/ChangeDetails.vue')
					},
					{
						path: 'change_password',
						name: 'account.change_password',
						component: () => import(/* webpackChunkName: "accountChangePassword" */ '../views/auth/account/ChangePassword.vue')
					}
				]
			}
		]
	},
	{
		path: '/sign-in',
		name: 'signin',
		component: SignIn
	},
	{
		path: '/sign-up',
		name: 'signup',
		component: SignUp
	},
	{
		path: '/trouble-signing-in',
		name: 'trouble-signing-in',
		component: TroubleSigningIn
	},
	{
		path: '/:pathMatch(.*)*',
		component: NotFound
	}
];

const router = new VueRouter({
	routes,

	linkActiveClass: 'is-active',
	linkExactActiveClass: 'is-active-exact'
});

export default router;
