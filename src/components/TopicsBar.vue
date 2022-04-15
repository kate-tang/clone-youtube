<template>
  <div class="topics-bar">topics</div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup(){
    const topics = ref(['全部', '遊戲', '合輯', '直播中', '園藝', '烹飪節目', '音樂', '手工藝', '烹飪', '視覺藝術', '最新上傳', '已觀看', '讓你耳目一新的影片'])

    return { topics }
  }
}
</script>

<style scoped lang="scss">

</style>