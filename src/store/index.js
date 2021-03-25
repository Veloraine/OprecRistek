import { createStore } from "vuex";

export default createStore({
  state: {
    likes: [],
    bookmarks: []
  },
  getters: {},
  mutations: {
    setLikes(state, payload) {
      state.likes = payload
    },
    setBookmarks(state, payload) {
      state.bookmarks = payload
    }
  },
  actions: {}
})