<template>
  <header class="header">
    <div class="left"></div>
    <div class="middle"></div>
    <div class="right"></div>
  </header>
</template>

<script>
import { ref } from 'vue'

export default {
  setup(){
    let mode = ref('l')

    return { mode }
  }
}
</script>

<style scoped lang="scss">
.header {
  height: 56px;
  border: 1px solid red;
}
</style>