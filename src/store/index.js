import { createStore } from 'vuex'

export default createStore({
  state: {
    darkMode: 'l',
    designatedSidebarMode: null,
  },
  getters: {
  },
  mutations: {
    enableDarkMode(state){
      state.darkMode = 'd'
    },
    disableDarkMode(state){
      state.darkMode = 'l'
    },
    setWideSidebarMode(state){
      state.designatedSidebarMode = 'wide'
    },
    setNarrowSidebarMode(state){
      state.designatedSidebarMode = 'narrow'
    },
    clearSidebarMode(state){
      state.designatedSidebarMode = null
    },
  },
  actions: {
  },
  modules: {
  }
})
