<template>
  <div :class="['site-shell', `locale-${locale}`]">
    <header class="site-header">
      <a class="brand" href="#top" aria-label="alpha-video-player-js">
        <span class="brand-mark"><i></i><i></i></span><span>alpha-video-player-js</span>
      </a>
      <nav class="site-nav" aria-label="Main navigation">
        <a href="#features">{{ copy.nav.features }}</a><a href="#playground">{{ copy.nav.playground }}</a>
        <a href="#format">{{ copy.nav.format }}</a><a href="#install">{{ copy.nav.start }}</a>
      </nav>
      <div class="header-actions">
        <div class="language-switch" role="group" aria-label="Language">
          <button :class="{ active: locale === ELocale.English }" type="button" @click="locale = ELocale.English">EN</button>
          <button :class="{ active: locale === ELocale.Chinese }" type="button" @click="locale = ELocale.Chinese">中文</button>
        </div>
        <a class="header-link" href="https://github.com/trp1119/alpha-video-player-js" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
      </div>
    </header>

    <main id="top">
      <section class="hero section-wrap">
        <div class="hero-copy">
          <p class="eyebrow"><span></span>{{ copy.hero.eyebrow }}</p>
          <h1>{{ copy.hero.title }}<em>{{ copy.hero.accent }}</em></h1>
          <p class="hero-description">{{ copy.hero.description }}</p>
          <div class="hero-actions">
            <button class="button button-primary" type="button" @click="scrollToPlayground">{{ copy.hero.explore }} <span aria-hidden="true">↓</span></button>
            <a class="button button-secondary" href="#install">{{ copy.hero.quickStart }}</a>
          </div>
          <div class="hero-meta"><span v-for="meta in copy.hero.meta" :key="meta">{{ meta }}</span></div>
        </div>

        <div class="hero-visual" :aria-label="copy.hero.active">
          <div class="visual-glow"></div><div class="visual-orbit visual-orbit-one"></div><div class="visual-orbit visual-orbit-two"></div>
          <div class="visual-window">
            <div class="window-bar"><span></span><span></span><span></span><b>alpha-video-player-js</b></div>
            <div class="window-canvas">
              <div class="shape shape-orbit"></div><div class="shape shape-square"></div><div class="shape shape-disc"></div><div class="shape shape-ring"></div>
              <div class="visual-caption"><i></i>{{ copy.hero.active }}</div>
            </div>
          </div>
          <div class="format-pill format-pill-rgb">RGB</div><div class="format-pill format-pill-alpha">α</div>
        </div>
      </section>

      <section id="features" class="features section-wrap">
        <div class="section-heading"><p class="eyebrow">{{ copy.features.eyebrow }}</p><h2>{{ copy.features.title }}<br><span>{{ copy.features.accent }}</span></h2></div>
        <div class="feature-grid"><article v-for="feature in FEATURES" :key="feature.icon" class="feature-card"><span class="feature-icon">{{ feature.icon }}</span><h3>{{ localize(feature.title) }}</h3><p>{{ localize(feature.description) }}</p></article></div>
      </section>

      <section id="playground" ref="playgroundSection" class="playground section-wrap">
        <div class="playground-heading"><div><p class="eyebrow">{{ copy.playground.eyebrow }}</p><h2>{{ copy.playground.title }}</h2></div><p>{{ copy.playground.description }}</p></div>
        <div class="demo-tabs" role="tablist" :aria-label="copy.playground.title">
          <button v-for="(item, index) in DEMO_ITEMS" :key="item.id" :class="['demo-tab', { 'demo-tab-active': activeDemo === index }]" type="button" role="tab" :aria-selected="activeDemo === index" @click="activeDemo = index"><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ localize(item.label) }}</button>
        </div>
        <Item v-if="activeItem" :key="activeItem.id" :item="activeItem" :locale="locale" />
      </section>

      <section id="format" class="format-section section-wrap">
        <div class="format-copy">
          <p class="eyebrow">{{ copy.format.eyebrow }}</p><h2>{{ copy.format.title }}<br><span>{{ copy.format.accent }}</span></h2>
          <p>{{ copy.format.description }} <code>orientation</code>、<code>side</code>、<code>alphaScale</code> {{ locale === ELocale.English ? 'and' : '与' }} <code>alphaAlign</code> {{ copy.format.suffix }}</p>
          <a href="https://github.com/trp1119/alpha-video-player-js" target="_blank" rel="noreferrer">{{ copy.format.documentation }} <span aria-hidden="true">↗</span></a>
        </div>
        <div class="format-diagram" :aria-label="copy.format.title">
          <div class="diagram-source"><span class="diagram-label">{{ copy.format.packedFrame }}</span><div class="packed-frame"><div class="rgb-panel"><b>RGB</b><span>{{ copy.format.colour }}</span></div><div class="alpha-panel"><b>α</b><span>{{ copy.format.mask }}</span></div></div></div>
          <div class="diagram-arrow" aria-hidden="true">→</div>
          <div class="diagram-output"><span class="diagram-label">{{ copy.format.renderedOutput }}</span><div class="output-frame"><div></div><b>RGBA</b></div></div>
        </div>
      </section>

      <section id="install" class="install-section section-wrap">
        <div class="install-intro"><p class="eyebrow">{{ copy.install.eyebrow }}</p><h2>{{ copy.install.title }}<br><span>{{ copy.install.accent }}</span></h2></div>
        <div class="code-stack">
          <div class="code-block"><div class="code-title"><span></span>{{ copy.install.terminal }}</div><pre><code>npm install alpha-video-player-js</code></pre></div>
          <div v-for="snippet in USAGE_SNIPPETS" :key="snippet.name" class="code-block code-block-main"><div class="code-title"><span></span>{{ snippet.name }}</div><pre><code>{{ snippet.code }}</code></pre></div>
        </div>
      </section>
    </main>

    <footer class="site-footer section-wrap"><a class="brand" href="#top"><span class="brand-mark"><i></i><i></i></span>alpha-video-player-js</a><p>{{ copy.footer }}</p><a href="https://www.npmjs.com/package/alpha-video-player-js" target="_blank" rel="noreferrer">npm ↗</a></footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Item from './components/Item.vue'
