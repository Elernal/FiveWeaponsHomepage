<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { logger } from "./utils/logger";

type PageId = "home" | "hema" | "hanfu" | "activities";
type GalleryFilter = "all" | "hema" | "hanfu" | "open" | "social";

interface NavItem {
    id: PageId;
    label: string;
}

interface FeatureCard {
    image: string;
    title: string;
    subtitle: string;
    href: PageId;
}

interface InfoCard {
    title: string;
    text: string;
}

interface EventItem {
    date: string;
    day: string;
    time: string;
    title: string;
    text: string;
    place: string;
    status: string;
    image: string;
}

interface GalleryItem {
    category: GalleryFilter;
    image: string;
    date: string;
    title: string;
}

const navItems: NavItem[] = [
    { id: "home", label: "首页" },
    { id: "hema", label: "HEMA" },
    { id: "hanfu", label: "汉服武备" },
    { id: "activities", label: "活动相册" }
];

const introCards: FeatureCard[] = [
    {
        image: "card-longsword.png",
        title: "长剑基础",
        subtitle: "系统化训练路径",
        href: "hema"
    },
    {
        image: "card-mask.png",
        title: "安全对抗",
        subtitle: "护具、规则与控强度",
        href: "hema"
    },
    {
        image: "card-hanfu.png",
        title: "汉服武备",
        subtitle: "礼仪、服制与持械姿态",
        href: "hanfu"
    }
];

const starterSteps: InfoCard[] = [
    {
        title: "体验",
        text: "预约体验课，了解训练方式与俱乐部文化。"
    },
    {
        title: "安全",
        text: "学习基础安全规范与装备使用，建立正确习惯。"
    },
    {
        title: "基础",
        text: "掌握基本步法与攻防原则，进入系统训练阶段。"
    }
];

const events: EventItem[] = [
    {
        date: "05/24",
        day: "周六",
        time: "19:30",
        title: "实战对练开放日",
        text: "面向会员与体验者的路线交流，检验训练成果。",
        place: "五兵训练馆",
        status: "报名中",
        image: "event-open-day.png"
    },
    {
        date: "05/31",
        day: "周六",
        time: "14:00",
        title: "东方武备文化讲堂",
        text: "明代军刀与步战体系主题分享。",
        place: "五兵训练馆",
        status: "报名中",
        image: "event-culture.png"
    }
];

const gearItems: InfoCard[] = [
    { title: "HEMA 头盔", text: "通过国际认证，保护头面部。" },
    { title: "护颈 & 护肩", text: "减少颈部与锁骨受击风险。" },
    { title: "护臂 & 护手", text: "保护前臂与手部关节。" },
    { title: "HEMA 手套", text: "提供握持保护与打击缓冲。" },
    { title: "训练服 & 护甲", text: "耐磨透气，提升对练安全。" },
    { title: "训练剑 / 盾", text: "符合安全标准的训练器材。" }
];

const stats = [
    { value: "2019", label: "俱乐部成立" },
    { value: "600+", label: "活跃会员" },
    { value: "12+", label: "专业教练" },
    { value: "30+", label: "每月训练场次" }
];

const bottomCards: FeatureCard[] = [
    {
        image: "bottom-curriculum.png",
        title: "课程体系",
        subtitle: "系统化训练路径",
        href: "hema"
    },
    {
        image: "bottom-weapons.png",
        title: "兵器知识",
        subtitle: "器械与历史研究",
        href: "hema"
    },
    {
        image: "bottom-schedule.png",
        title: "训练安排",
        subtitle: "固定场次与地点",
        href: "activities"
    },
    {
        image: "bottom-join.png",
        title: "加入我们",
        subtitle: "成为五兵的一员",
        href: "activities"
    }
];

const hemaDefinitions: InfoCard[] = [
    { title: "史料研究", text: "从历史手稿、技法图和训练语境出发理解动作目的。" },
    { title: "技术训练", text: "以步法、距离、节奏和切击线为核心形成训练结构。" },
    { title: "对抗检验", text: "在护具、规则和教练监督下，用控制对抗检验技术。" }
];

