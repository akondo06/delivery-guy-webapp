<template>
	<div id="login">
		<div class="login-box">
			<form
				@submit.prevent="doSubmit"
				action=""
				method="post"
			>
				<field
					name="firstName"
					:errors="errors"
				>
					<b-input
						type="firstName"
						v-model="firstName"
						placeholder="First name"
						required
						size="is-medium"
						autocomplete="given-name"
						rounded
						:disabled="isLoading"
					/>
				</field>
				<field
					name="lastName"
					:errors="errors"
				>
					<b-input
						type="lastName"
						v-model="lastName"
						placeholder="Last name"
						required
						size="is-medium"
						autocomplete="family-name"
						rounded
						:disabled="isLoading"
					/>
				</field>
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
				<field
					name="passwordConfirm"
					:errors="errors"
				>
					<b-input
						type="password"
						v-model="passwordConfirm"
						password-reveal
						placeholder="Your password (confirm)"
						required
						size="is-medium"
						autocomplete="current-password"
						rounded
						:disabled="isLoading"
					/>
				</field>

				<field
					name="organizationName"
					:errors="errors"
				>
					<b-input
						type="organizationName"
						v-model="organizationName"
						placeholder="First name"
						required
						size="is-medium"
						autocomplete="organization"
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
					Sign Up
				</b-button>
			</form>
			<br />
			<nav class="level">
				<div class="level-item has-text-centered">
					<div>
						<router-link to="/sign-in">
							Sign In?
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
	name: 'SignUp',

	components: {
		field
	},

	data() {
		return {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			passwordConfirm: '',
			organizationName: ''
		};
	},

	computed: {
		base() {
			return this.$store.state.signUp;
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
				firstName,
				lastName,
				email,
				password,
				passwordConfirm,
				organizationName
			} = this;

			this.$store.dispatch('signUp', { firstName, lastName, email, password, passwordConfirm, organizationName });
		}
	}
};
</script>
