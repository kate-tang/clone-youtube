<template>
  <div class="container" :class="{ 'load': !$store.state.ispageReady }">
    <Header />
    <NarrowSidebar />
    <WideSidebar />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import NarrowSidebar from './components/NarrowSidebar.vue'
import WideSidebar from './components/WideSidebar.vue'

export default {
  components: { Header, NarrowSidebar, WideSidebar },
  setup(){
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
