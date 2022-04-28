<template>
  <nav class="bottom-nav">
    <ul class="nav-list">
      <li class="nav-list-item">
        <router-link to="/" class="btn-bottomnav" @click.prevent>
          <img :src="require(`../assets/image/svg/home-${$store.state.darkMode}.svg`)" alt="home" class="icon">
          <span class="text">首頁</span>
        </router-link>
      </li>
      <li class="nav-list-item">
        <router-link to="/" class="btn-bottomnav" @click.prevent>
          <img :src="require(`../assets/image/svg/shorts-${$store.state.darkMode}.svg`)" alt="shorts" class="icon">
          <span class="text">Shorts</span>
        </router-link>
      </li>
      <li class="nav-list-item">
        <button type="button" class="btn-bottomnav btn-add">
          <img :src="require(`../assets/image/svg/add-plus-${$store.state.darkMode}.svg`)" alt="subscriptions" class="icon">
        </button>
      </li>
      <li class="nav-list-item">
        <router-link to="/" class="btn-bottomnav" @click.prevent>
          <img :src="require(`../assets/image/svg/subscriptions-${$store.state.darkMode}.svg`)" alt="subscriptions" class="icon">
          <span class="text">訂閱內容</span>
        </router-link>
      </li>
      <li class="nav-list-item">
        <router-link to="/" class="btn-bottomnav" @click.prevent>
          <img :src="require(`../assets/image/svg/library-${$store.state.darkMode}.svg`)" alt="library" class="icon">
          <span class="text">媒體庫</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">
.bottom-nav {
  display: var(--bottomnav-display);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bottomnav-bg);
  border-top: 1px solid var(--border);
  z-index: 1;
}
.nav-list {
  display: flex;
  justify-content: center;
  overflow: hidden;
}
.nav-list-item {
  position: relative;
  flex: 1;
  max-width: calc(var(--btn-size) * 2);
  min-width: calc(var(--btn-size) * 1.5);
  padding-bottom: var(--btn-size);
}
.btn-add {
  .icon {
    width: 28px;
    height: 28px;
  }
}
</style>