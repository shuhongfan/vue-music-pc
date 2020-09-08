import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicId: ''
  },
  mutations: {
    setMusicID (state, url) {
      state.musicId = url
    }
  },
  actions: {
  },
  modules: {
  }
})
