<template>
  <div class="topics-bar" ref="topicsBar">
    <div class="prev" @click="moveRight" v-show="!isLeftmost">
      <img :src="require(`../assets/image/svg/chevron-left-${$store.state.darkMode}.svg`)" alt="prev" class="icon">
    </div>
    <ul class="topics-list" ref="topicsList" :style="{ left: `-${offsetLeft}px`}">
      <li v-for="(topic, index) in topics" :key="index" class="topics-item">
        <button class="btn-pill" :class="{ 'enabled': index === 0 }" type="button">{{ topic }}</button>
      </li>
    </ul>
    <div class="next" @click="moveLeft" v-show="!isRightmost">
      <img :src="require(`../assets/image/svg/chevron-right-${$store.state.darkMode}.svg`)" alt="next" class="icon">
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
export default {
  setup(){
    const topics = ref(['全部', '遊戲', '合輯', '直播中', '園藝', '烹飪節目', '音樂', '手工藝', '烹飪', '視覺藝術', '最新上傳', '已觀看', '讓你耳目一新的影片'])

    const topicsBar = ref(null)
    const topicsList = ref(null)
    const isLeftmost = ref(true)
    const isRightmost = ref(false)
    const offsetLeft = ref(0)
    const offset = 200
    const overflow = ref(0)
    onMounted(() => {
      let topics = document.querySelectorAll('.topics-item')
      let totalWidth = [...topics].reduce((prev,topic) => {
        let topicWidth = parseFloat(getComputedStyle(topic).getPropertyValue('width'))
        return prev + topicWidth
      }, 0)

      topicsList.value.dataset.contentWidth = totalWidth
      topicsList.value.style.width = `${totalWidth}px`
      topicsList.value.style.margin = `0 auto`
      setTopicsbar()
    })
    const setTopicsbar = () => {
      const topicsBarWidth = parseFloat(getComputedStyle(topicsBar.value).getPropertyValue('width'))
      const topicsListWidth = parseFloat(topicsList.value.dataset.contentWidth)
      const isCrouded = topicsBarWidth < topicsListWidth
      
      if (isCrouded){
        document.documentElement.style.setProperty('--topicbar-position', 'absolute')
        overflow.value = topicsListWidth - topicsBarWidth
        isLeftmost.value = true
        isRightmost.value = false
      } else {
        document.documentElement.style.setProperty('--topicbar-position', 'static')
        overflow.value = 0
        isLeftmost.value = true
        isRightmost.value = true
      }
    }
    window.addEventListener('resize', setTopicsbar)
    onUnmounted(() => window.removeEventListener('resize', setTopicsbar))

    const moveLeft = () => {
      if (overflow.value > offsetLeft.value + offset){
        offsetLeft.value += offset
        isLeftmost.value = false
      } else if (overflow.value > offsetLeft.value){
        offsetLeft.value = overflow.value
        isLeftmost.value = false
        isRightmost.value = true
      }
    }
    const moveRight = () => {
      if (offsetLeft.value >= offset){
        offsetLeft.value -= offset
        isRightmost.value = false
      } else if (offsetLeft.value < offset){
        offsetLeft.value = 0
        isLeftmost.value = true
        isRightmost.value = false
      }
    }

    return { topics, topicsBar, topicsList, offsetLeft, moveLeft, moveRight, isLeftmost, isRightmost }
  }
}
</script>

<style scoped lang="scss">
.topics-bar {
  position: fixed;
  top: var(--header-height);
  right: 0;
  width: calc(100% - var(--topicbar-left-offset));
  height: var(--topicbar-height);
  background: var(--topicbar-bg);
  border-top: 1px solid var(--topicbar-border);
  border-bottom: 1px solid var(--topicbar-border);
  overflow: hidden;
}
.prev, .next {
  position: absolute;
  top: 0;
  @include flex-center;
  width: var(--topicbar-height);
  height: var(--topicbar-height);
  background: var(--topicbar-bg);
  cursor: pointer;
  z-index: 1;
  .icon {
    width: 16px;
    height: 16px;
  }
  &::after {
    content: '';
    position: absolute;
    width: 50px;
    height: 100%;
  }
}
.prev {
  left: 0;
  &::after {
    left: 100%;
    background-image: linear-gradient(to right, var(--topicbar-bg) 20%, rgba(33,33,33,0) 80%);
  }
}
.next {
  right: 0;
  &::after {
    right: 100%;
    background-image: linear-gradient(to right, rgba(33,33,33,0) 20%, var(--topicbar-bg) 80%);
  }
}
.topics-list {
  position: var(--topicbar-position);
  left: 0;
  height: 100%;
  width: auto;
  margin: 0 auto;
  transition: left .2s;
}
.topics-item {
  display: inline-block;
  padding: calc( (var(--topicbar-height) - var(--btn-pill-height)) / 2);
  padding-right: 0;
  &:first-child {
    padding-left: calc(var(--topicbar-height) - var(--btn-pill-height));
  }
  &:last-child {
    padding-right: calc(var(--topicbar-height) - var(--btn-pill-height));
  }
}
</style>