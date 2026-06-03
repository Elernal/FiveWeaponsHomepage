(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=o(a);fetch(a.href,s)}})();const c={title:"福建五兵团练营",subtitle:"HEMA 俱乐部",assets:{logo:{path:"images/logo-five-weapons.jpg",alt:"福建五兵团练营标识"},partnerLogo:{path:"images/logo-black-tigers.jpg",alt:"Black Tigers 标识"},hero:{path:"images/hero-hema-recruit.png",alt:"两名 HEMA 训练者在室内进行长剑对练"}},navigation:[{label:"训练内容",href:"#training"},{label:"时间安排",href:"#schedule"},{label:"安全说明",href:"#safety"},{label:"加入方式",href:"#join"}],hero:{eyebrow:"历史武术 · 现代训练 · 福建",title:"以安全训练，进入真实的欧洲历史武术",summary:"福建五兵团练营面向 HEMA 爱好者与新人，提供长剑、基础体能、技法拆解和安全对抗训练。",primaryCta:"加入训练群",secondaryCta:"预约体验",stats:[{value:"HEMA",label:"历史欧洲武术"},{value:"安全",label:"护具与规则先行"},{value:"新人",label:"零基础可体验"}]},intro:{heading:"不是表演，是可训练、可复盘的武术系统",body:"我们从历史文献、现代运动训练和实战安全规则出发，学习兵器距离、步法、攻防判断与对抗节奏。训练强调纪律、保护和持续进步。"},training:[{title:"长剑基础",text:"握持、站架、步法、切击线路、距离控制与基础攻防。"},{title:"技法拆解",text:"围绕历史技法进行分段练习，把动作还原为可执行的训练任务。"},{title:"安全对抗",text:"在护具、规则和教练监督下，逐步进入轻量到正式强度的对练。"},{title:"体能与协调",text:"补足核心、下肢、肩背和反应训练，让动作更稳定、更可控。"}],schedule:[{label:"常规训练",value:"每周训练时间待补"},{label:"新人体验",value:"可提前预约，具体场次待补"},{label:"训练地点",value:"福建地区训练点待补"}],strengths:["从安全规则和装备使用开始，降低新人入门压力。","训练目标清晰，每次练习都能对应到动作、距离或判断能力。","兼顾技术、体能和对抗，不把 HEMA 做成单纯摆拍。","保留社群交流空间，方便新人提问、约练和复盘。"],safety:{heading:"安全优先，循序进入对抗",points:["新人先进行基础动作、距离感和装备说明，不直接进入高强度对抗。","对练需遵守护具、武器、强度和停止口令要求。","训练中如有身体不适、装备问题或动作风险，应立即暂停。"]},join:{heading:"加入训练群",body:"真实联系方式暂未公开。请将微信号、训练群二维码、报名表或邮箱补充到此处后即可正式上线。",contacts:[{label:"微信 / 训练群",value:"待补：训练群二维码或联系人微信"},{label:"邮箱",value:"待补：club@example.com"},{label:"体验说明",value:"请提前预约，穿着便于运动的服装到场。"}]},footer:{brand:"福建五兵团练营",note:"Black Tigers 标识作为社群历史或关联标识预留展示。"}};function p(e,t){console.error(`[FiveWeaponsHomepage] ${e}`,t)}function u(e,t){console.info(`[FiveWeaponsHomepage] ${e}`,t)}const h={error:p,info:u};function g(e,t="/FiveWeaponsHomepage/"){return`${t}${e}`}function f(e,t=""){const o=g(e);return new Promise((i,a)=>{const s=new Image;s.alt=t,s.addEventListener("load",()=>{i(s)}),s.addEventListener("error",()=>{const n=new Error(`图片加载失败：${o}`);h.error("图片加载失败",{source:o,alt:t,error:n}),a(n)}),s.src=o})}const l=document.querySelector("#app");async function b(){try{v(),L(c.assets)}catch(e){h.error("官网初始化失败",e),A()}}function v(){const e=c;l.innerHTML=`
        <header class="site-header">
            <a class="brand" href="#top" aria-label="${e.title}">
                <span class="brand-logo"></span>
                <span>
                    <strong>${e.title}</strong>
                    <small>${e.subtitle}</small>
                </span>
            </a>
            <nav class="site-nav" aria-label="主导航">
                ${y(e.navigation)}
            </nav>
        </header>
        <main id="top">
            <section class="hero">
                <div class="hero-media">
                    <span class="hero-image"></span>
                    <div class="hero-shade"></div>
                </div>
                <div class="hero-content">
                    <p class="eyebrow">${e.hero.eyebrow}</p>
                    <img class="hero-img hero-content-img" src="images/title.png" alt="${e.title}" />
                    <div class="hero-content-inner">
                        <p class="hero-subtitle">${e.hero.title}</p>
                        <p class="hero-summary">${e.hero.summary}</p>
                        <dl class="hero-stats">${m(e.hero.stats)}</dl>
                        <div class="hero-actions">
                            <a class="button primary" href="#join">${e.hero.primaryCta}</a>
                            <a class="button secondary" href="#schedule">
                                ${e.hero.secondaryCta}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section class="section intro-section" aria-labelledby="intro-title">
                <div class="section-heading">
                    <p class="eyebrow">About</p>
                    <h2 id="intro-title">${e.intro.heading}</h2>
                </div>
                <p class="lead">${e.intro.body}</p>
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
                <div class="feature-grid">${$(e.training)}</div>
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
                <div class="schedule-list">${j(e.schedule)}</div>
            </section>
            <section class="section strength-section" aria-labelledby="strength-title">
                <div class="section-heading">
                    <p class="eyebrow">Why Us</p>
                    <h2 id="strength-title">训练优势</h2>
                </div>
                <ul class="strength-list">${d(e.strengths)}</ul>
            </section>
            <section
                class="section safety-section"
                id="safety"
                aria-labelledby="safety-title"
            >
                <div class="section-heading">
                    <p class="eyebrow">Safety</p>
                    <h2 id="safety-title">${e.safety.heading}</h2>
                </div>
                <ul class="safety-list">${d(e.safety.points)}</ul>
            </section>
            <section class="join-section" id="join" aria-labelledby="join-title">
                <div class="join-copy">
                    <p class="eyebrow">Join</p>
                    <h2 id="join-title">${e.join.heading}</h2>
                    <p>${e.join.body}</p>
                </div>
                <div class="contact-panel">${w(e.join.contacts)}</div>
            </section>
        </main>
        <footer class="site-footer">
            <span class="footer-logo"></span>
            <div>
                <strong>${e.footer.brand}</strong>
                <p>${e.footer.note}</p>
            </div>
        </footer>
    `,l.classList.add("is-ready")}function y(e){return e.map(t=>`<a href="${t.href}">${t.label}</a>`).join("")}function m(e){return e.map(t=>`<div><dt>${t.value}</dt><dd>${t.label}</dd></div>`).join("")}function $(e){return e.map(t=>`<article><h3>${t.title}</h3><p>${t.text}</p></article>`).join("")}function j(e){return e.map(t=>`<div><span>${t.label}</span><strong>${t.value}</strong></div>`).join("")}function d(e){return e.map(t=>`<li>${t}</li>`).join("")}function w(e){return e.map(t=>`<div><span>${t.label}</span><strong>${t.value}</strong></div>`).join("")}function L(e){r(".brand-logo",e.logo,"site-logo"),r(".hero-image",e.hero,"hero-img"),r(".footer-logo",e.partnerLogo,"partner-logo")}async function r(e,t,o){const i=document.querySelector(e);try{const a=await f(t.path,t.alt);a.className=o,i.classList.add("is-loaded"),i.append(a)}catch{i.classList.add("is-failed")}}function A(){l.innerHTML=`
        <main class="fallback">
            <h1>${c.title}</h1>
            <p>页面资源加载失败，请稍后刷新重试。</p>
        </main>
    `}b();
