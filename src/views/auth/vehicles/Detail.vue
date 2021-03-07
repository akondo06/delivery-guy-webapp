<template>
	<b-modal :active.sync="isVisible">
		<div class="card">
			<div class="card-content" v-if="isLoading">
				<div class="loader is-large"></div>
			</div>
			<div class="card-content" v-if="error">
				<div>{{error.message}}</div>
			</div>
			<div class="card-content" v-if="data && !isLoading && !error">
				<div class="media">
					<div class="media-left">
						<div class="icon is-medium">
							<TruckIcon />
						</div>
					</div>
					<div class="media-content">
						<p class="title">{{data.name}}</p>
						<p class="subtitle is-6" v-if="data.broadcast">
							{{data.broadcast.createdBy.firstName}} {{data.broadcast.createdBy.lastName}} - <Since :date="data.broadcast.position.time" />
						</p>
						<p class="subtitle is-6" v-else>Not Broadcasting</p>
					</div>
					<div class="media-right">
						<div v-if="data.broadcast">
							<div>
								<span>Created </span>
								<Since :date="data.broadcast.createdOn" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="card-image">
				<Map
					id="vehicle"
					:position="data && data.broadcast ? data.broadcast.position : undefined"
					:title="data ? data.name : 'Loading'"
				/>
			</div>
		</div>
	</b-modal>
</template>

<script>
import Since from '@/components/Since.vue';
import Map from '@/components/Map.vue';
import TruckIcon from '@/components/icons/Truck.vue';

export default {
	components: {
		Since,
		Map,
		TruckIcon
	},

	data() {
		return {
			isVisible: true
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
		error() {
			return this.base.error;
		},
		broadcastPosition() {
			if(!this.data || !this.data.broadcast) {
				return;
			}
			if(!this.data.broadcast.position) {
				return;
			}
			return this.data.broadcast.position;
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
		}
	},

	methods: {
		getOut() {
			this.isVisible = false;
		},
		load() {
			this.$store.dispatch('vehicle', { id: this.$route.params.id });
		}
	},

	mounted() {
		this.load();
	},

	beforeUnmount() {
		this.$store.dispatch('clearVehicle');
	}
};
</script>
