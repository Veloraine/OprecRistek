<template>
  <div class="movie-detail">
    <h2>{{ movie.Title }}</h2>
    <p class="year">{{ movie.Year }}</p>
    <div class="movie-info">
      <div class="movie-type">
        <div class="type">
          {{ movie.Type }}
        </div>
        <img :src="movie.Poster" alt="Movie Poster" class="featured-img">
      </div>
      <div class="attributes">
        <p>Released: {{ movie.Released }}</p>
        <p>Language: {{ movie.Language }}</p>
        <p>Duration: {{ movie.Runtime }}</p>
        <p>Genre: {{ movie.Genre }}</p>
        <p>Rating: {{ movie.imdbRating }} / 10.0</p>
        <div class="synopsis">
          <p>Synopsis: </p>
          <p>{{ movie.Plot }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount} from 'vue';
import { useRoute } from 'vue-router';
import env from '@/env.js';
export default {
  setup () {
    const movie = ref({});
    const route = useRoute();

    onBeforeMount(() => {
      fetch(`https://www.omdbapi.com/?apikey=${env.apikey}&i=${route.params.id}&plot=full`)
        .then(response => response.json())
        .then(data => {
          movie.value = data;
        });
    });
    return {
      movie
    }
  }
}
</script>

<style>
.movie-detail {
  background: rgb(3, 15, 28);
  color: white;
  padding: 16px;
}

h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
}

.movie-info {
  display: flex;
  flex-wrap: wrap;
}

.movie-info .featured-img {
  display: block;
  max-width: 250px;
  margin-bottom: 16px;
  border-radius: 5px;
}

.movie-info .attributes {
  padding: 8px 12px;
  flex: 1 1 60%;
  min-width: 50%;
}

.movie-info .attributes .synopsis {
  background-color: rgb(58, 80, 110);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 8px;
}
.movie-info .movie-type {
  position: relative;
  display: block;
  height: 100%;
}

.movie-info .movie-type .type {
  background-color: rgb(255, 132, 0);
  text-transform: capitalize;
  padding: 6px 12px;
  position: absolute;
  margin-top: 12px;
  border-radius: 0 5px 5px 0;
}
p {
  font-size: 18px;
}

.year {
  font-size: 16px;
  color: rgb(133, 142, 143);
}
</style>