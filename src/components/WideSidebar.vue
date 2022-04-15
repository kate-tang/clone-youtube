<template>
  <div class="wide-sidebar">
    <div class="sidebar">
      <div class="head">
        <button type="button" class="btn-circle menu" @click="closeWideSidebar">
          <img :src="require(`../assets/image/svg/menu-${$store.state.darkMode}.svg`)" alt="menu icon" class="icon">
        </button>
        <Logo />
      </div>
      <div class="body">
        <nav class="nav">
          <div class="block">
            <ul>
              <li>
                <a href="#" class="btn-rectangle enabled">
                  <img :src="require(`../assets/image/svg/home-${$store.state.darkMode}.svg`)" alt="home" class="icon">
                  <span class="text">首頁</span>
                </a>
              </li>
              <li>
                <a href="#" class="btn-rectangle">
                  <img :src="require(`../assets/image/svg/explore-${$store.state.darkMode}.svg`)" alt="explore" class="icon">
                  <span class="text">探索</span>
                </a>
              </li>
              <li>
                <a href="#" class="btn-rectangle">
                  <img :src="require(`../assets/image/svg/shorts-${$store.state.darkMode}.svg`)" alt="shorts" class="icon">
                  <span class="text">Shorts</span>
                </a>
              </li>
              <li>
                <a href="#" class="btn-rectangle">
                  <img :src="require(`../assets/image/svg/subscriptions-${$store.state.darkMode}.svg`)" alt="subscriptions" class="icon">
                  <span class="text">訂閱內容</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="block">
            <ul>
              <li>
                <a href="#" class="btn-rectangle">
                  <img :src="require(`../assets/image/svg/library-${$store.state.darkMode}.svg`)" alt="library" class="icon">
                  <span class="text">媒體庫</span>
                </a>
              </li>
              <li>
                <a href="#" class="btn-rectangle">
                  <img :src="require(`../assets/image/svg/history-${$store.state.darkMode}.svg`)" alt="history" class="icon">
                  <span class="text">觀看記錄</span>
                </a>
              </li>
              <li>
                <a href="#" class="btn-rectangle">
                  <img :src="require(`../assets/image/svg/studio-${$store.state.darkMode}.svg`)" alt="studio" class="icon">
                  <span class="text">你的影片</span>
                </a>
              </li>
              <li>
                <a href="#" class="btn-rectangle">
                  <img :src="require(`../assets/image/svg/watchlater-${$store.state.darkMode}.svg`)" alt="watchlater" class="icon">
                  <span class="text">稍後觀看</span>
                </a>
              </li>
              <li>
                <a href="#" class="btn-rectangle">
                  <img :src="require(`../assets/image/svg/like-${$store.state.darkMode}.svg`)" alt="like" class="icon">
                  <span class="text">喜歡的影片</span>
                </a>
              </li>
              <li>
                <a href="#" class="btn-rectangle">
                  <img :src="require(`../assets/image/svg/chevron-down-${$store.state.darkMode}.svg`)" alt="chevron-down" class="icon">
                  <span class="text">顯示更多</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="block channels" v-if="subscribedChannels.length">
            <span class="title">訂閱內容</span>
            <ul>
              <li v-for="(channel, index) in subscribedChannels" :key="channel.id" v-show="index < 7 || showAllSubscribedChannels">
                <a href="#" class="btn-rectangle">
                  <img :src="channel.image" alt="channel thumbnail" class="icon">
                  <span class="text">{{ channel.name }}</span>
                </a>
              </li>
            </ul>
            <a href="#" class="btn-rectangle" @click="showAllSubscribedChannels = !showAllSubscribedChannels">
              <img :src="require(`../assets/image/svg/chevron-down-${$store.state.darkMode}.svg`)" alt="chevron-down" class="icon" v-if="!showAllSubscribedChannels">
              <span class="text" v-if="!showAllSubscribedChannels">顯示另外 {{ subscribedChannels.length - 7 }} 個項目</span>
              <img :src="require(`../assets/image/svg/chevron-up-${$store.state.darkMode}.svg`)" alt="chevron-down" class="icon" v-if="showAllSubscribedChannels">
              <span class="text" v-if="showAllSubscribedChannels">顯示較少</span>
            </a>
          </div>
          <div class="block">
            <span class="title">更多 <span class="bold">YOUTUBE</span> 功能</span>
            <ul>
              <li>
                <a href="#" class="btn-rectangle">
                  <img :src="require(`../assets/image/svg/premium-${$store.state.darkMode}.svg`)" alt="YouTube premium" class="icon">
                  <span class="text">YouTube Premium</span>
                </a>
              </li>
              <li>
                <a href="#" class="btn-rectangle">
                  <img :src="require(`../assets/image/svg/movie-${$store.state.darkMode}.svg`)" alt="movie" class="icon">
                  <span class="text">電影</span>
                </a>
              </li>
              <li>
                <a href="#" class="btn-rectangle">
                  <img :src="require(`../assets/image/svg/gaming-${$store.state.darkMode}.svg`)" alt="gaming" class="icon">
                  <span class="text">遊戲</span>
                </a>
              </li>
              <li>
                <a href="#" class="btn-rectangle">
                  <img :src="require(`../assets/image/svg/live-${$store.state.darkMode}.svg`)" alt="live" class="icon">
                  <span class="text">直播</span>
                </a>
              </li>
              <li>
                <a href="#" class="btn-rectangle">
                  <img :src="require(`../assets/image/svg/sport-${$store.state.darkMode}.svg`)" alt="sport" class="icon">
                  <span class="text">體育</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="block">
            <ul>
              <li>
                <a href="#" class="btn-rectangle">
                  <img :src="require(`../assets/image/svg/settings-${$store.state.darkMode}.svg`)" alt="settings" class="icon">
                  <span class="text">設定</span>
                </a>
              </li>
              <li>
                <a href="#" class="btn-rectangle">
                  <img :src="require(`../assets/image/svg/reporthistory-${$store.state.darkMode}.svg`)" alt="reporthistory" class="icon">
                  <span class="text">檢舉記錄</span>
                </a>
              </li>
              <li>
                <a href="#" class="btn-rectangle">
                  <img :src="require(`../assets/image/svg/question-${$store.state.darkMode}.svg`)" alt="question" class="icon">
                  <span class="text">說明</span>
                </a>
              </li>
              <li>
                <a href="#" class="btn-rectangle">
                  <img :src="require(`../assets/image/svg/comment-${$store.state.darkMode}.svg`)" alt="comment" class="icon">
                  <span class="text">提供意見</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <footer class="footer">
          <ul class="links">
            <li><a href="#">簡介</a></li>
            <li><a href="#">媒體</a></li>
            <li><a href="#">版權</a></li>
            <li><a href="#">與我們聯絡</a></li>
            <li><a href="#">創作者</a></li>
            <li><a href="#">廣告</a></li>
            <li><a href="#">開發人員</a></li>
          </ul>
          <ul class="links">
            <li><a href="#">條款</a></li>
            <li><a href="#">隱私權</a></li>
            <li><a href="#">政策與安全性</a></li>
            <li><a href="#">YouTube 運作方式</a></li>
            <li><a href="#">測試新功能</a></li>
          </ul>
          <div class="copyright">© 2022 Google LLC</div>
        </footer>
      </div>
    </div>
    <div class="backdrop" @click="closeWideSidebar"></div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Logo from './Logo.vue'

