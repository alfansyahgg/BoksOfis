<template>
  <div id="sidebar">
      <filters />
      <button @click="showModal = true">Add Movie</button>

	  <modal v-if="showModal" @close="showModal = !showModal">
		  <template v-slot:header>
				<h3 class="m-0">Create new movie</h3>
			</template>
			<template v-slot:body>
				<form
					@submit.prevent="addMovie"
					ref="movieForm"
					id="movie-form"
				>
					<p>Fill out the details bellow</p>
					<input
						required
						v-model="form.name"
						type="text"
						placeholder="Name"
					/>
					<input
						required
						v-model="form.year"
						type="number"
						placeholder="Year"
					/>
					<input
						required
						v-model="form.rating"
						type="number"
						placeholder="Rating"
					/>
					<input
						required
						v-model="form.genre"
						type="text"
						placeholder="Genre"
					/>
					<input
						required
						v-model="form.budget"
						type="text"
						placeholder="Budget"
					/>
					<input
						required
						v-model="form.boxOffice"
						type="text"
						placeholder="Box Office"
					/>
					<input
						required
						v-model="form.poster"
						type="text"
						placeholder="Poster"
					/>
					<hr />
					<div>
						<div id="actor-input">
							<p class="m-0">Actors</p>
							<span @click="addActor" class="add-actor">+</span>
						</div>

						<input
							required
							v-for="(actor, index) in form.actors"
							:key="index"
							v-model="form.actors[index].name"
							type="text"
							placeholder="Actor"
						/>
					</div>

					<hr />

					<textarea
						required
						v-model="form.storyline"
						placeholder="Storyline"
						rows="6"
					/>
				</form>
			</template>
			<template v-slot:footer>
				<button id="add-movie" @click="$refs.movieForm.requestSubmit()">
					Add
				</button>
			</template>
	  </modal>
	</div>
</template>

<script>
import Filters from './Filters'
import Modal from './Modal'
export default {
    components: {
		Filters,
		Modal,
	},
	data(){
		return {
			showModal: false,
			form: {
				name: '',
				year: '',
				rating: '',
				genre: '',
				budget: '',
				boxOffice: '',
				poster: '',
				actors: [{name: ''}],
				storyline: '',
				  
			}
		}
	},
		methods: {
			addActor() {
				this.form.actors.push({ name: "" });
			},
			addMovie(e) {
				e.preventDefault();

				console.log("Submit : " + JSON.stringify(this.form))

				this.$store.dispatch("addMovie", this.form);
				this.showModal = false;
			},
		},
}
</script>

<style lang='scss' scoped>
	#sidebar {
		display: flex;
		flex-direction: column;
		padding: 10px;
		min-height: 100vh;
		min-width: 150px;
		max-width: 150px;
		flex-grow: 1;
		background-color: #191c1f;
		justify-content: left;

		& > button {
			margin-top: 20px;
			height: 30px;
			background-color: #5eb85e;
			border: none;
			text-transform: uppercase;
			font-weight: 600;
			border-radius: 10px;
			outline: none;
			cursor: pointer;
		}

		#movie-form {
			display: flex;
			flex-direction: column;
			text-align: left;

			& > div {
				display: flex;
				flex-direction: column;

				#actor-input {
					display: flex;
					justify-content: space-between;
				}
			}

			.add-actor {
				background-color: green;
				text-align: center;
				color: white;
				margin-left: 5px;
				height: 100%;
				padding: 2px 10px;
				font-size: 20px;
				padding: 1re;
				align-self: center;
				cursor: pointer;
			}
		}

		#add-movie {
			background-color: #5eb85e;
			border: none;
			padding: 5px;
			width: 70px;
			color: white;
			border-radius: 10px;
			cursor: pointer;
			text-transform: uppercase;
			outline: none;
		}
	}
</style>