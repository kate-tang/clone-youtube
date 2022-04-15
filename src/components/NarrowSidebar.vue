<template>
  <div class="narrow-sidebar">
    <nav>
      <ul class="sidebar-list">
        <li class="sidebar-list-item">
          <a href="#" class="btn-square enabled">
            <img :src="require(`../assets/image/svg/home-${$store.state.darkMode}.svg`)" alt="home" class="icon">
            <span class="text">首頁</span>
          </a>
        </li>
        <li class="sidebar-list-item">
          <a href="#" class="btn-square">
            <img :src="require(`../assets/image/svg/explore-${$store.state.darkMode}.svg`)" alt="home" class="icon">
            <span class="text">探索</span>
          </a>
        </li>
        <li class="sidebar-list-item">
          <a href="#" class="btn-square">
            <img :src="require(`../assets/image/svg/shorts-${$store.state.darkMode}.svg`)" alt="home" class="icon">
            <span class="text">Shorts</span>
          </a>
        </li>
        <li class="sidebar-list-item">
          <a href="#" class="btn-square">
            <img :src="require(`../assets/image/svg/subscriptions-${$store.state.darkMode}.svg`)" alt="home" class="icon">
            <span class="text">訂閱內容</span>
          </a>
        </li>
        <li class="sidebar-list-item">
          <a href="#" class="btn-square">
            <img :src="require(`../assets/image/svg/library-${$store.state.darkMode}.svg`)" alt="home" class="icon">
            <span class="text">媒體庫</span>
          </a>
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
  flex: 0 0 var(--narrow-sidebar-width);
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
</style>