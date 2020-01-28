<template>
	<div id="app">
		<MainMenu />
		<router-view />
	</div>
</template>

<script>
import MainMenu from '@/components/MainMenu.vue';

export default {
	name: 'App',
	components: {
		MainMenu
	}
};
</script>

<style lang="scss">

document {
	padding: 0;
	margin: 0;
}

body {
	display: flex;
	flex-direction: column;
	align-items: stretch;

	padding: 0;
	margin: 0;

	font-family: 'Nunito Sans', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;

	color: #2c3e50;
}

#app {
	flex: 1 1 auto;

	display: flex;
	flex-direction: row;

	background-color: #FCFCFC;

	width: 100vw;
	height: 100vh;

	> div {
		&:first-child {
			flex: 0 0 20rem;
		}
		&:last-child {
			flex: 1 1 auto;
		}
	}
}

</style>
