<template>
	<div id="auth">
		<MainMenu />
		<router-view id="main" />
	</div>
</template>

<script>
import MainMenu from '@/components/MainMenu';

export default {
	name: 'Auth',
	components: {
		MainMenu
	}
};
</script>
