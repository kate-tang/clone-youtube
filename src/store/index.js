import { createStore } from 'vuex'

export default createStore({
  state: {
    darkMode: 'l'
  },
  getters: {
  },
  mutations: {
    enableDarkMode(state){
      state.darkMode = 'd'
    },
    disableDarkMode(state){
      state.darkMode = 'l'
    }
  },
  actions: {
  },
  modules: {
  }
})
