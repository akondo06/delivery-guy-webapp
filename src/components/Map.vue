<template>
	<div ref="container"></div>
</template>

<script>
import * as MapLib from '@/map';

const defPosition = { lat: 45.9442858, lng: 25.0094303 }; // RO

export default {
	name: 'Map',

	props: {
		id: {
			type: String
		},
		positions: {
			type: Array
		},
		title: {
			type: String
		}
	},

	data() {
		return {
			mapInstance: null
		};
	},

	methods: {
		setPositions(positions) {
			if(!this.mapInstance) {
				return;
			}

			const { map } = this.mapInstance;

			MapLib.deleteMarkers(this.id);

			if(!positions) {
				map.setCenter(defPosition);
				map.setZoom(6);

				return;
			}

			let lastMarker;

			positions.forEach((pos) => {
				lastMarker = MapLib.addMarker(this.id, { lat: pos.latitude, lng: pos.longitude }, this.title);
			});

			map.setCenter(lastMarker.getPosition());
			map.setZoom(10);
		},
		async loadMap() {
			const map = await MapLib.getMap(this.id);
			this.mapInstance = map;

			MapLib.attachMapTo(this.id, this.$refs.container);

			this.setPositions(this.position);
		}
	},

	watch: {
		positions(value) {
			this.setPositions(value);
		}
	},

	mounted() {
		this.loadMap();
	},

	beforeUnmount() {
		MapLib.detachMapFrom(this.id, this.$refs.container);
	}
};
</script>
