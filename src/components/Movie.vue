<template>
  <div class="movie">
        <img :src="movie.poster" alt="Movie Poster" @click="openDetails">
      <div class="description">
          <div class="basic-info">
              <h3>{{ movie.name }}</h3>
              <span v-bind:style="{'background-color': getRatingColor() }" >{{ movie.rating }}</span>
          </div>
          <p>{{ movie.genre }}</p>
        <p>{{ movie.year }}</p>
      </div>
  </div>
</template>

<script>
import ratingMixin from '../mixins/getRatingColor'
export default {
	mixins: [ratingMixin],
    props: {
        movie: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
		openDetails(){
			this.$router.push({name: 'moviePreview', params:{id: this.movie.id}})
		}
    }
}
</script>

<style lang='scss' scoped>
	.movie {
		flex: 1;
		margin: 1rem;
		min-width: 300px;
		max-width: 300px;
		position: relative;

		img {
			max-width: 100%;
			box-shadow: 0 14px 28px rgba(0, 0, 0, 0.473),
				0 10px 10px rgba(0, 0, 0, 0.473);
			margin-bottom: 7px;
			border-radius: 15px;
			cursor: pointer;
		}

		.description {
			padding: 1rem 0;

			.basic-info {
				display: flex;
				justify-content: space-between;

				h3 {
					margin: 0;
					text-align: left;
					color: white;
				}

				span {
					border-radius: 10px;
					font-size: 20px;
					width: 53px;
					color: white;
				}
			}

			p {
				margin: 5px 0;
				color: rgb(143, 143, 143);
				text-align: left;
			}
		}
	}
</style>