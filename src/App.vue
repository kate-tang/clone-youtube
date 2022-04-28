<template>
  <div class="container" :class="{ 'load': !$store.state.ispageReady }">
    <Header />
    <NarrowSidebar />
    <WideSidebar />
    <BottomNav />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import NarrowSidebar from './components/NarrowSidebar.vue'
import WideSidebar from './components/WideSidebar.vue'
import BottomNav from './components/BottomNav.vue'
import { onMounted } from 'vue'

export default {
  components: { Header, NarrowSidebar, WideSidebar, BottomNav },
  setup(){
    onMounted(() => {
      // custom scrollbar
      document.body.classList.add('scrollbar')
      // add this line so that light/dark mode style can be apply to scrollbar; it doesn't matter what style is added here; don't know why but it works...
      document.styleSheets[0].insertRule('::-webkit-scrollbar { margin: 0 }')
    })

    return {}
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
