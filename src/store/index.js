import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicId: '',
    MVid: ''
  },
  mutations: {
    setMusicID (state, id) {
      state.musicId = id
    },
    setMVID (state, id) {
      state.MVid = id
    },
    cleanMusicID (state, id) {
      state.musicId = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
