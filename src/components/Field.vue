<template>
	<b-field
		:type="type"
		:message="message"
	>
		<slot></slot>
	</b-field>
</template>

<script>
export default {
	name: 'Field',

	props: {
		name: {
			type: String
		},
		errors: {
			type: [Object, Error]
		}
	},

	computed: {
		message() {
			let errors = this.errors;
			if(errors && errors instanceof Error && errors.response) {
				errors = errors.response.data;
			}

			if(!errors) {
				return;
			}

			if(!Array.isArray(errors[this.name])) {
				return;
			}

			return errors[this.name][0];
		},
		type() {
			return this.message ? 'is-danger' : undefined;
		}
	}
};
</script>
