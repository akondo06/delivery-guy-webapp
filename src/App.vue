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

$defaultColor: #2c3e50;

#app {
	// font-family: 'Avenir', Helvetica, Arial, sans-serif;
	font-family: 'Nunito Sans', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: $defaultColor;
}

</style>
