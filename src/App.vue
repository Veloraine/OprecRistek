<template>
  <div id="app">
        <nav class="navbar navbar-expand navbar-light topbar static-top shadow" style="background-color: rgb(22, 39, 66);">
        <router-link to="/"><h1 style="left: 0; padding-left: 20px;"><span>OMDb</span>Movies</h1></router-link>
        <!-- Topbar Navbar -->
        <ul class="navbar-nav ms-auto">
          <!-- Nav Item - Alerts -->
          <li class="nav-item">
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#modal-header-component" @click="setData($store.state.likes, 'Liked')">
              <span class="fa fa-heart p-1"></span>
              <!-- Counter - Alerts -->
              <span class="badge rounded-pill bg-danger badge-counter">{{$store.state.likes.length}}</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#modal-header-component" @click="setData($store.state.bookmarks, 'Bookmarked')">
              <span class="fa fa-bookmark p-1"></span>
              <!-- Counter - Alerts -->
              <span class="badge rounded-pill bg-danger badge-counter">{{$store.state.bookmarks.length}}</span>
            </a>
          </li>
        </ul>
      </nav>
    <body>
      <router-view />
    </body>
    <div class="modal fade" id="modal-header-component" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">List of {{type}} Movies</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="text-center"
              v-if="data.length == 0"
            >You have no {{type}} movies, go find your favorites!</p>
            <table v-else class="table table-bordered" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th tabindex="0">Poster</th>
                  <th tabindex="0">Title</th>
                  <th tabindex="0">Year</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(movie, index) in data" :key="index">
                  <td class="w-auto">
                    <img :src="movie.Poster" height="150" />
                  </td>
                  <td>{{movie.Title}}</td>
                  <td>{{movie.Year}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: [],
        type: undefined
      };
    },
    methods: {
      setData(data, type) {
        this.data = data;
        this.type = type;
      }
    }
  }
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;

}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 10px;
  background-color: rgb(22, 39, 66);
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1)
}

#app a {
  text-decoration: none;
}

h1 {
  font-family: 'Kanit', sans-serif;
  color: white;
  font-size: 45px;
  text-decoration: none;
  
}
span {
  font-family: 'Kanit', sans-serif;
  color: rgb(82, 220, 255);
  text-decoration: none;
}
</style>
