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
					<p class="modal-card-title">Edit Vehicle</p>
				</header>
				<section class="modal-card-body">
					<field
						name="name"
						:errors="errors"
					>
						<b-input
							ref="nameInput"
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
	name: 'VehiclesEdit',

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
		id() {
			return this.$route.params.id;
		},
		base() {
			return this.$store.state.vehicle;
		},
		data() {
			return this.base.data;
		},
		isLoading() {
			return this.base.inProgress;
		},
		errors() {
			return this.base.error;
		},
		baseUpdate() {
			return this.$store.state.vehicleUpdate;
		},
		dataUpdate() {
			return this.baseUpdate.data;
		},
		isLoadingUpdate() {
			return this.base.inProgress;
		},
		errorUpdate() {
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
		id(value) {
			if(!value) {
				return;
			}

			this.load();
		},
		data(value) {
			if(!value) {
				return;
			}
			this.isVisible = true;

			this.initForm();
		},
		dataUpdate(value) {
			if(!value) {
				return;
			}
			this.getOut();
		}
	},

	methods: {
		getOut() {
			this.isVisible = false;
		},
		load() {
			this.$store.dispatch('vehicle', { id: this.$route.params.id });
		},
		initForm() {
			this.name = this.data.name || '';

			const nameInput = this.$refs.nameInput;

			nameInput.focus();

			this.$nextTick(() => {
				nameInput.$el.selectionStart = nameInput.$el.selectionEnd = 10000;
			});
		},
		doSubmit(event) {
			if(this.isLoading || this.isLoadingUpdate) {
				return;
			}

			const {
				name
			} = this;

			this.$store.dispatch('vehicleUpdate', {
				id: this.id,
				name
			});
		}
	},

	mounted() {
		this.load();
	},

	beforeUnmount() {
		this.$store.dispatch('clearVehicle');
		this.$store.dispatch('clearVehicleCreate');
	}
};
</script>
