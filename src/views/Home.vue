<template>
    <div class ="home">
        <div class="feature-card">
            <router-link to="/movie/tt9054364">
                <img class="feature-img" src="https://wallpapercave.com/wp/wp3968828.jpg" alt="Slime Poster" />
                <div class="detail">
                    <h3>Tensei Shitara Slime Datta Ken</h3>
                    <p>Lonely thirty-seven-year-old Satoru Mikami is stuck in a dead-end job, unhappy with his mundane life, but after dying at the hands of a robber, 
                    he awakens to a fresh start in a fantasy realm...as a slime monster! 
                    As he acclimates to his goopy new existence, his exploits with the other monsters set off a chain of events that will change his new world!
                    </p>
                </div>
            </router-link>
        </div>

        <form @submit.prevent="SearchMovies()" class="search-box">
            <input type="text" placeholder="What are you looking for?" v-model="search" />
            <input type="submit" value="Search" />
        </form>

        <div class="movies-list">
            <div class="movie" v-for="movie in movies" :key="movie.imdbID">
                <div class="movie-link">
                <div class="product-image">
                    <img :src="movie.Poster" alt="Movie Poster" />
                    <div class="bookmark" @click="bookmark(movie)" style="cursor: pointer;"><span class="fa fa-bookmark"></span></div>
                </div>
                <div class="detail">
                    <p class="year">{{ movie.Year }}</p>
                    <router-link :to="'/movie/' + movie.imdbID">
                    <h3>{{ movie.Title}}</h3>
                    </router-link>
                </div>
                <div class="like" @click="like(movie)" style="cursor: pointer;"><span class="fa fa-heart"></span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import env from '@/env.js'

export default {
    setup() {
        const search = ref("");
        const movies = ref([]);

        const SearchMovies = () => {
            if (search.value != "") {
                fetch(`https://www.omdbapi.com/?apikey=${env.apikey}&s=${search.value}`)
                    .then(response => response.json())
                    .then(data => {
                        movies.value = data.Search;
                        search.value = "";
                        
                    });
            }
        }

        return {
            search,
            movies,
            SearchMovies
        }
    },
    mounted() {
        let liked = JSON.parse(localStorage.getItem("likedMovies"))
        if(liked){
            this.$store.commit('setLikes', liked)
        }
        let bookmarked = JSON.parse(localStorage.getItem("bookmarkedMovies"))
        if(liked){
            this.$store.commit('setBookmarks', bookmarked)
        }
    },
    methods: {
        like(movie) {
            let movies = JSON.parse(localStorage.getItem("likedMovies"))
            if(movies) {
                const found = movies.findIndex(el => el.imdbID == movie.imdbID)
                switch (found) {
                    case -1: {
                        movies.push(movie)
                        break;
                    }
                    default: {
                        movies.splice(found, 1)
                    }
                }
            } else {
                movies = [movie]
            }
            localStorage.setItem("likedMovies", JSON.stringify(movies))
            this.$store.commit('setLikes', movies)
        },
        bookmark(movie){
            let movies = JSON.parse(localStorage.getItem("bookmarkedMovies"))
            if(movies) {
                const found = movies.findIndex(el => el.imdbID == movie.imdbID)
                switch (found) {
                    case -1: {
                        movies.push(movie)
                        break;
                    }
                    default: {
                        movies.splice(found, 1)
                    }
                }
            } else {
                movies = [movie]
            }
            localStorage.setItem("bookmarkedMovies", JSON.stringify(movies))
            this.$store.commit('setBookmarks', movies)
        }
    }
}
</script>
<style>

html {
    background: rgb(3, 15, 28);
    color: white;
}

.home {
    background: rgb(3, 15, 28);
    color: white;
}

.home .feature-card {
    position: relative;
}

.home .feature-card .feature-img {
    display: block;
    width: 100%;
    height: 400px;
    object-fit: cover;
    position: relative;
    z-index: 0;
}
.home .feature-card .detail {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 16px;
    z-index: 1;
}

.home .feature-card .detail h3 {
    color: white;
    margin-bottom: 16px;
}
.home .feature-card .detail p {
    color: white;
}

.home .search-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
}
input {
    display: block;
    appearance: none;
    border: none;
    outline: none;
    background: none;
    color: white;
}

input[type="text"] {
    max-width: 75%;
    width: 500px;
    color: white;
    background-color: #496583;
    font-size: 20px;
    padding: 10px 16px;
    border-radius: 8px;
    margin: 15px 40px 15px 40px;
    transition: 0.5s;
}
input:focus {
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
}

input[type="submit"] {
    width: 30%;
    max-width: 230px;
    background-color: rgb(0, 171, 209);
    padding: 8px;
    border-radius: 8px;
    font-size: 20px;
    text-transform: uppercase;
    transition: 0.4s;
    font-weight: 600;
}
input[type="submit"]:active {
    background-color: rgb(15, 148, 132);
}
.home .movies-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0px 8px;
}

.home .movies-list .movie {
    min-width: 150px;
    flex: 1 1 20%;
    padding: 16px 8px;
}
.home .movies-list .movie .movie-link {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.home .movies-list .movie .movie-link .product-image{
    position: relative;
    display: block;

}

.home .movies-list .movie .movie-link .product-image img {
    border-radius: 8px 8px 0 0;
    display: block;
    height: 275px;
    width: 100%;
    object-fit: cover;
}

.home .movies-list .movie .movie-link .product-image .bookmark {
    position: absolute;
    padding: 4px 16px;
    border-radius: 0 10px 10px 0;
    background-color: rgb(54, 255, 80);
    color: #fff;
    bottom: 16px;
    left: 0px;
    text-transform: capitalize;
}

.home .movies-list .movie .movie-link .detail{
    background-color: rgb(58, 80, 110);
    padding: 16px 8px;
    flex: 1 1 100%;
    border-radius: 0px 0px 8px 8px;
}

.home .movies-list .movie .movie-link .detail .year{
    color: rgb(200, 200, 200);
    font-size: 14px;
}

.home .movies-list .movie .movie-link .detail h3 {
    color: rgb(255, 255, 255);
    font-weight: 600;
    font-size: 18px;
}

.home .movies-list .movie .movie-link .like {
    position: absolute;
    padding: 5px;
}
.home .movies-list .movie .movie-link .like span{
    color: white;
    transition: 0.5s;
}

.home .movies-list .movie .movie-link .like span:hover {
     color: rgb(255, 59, 59);
     transition: 0.5s;
}

.home .movies-list .movie .movie-link .product-image .bookmark span {
    color: white;
    transition: 0.5s;
}
.home .movies-list .movie .movie-link .product-image .bookmark span:hover {
    color: rgb(13, 94, 24);
    transition: 0.5s;
}
</style>

