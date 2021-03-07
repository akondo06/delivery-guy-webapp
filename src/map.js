import * as Util from './util';

const mapLib = {};
const elementLib = {};
const markerLib = {};

function scriptIsReady() {
	return window.google && window.google.maps;
}

async function loadScript() {
	await Util.loadExternalScript('maps-script', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDJj5jEHsN-yMRMBUQwQdKu_U1PYZ_rVZQ&libraries=places', scriptIsReady);
}

export async function getMap(id) {
	await loadScript();

	if(!mapLib[id]) {
		const element = document.createElement('figure');
		element.classList.add('image');
		element.classList.add('is-5by3');

		const mapInstance = new window.google.maps.Map(element, {});

		mapLib[id] = mapInstance;
		elementLib[id] = element;
		markerLib[id] = [];
	}

	return {
		map: mapLib[id],
		element: elementLib[id]
		// markers: markerLib[id]
	};
}

export function attachMapTo(mapId, containerElement) {
	containerElement.appendChild(elementLib[mapId]);
}

export function detachMapFrom(mapId, containerElement) {
	const element = elementLib[mapId];

	containerElement.removeChild(element);

	// google.maps.event.clearInstanceListeners(window);
	// google.maps.event.clearInstanceListeners(document);

	// google.maps.event.clearInstanceListeners(element);
}

export function addMarker(mapId, position, title) {
	const marker = new window.google.maps.Marker({
		position,
		map: mapLib[mapId],
		title
	});
	markerLib[mapId].push(marker);

	return marker;
}

function setMapOnAll(mapId, map) {
	const markers = markerLib[mapId];

	for(let i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

function clearMarkers(mapId) {
	setMapOnAll(mapId, null);
}

// function showMarkers(mapId) {
// 	setMapOnAll(mapId, mapLib[mapId]);
// }

export function deleteMarkers(mapId) {
	clearMarkers(mapId);
	markerLib[mapId] = [];
}
