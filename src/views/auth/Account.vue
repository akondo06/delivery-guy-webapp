<template>
	<div class="account">
		<div class="container-awesome">
			<div v-if="isLoading">
				<div class="loader is-large"></div>
			</div>

			<div v-if="error">
				<div>{{error.message}}</div>
			</div>

			<div class="box">
				<h2 class="title">
					{{data.firstName}} {{data.lastName}}
				</h2>
				<p class="subtitle">
					{{data.organization.name}} <br />
					{{data.email}}
				</p>
			</div>

			<div class="box">
				<ul>
					<li>
						<router-link
							:to="{ name: 'account.change_details' }"
						>
							<span class="icon">
								<UserIcon />
							</span>
							<span>Change Details</span>
						</router-link>
					</li>
					<li>
						<router-link
							:to="{ name: 'account.change_password' }"
						>
							<span class="icon">
								<LockIcon />
							</span>
							<span>Change Password</span>
						</router-link>
					</li>
					<li>
						<a href="#" @click.prevent="doDelete">
							<span class="icon">
								<TrashIcon />
							</span>
							<span>Delete Account</span>
						</a>
					</li>
					<li>
						<a href="#" @click.prevent="doSignOut">
							<span class="icon">
								<LogoutIcon />
							</span>
							<span>Sign Out</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<router-view />
	</div>
</template>

<script>
import UserIcon from '@/components/icons/User.vue';
import LockIcon from '@/components/icons/Lock.vue';
import TrashIcon from '@/components/icons/Trash.vue';
import LogoutIcon from '@/components/icons/Logout.vue';

export default {
	components: {
		UserIcon,
		LockIcon,
		TrashIcon,
		LogoutIcon
	},

	computed: {
		base() {
			return this.$store.state.account;
		},
		data() {
			return this.base.data;
		},
		isLoading() {
			return this.base.inProgress;
		},
		error() {
			return this.base.error;
		}
	},

	watch: {
		vehicleDelete() {
			this.doLoad();
		}
	},

	methods: {
		doLoad() {
			this.$store.dispatch('account', { id: 'me' });
		},
		doDelete() {
			this.$buefy.dialog.confirm({
				title: 'Deleting account',
				message: 'Are you sure you want to <b>delete</b> your account? This action cannot be undone.',
				confirmText: 'Delete Account',
				type: 'is-danger',
				onConfirm: () => this.doDeleteConfirm()
			});
		},
		doDeleteConfirm() {
			// this.$buefy.toast.open('Account deleted!');
			this.$store.dispatch('accountDelete', { id: this.data.id });
		},
		doSignOut() {
			this.$buefy.dialog.confirm({
				title: 'Signing out',
				message: 'Are you sure you want to <b>sign out</b> from your account?',
				confirmText: 'Sign Out',
				type: 'is-danger',
				onConfirm: () => this.doSignOutConfirm()
			});
		},
		doSignOutConfirm() {
			this.$store.dispatch('signOut', { id: this.data.id });
		}
	},

	mounted() {
		this.doLoad();
	}
};
</script>
