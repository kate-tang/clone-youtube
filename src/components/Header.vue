<template>
  <header class="header" :class="{ 'search-mode': isSearchBarExpanded }">
    <div class="left">
      <button type="button" class="btn-circle menu" id="toggleSidebar" @click="switchSidebar">
        <img :src="require(`../assets/image/svg/menu-${$store.state.darkMode}.svg`)" alt="menu icon" class="icon">
      </button>
      <Logo />
    </div>
    <div class="center">
      <button type="button" class="exit-search-mode-btn btn-circle" @click="isSearchBarExpanded = false">
        <img :src="require(`../assets/image/svg/arrow-left-${$store.state.darkMode}.svg`)" alt="return" class="icon">
      </button>
      <form class="search">
        <div class="search-box" :class="{ 'enabled': isSearching }">
          <div class="search-icon btn">
            <img :src="require(`../assets/image/svg/search-${$store.state.darkMode}.svg`)" alt="search icon" class="icon">
          </div>
          <input type="text" placeholder="搜尋" class="search-bar" @focus="isSearching = true" @blur="isSearching = false" v-model="searchText" ref="searchBar" spellcheck="false">
          <div class="search-clear btn-circle" v-show="searchText" @click="clearSearch">
            <img :src="require(`../assets/image/svg/close-${$store.state.darkMode}.svg`)" alt="clear search" class="icon">
          </div>
        </div>
        <button type="submit" class="search-btn btn">
          <img :src="require(`../assets/image/svg/search-${$store.state.darkMode}.svg`)" alt="search bar submit" class="icon">
        </button>
      </form>
      <button type="button" class="call-search-btn btn-circle" @click="isSearchBarExpanded = true">
        <img :src="require(`../assets/image/svg/search-${$store.state.darkMode}.svg`)" alt="search" class="icon">
      </button>
      <button type="button" class="record btn-circle">
        <img :src="require(`../assets/image/svg/record-${$store.state.darkMode}.svg`)" alt="record" class="icon">
      </button>
    </div>
    <div class="right">
      <button type="button" class="btn-circle">
        <img :src="require(`../assets/image/svg/upload-${$store.state.darkMode}.svg`)" alt="upload" class="icon">
      </button>
      <button type="button" class="btn-circle">
        <img :src="require(`../assets/image/svg/apps-${$store.state.darkMode}.svg`)" alt="apps" class="icon">
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
import Logo from './Logo.vue'
import { ref } from 'vue'
import store from '../store'

