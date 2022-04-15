<template>
  <div class="home">
    <NarrowSidebar />
    <WideSidebar />
    <main class="main">
      <TopicsBar />
      <Videos />
    </main>
  </div>
</template>

<script>
import NarrowSidebar from '../components/NarrowSidebar.vue'
import WideSidebar from '../components/WideSidebar.vue'
import TopicsBar from '../components/TopicsBar.vue'
import Videos from '../components/Videos.vue'
import { ref } from 'vue'

export default {
  name: 'Home',
  components: { NarrowSidebar, WideSidebar, TopicsBar, Videos },
  setup(){
    const sidebarMode = ref('wide')

    return { sidebarMode }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: flex;
}
.main {
  flex: 1;
  margin-top: var(--header-height);
  margin-left: var(--sidebar-width);
}
</style>