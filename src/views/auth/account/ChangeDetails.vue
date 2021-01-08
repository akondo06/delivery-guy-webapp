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
					<p class="modal-card-title">Change Details</p>
				</header>
				<section class="modal-card-body">
					<field
						name="firstName"
						:errors="errors"
					>
						<b-input
							type="firstName"
							v-model="firstName"
							placeholder="First Name"
							required
							v-focus
							size="is-medium"
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
							placeholder="Last Name"
							required
							size="is-medium"
							:disabled="isLoading"
						/>
					</field>
					<field
						name="companyName"
						:errors="errors"
					>
						<b-input
							type="companyName"
							v-model="companyName"
							placeholder="Company Name"
							required
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
	name: 'AccountChangeDetails',

	components: {
		field
	},

	data() {
		return {
			isVisible: true,
			firstName: '',
			lastName: '',
			companyName: ''
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
		},
		account() {
			this.prefill();
		}
	},

	methods: {
		getOut() {
			this.isVisible = false;
		},
		prefill() {
			if(!this.account) {
				return;
			}
			this.firstName = this.account.firstName || '';
			this.lastName = this.account.lastName || '';
			this.companyName = this.account.company.name || '';
		},
		doSubmit(event) {
			if(this.isLoading) {
				return;
			}

			const {
				firstName,
				lastName,
				companyName
			} = this;

			this.$store.dispatch('accountUpdate', {
				id: this.account.id,
				firstName,
				lastName,
				company: {
					name: companyName
				}
			});
		}
	},

	mounted() {
		this.prefill();
	}
};
</script>
