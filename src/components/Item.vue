<template>
  <div class="item">
    <!-- 原视频 -->
    <div class="origin">
      <video :src="videoSrc" ref="videoRef" :muted="true" :loop="loop" :playbackRate="playbackRate" />
      <span class="title">原视频</span>
    </div>
    <!-- 融合视频 -->
    <div class="blend">
      <div class="main">
        <div class="content">
          <div
            :class="['container', `container-${item.orientation}-${item.side}`]"
            ref="containerRef"
            :style="{
              width: `${item.width}px`,
              height: `${item.height}px`
            }"
          ></div>
        </div>
        <div class="controller">
          <div class="controller-item">
            <button :disabled="isInit"  @click="initPlayer">初始化</button>
          </div>
          <div class="controller-item">
            <button :disabled="!isInit" @click="play">播放</button>
          </div>
          <div class="controller-item">
            <button :disabled="!isInit" @click="pause">暂停</button>
          </div>
          <div class="controller-item">
            <button :disabled="!isInit" @click="destroy">销毁</button>
          </div>
          <div class="controller-item">
            静音
            <input :disabled="!isInit" v-model="muted" type="checkbox">
          </div>
          <div class="controller-item">
            循环
            <input :disabled="!isInit" v-model="loop" type="checkbox">
          </div>
          <div class="controller-item">
            倍速 ×{{ playbackRate }} <br />
            <input :disabled="!isInit" v-model="playbackRate" type="range" step="0.5" min="0.5" max="2">
          </div>
          <div class="controller-item" v-if="item.otherSrc">
            <button :disabled="!isInit" @click="setSrc">换一个</button>
          </div>
        </div>
      </div>
      <span class="title">融合视频</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import type { IItem } from '../type'
import AlphaVideoPlayerJs from 'alpha-video-player-js'

const props = defineProps<{
  item: IItem
}>()

const containerRef = ref<HTMLElement>()
const videoRef = ref<HTMLVideoElement>()
const muted = ref(true)
const loop = ref(false)
const playbackRate = ref(1)
const isInit = ref(false)
const videoSrc = ref(props.item.src)

let player: AlphaVideoPlayerJs

const initPlayer = () => {
  if (!containerRef.value) return
  const item = props.item

  player = new AlphaVideoPlayerJs({
    container: containerRef.value,
    src: item.src,
    muted: muted.value,
    loop: loop.value,
    playbackRate: playbackRate.value,
    orientation: item.orientation,
    side: item.side,
    onInitSuccess: () => {
      isInit.value = true
    },
    onDestroy: () => {
      isInit.value = false
    },
  })
}

const play = () => {
  videoRef.value && videoRef.value.play()
  player.play()
}

const pause = () => {
  videoRef.value && videoRef.value.pause()
  player.pause()
}

const destroy = () => {
  videoRef.value && videoRef.value.pause()
  videoRef.value && (videoRef.value.currentTime = 0)

  player.destroy()
}

const setSrc = () => {
  const item = props.item
  videoSrc.value = (videoSrc.value === item.src ? item.otherSrc : item.src) as string
  player.setSrc(videoSrc.value)

  muted.value = true
  loop.value = false
  playbackRate.value = 1
}

const item = computed(() => props.item)

watch(muted, (newVal) => {
  player.setMute(newVal)
})

watch(loop, (newVal) => {
  player.setLoop(newVal)
})

watch(playbackRate, (newVal) => {
  player.setPlaybackRate(newVal)
})

onMounted(() => {
  initPlayer()
})

onBeforeUnmount(() => {
  player && player.destroy()
})
</script>

<style scoped>
  .item {
    width: 100%;
    height: 610px;
    display: flex;
  }
  .origin, .blend {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #CCC;
    position: relative;
    flex-direction: column;
  }
  .title {
    margin-top: 10px;
  }
  .origin {
    border-right: none;
  }
  .content {
    width: 250px;
    height: 540px;
    background-image: url(https://static.trp1119.com/alpha-video-player-js-demo-bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
  }
  .origin video {
    width: 500px;
  }
  .main {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .container {
    position: absolute;
    bottom: 0;
  }
  .container-portrait-front {
    bottom: 100px;
    right: 15px;
  }
  .container-portrait-back {
    bottom: 100px;
  }
  .controller {
    position: absolute;
    right: 10px;
    width: 120px;
    border-radius: 5px;
    border: 1px solid #CCC;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #eee;
  }
  .controller-item {
    margin: 10px;
    text-align: center;
  }
  .controller-item button {
    width: 80px;
    height: 30px;
    cursor: pointer;
  }
  input[type='range'] {
    width: 100px;
    margin-top: 10px;
  }
</style>