export default {
  components: { Logo },
  setup(){
    const closeWideSidebar = () => {
      document.querySelector('#toggleSidebar').click()
    }

    const subscribedChannels = ref([])
    const showAllSubscribedChannels = ref(false)

    const getChannels = async () => {
      const res = await fetch('https://randomuser.me/api/?results=10')
      const data = await res.json()

      const channels = data.results.map((item, index) => {
        return {
          name: `${item.name.first} ${item.name.last}`,
          image: item.picture.thumbnail,
          id: index
        }
      }).sort((a,b) => a.name > b.name ? 1 : -1)
      subscribedChannels.value = channels
    }
    getChannels()

    return { closeWideSidebar, subscribedChannels, showAllSubscribedChannels }
  }
}
</script>

<style scoped lang="scss">
.wide-sidebar {
  display: var(--wide-sidebar-display);
  flex: 0 0 var(--wide-sidebar-width);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: var(--wide-sidebar-backdrop-position-right);
  z-index: var(--wide-sidebar-z-index);
}

// sidebar
.sidebar {
  width: var(--wide-sidebar-width);
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--sidebar-bg);
  transform: translateX(calc(var(--wide-sidebar-transform-left) * -1));
  transition: var(--wide-sidebar-transition);
}
.head {
  flex: 0 0 var(--header-height);
  display: flex;
  align-items: center;
  height: var(--header-height);
  padding: 0 16px;
}
.body {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}
.block {
  padding: 12px 0;
  border-bottom: 1px solid var(--wide-sidebar-border);
}
.channels {
  .btn-rectangle {
    .icon {
      border-radius: 50%;
    }
  }
}
.title {
  display: block;
  padding: 8px var(--btn-icon-size);
  color: var(--wide-sidebar-text);
  font-size: 14px;
}
.footer {
  padding: 15px var(--btn-icon-size);
}
.links {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 12px;
  font-size: 13px;
  li {
    margin-right: 8px;
  }
  a {
    color: var(--wide-sidebar-text);
    text-decoration: none;
    line-height: 1.3;
  }
}
.copyright {
  color: var(--wide-sidebar-copyright-text);
  font-size: 12px;
  line-height: 1.5;
}

// backdrop
.backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: var(--wide-sidebar-backdrop-position-right);
  background: rgba(0,0,0,.3);
  z-index: -1;
}
</style>