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
				<h1 class="title is-4">Order #2023910208</h1>
				<h2 class="subtitle is-6">Created on 12 August 2020 16:20</h2>

				<div class="columns">
					<div class="column">
						<div class="card">
							<div class="card-content">
								<p class="title is-5">
									Sender
								</p>
								<b-field label="Name">
									<b-input v-model="sender.name"></b-input>
								</b-field>
								<b-field label="Phone">
									<b-input v-model="sender.phone"></b-input>
								</b-field>
								<b-field label="Address">
									<b-input v-model="sender.address"></b-input>
								</b-field>
							</div>
						</div>
					</div>
					<div class="column">
						<div class="card">
							<div class="card-content">
								<p class="title is-5">
									Receiver
								</p>
								<b-field label="Name">
									<b-input v-model="receiver.name"></b-input>
								</b-field>
								<b-field label="Phone">
									<b-input v-model="receiver.phone"></b-input>
								</b-field>
								<b-field label="Address">
									<b-input v-model="receiver.address"></b-input>
								</b-field>
							</div>
						</div>
					</div>
				</div>

				<div class="card">
					<div class="card-content">
						<p class="title is-5">
							Package
						</p>
						<b-field label="Weight (in kg)">
							<b-input v-model="weight" type="number"></b-input>
						</b-field>
					</div>
				</div>

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

	data() {
		return {
			sender: {
				name: 'Gregor Bennedict',
				phone: '0732039208291',
				address: 'Geneesgade 1, 8700 Horsens, Denmark'
			},
			receiver: {
				name: 'Gregor Bennedict',
				phone: '0732039208291',
				address: 'Geneesgade 1, 8700 Horsens, Denmark'
			},
			weight: 30
		};
	},
	computed: {
		...mapState([
			'orders'
		])
	}
};
</script>
