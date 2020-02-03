<template>
	<div class="list-detail">
		<div class="item-list">
			<div class="inner">
				<form class="filter">
					<input placeholder="Search orders..." v-focus />
				</form>
				<ul class="results">
					<li v-for="order in orders" :key="order">
						<a href="#">Item hier ...</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="detail">
			<div class="inner">
				PUT SOMETHING IMPORTANT HEIR!
				<br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
				<br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
				AND HERE TOO!
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'ListDetail',
	computed: {
		...mapState([
			'orders'
		])
	}
};
</script>
