import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Watch from '../views/Watch.vue'
import Channel from '../views/Channel.vue'
import store from '../store'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/watch', name: 'watch', component: Watch },
  { path: '/channel', name: 'channel', component: Channel },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from) => {
  // set page to "not ready", and set to "ready" later on when the particular part of the page has finished loading
  store.commit('setPageToNotReady')

  // set title of each page
  if (to.meta.title){
    document.title = `${to.meta.title} - ${process.env.VUE_APP_TITLE}`
  } else {
    document.title = process.env.VUE_APP_TITLE
  }
})

export default router