export default {
  components: { Logo },
  setup(){
    const isSearching = ref(false)
    const isSearchBarExpanded = ref(false)
    const searchText = ref('')
    const searchBar = ref(null)

    const clearSearch = () => {
      searchText.value = ''
      searchBar.value.focus()
    }

    // switch sidebar
    // sidebar mode
    //    L:        ~ 1331px; default wide (in flow), can switch to narrow (in flow)
    //    M:  1330px ~ 801px; default narrow (in flow), can call wide (modal mode)
    //    S:   880px ~ 501px; default close, can call wide (modal mode)
    let prevScreenWidth = null
    window.addEventListener('resize', () => {
      let currentScreenWidth = window.innerWidth

      // searchbar
      // if searchbar is expanded in narrow screen, then close it if screen resize > 670
      if (currentScreenWidth > 670){
        isSearchBarExpanded.value = false
      }

      // sidebar
      // when screen width passes threshold, clear designatedSidebarMode in store
      const threshold_LtoM = prevScreenWidth && prevScreenWidth > 1330 && currentScreenWidth <= 1330
      const threshold_MtoL = prevScreenWidth && prevScreenWidth <= 1330 && currentScreenWidth > 1330
      if (threshold_LtoM || threshold_MtoL){
        store.commit('clearSidebarMode')
      }
      // when screen width < 1330, add transition to wide sidebar
      if (threshold_LtoM){
        document.documentElement.style.setProperty('--wide-sidebar-transition', 'transform 0s')
      }
      // update prevScreenWidth
      prevScreenWidth = currentScreenWidth
      // switch to different sidebar mode according to screen width; skip this step if user has designate a specific mode
      if (currentScreenWidth <= 1330 && store.state.designatedSidebarMode) return
      if (currentScreenWidth <= 1330){
        showNarrowHideWide()
      }
      if (currentScreenWidth > 1330 && store.state.designatedSidebarMode) return
      if (currentScreenWidth > 1330){
        showWideHideNarrow()
      }
    })
    const showWideHideNarrow = () => {
      let wideSidebarWidth = getComputedStyle(document.documentElement).getPropertyValue(`--wide-sidebar-width`).trim()
      let narrowSidebarWidth = getComputedStyle(document.documentElement).getPropertyValue(`--narrow-sidebar-width`).trim()

      document.documentElement.style.setProperty('--wide-sidebar-display', 'block')
      document.documentElement.style.setProperty('--wide-sidebar-transform-left', 0)

      if (window.innerWidth > 1330){
        document.documentElement.style.setProperty('--narrow-sidebar-display', 'none')
        document.documentElement.style.setProperty('--sidebar-width', wideSidebarWidth)
        document.documentElement.style.setProperty('--wide-sidebar-backdrop-position-right', '100%')
      } else if (window.innerWidth > 800) {
        document.documentElement.style.setProperty('--narrow-sidebar-display', 'block')
        document.documentElement.style.setProperty('--sidebar-width', narrowSidebarWidth)
        document.documentElement.style.setProperty('--wide-sidebar-backdrop-position-right', '0')
        document.documentElement.style.setProperty('--wide-sidebar-transition', 'transform .2s')
      } else if (window.innerWidth > 500) {
        document.documentElement.style.setProperty('--narrow-sidebar-display', 'none')
        document.documentElement.style.setProperty('--sidebar-width', 0)
        document.documentElement.style.setProperty('--wide-sidebar-backdrop-position-right', '0')
        document.documentElement.style.setProperty('--wide-sidebar-transition', 'transform .2s')
      }
    }
    const showNarrowHideWide = () => {
      let wideSidebarWidth = getComputedStyle(document.documentElement).getPropertyValue(`--wide-sidebar-width`).trim()
      let narrowSidebarWidth = getComputedStyle(document.documentElement).getPropertyValue(`--narrow-sidebar-width`).trim()

      document.documentElement.style.setProperty('--wide-sidebar-backdrop-position-right', '100%')

      if (window.innerWidth > 1330){
        document.documentElement.style.setProperty('--narrow-sidebar-display', 'block')
        document.documentElement.style.setProperty('--sidebar-width', narrowSidebarWidth)
        document.documentElement.style.setProperty('--wide-sidebar-display', 'none')
        document.documentElement.style.setProperty('--wide-sidebar-transform-left', 0)
      } else if (window.innerWidth > 850) {
        document.documentElement.style.setProperty('--narrow-sidebar-display', 'block')
        document.documentElement.style.setProperty('--sidebar-width', narrowSidebarWidth)
        document.documentElement.style.setProperty('--wide-sidebar-display', 'block')
        document.documentElement.style.setProperty('--wide-sidebar-transform-left', wideSidebarWidth)
      } else if (window.innerWidth > 500) {
        document.documentElement.style.setProperty('--narrow-sidebar-display', 'none')
        document.documentElement.style.setProperty('--sidebar-width', 0)
        document.documentElement.style.setProperty('--wide-sidebar-display', 'block')
        document.documentElement.style.setProperty('--wide-sidebar-transform-left', wideSidebarWidth)
      }
    }
    const switchSidebar = () => {
      let wideSidebarDisplay = getComputedStyle(document.documentElement).getPropertyValue(`--wide-sidebar-display`).trim()
      let wideSidebarTransformLeft = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(`--wide-sidebar-transform-left`).trim())
      console.log(wideSidebarDisplay, wideSidebarTransformLeft);

      if (window.innerWidth > 1330){
        if (wideSidebarDisplay === 'block'){
          showNarrowHideWide()
          store.commit('setNarrowSidebarMode')
        } else {
          showWideHideNarrow()
          store.commit('setWideSidebarMode')
        }
      } else if (window.innerWidth > 500){
        if (wideSidebarTransformLeft === 0){
          showNarrowHideWide()
          store.commit('setNarrowSidebarMode')
        } else {
          showWideHideNarrow()
          store.commit('setWideSidebarMode')
        }
      }
    }

    // switch light/dark mode
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
      if (darkMode === 'enabled'){
        disableDarkMode()
      } else {
        enableDarkMode()
      }
    }

    return {
      isSearching, isSearchBarExpanded, searchText, searchBar, clearSearch,
      toggleDarkMode,
      switchSidebar
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: var(--header-height);
  padding: 0 16px;
  background: var(--header-bg);
  z-index: var(--header-z-index);
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
  height: var(--btn-size);
  margin-left: var(--btn-size);
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
  &.enabled {
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
  width: var(--btn-size);
  height: var(--btn-size);
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
  margin-left: var(--btn-size);
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
  flex: 0 0 var(--btn-size);
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
  width: var(--btn-size);
  height: var(--btn-size);
  padding: 0 10px;
  border-radius: 50%;
  overflow: hidden;
  .img {
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>