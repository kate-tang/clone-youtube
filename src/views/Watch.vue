<template>
  <div class="watch">watch</div>
  <div class="watch">watch</div>
  <div class="watch">watch</div>
  <div class="watch">watch</div>
  <div class="watch">watch</div>

  <p v-if="$store.state.ispageReady">page ready</p>
</template>

<script>
import store from '../store'

export default {
  setup() {

    setTimeout(() => {
      console.log('vdo ready');
      store.commit('setPageToReady')
    }, 3000);

    return {}
  },
  beforeRouteUpdate(){
    console.log('change param');
    // store.commit('setPageToNotReady')
  }
}
</script>

<style scoped lang="scss">

</style>