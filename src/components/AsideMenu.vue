<template>
	<aside v-show="isAsideVisible" class="aside is-placed-left is-expanded">
		<div class="image is-user-avatar has-max-width is-aligned-cente">
			<a href="#">
				<img :src="user.avatar" :alt="user.name" />
			</a>
		</div>
		<div class="menu is-menu-main">
			<aside-menu-list @menu-click="menuClick" :menu="menu" />
		</div>

		<a class="aside-toggle is-hidden-desktop" @click.prevent="toggleAside">
			<b-icon :icon="toggleAsideIcon" />
		</a>
	</aside>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'AsideMenu',
	props: {
		menu: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		...mapState([
			'isAsideVisible',
			'isAsideMobileExpanded',
			'user'
		]),
		toggleAsideIcon() {
			return this.isAsideMobileExpanded ? 'backburger' : 'forwardburger';
		}
	},
	methods: {
		toggleAside() {
			this.$store.commit('asideMobileStateToggle');
		},
		menuClick(item) {
			//
		}
	}
};
</script>
