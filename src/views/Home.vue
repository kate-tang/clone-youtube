<template>
  <main class="home">
    <TopicsBar />
    <VideoGrid />
  </main>
</template>

<script>
import TopicsBar from '../components/TopicsBar.vue'
import VideoGrid from '../components/VideoGrid.vue'

export default {
  name: 'Home',
  components: { TopicsBar, VideoGrid },
  setup(){

    return {  }
  }
}
</script>

<style scoped lang="scss">
</style>