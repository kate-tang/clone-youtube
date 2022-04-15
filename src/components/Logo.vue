<template>
  <a href="#" class="logo">
    <img :src="require(`../assets/image/svg/youtube-${$store.state.darkMode}.svg`)" alt="youtube logo" class="icon">
  </a>
</template>

<script>
export default {
  setup(){}
}
</script>

<style scoped lang="scss">
.logo {
  position: relative;
  @include flex-center;
  width: 120px;
  height: var(--header-height);
  margin: auto 0;
  color: var(--header-icon-nation-text);
  .icon {
    width: 90px;
    height: 20px;
    pointer-events: none;
  }
  &::after {
    content: 'tw';
    display: block;
    position: absolute;
    top: 12px;
    right: -7px;
    text-transform: uppercase;
    font-size: 12px;
    @media (max-width: 500px) {
      display: none;
    }
  }
  &:active {
    color: var(--header-icon-nation-text);
  }
}
</style>