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
					<p class="modal-card-title">New Vehicle</p>
				</header>
				<section class="modal-card-body">
					<field
						name="name"
						:errors="errors"
					>
						<b-input
							type="name"
							v-model="name"
							placeholder="Name"
							required
							v-focus
							size="is-medium"
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
	name: 'VehiclesCreate',

	components: {
		field
	},

	data() {
		return {
			isVisible: true,
			name: ''
		};
	},

	computed: {
		base() {
			return this.$store.state.vehicleCreate;
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
				name
			} = this;

			this.$store.dispatch('vehicleCreate', {
				name
			});
		}
	},

	beforeUnmount() {
		this.$store.dispatch('clearVehicleCreate');
	}
};
</script>
