export interface ImageAsset {
    path: string;
    alt: string;
}

export interface NavigationItem {
    label: string;
    href: string;
}

export interface HeroStat {
    value: string;
    label: string;
}

export interface TextBlock {
    title: string;
    text: string;
}

export interface LabeledValue {
    label: string;
    value: string;
}

export interface SiteContent {
    title: string;
    subtitle: string;
    assets: {
        logo: ImageAsset;
        partnerLogo: ImageAsset;
        hero: ImageAsset;
    };
    navigation: NavigationItem[];
    hero: {
        eyebrow: string;
        title: string;
        summary: string;
        primaryCta: string;
        secondaryCta: string;
        stats: HeroStat[];
    };
    intro: {
        heading: string;
        body: string;
    };
    training: TextBlock[];
    schedule: LabeledValue[];
    strengths: string[];
    safety: {
        heading: string;
        points: string[];
    };
    join: {
        heading: string;
        body: string;
        contacts: LabeledValue[];
    };
    footer: {
        brand: string;
        note: string;
    };
}

export const siteContent: SiteContent = {
    title: "福建五兵团练营",
    subtitle: "HEMA 俱乐部",
    assets: {
        logo: {
            path: "images/logo-five-weapons.jpg",
            alt: "福建五兵团练营标识"
        },
        partnerLogo: {
            path: "images/logo-black-tigers.jpg",
            alt: "Black Tigers 标识"
        },
        hero: {
            path: "images/hero-hema-recruit.png",
            alt: "两名 HEMA 训练者在室内进行长剑对练"
        }
    },
    navigation: [
        { label: "训练内容", href: "#training" },
        { label: "时间安排", href: "#schedule" },
        { label: "安全说明", href: "#safety" },
        { label: "加入方式", href: "#join" }
    ],
    hero: {
        eyebrow: "历史武术 · 现代训练 · 福建",
        title: "以安全训练，进入真实的欧洲历史武术",
        summary:
            "福建五兵团练营面向 HEMA 爱好者与新人，提供长剑、基础体能、" +
            "技法拆解和安全对抗训练。",
        primaryCta: "加入训练群",
        secondaryCta: "预约体验",
        stats: [
            { value: "HEMA", label: "历史欧洲武术" },
            { value: "安全", label: "护具与规则先行" },
            { value: "新人", label: "零基础可体验" }
        ]
    },
    intro: {
        heading: "不是表演，是可训练、可复盘的武术系统",
        body:
            "我们从历史文献、现代运动训练和实战安全规则出发，学习兵器距离、" +
            "步法、攻防判断与对抗节奏。训练强调纪律、保护和持续进步。"
    },
    training: [
        {
            title: "长剑基础",
            text: "握持、站架、步法、切击线路、距离控制与基础攻防。"
        },
        {
            title: "技法拆解",
            text: "围绕历史技法进行分段练习，把动作还原为可执行的训练任务。"
        },
        {
            title: "安全对抗",
            text: "在护具、规则和教练监督下，逐步进入轻量到正式强度的对练。"
        },
        {
            title: "体能与协调",
            text: "补足核心、下肢、肩背和反应训练，让动作更稳定、更可控。"
        }
    ],
    schedule: [
        { label: "常规训练", value: "每周训练时间待补" },
        { label: "新人体验", value: "可提前预约，具体场次待补" },
        { label: "训练地点", value: "福建地区训练点待补" }
    ],
    strengths: [
        "从安全规则和装备使用开始，降低新人入门压力。",
        "训练目标清晰，每次练习都能对应到动作、距离或判断能力。",
        "兼顾技术、体能和对抗，不把 HEMA 做成单纯摆拍。",
        "保留社群交流空间，方便新人提问、约练和复盘。"
    ],
    safety: {
        heading: "安全优先，循序进入对抗",
        points: [
            "新人先进行基础动作、距离感和装备说明，不直接进入高强度对抗。",
            "对练需遵守护具、武器、强度和停止口令要求。",
            "训练中如有身体不适、装备问题或动作风险，应立即暂停。"
        ]
    },
    join: {
        heading: "加入训练群",
        body:
            "真实联系方式暂未公开。请将微信号、训练群二维码、报名表或邮箱补充到" +
            "此处后即可正式上线。",
        contacts: [
            { label: "微信 / 训练群", value: "待补：训练群二维码或联系人微信" },
            { label: "邮箱", value: "待补：club@example.com" },
            { label: "体验说明", value: "请提前预约，穿着便于运动的服装到场。" }
        ]
    },
    footer: {
        brand: "福建五兵团练营",
        note: "Black Tigers 标识作为社群历史或关联标识预留展示。"
    }
};
