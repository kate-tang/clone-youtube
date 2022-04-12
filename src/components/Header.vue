<template>
  <header class="header" :class="{ 'search-mode': isSearchBarExpanded }">
    <div class="left">
      <button type="button" class="btn-circle menu">
        <img :src="require(`../assets/image/svg/menu-${$store.state.darkMode}.svg`)" alt="menu icon" class="icon">
      </button>
      <a href="#" class="logo">
        <img :src="require(`../assets/image/svg/youtube-${$store.state.darkMode}.svg`)" alt="youtube logo" class="icon">
      </a>
    </div>
    <div class="center">
      <button type="button" class="exit-search-mode-btn btn-circle" @click="isSearchBarExpanded = false">
        <img :src="require(`../assets/image/svg/arrow-left-${$store.state.darkMode}.svg`)" alt="" class="icon">
      </button>
      <form class="search">
        <div class="search-box" :class="{ 'active': isSearching }">
          <div class="search-icon btn">
            <img :src="require(`../assets/image/svg/search-${$store.state.darkMode}.svg`)" alt="" class="icon">
          </div>
          <input type="text" placeholder="搜尋" class="search-bar" @focus="isSearching = true" @blur="isSearching = false" v-model="searchText" ref="searchBar" spellcheck="false">
          <div class="search-clear btn-circle" v-show="searchText" @click="clearSearch">
            <img :src="require(`../assets/image/svg/close-${$store.state.darkMode}.svg`)" alt="" class="icon">
          </div>
        </div>
        <button type="submit" class="search-btn btn">
          <img :src="require(`../assets/image/svg/search-${$store.state.darkMode}.svg`)" alt="" class="icon">
        </button>
      </form>
      <button type="button" class="call-search-btn btn-circle" @click="isSearchBarExpanded = true">
        <img :src="require(`../assets/image/svg/search-${$store.state.darkMode}.svg`)" alt="" class="icon">
      </button>
      <button type="button" class="record btn-circle">
        <img :src="require(`../assets/image/svg/record-${$store.state.darkMode}.svg`)" alt="" class="icon">
      </button>
    </div>
    <div class="right">
      <button type="button" class="btn-circle">
        <img :src="require(`../assets/image/svg/upload-${$store.state.darkMode}.svg`)" alt="" class="icon">
      </button>
      <button type="button" class="btn-circle">
        <img :src="require(`../assets/image/svg/apps-${$store.state.darkMode}.svg`)" alt="" class="icon">
      </button>
      <button type="button" class="btn-circle toggle-dark" @click="toggleDarkMode">
        <svg viewBox="0 0 24 24" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" class="icon">
          <g :fill="$store.state.darkMode === 'l' ? '#000' : '#FFF'" fill-rule="nonzero">
            <path d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20.5 L12,3.5 C16.6944204,3.5 20.5,7.30557963 20.5,12 C20.5,16.6944204 16.6944204,20.5 12,20.5 Z"></path>
          </g>
        </svg>
      </button>
      <button type="button" class="avatar">
        <img src="https://picsum.photos/32" alt="user avatar" class="img">
      </button>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'
import store from '../store'

