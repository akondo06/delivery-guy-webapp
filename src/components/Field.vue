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
			type: Object
		}
	},

	computed: {
		message() {
			return this.errors && Array.isArray(this.errors[this.name]) && this.errors[this.name][0];
		},
		type() {
			return this.message ? 'is-danger' : undefined;
		}
	}
};
</script>
