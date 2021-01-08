<template>
	<div :class="{ 'main-menu': true, 'with-cover': withCover }" v-window-scroll="handleScroll">
		<div class="company">
			<div class="logo" v-if="company.logoUrl">
				<img :src="company.logoUrl" alt="" />
			</div>
			<div class="name">
				{{company.name}}
			</div>
		</div>
		<ul class="nav-items">
			<router-link
				:to="item.to"
				v-slot="{ href, route, navigate, isActive, isExactActive }"
				v-for="item in items"
				:key="item.label"
			>
				<li :class="['nav-item', isActive && 'is-active', isExactActive && 'is-active-exact']">
					<a :href="href" @click="navigate">
						<span class="icon">
							<TruckIcon v-if="item.truckIcon" />
							<UserIcon v-if="item.userIcon" />
						</span>
						<span>
							{{item.label}}
						</span>
					</a>
				</li>
			</router-link>

		</ul>
	</div>
</template>

<script>
import TruckIcon from '@/components/icons/Truck.vue';
import UserIcon from '@/components/icons/User.vue';

export default {
	name: 'MainMenu',

	components: {
		TruckIcon,
		UserIcon
	},

	data() {
		return {
			scrollY: window.scrollY
		};
	},

	computed: {
		account() {
			return this.$store.state.account.data;
		},
		company() {
			return this.account && this.account.company;
		},
		items() {
			return [
				{
					to: { name: 'vehicles' },
					label: 'Vehicles',
					truckIcon: true
				},
				{
					to: { name: 'account' },
					label: 'Account',
					userIcon: true
				}
			];
		},
		withCover() {
			return this.scrollY > 25;
		}
	},

	methods: {
		handleScroll() {
			this.scrollY = window.scrollY;
		}
	}
};
</script>
