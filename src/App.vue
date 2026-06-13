<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { siteContent, type FocusModule, type ImageAsset } from "./content/siteContent";
import { loadImage } from "./utils/imageLoader";
import { logger } from "./utils/logger";

const imageSources = reactive({
    logo: "",
    heroBackground: "",
    hero: "",
    hanfu: "",
    partnerLogo: ""
});

/**
 * 加载单张图片并写入响应式图片地址。
 *
 * @param {string} key 图片状态键名。
 * @param {{ path: string, alt: string }} asset 图片资源配置。
 * @returns {Promise<void>} 图片加载任务。
 */
async function loadAssetImage(key: keyof typeof imageSources, asset: ImageAsset): Promise<void> {
    try {
        const image = await loadImage(asset.path, asset.alt);

        imageSources[key] = image.src;
    } catch (error) {
        imageSources[key] = "";
        logger.error("页面图片加载失败", { key, asset, error });
    }
}

/**
 * 异步加载页面图片资源，不阻塞页面主体内容渲染。
 *
 * @returns {Promise<void>} 页面图片加载任务。
 */
async function loadPageImages(): Promise<void> {
    await Promise.all([
        loadAssetImage("logo", siteContent.assets.logo),
        loadAssetImage("heroBackground", siteContent.assets.heroBackground),
        loadAssetImage("hero", siteContent.assets.hero),
        loadAssetImage("hanfu", siteContent.assets.hanfu),
        loadAssetImage("partnerLogo", siteContent.assets.partnerLogo)
    ]);
}

/**
 * 根据模块配置读取已经加载完成的图片地址。
 *
 * @param {FocusModule} module 双主线模块配置。
 * @returns {string} 可用于渲染的图片地址。
 */
function getFocusImageSource(module: FocusModule): string {
    return imageSources[module.imageKey];
}

/**
 * 根据模块配置读取图片替代文本。
 *
 * @param {FocusModule} module 双主线模块配置。
 * @returns {string} 图片替代文本。
 */
function getFocusImageAlt(module: FocusModule): string {
    return siteContent.assets[module.imageKey].alt;
}

onMounted(() => {
    void loadPageImages();
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
            <span class="brand-copy">
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
        <section class="hero" aria-labelledby="hero-title">
            <div class="hero-media">
                <span
                    class="hero-image"
                    :class="{ 'is-loaded': imageSources.heroBackground }"
                >
                    <img
                        v-if="imageSources.heroBackground"
                        class="hero-img"
                        :src="imageSources.heroBackground"
                        :alt="siteContent.assets.heroBackground.alt"
                    />
                </span>
                <div class="hero-shade"></div>
            </div>

            <div class="hero-layout">
                <div class="hero-copy">
                    <p class="eyebrow">{{ siteContent.hero.eyebrow }}</p>
                    <h1 id="hero-title">{{ siteContent.hero.title }}</h1>
                    <p class="hero-summary">{{ siteContent.hero.summary }}</p>
                    <div class="hero-actions" aria-label="首屏操作">
                        <a class="button primary" href="#join">
                            {{ siteContent.hero.primaryCta }}
                        </a>
                        <a class="button secondary" href="#hanfu">
                            {{ siteContent.hero.secondaryCta }}
                        </a>
                    </div>
                </div>

                <dl class="hero-stats" aria-label="社群主线">
                    <div
                        v-for="item in siteContent.hero.stats"
                        :key="item.value"
                    >
                        <dt>{{ item.value }}</dt>
                        <dd>{{ item.label }}</dd>
                    </div>
                </dl>
            </div>
        </section>

        <section class="focus-section" aria-labelledby="focus-title">
            <div class="section-kicker">
                <p class="eyebrow">Two Tracks</p>
                <h2 id="focus-title">汉服与 HEMA 并列推进</h2>
                <p>
                    一条面向传统服饰文化体验，一条面向历史欧洲武术训练；
                    共同保留纪律、审美、运动和社群交流。
                </p>
            </div>

            <div class="focus-grid">
                <article
                    v-for="module in siteContent.focusModules"
                    :id="module.id"
                    :key="module.id"
                    class="focus-card"
                >
                    <div class="focus-media">
                        <img
                            v-if="getFocusImageSource(module)"
                            :src="getFocusImageSource(module)"
                            :alt="getFocusImageAlt(module)"
                        />
                    </div>
                    <div class="focus-content">
                        <p class="eyebrow">{{ module.label }}</p>
                        <h3>{{ module.heading }}</h3>
                        <p>{{ module.summary }}</p>
                        <ul>
                            <li v-for="point in module.points" :key="point.title">
                                <strong>{{ point.title }}</strong>
                                <span>{{ point.text }}</span>
                            </li>
                        </ul>
                        <a class="text-link" :href="module.ctaHref">
                            {{ module.ctaLabel }}
                        </a>
                    </div>
                </article>
            </div>
        </section>

        <section
            class="section training-section"
            id="training"
            aria-labelledby="training-title"
        >
            <div class="section-heading">
                <p class="eyebrow">Training Path</p>
                <h2 id="training-title">{{ siteContent.training.heading }}</h2>
                <p>{{ siteContent.training.summary }}</p>
            </div>
            <div class="feature-grid">
                <article v-for="item in siteContent.training.items" :key="item.title">
                    <span></span>
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.text }}</p>
                </article>
            </div>
        </section>

        <section
            class="section schedule-section"
            id="schedule"
            aria-labelledby="schedule-title"
        >
            <div class="section-heading">
                <p class="eyebrow">Schedule</p>
                <h2 id="schedule-title">{{ siteContent.schedule.heading }}</h2>
                <p>{{ siteContent.schedule.summary }}</p>
            </div>
            <div class="schedule-list">
                <div v-for="item in siteContent.schedule.items" :key="item.label">
                    <span>{{ item.label }}</span>
                    <strong>{{ item.value }}</strong>
                </div>
            </div>
        </section>

        <section
            class="section safety-section"
            id="safety"
            aria-labelledby="safety-title"
        >
            <div class="section-heading">
                <p class="eyebrow">Safety</p>
                <h2 id="safety-title">{{ siteContent.safety.heading }}</h2>
                <p>{{ siteContent.safety.summary }}</p>
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
