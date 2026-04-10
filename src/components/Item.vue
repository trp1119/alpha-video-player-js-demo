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
            :style="{
              width: `${item.width}px`,
              height: `${item.height}px`
            }"
          >
            <AlphaVideoPlayer
              :key="playerKey"
              ref="playerRef"
              :src="videoSrc"
              :width="item.width"
              :height="item.height"
              :muted="muted"
              :loop="loop"
              :playback-rate="playbackRate"
              :orientation="item.orientation"
              :side="item.side"
              @initSuccess="isInit = true"
              @destroy="isInit = false"
            />
          </div>
        </div>
        <div class="controller">
          <div class="controller-item">
            <button :disabled="isInit" @click="initPlayer">初始化</button>
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
            <input :disabled="!isInit" v-model.number="playbackRate" type="range" step="0.5" min="0.5" max="2">
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
import { ref, onBeforeUnmount } from 'vue'
import type { IItem } from '../type'
import AlphaVideoPlayer from 'alpha-video-player-js/vue3'

/** 与 alpha-video-player-js/vue3 的 expose 对齐（TS 无法从 defineComponent 推断 expose） */
type AlphaVideoPlayerExpose = {
  play: () => void
  pause: () => void
  destroy: () => void
}

const props = defineProps<{
  item: IItem
}>()

const videoRef = ref<HTMLVideoElement>()
const playerRef = ref<AlphaVideoPlayerExpose | null>(null)
const muted = ref(true)
const loop = ref(false)
const playbackRate = ref(1)
const isInit = ref(false)
const videoSrc = ref(props.item.src)
const playerKey = ref(0)

const initPlayer = () => {
  playerKey.value += 1
}

const play = () => {
  videoRef.value?.play()
  playerRef.value?.play()
}

const pause = () => {
  videoRef.value?.pause()
  playerRef.value?.pause()
}

const destroy = () => {
  videoRef.value?.pause()
  if (videoRef.value) videoRef.value.currentTime = 0
  playerRef.value?.destroy()
}

const setSrc = () => {
  const { item } = props
  videoSrc.value = (videoSrc.value === item.src ? item.otherSrc : item.src) as string
  muted.value = true
  loop.value = false
  playbackRate.value = 1
}

onBeforeUnmount(() => {
  playerRef.value?.destroy()
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
