<template>
	<div id="app">
		<aside-menu :menu="menu" />
		<router-view />
	</div>
</template>

<script>
import AsideMenu from '@/components/AsideMenu';

export default {
	name: 'App',
	components: {
		AsideMenu
	},
	computed: {
		menu() {
			return [
				{
					to: '/',
					icon: 'desktop-mac',
					label: 'Dashboard',
					exact: true
				},
				{
					to: '/orders',
					label: 'Orders',
					icon: 'table',
					updateMark: true
				},
				{
					to: '/routes',
					label: 'Routes',
					icon: 'square-edit-outline'
				},
				{
					to: '/settings',
					label: 'Settings',
					icon: 'settings'
				}
				// {
				// 	to: '/profile',
				// 	label: 'Profile',
				// 	icon: 'account-circle'
				// },
				// {
				// 	href: 'https://justboil.me/bulma-admin-template/two',
				// 	label: 'About',
				// 	icon: 'help-circle'
				// },
				// {
				// 	label: 'Submenus',
				// 	subLabel: 'Submenus Example',
				// 	icon: 'view-list',
				// 	menu: [
				// 		{
				// 			href: '#void',
				// 			label: 'Sub-item One'
				// 		},
				// 		{
				// 			href: '#void',
				// 			label: 'Sub-item Two'
				// 		}
				// 	]
				// }
			];
		}
	},
	created() {
		this.$store.commit('user', {
			name: 'John Doe',
			email: 'john@example.com',
			avatar: 'avatars/akondo.jpg'
		});

		this.$store.commit('orders', new Array(300));
	}
};
</script>

<style lang="scss">
	@import 'styles/app.scss';
</style>