import { COPY, DEMO_ITEMS, FEATURES, USAGE_SNIPPETS } from './constants'
import { ELocale, type ILocalizedText } from './type'

const getInitialLocale = (): ELocale => (
  typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('zh')
    ? ELocale.Chinese
    : ELocale.English
)

const locale = ref<ELocale>(getInitialLocale())
const activeDemo = ref(0)
const playgroundSection = ref<HTMLElement | null>(null)
const copy = computed(() => COPY[locale.value])
const activeItem = computed(() => DEMO_ITEMS[activeDemo.value])
const localize = (value: ILocalizedText) => value[locale.value]

const scrollToPlayground = () => {
  playgroundSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
:global(*) { box-sizing: border-box; }
:global(html) { scroll-behavior: smooth; background: #101214; }
:global(body) { margin: 0; min-width: 320px; background: #f5f6f4; color: #101214; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
:global(button), :global(a) { font: inherit; }
:global(button) { border: 0; }
:global(a) { color: inherit; text-decoration: none; }

.site-shell { overflow: hidden; }
.locale-zh h1 { font-weight: 700; letter-spacing: .055em; }.locale-zh h2 { letter-spacing: .035em; }.locale-zh .hero-description, .locale-zh .feature-card p, .locale-zh .format-copy > p:not(.eyebrow), .locale-zh .playground-heading > p { letter-spacing: .018em; }.locale-zh .feature-card h3 { letter-spacing: .015em; }
.section-wrap { width: min(1180px, calc(100% - 48px)); margin: 0 auto; }
.site-header { width: min(1280px, calc(100% - 48px)); height: 84px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
.brand { display: inline-flex; gap: 10px; align-items: center; font-size: 14px; font-weight: 720; letter-spacing: -0.03em; }
.brand-mark { width: 26px; height: 26px; position: relative; display: inline-block; border: 2px solid #101214; border-radius: 8px; transform: rotate(-8deg); }
.brand-mark i { position: absolute; display: block; width: 7px; height: 7px; border-radius: 50%; background: #6f48ef; }
.brand-mark i:first-child { left: 4px; top: 4px; }.brand-mark i:last-child { right: 4px; bottom: 4px; background: #20b691; }
.site-nav { display: flex; align-items: center; gap: 30px; color: #5d6265; font-size: 13px; }
.site-nav a:hover, .format-copy a:hover, .site-footer a:hover { color: #6f48ef; }
.header-link { padding: 10px 14px; border: 1px solid #d9dcda; border-radius: 999px; font-size: 13px; transition: background .2s ease; }.header-link:hover { background: #fff; }
.header-actions { display: flex; gap: 10px; align-items: center; }.language-switch { display: flex; padding: 3px; border-radius: 999px; background: #e8ebe8; }.language-switch button { min-width: 35px; min-height: 28px; border-radius: 999px; color: #747a77; background: transparent; font-size: 10px; font-weight: 760; cursor: pointer; }.language-switch button.active { color: #fff; background: #101214; }

.hero { min-height: 670px; display: grid; grid-template-columns: 1.05fr .95fr; align-items: center; gap: 70px; padding: 86px 0 104px; }
.eyebrow { margin: 0 0 18px; color: #6f48ef; font-size: 15px; font-weight: 760; letter-spacing: .12em; text-transform: uppercase; }.eyebrow span { display: inline-block; width: 8px; height: 8px; margin-right: 8px; border-radius: 50%; background: #20b691; }
h1, h2, h3, p { margin-top: 0; }
h1 { max-width: 650px; margin-bottom: 30px; font-size: clamp(50px, 6.1vw, 64px); line-height: 1.08; font-weight: 760; } h1 em { display: block; margin-top: 13px; color: #6f48ef; font-style: normal; }
.hero-description { max-width: 540px; margin-bottom: 34px; color: #5f6567; font-size: 17px; line-height: 1.7; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; }.button { min-height: 48px; display: inline-flex; align-items: center; justify-content: center; gap: 16px; padding: 0 20px; border-radius: 8px; font-size: 14px; font-weight: 680; cursor: pointer; transition: transform .2s ease, background .2s ease; }.button:hover { transform: translateY(-2px); }.button-primary { color: #fff; background: #101214; }.button-primary span { color: #74d5bc; }.button-secondary { color: #363a3c; background: #e7eae7; }
.hero-meta { display: flex; flex-wrap: wrap; gap: 10px 20px; margin-top: 42px; color: #707577; font-size: 12px; }.hero-meta span::before { content: '•'; margin-right: 7px; color: #20b691; }

.hero-visual { min-height: 470px; position: relative; display: grid; place-items: center; }.visual-glow { width: 400px; height: 400px; position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(111,72,239,.22), rgba(111,72,239,0) 67%); filter: blur(6px); animation: glow-pulse 6s ease-in-out infinite; }.visual-orbit { position: absolute; border: 1px solid rgba(111,72,239,.15); border-radius: 50%; pointer-events: none; }.visual-orbit-one { width: 500px; height: 500px; animation: orbit-spin 20s linear infinite; }.visual-orbit-two { width: 365px; height: 365px; border-color: rgba(32,182,145,.18); animation: orbit-spin 13s linear infinite reverse; }.visual-orbit::after { content: ''; width: 9px; height: 9px; position: absolute; left: 48%; top: -5px; border-radius: 50%; background: #20b691; box-shadow: 0 0 0 7px rgba(32,182,145,.1); }.visual-window { width: min(100%, 460px); position: relative; overflow: hidden; border: 1px solid rgba(16,18,20,.16); border-radius: 18px; background: #fff; box-shadow: 0 25px 70px rgba(51,42,90,.16); transform: rotate(3deg); animation: window-float 6s ease-in-out infinite; }.window-bar { height: 42px; display: flex; gap: 6px; align-items: center; padding: 0 15px; border-bottom: 1px solid #eceeec; color: #767b7d; font-size: 10px; letter-spacing: .03em; }.window-bar span { width: 7px; height: 7px; border-radius: 50%; background: #d5d9d6; }.window-bar span:first-child { background: #e99292; }.window-bar b { margin-left: 7px; font-weight: 600; }.window-canvas { height: 330px; position: relative; overflow: hidden; background-color: #e4eae5; background-image: linear-gradient(45deg, #d4dbd6 25%, transparent 25%), linear-gradient(-45deg, #d4dbd6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d4dbd6 75%), linear-gradient(-45deg, transparent 75%, #d4dbd6 75%); background-size: 28px 28px; background-position: 0 0, 0 14px, 14px -14px, -14px 0; }.shape { position: absolute; }.shape-orbit { width: 260px; height: 122px; left: 94px; top: 105px; border: 35px solid #6f48ef; border-radius: 50%; transform: rotate(-24deg); animation: shape-drift 7s ease-in-out infinite; }.shape-square { width: 88px; height: 88px; left: 85px; top: 116px; border-radius: 14px; background: #20b691; transform: rotate(17deg); animation: shape-drift 5s ease-in-out infinite reverse; }.shape-disc { width: 110px; height: 110px; left: 198px; top: 105px; border-radius: 50%; background: #ffd266; animation: shape-drift 6s ease-in-out infinite 1s; }.shape-ring { width: 54px; height: 54px; left: 281px; top: 196px; border: 14px solid #f26d6d; border-radius: 50%; animation: shape-drift 4.5s ease-in-out infinite reverse; }.visual-caption { position: absolute; right: 16px; bottom: 16px; display: flex; align-items: center; gap: 7px; padding: 8px 10px; border-radius: 6px; color: #fff; background: rgba(16,18,20,.78); font-size: 10px; }.visual-caption i { width: 7px; height: 7px; border-radius: 50%; background: #56d7ae; }.format-pill { position: absolute; z-index: 1; padding: 10px 13px; border: 1px solid rgba(16,18,20,.1); border-radius: 9px; background: rgba(255,255,255,.88); box-shadow: 0 12px 25px rgba(31,34,35,.1); font-size: 12px; font-weight: 760; backdrop-filter: blur(8px); animation: pill-float 5s ease-in-out infinite; }.format-pill-rgb { left: 0; top: 100px; color: #6f48ef; }.format-pill-alpha { right: 0; bottom: 72px; color: #20a782; animation-delay: -2s; }

.features { padding: 100px 0 120px; }.section-heading { max-width: 540px; }.section-heading h2, .playground-heading h2, .format-copy h2, .install-intro h2 { margin-bottom: 0; font-size: clamp(34px, 4.1vw, 44px); line-height: 1.13; font-weight: 750; }.section-heading h2 span, .format-copy h2 span, .install-intro h2 span { display: inline-block; margin-top: 9px; }.feature-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 48px; }.feature-card { min-height: 230px; padding: 26px; border: 1px solid #e1e4e1; border-radius: 12px; background: #fff; transition: transform .2s ease, border .2s ease; }.feature-card:hover { border-color: #b9adf8; transform: translateY(-4px); }.feature-icon { width: 38px; height: 38px; display: grid; place-items: center; margin-bottom: 35px; border-radius: 10px; color: #6944de; background: #f0edff; font-size: 20px; font-weight: 760; }.feature-card h3 { margin-bottom: 10px; font-size: 15px; letter-spacing: -.02em; }.feature-card p { margin: 0; color: #6d7374; font-size: 13px; line-height: 1.7; }

.playground { padding: 96px 0 110px; border-top: 1px solid #dfe2df; }.playground-heading { display: flex; justify-content: space-between; gap: 50px; align-items: end; }.playground-heading > p { max-width: 360px; margin: 0; color: #666d6e; font-size: 14px; line-height: 1.75; }.demo-tabs { display: flex; gap: 8px; margin: 42px 0 20px; overflow-x: auto; padding-bottom: 6px; }.demo-tab { flex: 0 0 auto; display: inline-flex; gap: 9px; align-items: center; padding: 11px 14px; border: 1px solid #d9ded9; border-radius: 8px; color: #606667; background: transparent; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .2s ease; }.demo-tab span { color: #9ba19e; font-size: 10px; }.demo-tab:hover, .demo-tab-active { border-color: #6f48ef; color: #fff; background: #6f48ef; }.demo-tab-active span { color: #cabfff; }

.format-section { display: grid; grid-template-columns: .88fr 1.12fr; gap: 90px; align-items: center; padding: 118px 0; }.format-copy > p:not(.eyebrow) { max-width: 480px; margin: 28px 0; color: #62696a; font-size: 15px; line-height: 1.85; }.format-copy code { padding: 2px 5px; border-radius: 4px; color: #5d3acb; background: #ebe8fb; font-size: .88em; }.format-copy a { color: #5c3dc6; font-size: 13px; font-weight: 700; }.format-diagram { min-height: 340px; display: grid; grid-template-columns: 1fr 46px 1fr; align-items: center; padding: 32px; border: 1px solid #dde2dd; border-radius: 16px; background: #fff; }.diagram-label { display: block; margin-bottom: 14px; color: #787e7d; font-size: 11px; font-weight: 720; letter-spacing: .08em; text-transform: uppercase; }.packed-frame { height: 180px; display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; border-radius: 10px; }.rgb-panel, .alpha-panel { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; }.rgb-panel { color: #fff; background: linear-gradient(145deg, #6a46dc, #9d80ff); }.alpha-panel { color: #34383a; background: repeating-linear-gradient(45deg, #e4e7e5 0 10px, #cfd4d0 10px 20px); }.packed-frame b, .output-frame b { font-size: 26px; }.packed-frame span { font-size: 10px; text-transform: uppercase; letter-spacing: .08em; }.diagram-arrow { color: #6f48ef; text-align: center; font-size: 28px; }.output-frame { height: 180px; position: relative; display: grid; place-items: center; overflow: hidden; border-radius: 10px; color: #fff; background-color: #e5e9e5; background-image: linear-gradient(45deg, #d7ddd8 25%, transparent 25%), linear-gradient(-45deg, #d7ddd8 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d7ddd8 75%), linear-gradient(-45deg, transparent 75%, #d7ddd8 75%); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0; }.output-frame div { width: 96px; height: 96px; position: absolute; border-radius: 50% 50% 18px 50%; background: linear-gradient(135deg, #f7c958, #ec6c7b 48%, #6c48e4 49%); transform: rotate(-28deg); }.output-frame b { z-index: 1; text-shadow: 0 2px 4px rgba(0,0,0,.22); }

.install-section { display: grid; grid-template-columns: .82fr 1.18fr; gap: 72px; align-items: start; padding: 90px 0 110px; border-top: 1px solid #dfe2df; }.code-stack { display: grid; gap: 12px; }.code-block { overflow: hidden; border-radius: 12px; color: #dce1de; background: #15191a; box-shadow: 0 18px 40px rgba(19,24,23,.12); }.code-title { height: 38px; display: flex; align-items: center; gap: 8px; padding: 0 15px; border-bottom: 1px solid #2c3331; color: #909996; font-size: 11px; font-weight: 650; }.code-title span { width: 8px; height: 8px; border-radius: 50%; background: #20b691; }.code-block pre { margin: 0; padding: 19px; overflow: auto; font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace; font-size: 12px; line-height: 1.7; }.code-block-main pre { padding: 22px; }.code-keyword { color: #a993ff; }.code-string { color: #8bd8bf; }.code-number { color: #ffc96a; }

.site-footer { min-height: 115px; display: grid; grid-template-columns: 1fr 1fr auto; gap: 24px; align-items: center; border-top: 1px solid #34383a; color: #f5f6f4; }.site-footer .brand-mark { border-color: #f5f6f4; }.site-footer p { margin: 0; color: #aeb5b1; font-size: 12px; }.site-footer > a:last-child { color: #aeb5b1; font-size: 12px; }

@keyframes window-float { 50% { translate: 0 -14px; } }
@keyframes glow-pulse { 50% { scale: 1.13; opacity: .72; } }
@keyframes orbit-spin { to { transform: rotate(360deg); } }
@keyframes shape-drift { 50% { translate: 0 -10px; } }
@keyframes pill-float { 50% { translate: 0 -9px; } }
@media (prefers-reduced-motion: reduce) { .visual-glow, .visual-orbit, .visual-window, .shape, .format-pill { animation: none; } }

@media (max-width: 900px) { .site-nav { display: none; }.hero { grid-template-columns: 1fr; gap: 36px; padding-top: 55px; }.hero-visual { min-height: 390px; }.feature-grid { grid-template-columns: repeat(2, 1fr); }.format-section, .install-section { grid-template-columns: 1fr; gap: 44px; }.playground-heading { align-items: start; flex-direction: column; gap: 20px; } }
@media (max-width: 580px) { .section-wrap, .site-header { width: min(100% - 32px, 1180px); }.site-header { height: 68px; }.header-link { display: none; }.brand { font-size: 12px; }.hero { min-height: auto; padding: 48px 0 76px; }.hero-description { font-size: 15px; }.hero-visual { min-height: 310px; }.visual-window { transform: none; }.visual-orbit-one { width: 360px; height: 360px; }.visual-orbit-two { width: 280px; height: 280px; }.window-canvas { height: 245px; }.shape-orbit { left: 57px; top: 72px; transform: scale(.75) rotate(-24deg); transform-origin: left top; }.shape-square { left: 55px; top: 85px; transform: scale(.72) rotate(17deg); }.shape-disc { left: 140px; top: 78px; transform: scale(.72); }.shape-ring { left: 200px; top: 150px; transform: scale(.72); }.format-pill-rgb { left: -4px; top: 42px; }.format-pill-alpha { right: -3px; bottom: 18px; }.features, .playground, .format-section, .install-section { padding: 72px 0; }.feature-grid { grid-template-columns: 1fr; }.feature-card { min-height: auto; }.feature-icon { margin-bottom: 22px; }.format-diagram { grid-template-columns: 1fr; gap: 20px; padding: 20px; }.diagram-arrow { transform: rotate(90deg); }.packed-frame, .output-frame { height: 140px; }.site-footer { min-height: 145px; grid-template-columns: 1fr; gap: 8px; padding: 27px 0; }.site-footer p { order: 3; }.site-footer > a:last-child { order: 2; } }
</style>
