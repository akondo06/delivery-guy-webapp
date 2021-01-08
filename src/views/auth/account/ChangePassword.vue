<template>
	<b-modal
		:active.sync="isVisible"
		:width="640"
		trap-focus
		can-cancel
		has-modal-card
		class="dialog"
	>
		<form
			@submit.prevent="doSubmit"
			action=""
		>
			<div class="modal-card" style="width: auto">
				<header class="modal-card-head">
					<p class="modal-card-title">Change Password</p>
				</header>
				<section class="modal-card-body">
					<input
						type="text"
						name="email"
						:value="account.email"
						autocomplete="username email"
						class="is-hidden"
					/>
					<field
						name="currentPassword"
						:errors="errors"
					>
						<b-input
							type="password"
							v-model="currentPassword"
							password-reveal
							placeholder="Current password"
							required
							v-focus
							size="is-medium"
							autocomplete="current-password"
							:disabled="isLoading"
						/>
					</field>
					<field
						name="newPassword"
						:errors="errors"
					>
						<b-input
							type="password"
							v-model="newPassword"
							password-reveal
							placeholder="New password"
							required
							size="is-medium"
							autocomplete="new-password"
							:disabled="isLoading"
						/>
					</field>
					<field
						name="newPasswordConfirm"
						:errors="errors"
					>
						<b-input
							type="password"
							v-model="newPasswordConfirm"
							password-reveal
							placeholder="Confirm new password"
							required
							size="is-medium"
							autocomplete="new-password"
							:disabled="isLoading"
						/>
					</field>
				</section>
				<footer class="modal-card-foot">
					<b-button
						:disabled="isLoading"
						@click="getOut"
					>
						Cancel
					</b-button>
					<b-button
						native-type="submit"
						type="is-primary"
						:loading="isLoading"
						:disabled="isLoading"
					>
						Submit
					</b-button>
				</footer>
			</div>
		</form>
	</b-modal>
</template>

<script>
import field from '@/components/Field.vue';

export default {
	name: 'AccountChangePassword',

	components: {
		field
	},

	data() {
		return {
			isVisible: true,
			currentPassword: '',
			newPassword: '',
			newPasswordConfirm: ''
		};
	},

	computed: {
		account() {
			return this.$store.state.account.data;
		},
		base() {
			return this.$store.state.accountUpdate;
		},
		data() {
			return this.base.data;
		},
		isLoading() {
			return this.base.inProgress;
		},
		errors() {
			return this.base.error;
		}
	},

	watch: {
		isVisible(value) {
			if(value) {
				return;
			}
			// this.getOut();
			this.$router.go(-1);
		},
		data() {
			this.getOut();
		}
	},

	methods: {
		getOut() {
			this.isVisible = false;
		},
		doSubmit(event) {
			if(this.isLoading) {
				return;
			}

			const {
				currentPassword,
				newPassword,
				newPasswordConfirm
			} = this;

			this.$store.dispatch('accountUpdate', {
				id: this.account.id,
				currentPassword,
				newPassword,
				newPasswordConfirm
			});
		}
	}
};
</script>
