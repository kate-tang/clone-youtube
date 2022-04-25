import { createStore } from 'vuex'

export default createStore({
  state: {
    darkMode: 'l',
    designatedSidebarMode: null,
    ispageReady: false,
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
    setPageToReady(state){
      state.ispageReady = true
    },
    setPageToNotReady(state){
      state.ispageReady = false
    },
  },
  actions: {
  },
  modules: {
  }
})
