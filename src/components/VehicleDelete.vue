<template>
	<div>
		<b-tooltip type="is-dark" label="Delete Vehicle">
			<a href="#" @click.prevent="confirm">
				<span class="icon is-medium has-text-danger">
					<TrashIcon />
				</span>
			</a>
		</b-tooltip>
		<div v-if="error">{{error.message}}</div>
	</div>
</template>

<script>
import TrashIcon from '@/components/icons/Trash.vue';

export default {
	name: 'VehicleDelete',

	components: {
		TrashIcon
	},

	props: {
		vehicle: {
			type: Object
		}
	},

	computed: {
		base() {
			return this.$store.state.vehicleDelete;
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

	methods: {
		doIt() {
			this.$store.dispatch('vehicleDelete', this.vehicle);
		},
		confirm() {
			this.$buefy.dialog.confirm({
				type: 'is-danger',
				title: 'Delete Vehicle',
				message: 'Sure you want it deleted?<br />It cannot be undone.',
				confirmText: 'Delete',
				onConfirm: () => this.doIt()
			});
		}
	}
};
</script>
