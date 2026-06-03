import "./styles.css";
import { siteContent } from "./content/siteContent.js";
import { loadImage } from "./utils/imageLoader.js";
import { logger } from "./utils/logger.js";

const app = document.querySelector("#app");

/**
 * 启动官网并处理初始化错误。
 *
 * @returns {Promise<void>} 页面启动任务。
 */
async function bootstrap() {
  try {
    renderPage();
    mountImagesAsync(siteContent.assets);
  } catch (error) {
    logger.error("官网初始化失败", error);
    renderFallback();
  }
}

/**
 * 渲染完整页面结构。
 *
 * @returns {void}
 */
function renderPage() {
  const content = siteContent;

  app.innerHTML = `
        <header class="site-header">
            <a class="brand" href="#top" aria-label="${content.title}">
                <span class="brand-logo"></span>
                <span>
                    <strong>${content.title}</strong>
                    <small>${content.subtitle}</small>
                </span>
            </a>
            <nav class="site-nav" aria-label="主导航">
                ${renderNavigation(content.navigation)}
            </nav>
        </header>
        <main id="top">
            <section class="hero">
                <div class="hero-media">
                    <span class="hero-image"></span>
                    <div class="hero-shade"></div>
                </div>
                <div class="hero-content">
                    <p class="eyebrow">${content.hero.eyebrow}</p>
                    <img class="hero-img hero-content-img" src="images/title.png" alt="${content.title}" />
                    <div class="hero-content-inner">
                        <p class="hero-subtitle">${content.hero.title}</p>
                        <p class="hero-summary">${content.hero.summary}</p>
                        <dl class="hero-stats">${renderStats(content.hero.stats)}</dl>
                        <div class="hero-actions">
                            <a class="button primary" href="#join">${content.hero.primaryCta}</a>
                            <a class="button secondary" href="#schedule">
                                ${content.hero.secondaryCta}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section class="section intro-section" aria-labelledby="intro-title">
                <div class="section-heading">
                    <p class="eyebrow">About</p>
                    <h2 id="intro-title">${content.intro.heading}</h2>
                </div>
                <p class="lead">${content.intro.body}</p>
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
                <div class="feature-grid">${renderTraining(content.training)}</div>
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
                <div class="schedule-list">${renderSchedule(content.schedule)}</div>
            </section>
            <section class="section strength-section" aria-labelledby="strength-title">
                <div class="section-heading">
                    <p class="eyebrow">Why Us</p>
                    <h2 id="strength-title">训练优势</h2>
                </div>
                <ul class="strength-list">${renderStrengths(content.strengths)}</ul>
            </section>
            <section
                class="section safety-section"
                id="safety"
                aria-labelledby="safety-title"
            >
                <div class="section-heading">
                    <p class="eyebrow">Safety</p>
                    <h2 id="safety-title">${content.safety.heading}</h2>
                </div>
                <ul class="safety-list">${renderStrengths(content.safety.points)}</ul>
            </section>
            <section class="join-section" id="join" aria-labelledby="join-title">
                <div class="join-copy">
                    <p class="eyebrow">Join</p>
                    <h2 id="join-title">${content.join.heading}</h2>
                    <p>${content.join.body}</p>
                </div>
                <div class="contact-panel">${renderContacts(content.join.contacts)}</div>
            </section>
        </main>
        <footer class="site-footer">
            <span class="footer-logo"></span>
            <div>
                <strong>${content.footer.brand}</strong>
                <p>${content.footer.note}</p>
            </div>
        </footer>
    `;

  app.classList.add("is-ready");
}

/**
 * 渲染导航链接。
 *
 * @param {{ label: string, href: string }[]} navigation
 * 导航配置。
 * @returns {string} 导航 HTML 字符串。
 */
function renderNavigation(navigation) {
  return navigation
    .map((item) => `<a href="${item.href}">${item.label}</a>`)
    .join("");
}

/**
 * 渲染首屏数据。
 *
 * @param {{ value: string, label: string }[]} stats
 * 数据列表。
 * @returns {string} 数据 HTML 字符串。
 */
function renderStats(stats) {
  return stats
    .map((item) => `<div><dt>${item.value}</dt><dd>${item.label}</dd></div>`)
    .join("");
}

/**
 * 渲染训练内容。
 *
 * @param {{ title: string, text: string }[]} items
 * 训练内容。
 * @returns {string} 训练 HTML 字符串。
 */
function renderTraining(items) {
  return items
    .map(
      (item) => `<article><h3>${item.title}</h3><p>${item.text}</p></article>`,
    )
    .join("");
}

/**
 * 渲染时间安排。
 *
 * @param {{ label: string, value: string }[]} items
 * 时间安排。
 * @returns {string} 时间安排 HTML 字符串。
 */
function renderSchedule(items) {
  return items
    .map(
      (item) =>
        `<div><span>${item.label}</span><strong>${item.value}</strong></div>`,
    )
    .join("");
}

/**
 * 渲染优势或安全说明列表。
 *
 * @param {string[]} items 列表内容。
 * @returns {string} 列表 HTML 字符串。
 */
function renderStrengths(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

/**
 * 渲染联系方式。
 *
 * @param {{ label: string, value: string }[]} contacts
 * 联系方式。
 * @returns {string} 联系方式 HTML 字符串。
 */
function renderContacts(contacts) {
  return contacts
    .map(
      (item) =>
        `<div><span>${item.label}</span><strong>${item.value}</strong></div>`,
    )
    .join("");
}

/**
 * 异步挂载页面图片，不阻塞首屏内容显示。
 *
 * @param {Record<string, { path: string, alt: string }>} assets
 * 图片资源配置。
 * @returns {void}
 */
function mountImagesAsync(assets) {
  loadAndMountImage(".brand-logo", assets.logo, "site-logo");
  loadAndMountImage(".hero-image", assets.hero, "hero-img");
  loadAndMountImage(".footer-logo", assets.partnerLogo, "partner-logo");
}

/**
 * 加载并挂载单个图片，失败时保留占位内容。
 *
 * @param {string} selector
 * 容器选择器。
 * @param {{ path: string, alt: string }} asset
 * 图片资源配置。
 * @param {string} className
 * 图片类名。
 * @returns {Promise<void>}
 * 图片挂载任务。
 */
async function loadAndMountImage(selector, asset, className) {
  const target = document.querySelector(selector);

  try {
    const image = await loadImage(asset.path, asset.alt);

    image.className = className;
    target.classList.add("is-loaded");
    target.append(image);
  } catch {
    target.classList.add("is-failed");
  }
}

/**
 * 渲染初始化失败时的保底内容。
 *
 * @returns {void}
 */
function renderFallback() {
  app.innerHTML = `
        <main class="fallback">
            <h1>${siteContent.title}</h1>
            <p>页面资源加载失败，请稍后刷新重试。</p>
        </main>
    `;
}

bootstrap();
