<template>
	<div id="login">
		<div class="login-box">
			<form action="">
				<b-field>
					<b-input
						type="email"
						:value="email"
						placeholder="Your email"
						required
						size="is-medium"
						autocomplete="username email"
						rounded>
					</b-input>
				</b-field>

				<button class="button is-block is-fullwidth is-primary is-medium is-rounded" type="submit">
					Send me
				</button>
			</form>
			<br>
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
export default {
	name: 'TroubleSiginingIn',

	data() {
		return {
			email: ''
		};
	}
};
</script>
