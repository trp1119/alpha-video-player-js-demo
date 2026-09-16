<template>
  <article class="player-card">
    <div class="player-card-header">
      <div>
        <p class="format-name">{{ localize(item.label) }}</p>
        <p class="format-description">{{ localize(item.desc) }}</p>
      </div>
      <span :class="['status', { 'status-ready': isInit }]"><i></i>{{ isInit ? copy.ready : copy.stopped }}</span>
    </div>

    <div class="comparison-grid">
      <section class="preview-panel">
        <div class="preview-label"><span>01</span>{{ copy.source }}</div>
        <div class="source-stage">
          <video
            ref="videoRef"
            :src="videoSrc"
            :muted="true"
            :loop="loop"
            :playbackRate="playbackRate"
            playsinline
          />
        </div>
        <p>{{ copy.sourceDescription }}</p>
      </section>

      <section class="preview-panel preview-panel-output">
        <div class="preview-label"><span>02</span>{{ copy.output }}</div>
        <div class="output-stage">
          <div class="output-scroll">
            <div class="scene">
              <div
                :class="['player-container', `player-container-${item.orientation}-${item.side}`]"
                :style="{ width: `${item.width}px`, height: `${item.height}px` }"
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
                  :alpha-scale="item.alphaScale"
                  :alpha-align="item.alphaAlign"
                  @init-success="isInit = true"
                  @destroy="isInit = false"
                />
              </div>
            </div>
          </div>
        </div>
        <p>{{ copy.outputDescription }}</p>
      </section>
    </div>

    <div class="controls" :aria-label="copy.output">
      <button class="control-primary" type="button" :disabled="!isInit" @click="play">{{ copy.play }}</button>
      <button type="button" :disabled="!isInit" @click="pause">{{ copy.pause }}</button>
      <button type="button" @click="recreatePlayer">{{ copy.recreate }}</button>
      <button type="button" :disabled="!isInit" @click="destroy">{{ copy.stop }}</button>
      <label class="control-toggle"><input v-model="muted" :disabled="!isInit" type="checkbox"><span></span>{{ copy.muted }}</label>
      <label class="control-toggle"><input v-model="loop" :disabled="!isInit" type="checkbox"><span></span>{{ copy.loop }}</label>
      <label class="rate-control">{{ copy.speed }} <strong>{{ playbackRate }}×</strong>
        <input v-model.number="playbackRate" :disabled="!isInit" type="range" step="0.5" min="0.5" max="2">
      </label>
      <button v-if="item.otherSrc" type="button" :disabled="!isInit" @click="setSrc">{{ copy.switchSource }}</button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import AlphaVideoPlayer, { type IAlphaVideoPlayerRef } from 'alpha-video-player-js/vue3'
import { COPY } from '../constants'
import type { ELocale, IItem, ILocalizedText } from '../type'

