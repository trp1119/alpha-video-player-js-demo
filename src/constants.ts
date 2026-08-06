import { ELocale, type IFeature, type IItem } from './type'
import alphaScaleHalfVideo from './assets/videos/alpha-scale-half.mp4'
import landscapeBackVideo from './assets/videos/landscape-back.mp4'
import landscapeFrontAltVideo from './assets/videos/landscape-front-alt.mp4'
import landscapeFrontVideo from './assets/videos/landscape-front.mp4'
import portraitBackVideo from './assets/videos/portrait-back.mp4'
import portraitFrontVideo from './assets/videos/portrait-front.mp4'

export const COPY = {
  [ELocale.English]: {
    nav: { features: 'Features', playground: 'Playground', format: 'Format', start: 'Get started' },
    hero: {
      eyebrow: 'Browser-native transparent video',
      title: 'Give video',
      accent: 'real transparency',
      description: 'A lightweight JavaScript player for RGB + Alpha packed video. Render polished, transparent motion on the web with WebGL and a Canvas fallback',
      explore: 'Explore the player',
      quickStart: 'View quick start',
      meta: ['Zero runtime dependencies', 'WebGL + Canvas 2D', 'Vue / React ready'],
      active: 'alpha channel active',
    },
    features: { eyebrow: 'Built for production', title: 'One compact player', accent: 'Several encoding formats' },
    playground: {
      eyebrow: 'Interactive playground',
      title: 'See the alpha channel at work',
      description: 'Select a packed format, then compare its source frame with the SDK’s transparent output',
    },
    format: {
      eyebrow: 'The format',
      title: 'One video frame',
      accent: 'Two kinds of information',
      description: 'A transparent video packs RGB pixels and a grayscale Alpha mask into one frame. The player samples each region using',
      suffix: 'and produces an RGBA output.',
      documentation: 'Read the full documentation',
      packedFrame: 'Packed frame',
      renderedOutput: 'Rendered output',
      colour: 'colour',
      mask: 'mask',
    },
    install: { eyebrow: 'Get started', title: 'From install to first frame', accent: 'in a few lines', terminal: 'Terminal' },
    footer: 'Open source transparent video player for the web.',
    player: {
      ready: 'Player ready', stopped: 'Player stopped', source: 'Packed source', output: 'Transparent output',
      sourceDescription: 'One frame contains the RGB image and its grayscale Alpha mask.',
      outputDescription: 'The SDK samples the mask and composes an RGBA frame in real time.',
      play: 'Play', pause: 'Pause', recreate: 'Recreate', stop: 'Stop', muted: 'Muted', loop: 'Loop', speed: 'Speed', switchSource: 'Switch source',
    },
  },
  [ELocale.Chinese]: {
    nav: { features: '特性', playground: '在线体验', format: '编码格式', start: '快速开始' },
    hero: {
      eyebrow: '浏览器端透明视频渲染',
      title: '让视频，',
      accent: '自然融入界面',
      description: '为 Web 端提供透明视频渲染能力。使用 RGB + Alpha 视频编码，在浏览器中输出带透明通道的动态画面',
      explore: '立即体验',
      quickStart: '查看接入方式',
      meta: ['无运行时依赖', 'WebGL 优先，Canvas 兜底', '支持 Vue 与 React'],
      active: 'Alpha 通道已启用',
    },
    features: { eyebrow: '为真实业务而生', title: '透明视频播放，', accent: '从接入到渲染都更轻' },
    playground: {
      eyebrow: '在线体验',
      title: '直接查看透明视频的渲染效果',
      description: '选择不同封装方式：左侧为原始拼合视频，右侧为播放器合成的透明画面',
    },
    format: {
      eyebrow: '编码格式',
      title: '一帧视频，',
      accent: '承载颜色与透明度',
      description: '透明视频将彩色画面和灰度遮罩编码在同一帧中。播放器依据',
      suffix: '定位两部分区域，实时合成 RGBA 画面',
      documentation: '阅读完整文档',
      packedFrame: '拼合帧',
      renderedOutput: '渲染输出',
      colour: '彩色图像',
      mask: '透明遮罩',
    },
    install: { eyebrow: '快速开始', title: '几行代码，', accent: '即可接入透明视频', terminal: '终端' },
    footer: '面向 Web 的透明视频开源播放器',
    player: {
      ready: '播放器已就绪', stopped: '播放器已停止', source: '原始拼合视频', output: '透明视频渲染结果',
      sourceDescription: '同一帧内同时包含彩色图像与 Alpha 灰度遮罩。',
      outputDescription: '播放器读取 Alpha 区域，并实时写入输出画面的透明通道。',
      play: '播放', pause: '暂停', recreate: '重建', stop: '停止', muted: '静音', loop: '循环', speed: '速度', switchSource: '切换资源',
    },
  },
} as const

