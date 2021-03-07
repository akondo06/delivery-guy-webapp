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
		position: {
			type: Object
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
		setPosition(pos) {
			if(!this.mapInstance) {
				return;
			}

			const { map } = this.mapInstance;

			MapLib.deleteMarkers(this.id);

			if(!pos) {
				map.setCenter(defPosition);
				map.setZoom(6);

				return;
			}

			const marker = MapLib.addMarker(this.id, { lat: pos.latitude, lng: pos.longitude }, this.title);

			map.setCenter(marker.getPosition());
			map.setZoom(10);
		},
		async loadMap() {
			const map = await MapLib.getMap(this.id);
			this.mapInstance = map;

			MapLib.attachMapTo(this.id, this.$refs.container);

			this.setPosition(this.position);
		}
	},

	watch: {
		position(value) {
			this.setPosition(value);
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
