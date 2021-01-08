<template>
	<div id="login">
		<div class="login-box">
			<form
				@submit.prevent="doSubmit"
				action=""
				method="post"
			>
				<field
					name="email"
					:errors="errors"
				>
					<b-input
						type="email"
						v-model="email"
						placeholder="Your email"
						required
						size="is-medium"
						autocomplete="username email"
						rounded
						:disabled="isLoading"
					/>
				</field>
				<field
					name="password"
					:errors="errors"
				>
					<b-input
						type="password"
						v-model="password"
						password-reveal
						placeholder="Your password"
						required
						size="is-medium"
						autocomplete="current-password"
						rounded
						:disabled="isLoading"
					/>
				</field>

				<b-button
					native-type="submit"
					type="is-primary"
					size="is-medium"
					:loading="isLoading"
					:disabled="isLoading"
					expanded
					rounded
				>
					Sign In
				</b-button>
			</form>
			<br>
			<nav class="level">
				<div class="level-item has-text-centered">
					<div>
						<router-link to="/trouble-signing-in">
							Trouble Sigining In?
						</router-link>
					</div>
				</div>
				<div class="level-item has-text-centered">
					<div>
						<router-link to="/sign-up">
							Create an Account
						</router-link>
					</div>
				</div>
			</nav>
		</div>
	</div>
</template>

<script>
import field from '@/components/Field.vue';

export default {
	name: 'SignIn',

	components: {
		field
	},

	data() {
		return {
			email: '',
			password: ''
		};
	},

	computed: {
		base() {
			return this.$store.state.signIn;
		},
		isLoading() {
			return this.base.inProgress;
		},
		errors() {
			return this.base.error;
		}
	},

	methods: {
		doSubmit(event) {
			if(this.isLoading) {
				return;
			}

			const {
				email,
				password
			} = this;

			this.$store.dispatch('signIn', { email, password });
		}
	}
};
</script>