export const DEMO_ITEMS: readonly IItem[] = [
  {
    id: 'landscape-front',
    label: { en: 'Landscape · RGB first', zh: '横向 · RGB 在前' },
    src: landscapeFrontVideo,
    orientation: 'landscape', side: 'front', width: 250, height: 540,
    desc: { en: 'Horizontal packing with RGB on the left and Alpha on the right.', zh: '横向拼合，RGB 位于左侧，Alpha 位于右侧。' },
    otherSrc: landscapeFrontAltVideo,
  },
  {
    id: 'landscape-back',
    label: { en: 'Landscape · Alpha first', zh: '横向 · Alpha 在前' },
    src: landscapeBackVideo,
    orientation: 'landscape', side: 'back', width: 250, height: 444,
    desc: { en: 'Horizontal packing with Alpha on the left and RGB on the right.', zh: '横向拼合，Alpha 位于左侧，RGB 位于右侧。' },
  },
  {
    id: 'portrait-front',
    label: { en: 'Portrait · RGB first', zh: '纵向 · RGB 在前' },
    src: portraitFrontVideo,
    orientation: 'portrait', side: 'front', width: 500, height: 268,
    desc: { en: 'Vertical packing with RGB on top and Alpha on the bottom.', zh: '纵向拼合，RGB 位于上方，Alpha 位于下方。' },
  },
  {
    id: 'portrait-back',
    label: { en: 'Portrait · Alpha first', zh: '纵向 · Alpha 在前' },
    src: portraitBackVideo,
    orientation: 'portrait', side: 'back', width: 250, height: 133,
    desc: { en: 'Vertical packing with Alpha on top and RGB on the bottom.', zh: '纵向拼合，Alpha 位于上方，RGB 位于下方。' },
  },
  {
    id: 'alpha-scale-half',
    label: { en: 'Alpha Scale 50%', zh: 'Alpha 缩放 50%' },
    src: alphaScaleHalfVideo,
    orientation: 'landscape', side: 'front', alphaScale: 0.5, alphaAlign: 'start', width: 250, height: 443,
    desc: { en: 'Alpha is scaled to 50% on both axes and aligned to the start edge.', zh: 'Alpha 宽高均缩放至 50%，并从起始侧对齐。' },
  },
]

export const FEATURES: readonly IFeature[] = [
  { icon: '◐', title: { en: 'Alpha video on the web', zh: '浏览器透明视频渲染' }, description: { en: 'Compose packed RGB and Alpha video into transparent motion in real time.', zh: '在 Canvas 上合成 RGB 与 Alpha 数据，输出带透明通道的动态画面。' } },
  { icon: '◫', title: { en: 'WebGL first', zh: 'WebGL 优先' }, description: { en: 'Use WebGL whenever available and automatically fall back to Canvas 2D.', zh: '优先使用 WebGL 渲染；受限环境自动回退至 Canvas 2D。' } },
  { icon: '↔', title: { en: 'Flexible layouts', zh: '适配主流封装格式' }, description: { en: 'Support horizontal and vertical packing, with either RGB or Alpha first.', zh: '支持横向 / 纵向拼合，以及 RGB 与 Alpha 的前后排列。' } },
  { icon: '½', title: { en: 'Scaled alpha', zh: '适配新型 Alpha 编码' }, description: { en: 'Use alphaScale and alphaAlign for encodings with a smaller Alpha region.', zh: '使用 alphaScale 与 alphaAlign 兼容缩放后的 Alpha 区域。' } },
]

export const USAGE_SNIPPETS = [
  { name: 'JavaScript', code: `import Render from 'alpha-video-player-js'\n\nconst player = new Render({\n  container: document.querySelector('#player'),\n  src: '/assets/intro.mp4',\n  orientation: 'landscape',\n  side: 'front',\n})\n\nplayer.play()` },
  { name: 'Vue 3', code: `<script setup lang="ts">\nimport AlphaVideoPlayer from 'alpha-video-player-js/vue3'\n<\/script>\n\n<template>\n  <AlphaVideoPlayer :src="src" :width="250" :height="443"\n    orientation="landscape" side="front" :alpha-scale="0.5" />\n<\/template>` },
  { name: 'Vue 2', code: `<template>\n  <AlphaVideoPlayer :src="src" :width="250" :height="443"\n    orientation="landscape" side="front" />\n<\/template>\n\n<script>\nimport AlphaVideoPlayer from 'alpha-video-player-js/vue2'\nexport default { components: { AlphaVideoPlayer } }\n<\/script>` },
  { name: 'React', code: `import AlphaVideoPlayer from 'alpha-video-player-js/react'\n\nexport function App() {\n  return <AlphaVideoPlayer src={src} width={250} height={443}\n    orientation="landscape" side="front" alphaScale={0.5} />\n}` },
] as const