const weaponCards: FeatureCard[] = [
    {
        image: "card-longsword.png",
        title: "长剑 Longsword",
        subtitle: "距离、角度与双手剑基础",
        href: "hema"
    },
    {
        image: "bottom-weapons.png",
        title: "军刀 Sabre",
        subtitle: "切击节奏与单手器械控制",
        href: "hema"
    },
    {
        image: "bottom-curriculum.png",
        title: "剑盾 Sword & Buckler",
        subtitle: "攻防同体与近距离协调",
        href: "hema"
    },
    {
        image: "hero-duel.png",
        title: "杆兵 Polearms",
        subtitle: "距离管理与线性压迫",
        href: "hema"
    }
];

const trainingPath: InfoCard[] = [
    { title: "新人体验", text: "认识规则、护具和基础安全距离。" },
    { title: "基础步法", text: "建立前进、后撤、换线和控距能力。" },
    { title: "技术课", text: "学习攻防结构、切击路径与战术选择。" },
    { title: "保护装备", text: "按训练强度逐步补齐头盔、手套和护甲。" },
    { title: "控制对抗", text: "在教练监督下进入低强度到中强度检验。" }
];

const hanfuGallery: FeatureCard[] = [
    {
        image: "card-hanfu.png",
        title: "服制细节",
        subtitle: "衣冠结构与礼仪表达",
        href: "hanfu"
    },
    {
        image: "event-culture.png",
        title: "礼仪展示",
        subtitle: "公开活动中的仪态训练",
        href: "hanfu"
    },
    {
        image: "bottom-weapons.png",
        title: "持械姿态",
        subtitle: "东方武备的身体语言",
        href: "hanfu"
    },
    {
        image: "bottom-join.png",
        title: "训练合影",
        subtitle: "社群活动记录",
        href: "hanfu"
    },
    {
        image: "bottom-schedule.png",
        title: "护具搭配",
        subtitle: "展示与训练的边界",
        href: "hanfu"
    }
];

const hanfuProgram: InfoCard[] = [
    { title: "服制与礼仪", text: "介绍汉服基本形制、穿着场景和公开活动中的礼仪表达。" },
    { title: "汉服与训练安全", text: "区分展示服装与训练装备，明确护具和动作限制。" },
    { title: "东方武备体验", text: "以持械姿态、步法和文化讲解为核心，适合开放日参与。" }
];

const galleryItems: GalleryItem[] = [
    { category: "hema", image: "hero-duel.png", date: "07.03", title: "长剑基础课" },
    { category: "hanfu", image: "card-hanfu.png", date: "07.06", title: "汉服武备开放日" },
    { category: "open", image: "event-open-day.png", date: "07.13", title: "新人体验" },
    { category: "hema", image: "card-mask.png", date: "07.17", title: "技术复盘" },
    { category: "social", image: "bottom-join.png", date: "07.20", title: "社群合影" },
    { category: "hanfu", image: "event-culture.png", date: "08.03", title: "文化讲解" }
];

const filterTabs: Array<{ id: GalleryFilter; label: string }> = [
    { id: "all", label: "全部" },
    { id: "hema", label: "HEMA训练" },
    { id: "hanfu", label: "汉服武备" },
    { id: "open", label: "公开课" },
    { id: "social", label: "社群合影" }
];

const currentPage = ref<PageId>("home");
const selectedFilter = ref<GalleryFilter>("all");
const isMenuOpen = ref(false);
const isScrolled = ref(false);

const filteredGallery = computed(() => {
    if (selectedFilter.value === "all") {
        return galleryItems;
    }

    return galleryItems.filter((item) => item.category === selectedFilter.value);
});

/**
 * 根据 Vite 基础路径生成 public 静态资源地址。
 *
 * @param {string} fileName public/assets 下的文件名。
 * @returns {string} 可用于页面渲染的资源地址。
 */
function assetUrl(fileName: string): string {
    return `${import.meta.env.BASE_URL}assets/${fileName}`;
}

/**
 * 安全滚动到页面顶部，测试环境不支持时记录日志并继续。
 *
 * @returns {void}
 */
function scrollToTop(): void {
    try {
        window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
        logger.error("滚动到顶部失败", error);
    }
}

/**
 * 切换当前页面，并在移动端收起导航。
 *
 * @param {PageId} pageId 目标页面标识。
 * @returns {void}
 */
