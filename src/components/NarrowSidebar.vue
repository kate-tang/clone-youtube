<template>
  <div class="narrow-sidebar">
    <nav>
      <ul class="sidebar-list">
        <li class="sidebar-list-item">
          <router-link to="/" class="btn-square enabled" @click.prevent>
            <img :src="require(`../assets/image/svg/home-${$store.state.darkMode}.svg`)" alt="home" class="icon">
            <span class="text">首頁</span>
          </router-link>
        </li>
        <li class="sidebar-list-item">
          <router-link to="/" class="btn-square" @click.prevent>
            <img :src="require(`../assets/image/svg/explore-${$store.state.darkMode}.svg`)" alt="explore" class="icon">
            <span class="text">探索</span>
          </router-link>
        </li>
        <li class="sidebar-list-item">
          <router-link to="/" class="btn-square" @click.prevent>
            <img :src="require(`../assets/image/svg/shorts-${$store.state.darkMode}.svg`)" alt="shorts" class="icon">
            <span class="text">Shorts</span>
          </router-link>
        </li>
        <li class="sidebar-list-item">
          <router-link to="/" class="btn-square" @click.prevent>
            <img :src="require(`../assets/image/svg/subscriptions-${$store.state.darkMode}.svg`)" alt="subscriptions" class="icon">
            <span class="text">訂閱內容</span>
          </router-link>
        </li>
        <li class="sidebar-list-item">
          <router-link to="/" class="btn-square" @click.prevent>
            <img :src="require(`../assets/image/svg/library-${$store.state.darkMode}.svg`)" alt="library" class="icon">
            <span class="text">媒體庫</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  setup(){}
}
</script>

<style scoped lang="scss">
.narrow-sidebar {
  display: var(--narrow-sidebar-display);
  position: fixed;
  top: var(--header-height);
  bottom: 0;
  left: 0;
  width: var(--narrow-sidebar-width);
  background: var(--sidebar-bg);
}
.sidebar-list {
  margin-top: 4px;
}

// when page is still loading
.load {
  .narrow-sidebar {
    pointer-events: none;
    .sidebar-list {
      opacity: 0;
    }
  }
}
</style>