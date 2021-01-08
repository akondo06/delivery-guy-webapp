<template>
	<span :title="title">
		{{message}}
	</span>
</template>

<script>
import moment from 'moment';

export default {
	name: 'Since',

	props: {
		date: {
			type: [String, Date]
		}
	},

	computed: {
		title() {
			return moment.utc(this.date).local().format('MMMM Do YYYY, h:mm:ss a');
		},
		message() {
			return moment.utc(this.date).local().from();
		}
	}
};
</script>