function setPage(pageId: PageId): void {
    currentPage.value = pageId;
    isMenuOpen.value = false;
    selectedFilter.value = "all";
    window.history.replaceState(null, "", `#${pageId}`);
    scrollToTop();
    logger.info("切换页面", { pageId });
}

/**
 * 按分类筛选活动相册。
 *
 * @param {GalleryFilter} filter 目标筛选分类。
 * @returns {void}
 */
function setGalleryFilter(filter: GalleryFilter): void {
    selectedFilter.value = filter;
    logger.info("筛选相册", { filter });
}

/**
 * 切换移动端导航菜单展开状态。
 *
 * @returns {void}
 */
function toggleMenu(): void {
    isMenuOpen.value = !isMenuOpen.value;
    logger.info("切换移动端导航", { isOpen: isMenuOpen.value });
}

/**
 * 根据当前滚动位置更新顶部导航状态。
 *
 * @returns {void}
 */
function updateScrollState(): void {
    isScrolled.value = window.scrollY > 20;
}

/**
 * 从地址 hash 还原页面状态。
 *
 * @returns {void}
 */
function syncPageFromHash(): void {
    const hash = window.location.hash.replace("#", "");
    const page = navItems.find((item) => item.id === hash);

    if (page) {
        currentPage.value = page.id;
    }
}

onMounted(() => {
    syncPageFromHash();
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("hashchange", syncPageFromHash);
});

onUnmounted(() => {
    window.removeEventListener("scroll", updateScrollState);
    window.removeEventListener("hashchange", syncPageFromHash);
});
</script>

