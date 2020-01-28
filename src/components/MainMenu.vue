<template>
	<div class="main-menu">
		<div class="inner">
			<router-link to="/">Home</router-link>
			<router-link to="/orders">Orders</router-link>
			<router-link to="/routes">Routes</router-link>

			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />

			<br />
			<br />
			<router-link to="/settings">Settings</router-link>
			<a href="#">Log Out</a>
		</div>
	</div>
</template>

<style lang="scss">

.main-menu {
	position: relative;
	z-index: 1;

	display: flex;

	box-shadow: 1px 0px 3px rgba(0, 0, 0, 0.16);
	background: #efeff3;

	min-height: 0;
	overflow-y: auto;

	> .inner {
		display: flex;
		flex-direction: column;
	}

	a {
		font-weight: bold;
		color: #2c3e50;

		&.is-active-exact {
			color: #42b983;
		}
	}
}

</style>
