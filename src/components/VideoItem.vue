<template>
  <router-link :to="`/watch?v=${video.id.videoId}`" class="video" :class="{ 'active': isActive }" @mousedown="isActive = true" @mouseup="isActive = false" @click.prevent v-if="video">
    <div class="thumbnail">
      <img :src="video.snippet.thumbnails.medium.url" alt="">
      <span class="live" v-if="video.duration === 'live'">
        <img src="../assets/image/svg/live-d.svg" alt="live" class="icon">
        直播
      </span>
      <span class="duration" v-else>{{ video.duration }}</span>
    </div>
    <div class="details">
      <router-link to="/" class="avatar">
        <img :src="channelIconUrl" alt="">
      </router-link>
      <div class="info">
        <h3 class="title" :title="video.snippet.title">{{ video.snippet.title }}</h3>
        <div class="channel">{{ video.snippet.channelTitle }}</div>
        <div class="data">
          <span class="view">觀看次數：{{ video.approxViewCount }}次</span>
          <span class="published-time">{{ publishedAt }}</span>
        </div>
      </div>
      <button type="button" class="more btn-circle" @click.prevent>
        <img :src="require(`../assets/image/svg/dots-${$store.state.darkMode}.svg`)" alt="more" class="icon">
      </button>
    </div>
  </router-link>
  <div class="video skeleton" v-else>
    <div class="thumbnail">
      <div class="box"></div>
    </div>
    <div class="details">
      <div class="avatar"></div>
      <div class="info">
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { convertTimeToTimeAgo } from '../helpers'

export default {
  props: ['video'],
  setup(props) {
    const isActive = ref(false)
    const publishedAt = ref('')
    const channelIconUrl = ref('')
    const channelId = ref('')

    const generateData = async () => {
      // get published time
      publishedAt.value = convertTimeToTimeAgo(props.video.snippet.publishedAt)
  
      // get channel thumbnail
      channelId.value = props.video.snippet.channelId
      const channelsApiRes = await fetch(`${process.env.VUE_APP_YOUTUBE_API}/channels?id=${channelId.value}&part=snippet&key=${process.env.VUE_APP_YOUTUBE_API_KEY}`)
      const channelsApiData = await channelsApiRes.json()
      channelIconUrl.value = channelsApiData.items[0].snippet.thumbnails.default.url;
    }

    if (props.video){
      generateData()
    }

    return { isActive, publishedAt, channelIconUrl, channelId }
  },
}
</script>

<style scoped lang="scss">
.video {
  flex: 1 1;
  display: block;
  position: relative;
  max-width: var(--video-max-width);
  min-width: var(--video-min-width);
  margin: 0 8px 40px 8px;
  padding: 5px;
  border-radius: 3px;
  &.active {
    @include btn-active;
  }
  &:hover {
    .more {
      opacity: 1;
    }
  }
  &.skeleton {
    pointer-events: none;
    .thumbnail {
      padding-bottom: 57%;
      .box {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--videogrid-video-skeleton-primary-bg);
      }
    }
    .details {
      .avatar {
        background: var(--videogrid-video-skeleton-secondary-bg);
      }
      .info {
        transform: translateY(-3px);
        .line {
          width: 100%;
          height: 20px;
          background: var(--videogrid-video-skeleton-secondary-bg);
          &:nth-child(2) {
            width: 70%;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
.thumbnail {
  position: relative;
  img {
    width: 100%;
  }
  .live, .duration {
    display: block;
    position: absolute;
    bottom: 7px;
    right: 4px;
    color: #FFF;
    font-size: 12px;
    border-radius: 2px;
  }
  .live {
    display: flex;
    align-items: center;
    padding: 2px 3px;
    background: #BC0506;
    .icon {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
  }
  .duration {
    padding: 3px;
    background: rgba(0,0,0,.7);
    font-weight: bold;
  }
}
.details {
  position: relative;
  display: flex;
  margin-top: 12px;
}
.avatar {
  flex: 0 0 36px;
  display: block;
  width: 36px;
  height: 36px;
  margin-right: 12px;
  background: red;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
  }
}
.info {
  flex: 1;
  margin-right: 24px;
  .title {
    color: var(--videogrid-video-primary-text);
    font-size: 14px;
    @supports (-webkit-line-clamp: 2){
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      max-height: 38px;
      line-height: 1.3;
    }
    @supports not(-webkit-line-clamp: 2){
      overflow: hidden;
      position: relative; 
      line-height: 1.3em;
      max-height: 2.6em; 
      text-align: justify;  
      margin-right: -1em;
      padding-right: 1em;
      &:before {
        content: '...';
        position: absolute;
        right: 0;
        bottom: 0;
      }
      &:after {
        content: '';
        position: absolute;
        right: 0;
        width: 1em;
        height: 1em;
        margin-top: 0.2em;
        background: var(--videogrid-bg);
      }
    }
  }
  .channel, .data {
    color: var(--videogrid-video-secondary-text);
    font-size: 12px;
  }
  .channel {
    margin-top: 8px;
    &:hover {
      color: var(--videogrid-video-primary-text);
    }
  }
  .data {
    margin-top: 5px;
  }
  .published-time {
    position: relative;
    margin-left: 12px;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: -7px;
      width: 2px;
      height: 2px;
      margin: auto 0;
      background: var(--videogrid-video-secondary-text);
      border-radius: 50%;
    }
  }
}
.more {
  all: unset;
  @include flex-center;
  @include btn-active;
  position: absolute;
  top: -8px;
  right: -12px;
  width: 40px;
  height: 40px;
  opacity: 0;
  border-radius: 50%;
  .icon {
    width: 24px;
    height: 24px;
  }
}
</style>