<template>
    <header class="site-header" :class="{ 'is-scrolled': isScrolled }">
        <button class="brand" type="button" aria-label="福建五兵首页" @click="setPage('home')">
            <img :src="assetUrl('club-logo-source.png')" alt="" decoding="async" />
            <span>
                <strong>福建五兵</strong>
                <small>Five Weapons Militia Barrack</small>
            </span>
        </button>
        <button class="menu-toggle" type="button" aria-label="打开导航" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <nav class="primary-nav" :class="{ 'is-open': isMenuOpen }" aria-label="主导航">
            <button
                v-for="item in navItems"
                :key="item.id"
                type="button"
                :class="{ active: currentPage === item.id }"
                @click="setPage(item.id)"
            >
                {{ item.label }}
            </button>
            <a href="#contact" @click="isMenuOpen = false">预约体验</a>
        </nav>
    </header>

    <main>
        <section v-if="currentPage === 'home'" class="page-view">
            <section class="home-hero" aria-labelledby="home-title">
                <img
                    class="home-hero-image"
                    :src="assetUrl('hero-duel.png')"
                    alt="两名 HEMA 训练者进行长剑对练"
                    decoding="async"
                />
                <div class="hero-overlay"></div>
                <div class="slash-mark" aria-hidden="true"></div>
                <div class="home-hero-content">
                    <h1 id="home-title">福建五兵<br />HEMA 历史剑术俱乐部</h1>
                    <p>以史料为根，以实战为证。学习长剑、军刀、剑盾与东方武备文化。</p>
                    <div class="hero-actions">
                        <a class="button primary" href="#contact">预约体验课</a>
                        <button class="button ghost" type="button" @click="setPage('hema')">
                            了解 HEMA
                        </button>
                    </div>
                </div>
            </section>

            <section class="intro-strip" aria-label="训练重点">
                <article v-for="card in introCards" :key="card.title">
                    <img :src="assetUrl(card.image)" :alt="card.title" loading="lazy" decoding="async" />
                    <div>
                        <h2>{{ card.title }}</h2>
                        <p>{{ card.subtitle }}</p>
                        <button type="button" @click="setPage(card.href)">了解更多</button>
                    </div>
                </article>
            </section>

            <section class="dashboard-grid" aria-label="首页信息">
                <article class="starter-panel">
                    <p class="eyebrow">Starter Path</p>
                    <h2>新人路径</h2>
                    <ol>
                        <li v-for="(step, index) in starterSteps" :key="step.title">
                            <span>{{ String(index + 1).padStart(2, "0") }}</span>
                            <div>
                                <strong>{{ step.title }}</strong>
                                <p>{{ step.text }}</p>
                            </div>
                        </li>
                    </ol>
                    <button class="outline-button" type="button" @click="setPage('hema')">
                        了解更多
                    </button>
                </article>

                <article class="event-panel">
                    <div class="panel-title-row">
                        <div>
                            <p class="eyebrow">This Month</p>
                            <h2>本月活动</h2>
                        </div>
                        <button type="button" @click="setPage('activities')">查看全部活动</button>
                    </div>
                    <div class="event-list">
                        <article v-for="event in events" :key="event.title">
                            <time>{{ event.date }}</time>
                            <img :src="assetUrl(event.image)" :alt="event.title" loading="lazy" decoding="async" />
                            <div>
                                <h3>{{ event.title }}</h3>
                                <p>{{ event.text }}</p>
                                <span>{{ event.day }} {{ event.time }}</span>
                                <small>{{ event.place }} · {{ event.status }}</small>
                            </div>
                        </article>
                    </div>
                </article>

                <article class="gear-panel">
                    <p class="eyebrow">Gear Checklist</p>
                    <h2>训练装备</h2>
                    <ul>
                        <li v-for="item in gearItems" :key="item.title">
                            <strong>{{ item.title }}</strong>
                            <span>{{ item.text }}</span>
                        </li>
                    </ul>
                </article>
            </section>

            <section class="stats-band" aria-label="俱乐部数据">
                <div class="stats-copy">
                    <h2>以史为根<br />以剑为证</h2>
                    <p>我们研究历史、训练技术，在实战纪中理解武备，在交流中成长。</p>
                    <button class="button primary compact" type="button" @click="setPage('activities')">
                        关于我们
                    </button>
                </div>
                <dl>
                    <div v-for="stat in stats" :key="stat.label">
                        <dt>{{ stat.value }}</dt>
                        <dd>{{ stat.label }}</dd>
                    </div>
                </dl>
            </section>

            <section class="bottom-cards" aria-label="快速入口">
                <article v-for="card in bottomCards" :key="card.title">
                    <img :src="assetUrl(card.image)" :alt="card.title" loading="lazy" decoding="async" />
                    <div>
                        <h2>{{ card.title }}</h2>
                        <p>{{ card.subtitle }}</p>
                    </div>
                    <button type="button" @click="setPage(card.href)">›</button>
                </article>
            </section>
        </section>

        <section v-if="currentPage === 'hema'" class="page-view">
            <section class="sub-hero hema-hero" aria-labelledby="hema-title">
                <img :src="assetUrl('hero-duel.png')" alt="" decoding="async" />
                <div class="hero-overlay"></div>
                <div class="sub-hero-content">
                    <p class="eyebrow">Historical European Martial Arts</p>
                    <h1 id="hema-title">HEMA 历史剑术</h1>
                    <p>以史料为根，以实战为证，在安全规则下复原欧洲剑术。</p>
                </div>
            </section>
            <section class="white-section" aria-labelledby="what-hema">
                <p class="eyebrow">Definition</p>
                <h2 id="what-hema">什么是 HEMA</h2>
                <div class="three-column">
                    <article v-for="(item, index) in hemaDefinitions" :key="item.title">
                        <span>{{ String(index + 1).padStart(2, "0") }}</span>
                        <h3>{{ item.title }}</h3>
                        <p>{{ item.text }}</p>
                    </article>
                </div>
            </section>
            <section class="dark-section" aria-labelledby="weapon-title">
                <p class="eyebrow">Weapons</p>
                <h2 id="weapon-title">兵器训练方向</h2>
                <div class="weapon-grid">
                    <article v-for="card in weaponCards" :key="card.title">
                        <img :src="assetUrl(card.image)" :alt="card.title" loading="lazy" decoding="async" />
                        <h3>{{ card.title }}</h3>
                        <p>{{ card.subtitle }}</p>
                    </article>
                </div>
            </section>
            <section class="timeline-section" aria-labelledby="path-title">
                <p class="eyebrow">Training Path</p>
                <h2 id="path-title">新人训练路径</h2>
                <ol>
                    <li v-for="(step, index) in trainingPath" :key="step.title">
                        <span>{{ String(index + 1).padStart(2, "0") }}</span>
                        <strong>{{ step.title }}</strong>
                        <p>{{ step.text }}</p>
                    </li>
                </ol>
            </section>
        </section>

        <section v-if="currentPage === 'hanfu'" class="page-view">
            <section class="sub-hero hanfu-hero" aria-labelledby="hanfu-title">
                <img :src="assetUrl('card-hanfu.png')" alt="" decoding="async" />
                <div class="hero-overlay"></div>
                <div class="sub-hero-content">
                    <p class="eyebrow">Hanfu And Martial Culture</p>
                    <h1 id="hanfu-title">汉服武备文化</h1>
                    <p>从衣冠形制到持械礼仪，理解东方武备的身体语言。</p>
                </div>
            </section>
            <section class="dark-section" aria-labelledby="hanfu-gallery-title">
                <p class="eyebrow">Image Showcase</p>
                <h2 id="hanfu-gallery-title">汉服相关介绍图片展示</h2>
                <div class="mosaic-grid">
                    <article v-for="card in hanfuGallery" :key="card.title">
                        <img :src="assetUrl(card.image)" :alt="card.title" loading="lazy" decoding="async" />
                        <h3>{{ card.title }}</h3>
                        <p>{{ card.subtitle }}</p>
                    </article>
                </div>
            </section>
            <section class="white-section" aria-labelledby="program-title">
                <p class="eyebrow">Program</p>
                <h2 id="program-title">展示内容</h2>
                <div class="three-column">
                    <article v-for="(item, index) in hanfuProgram" :key="item.title">
                        <span>{{ String(index + 1).padStart(2, "0") }}</span>
                        <h3>{{ item.title }}</h3>
                        <p>{{ item.text }}</p>
                    </article>
                </div>
            </section>
        </section>

        <section v-if="currentPage === 'activities'" class="page-view">
            <section class="sub-hero activities-hero" aria-labelledby="activities-title">
                <img :src="assetUrl('bottom-schedule.png')" alt="" decoding="async" />
                <div class="hero-overlay"></div>
                <div class="sub-hero-content">
                    <p class="eyebrow">Gallery And Events</p>
                    <h1 id="activities-title">活动相册</h1>
                    <p>训练、公开课、汉服武备与社群活动的现场记录。</p>
                </div>
            </section>
            <section class="gallery-section" aria-labelledby="gallery-title">
                <p class="eyebrow">Photo Wall</p>
                <h2 id="gallery-title">总体活动图片展示</h2>
                <div class="filter-tabs" aria-label="相册筛选">
                    <button
                        v-for="tab in filterTabs"
                        :key="tab.id"
                        type="button"
                        :class="{ active: selectedFilter === tab.id }"
                        @click="setGalleryFilter(tab.id)"
                    >
                        {{ tab.label }}
                    </button>
                </div>
                <div class="gallery-grid">
                    <figure v-for="item in filteredGallery" :key="`${item.date}-${item.title}`">
                        <img :src="assetUrl(item.image)" :alt="item.title" loading="lazy" decoding="async" />
                        <figcaption><span>{{ item.date }}</span>{{ item.title }}</figcaption>
                    </figure>
                </div>
            </section>
            <section class="event-board" aria-labelledby="event-board-title">
                <p class="eyebrow">Upcoming</p>
                <h2 id="event-board-title">近期活动</h2>
                <article v-for="event in events" :key="event.title">
                    <time>{{ event.date }}</time>
                    <div>
                        <h3>{{ event.title }}</h3>
                        <p>{{ event.day }} {{ event.time }}，{{ event.place }}，{{ event.text }}</p>
                    </div>
                    <span>{{ event.status }}</span>
                </article>
            </section>
        </section>
    </main>

    <footer class="site-footer" id="contact">
        <div class="footer-brand">
            <img :src="assetUrl('club-logo-source.png')" alt="" loading="lazy" decoding="async" />
            <div>
                <strong>福建五兵团练营</strong>
            </div>
        </div>
        <nav aria-label="页脚导航">
            <button v-for="item in navItems" :key="item.id" type="button" @click="setPage(item.id)">
                {{ item.label }}
            </button>
        </nav>
        <div class="social-dots" aria-label="社交媒体">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </footer>
</template>
