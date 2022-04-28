<template>
  <div class="video-grid">
    <div class="videos-container">
      <VideoItem v-for="(video, index) in videos" :key="index" :video="video" />
      <VideoItem class="skeleton" v-for="n in skeletonVideoQty" :key="n" />
    </div>
    <div class="loader">
      <svg class="spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
    </div>
  </div>
</template>

<script>
import { computed, nextTick, onMounted, ref } from 'vue'
import VideoItem from './VideoItem.vue'
import { convertISO8601ToHMS, convertNumToApproxChNum } from '../helpers'
import store from '../store'
import randomWords from 'random-words'

export default {
  components: { VideoItem },
  setup(){
    const videos = ref([])
    const num = ref(50)
    const isFetching = ref(false)
    const skeletonVideoQty = ref(12)

    const getVideo = async () => {
      isFetching.value = true
      let tempVideos
      const keywords = randomWords(100).join('|')

      // get random vidoes
      const searchApiRes = await fetch(`${process.env.VUE_APP_YOUTUBE_API}/search?part=snippet&regionCode=TW&relevanceLanguage=zh-Hant&location=23.797971,121.016547&locationRadius=220km&maxResults=${num.value}&type=video&q=${keywords}&key=${process.env.VUE_APP_YOUTUBE_API_KEY}`)
      const searchApiData = await searchApiRes.json()
      tempVideos = searchApiData.items

      // get video duration
      const videoIds = searchApiData.items.map(video => video.id.videoId).toString()
      const videosApiRes = await fetch(`${process.env.VUE_APP_YOUTUBE_API}/videos?id=${videoIds}&part=contentDetails,statistics&key=${process.env.VUE_APP_YOUTUBE_API_KEY}`)
      const videosApiData = await videosApiRes.json()
      // console.log(searchApiData.items, videosApiData.items);

      tempVideos = tempVideos.map((video, index) => {
        const duration = convertISO8601ToHMS(videosApiData.items[index].contentDetails.duration)
        const approxViewCount = convertNumToApproxChNum(videosApiData.items[index].statistics.viewCount)
        video = {
          ...video,
          duration,
          viewCount: videosApiData.items[index].statistics.viewCount,
          approxViewCount
        }
        return video
      });
      // console.log(tempVideos);
      videos.value = videos.value.concat(tempVideos)

      isFetching.value = false

      // if it's initial page load, then keep grabbing videos until skeletons are out of sight
      // if not, then ignore
      if (store.state.ispageReady) return
      nextTick(() => {
        const skeleton = document.querySelector('.skeleton')
        const isSkeletonVisible = skeleton.getBoundingClientRect().top < window.innerHeight
        if (isSkeletonVisible){
          getVideo()
        } else {
          store.commit('setPageToReady')
          // console.log('home page ready');
        }
      })
    }

    onMounted(() => {
      // get topmost skeleton
      const skeleton = document.querySelector('.skeleton')

      // when topmost skeleton is scrolled into view, then get next batch of videos with Intersection Observer
      let options = {}
      let callback = (entry, observer) => {
        if (!entry[0].isIntersecting || isFetching.value) return
  
        getVideo()
      }
      let observer = new IntersectionObserver(callback, options);
      observer.observe(skeleton);
    })
    
    return { videos, skeletonVideoQty }
  }
}
</script>

<style scoped lang="scss">
.video-grid {
  min-height: 100vh;
  margin-top: calc(var(--header-height) + var(--topicbar-height));
  margin-left: var(--sidebar-width);
  background: var(--videogrid-bg);
}
.videos-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 2256px;
  width: calc(100% - 32px);
  margin: 0 auto;
  padding-top: 24px;
}

.loader {
  position: relative;
  margin: 0 auto;
  padding: 10px 0 50px 0;
  width: 28px;
  height: 28px;
  z-index: 2;
  overflow: hidden;
  .spinner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: rotate 2s linear infinite;
    .path {
      stroke: var(--videogrid-loader-bg);
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }
  }
}
@keyframes rotate {
  100% { transform: rotate(360deg); }
}
@keyframes dash {
    0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
   50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
  100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
}
</style>