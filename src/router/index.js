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

router.beforeEach(() => {
  store.commit('setPageToNotReady')
})

export default router