const props = defineProps<{
  item: IItem
  locale: ELocale
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const playerRef = ref<IAlphaVideoPlayerRef | null>(null)
const muted = ref(true)
const loop = ref(false)
const playbackRate = ref(1)
const isInit = ref(false)
const videoSrc = ref(props.item.src)
const playerKey = ref(0)
const copy = computed(() => COPY[props.locale].player)
const localize = (value: ILocalizedText) => value[props.locale]
const play = () => {
  void videoRef.value?.play()
  void playerRef.value?.play()
}

const pause = () => {
  videoRef.value?.pause()
  playerRef.value?.pause()
}

const recreatePlayer = () => {
  playerKey.value += 1
}

const destroy = () => {
  videoRef.value?.pause()
  if (videoRef.value) videoRef.value.currentTime = 0
  playerRef.value?.destroy()
}

const setSrc = () => {
  const { item } = props
  if (!item.otherSrc) return
  videoSrc.value = videoSrc.value === item.src ? item.otherSrc : item.src
  muted.value = true
  loop.value = false
  playbackRate.value = 1
}

onBeforeUnmount(() => {
  playerRef.value?.destroy()
})
</script>

<style scoped>
.player-card { overflow: hidden; border: 1px solid #dce1dd; border-radius: 14px; background: #fff; box-shadow: 0 22px 45px rgba(19,24,23,.06); }
.player-card-header { display: flex; justify-content: space-between; gap: 20px; align-items: start; padding: 26px 28px; border-bottom: 1px solid #e7ebe7; }.format-name { margin: 0 0 5px; font-size: 16px; font-weight: 740; letter-spacing: -.025em; }.format-description { margin: 0; color: #747b7a; font-size: 13px; }.status { flex: 0 0 auto; display: inline-flex; gap: 7px; align-items: center; margin-top: 3px; color: #8d9490; font-size: 11px; font-weight: 650; }.status i { width: 7px; height: 7px; border-radius: 50%; background: #b7beb9; }.status-ready { color: #25866d; }.status-ready i { background: #20b691; box-shadow: 0 0 0 4px rgba(32,182,145,.12); }
.comparison-grid { display: grid; grid-template-columns: 1fr 1fr; }.preview-panel { min-width: 0; padding: 24px 28px 21px; background: #fafbfa; }.preview-panel-output { border-left: 1px solid #e7ebe7; background: #fff; }.preview-label { display: flex; gap: 9px; align-items: center; margin-bottom: 16px; color: #2e3433; font-size: 11px; font-weight: 740; letter-spacing: .07em; text-transform: uppercase; }.preview-label span { color: #999f9b; }.source-stage, .output-stage { height: 540px; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid #e2e6e2; border-radius: 10px; background: #e5eae6; }.source-stage { background: #141819; }.source-stage video { width: 100%; height: 100%; object-fit: contain; }.output-stage { position: relative; background-image: linear-gradient(45deg, #d9e0db 25%, transparent 25%), linear-gradient(-45deg, #d9e0db 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d9e0db 75%), linear-gradient(-45deg, transparent 75%, #d9e0db 75%); background-size: 24px 24px; background-position: 0 0, 0 12px, 12px -12px, -12px 0; }.output-stage::before { content: ''; position: absolute; inset: 0; background: url('../assets/alpha-video-player-demo-background.png') center bottom / 250px 540px no-repeat; pointer-events: none; }.output-scroll { width: 100%; height: 100%; position: relative; z-index: 1; overflow: auto; }.scene { min-width: 100%; min-height: 100%; display: flex; align-items: end; justify-content: center; }.player-container { flex: 0 0 auto; position: relative; }.preview-panel > p { margin: 14px 0 0; color: #7a817e; font-size: 12px; line-height: 1.55; }
.controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; padding: 18px 28px; border-top: 1px solid #e7ebe7; background: #fbfcfb; }.controls button { min-height: 33px; padding: 0 12px; border: 1px solid #d8deda; border-radius: 6px; color: #4d5552; background: #fff; font-size: 12px; font-weight: 650; cursor: pointer; transition: all .18s ease; }.controls button:hover:not(:disabled) { border-color: #9c8aef; color: #5a39c6; }.controls button:disabled { opacity: .42; cursor: not-allowed; }.controls .control-primary { border-color: #6f48ef; color: #fff; background: #6f48ef; }.controls .control-primary:hover:not(:disabled) { color: #fff; background: #5935c7; }.control-toggle { display: inline-flex; gap: 7px; align-items: center; margin-left: 4px; color: #626966; font-size: 12px; cursor: pointer; }.control-toggle input { position: absolute; opacity: 0; pointer-events: none; }.control-toggle span { width: 26px; height: 15px; position: relative; display: inline-block; border-radius: 999px; background: #cbd2cd; transition: background .18s ease; }.control-toggle span::after { content: ''; width: 11px; height: 11px; position: absolute; left: 2px; top: 2px; border-radius: 50%; background: #fff; transition: transform .18s ease; }.control-toggle input:checked + span { background: #20b691; }.control-toggle input:checked + span::after { transform: translateX(11px); }.control-toggle input:disabled + span { opacity: .55; }.rate-control { display: inline-flex; gap: 7px; align-items: center; margin-left: 6px; color: #626966; font-size: 12px; }.rate-control strong { color: #323937; font-weight: 700; }.rate-control input { width: 80px; accent-color: #6f48ef; }
@media (max-width: 760px) { .player-card-header { align-items: start; flex-direction: column; padding: 20px; gap: 10px; }.comparison-grid { grid-template-columns: 1fr; }.preview-panel { padding: 20px; }.preview-panel-output { border-top: 1px solid #e7ebe7; border-left: 0; }.source-stage, .output-stage { height: 330px; }.controls { padding: 16px 20px; }.rate-control { width: 100%; margin: 3px 0 0; }.rate-control input { flex: 1; max-width: 180px; } }
</style>
