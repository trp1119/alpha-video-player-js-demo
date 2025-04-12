<template>
  <div class="home">
    <div class="tab">
      <div
        class="tab-item"
        v-for="(i, index) in list"
        :key="index"
      >
        <div
          :class="['tab-item-title', index === activeTab ? 'tab-item-title-active' : '']"
          @click="() => selectTab(index)"
        >{{ i.orientation }} - {{ i.side }}</div>
        <div class="tab-item-desc" >{{ i.desc }}</div>
      </div>
    </div>
    <div class="list">
      <div v-for="(i, index) in list" :key="index">
        <Item v-if="index === activeTab" :item="i" />
      </div>
    </div>
    <div class="sdk">
      sdk: <a target="_blank" href="https://www.npmjs.com/package/alpha-video-player-js">https://www.npmjs.com/package/alpha-video-player-js</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Item from './components/Item.vue'
import type { IItem } from './type'

const list = ref<IItem[]>([
  {
    src: 'http://static.trp1119.com/c5d17e5e4c034bcebb5d941b55b50b8a.mp4',
    orientation: 'landscape',
    side: 'front',
    width: 250,
    height: 540,
    desc: '横向视频 - RGB 通道视频在前',
    otherSrc: 'https://static.trp1119.com/d252d4feb0ee45b9be564b9393c41ac0.mp4',
  },
  {
    src: 'https://static.trp1119.com/877de31ebb984d5291fb4f2600f1067f.mp4',
    orientation: 'landscape',
    side: 'back',
    width: 250,
    height: 444,
    desc: '横向视频 - RGB 通道视频在后',
  },
  {
    src: 'https://static.trp1119.com/229b36c6157045ccad781587c6b2e4e0.mp4',
    orientation: 'portrait',
    side: 'front',
    width: 500,
    height: 268,
    desc: '纵向视频 - RGB 通道视频在前',
  },
  {
    src: 'https://static.trp1119.com/0a1b1c21abcf4c349fc477cbbd35f0ea.mp4',
    orientation: 'portrait',
    side: 'back',
    width: 250,
    height: 133,
    desc: '纵向视频 - RGB 通道视频在后',
  },
])

const activeTab = ref(0)

const selectTab = (index: number) => {
  activeTab.value = index
}
</script>

<style scoped>
  .home {
    width: 1200px;
    margin: 0 auto;
    padding: 10px 0;
  }
  .tab {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .tab-item-title {
    width: 200px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #CCC;
    border-radius: 5px;
    cursor: pointer;
  }
  .tab-item-title:hover, .tab-item-title-active {
    background-color: #CCC;
  }
  .tab-item-desc {
    margin-top: 10px;
    font-size: 14px;
  }
  .list {
    width: 100%;
    padding: 10px;
    margin-top: 20px;
  }

  .sdk {
    margin-top: 10px;
  }
</style>
