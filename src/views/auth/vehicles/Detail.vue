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
						<!-- <p class="subtitle is-6" v-if="data.broadcast">
							{{data.broadcast.createdBy.firstName}} {{data.broadcast.createdBy.lastName}} - <Since :date="data.broadcast.position.time" />
						</p>
						<p class="subtitle is-6" v-else>Not Broadcasting</p> -->

						<div v-if="broadcastsErrors">
							<div>{{broadcastsErrors.message}}</div>
						</div>
						<div v-else-if="broadcastsData && !broadcastsData.length">
							<div>No broadcasts...</div>
						</div>
						<div v-else>
							<div :class="{ select: true, 'is-loading': broadcastsIsLoading }">
								<select v-model="selectedBroadcastId">
									<option v-for="broadcast in broadcastsData" :key="broadcast.id" :value="broadcast.id">
										{{broadcast.createdAt}} - {{broadcast.createdBy.firstName}} {{broadcast.createdBy.lastName}}
									</option>
								</select>
							</div>
						</div>
					</div>
					<div class="media-right">
						<div v-if="selectedBroadcast">
							<div>
								<span>Created </span>
								<Since :date="selectedBroadcast.createdOn" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="card-image">
				<Map
					id="vehicle"
					:positions="selectedBroadcast ? selectedBroadcast.locations : undefined"
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
			isVisible: true,
			selectedBroadcastId: null
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
		selectedBroadcast() {
			if(!this.selectedBroadcastId || !this.broadcastsData) {
				return;
			}

			return this.broadcastsData.find((b) => b.id === this.selectedBroadcastId);
		},
		broadcastsBase() {
			return this.$store.state.vehicleBroadcastList;
		},
		broadcastsData() {
			return this.broadcastsBase.data;
		},
		broadcastsIsLoading() {
			return this.broadcastsBase.inProgress;
		},
		broadcastsErrors() {
			return this.broadcastsBase.error;
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
		},
		broadcastsData(value) {
			if(!value || !value[0]) {
				return;
			}
			this.selectedBroadcastId = value[0].id;
		}
	},

	methods: {
		getOut() {
			this.isVisible = false;
		},
		load() {
			const id = this.$route.params.id;
			this.$store.dispatch('vehicle', { id });
			this.$store.dispatch('clearVehicleBroadcastList');
			this.$store.dispatch('vehicleBroadcastList', {
				filter: { vehicleId: id }
			});
		}
	},

	mounted() {
		this.load();
	},

	beforeUnmount() {
		this.$store.dispatch('clearVehicle');
		this.$store.dispatch('clearVehicleBroadcastList');
	}
};
</script>
