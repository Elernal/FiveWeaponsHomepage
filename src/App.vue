<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import { siteContent, type ImageAsset } from "./content/siteContent";
import { getPublicAssetPath, loadImage } from "./utils/imageLoader";

const imageSources = reactive({
    logo: "",
    hero: "",
    partnerLogo: ""
});

const titleImagePath = computed(() => getPublicAssetPath("images/title.png"));

/**
 * 加载单张图片并写入响应式图片地址。
 *
 * @param {string} key
 * 图片状态键名。
 * @param {{ path: string, alt: string }} asset
 * 图片资源配置。
 * @returns {Promise<void>}
 * 图片加载任务。
 */
async function loadAssetImage(key: keyof typeof imageSources, asset: ImageAsset): Promise<void> {
    try {
        const image = await loadImage(asset.path, asset.alt);

        imageSources[key] = image.src;
    } catch {
        imageSources[key] = "";
    }
}

/**
 * 异步加载页面图片资源，不阻塞页面主体内容渲染。
 *
 * @returns {Promise<void>} 页面图片加载任务。
 */
async function loadPageImages() {
    await Promise.all([
        loadAssetImage("logo", siteContent.assets.logo),
        loadAssetImage("hero", siteContent.assets.hero),
        loadAssetImage("partnerLogo", siteContent.assets.partnerLogo)
    ]);
}

onMounted(() => {
    loadPageImages();
});
</script>

<template>
    <header class="site-header">
        <a class="brand" href="#top" :aria-label="siteContent.title">
            <span class="brand-logo" :class="{ 'is-loaded': imageSources.logo }">
                <img
                    v-if="imageSources.logo"
                    class="site-logo"
                    :src="imageSources.logo"
                    :alt="siteContent.assets.logo.alt"
                />
            </span>
            <span>
                <strong>{{ siteContent.title }}</strong>
                <small>{{ siteContent.subtitle }}</small>
            </span>
        </a>
        <nav class="site-nav" aria-label="主导航">
            <a
                v-for="item in siteContent.navigation"
                :key="item.href"
                :href="item.href"
            >
                {{ item.label }}
            </a>
        </nav>
    </header>

    <main id="top">
        <section class="hero">
            <div class="hero-media">
                <span class="hero-image" :class="{ 'is-loaded': imageSources.hero }">
                    <img
                        v-if="imageSources.hero"
                        class="hero-img"
                        :src="imageSources.hero"
                        :alt="siteContent.assets.hero.alt"
                    />
                </span>
                <div class="hero-shade"></div>
            </div>
            <div class="hero-content">
                <p class="eyebrow">{{ siteContent.hero.eyebrow }}</p>
                <img
                    class="hero-img hero-content-img"
                    :src="titleImagePath"
                    :alt="siteContent.title"
                />
                <div class="hero-content-inner">
                    <p class="hero-subtitle">{{ siteContent.hero.title }}</p>
                    <p class="hero-summary">{{ siteContent.hero.summary }}</p>
                    <dl class="hero-stats">
                        <div
                            v-for="item in siteContent.hero.stats"
                            :key="item.value"
                        >
                            <dt>{{ item.value }}</dt>
                            <dd>{{ item.label }}</dd>
                        </div>
                    </dl>
                    <div class="hero-actions">
                        <a class="button primary" href="#join">
                            {{ siteContent.hero.primaryCta }}
                        </a>
                        <a class="button secondary" href="#schedule">
                            {{ siteContent.hero.secondaryCta }}
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <section class="section intro-section" aria-labelledby="intro-title">
            <div class="section-heading">
                <p class="eyebrow">About</p>
                <h2 id="intro-title">{{ siteContent.intro.heading }}</h2>
            </div>
            <p class="lead">{{ siteContent.intro.body }}</p>
        </section>

        <section
            class="section dark-section"
            id="training"
            aria-labelledby="training-title"
        >
            <div class="section-heading">
                <p class="eyebrow">Training</p>
                <h2 id="training-title">训练内容</h2>
            </div>
            <div class="feature-grid">
                <article v-for="item in siteContent.training" :key="item.title">
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.text }}</p>
                </article>
            </div>
        </section>

        <section
            class="section split-section"
            id="schedule"
            aria-labelledby="schedule-title"
        >
            <div class="section-heading">
                <p class="eyebrow">Schedule</p>
                <h2 id="schedule-title">时间安排</h2>
            </div>
            <div class="schedule-list">
                <div v-for="item in siteContent.schedule" :key="item.label">
                    <span>{{ item.label }}</span>
                    <strong>{{ item.value }}</strong>
                </div>
            </div>
        </section>

        <section class="section strength-section" aria-labelledby="strength-title">
            <div class="section-heading">
                <p class="eyebrow">Why Us</p>
                <h2 id="strength-title">训练优势</h2>
            </div>
            <ul class="strength-list">
                <li v-for="item in siteContent.strengths" :key="item">
                    {{ item }}
                </li>
            </ul>
        </section>

        <section
            class="section safety-section"
            id="safety"
            aria-labelledby="safety-title"
        >
            <div class="section-heading">
                <p class="eyebrow">Safety</p>
                <h2 id="safety-title">{{ siteContent.safety.heading }}</h2>
            </div>
            <ul class="safety-list">
                <li v-for="item in siteContent.safety.points" :key="item">
                    {{ item }}
                </li>
            </ul>
        </section>

        <section class="join-section" id="join" aria-labelledby="join-title">
            <div class="join-copy">
                <p class="eyebrow">Join</p>
                <h2 id="join-title">{{ siteContent.join.heading }}</h2>
                <p>{{ siteContent.join.body }}</p>
            </div>
            <div class="contact-panel">
                <div v-for="item in siteContent.join.contacts" :key="item.label">
                    <span>{{ item.label }}</span>
                    <strong>{{ item.value }}</strong>
                </div>
            </div>
        </section>
    </main>

    <footer class="site-footer">
        <span class="footer-logo" :class="{ 'is-loaded': imageSources.partnerLogo }">
            <img
                v-if="imageSources.partnerLogo"
                class="partner-logo"
                :src="imageSources.partnerLogo"
                :alt="siteContent.assets.partnerLogo.alt"
            />
        </span>
        <div>
            <strong>{{ siteContent.footer.brand }}</strong>
            <p>{{ siteContent.footer.note }}</p>
        </div>
    </footer>
</template>