export default {
  setup(){
    let mode = ref('l')
    const isSearching = ref(false)
    const isSearchBarExpanded = ref(false)
    const searchText = ref('')
    const searchBar = ref(null)

    const clearSearch = () => {
      searchText.value = ''
      searchBar.value.focus()
    }

    window.addEventListener('resize', e => {
      if (window.innerWidth > 670){
        isSearchBarExpanded.value = false
      }
    })

    // dark mode
    let darkMode = localStorage.getItem('darkMode')
    const enableDarkMode = () => {
      document.body.classList.add('darkmode')
      store.commit('enableDarkMode')
      localStorage.setItem('darkMode', 'enabled')
    }
    const disableDarkMode = () => {
      document.body.classList.remove('darkmode')
      store.commit('disableDarkMode')
      localStorage.setItem('darkMode', null)
    }
    if (darkMode === 'enabled'){
      enableDarkMode()
    }
    const toggleDarkMode = () => {
      darkMode = localStorage.getItem('darkMode')
      console.log(darkMode);
      if (darkMode === 'enabled'){
        disableDarkMode()
      } else {
        enableDarkMode()
      }
    }

    return {
      isSearching, isSearchBarExpanded, searchText, searchBar, clearSearch,
      toggleDarkMode
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 0 16px;
  background: var(--header-bg);
  @media (max-width: 670px) {
    padding: 0 8px;
  }
  &.search-mode {
    .center {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      padding: 0 8px;
      background: var(--header-bg);
      z-index: 2;
    }
    .search {
      flex: 1;
      width: auto;
      opacity: 1;
    }
    .call-search-btn {
      display: none;
    }
    .exit-search-mode-btn {
      display: block;
    }
  }
}

// left
.left {
  display: flex;
  align-items: center;
  height: 100%;
}
.menu {
  @media (max-width: 500px) {
    display: none;
  }
}
.logo {
  position: relative;
  @include flex-center;
  width: 120px;
  height: 100%;
  margin: auto 0;
  color: var(--header-icon-nation);
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
    color: var(--header-icon-nation);
  }
}

// center
.center {
  flex: 1;
  @include flex-center;
  @media (max-width: 670px) {
    flex: 0;
    margin-left: auto;
  }
}
.search {
  @include flex-center;
  max-width: 632px;
  width: 100%;
  height: var(--header-btn-size);
  margin-left: var(--header-btn-size);
  @media (max-width: 670px) {
    width: 0;
    margin-left: 0;
    opacity: 0;
  }
}
.search-box {
  display: flex;
  position: relative;
  max-width: 572px;
  width: 100%;
  height: 100%;
  &.active {
    outline: 1px solid #36C;
    outline-offset: -1px;
    .search-icon {
      border-top: 1px solid transparent;
      border-left: 1px solid transparent;
      opacity: 1;
    }
    .search-bar {
      margin-left: 0;
      padding: 0 5px 0 45px;
      border-left: 1px solid transparent;
      border-bottom: 1px solid transparent;
      @media (max-width: 500px) {
        padding: 0 5px;
      }
    }
  }
}
.search-icon {
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  border: 1px solid transparent;
  opacity: 0;
  cursor: default;
  .icon {
    width: 20px;
    height: 20px;
  }
  @media (max-width: 500px) {
    display: none;
  }
}
.search-bar {
  flex: 1;
  width: 100%;
  height: 100%;
  margin-left: var(--header-btn-size);
  padding: 0 5px;
  background: var(--header-searchbar-bg);
  color: var(--header-searchbar-text);
  border: 1px solid var(--header-searchbar-border);
  border-radius: 0;
  font-size: 16px;
  outline: none;
  @media (max-width: 500px) {
    margin-left: 0;
  }
}
.search-clear {
  position: absolute;
  top: 0;
  right: 0;
  .icon {
    width: 20px;
    height: 20px;
  }
}
.search-btn {
  flex: 0 0 64px;
  height: 100%;
  background: var(--header-searchbar-btn-bg);
  border: 1px solid var(--header-searchbar-btn-border);
  border-left: transparent;
  border-radius: 0 2px 2px 0;
  cursor: pointer;
  @media (max-width: 500px) {
    display: none;
  }
}
.call-search-btn {
  display: none;
  @media (max-width: 670px) {
    display: block;
  }
}
.exit-search-mode-btn {
  display: none;
  margin-right: 8px;
}
.record {
  flex: 0 0 var(--header-btn-size);
  margin-left: 8px;
  background: var(--header-searchbar-record-bg);
  @media (max-width: 670px) {
    background: transparent;
  }
  @media (max-width: 500px) {
    display: none;
  }
}

// right
.right {
  display: flex;
  align-items: center;
  margin-left: 20px;
  .btn-circle {
    margin-right: 8px;
  }
  @media (max-width: 670px) {
    margin-left: 0;
    .btn-circle {
      margin-right: 0;
    }
  }
  @media (max-width: 500px) {
    .btn-circle:not(.toggle-dark) {
      display: none;
    }
  }
}
.avatar {
  all: unset;
  @include flex-center;
  width: 60px;
  height: var(--header-btn-size);
  border-radius: 50%;
  overflow: hidden;
  .img {
    border-radius: 50%;
  }
}
</style>