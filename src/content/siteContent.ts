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

export type FocusImageKey = "hanfu" | "hero";

export interface FocusModule {
    id: string;
    label: string;
    heading: string;
    summary: string;
    ctaLabel: string;
    ctaHref: string;
    imageKey: FocusImageKey;
    points: TextBlock[];
}

export interface SiteContent {
    title: string;
    subtitle: string;
    assets: {
        logo: ImageAsset;
        partnerLogo: ImageAsset;
        heroBackground: ImageAsset;
        hero: ImageAsset;
        hanfu: ImageAsset;
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
    focusModules: FocusModule[];
    training: {
        heading: string;
        summary: string;
        items: TextBlock[];
    };
    schedule: {
        heading: string;
        summary: string;
        items: LabeledValue[];
    };
    safety: {
        heading: string;
        summary: string;
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
    subtitle: "Hanfu Culture / HEMA Club",
    assets: {
        logo: {
            path: "images/logo-five-weapons.jpg",
            alt: "福建五兵团练营标识"
        },
        partnerLogo: {
            path: "images/logo-black-tigers.jpg",
            alt: "Black Tigers 标识"
        },
        heroBackground: {
            path: "images/hero-home-background.png",
            alt: "中式甲胄战士与现代 HEMA 护具训练者形成对峙的主页背景图"
        },
        hero: {
            path: "images/hero-hema-recruit.png",
            alt: "两名 HEMA 训练者在室内进行长剑对练"
        },
        hanfu: {
            path: "images/hanfu-culture-training.png",
            alt: "身着汉服元素训练服的成员在训练馆完成动态步法动作"
        }
    },
    navigation: [
        { label: "汉服", href: "#hanfu" },
        { label: "HEMA", href: "#hema" },
        { label: "训练", href: "#training" },
        { label: "日程", href: "#schedule" },
        { label: "加入", href: "#join" }
    ],
    hero: {
        eyebrow: "福建 · 传统服饰文化 · 历史欧洲武术",
        title: "把文化穿上身，把训练落到场上",
        summary:
            "福建五兵团练营面向汉服文化爱好者与 HEMA 训练者，提供可体验、可复盘、" +
            "可持续参与的社群活动与安全训练。",
        primaryCta: "预约体验",
        secondaryCta: "查看双主线",
        stats: [
            { value: "Hanfu", label: "传统服饰文化体验" },
            { value: "HEMA", label: "历史欧洲武术训练" },
            { value: "Safe", label: "护具、规则与循序对抗" }
        ]
    },
    focusModules: [
        {
            id: "hanfu",
            label: "Hanfu Culture",
            heading: "汉服文化训练",
            summary:
                "以传统服饰为视觉入口，结合身段、礼仪、步法与展示训练，" +
                "让文化体验保持真实、克制且具备运动感。",
            ctaLabel: "了解汉服模块",
            ctaHref: "#join",
            imageKey: "hanfu",
            points: [
                {
                    title: "服饰与身段",
                    text: "理解衣冠结构、穿着秩序和基础仪态，让展示动作更稳定。"
                },
                {
                    title: "步法与空间",
                    text: "用训练方式处理行进、转身、定点展示和多人队形。"
                },
                {
                    title: "活动呈现",
                    text: "适配社群体验、文化展示和公开活动，不把汉服当作对抗装备。"
                }
            ]
        },
        {
            id: "hema",
            label: "Historical European Martial Arts",
            heading: "HEMA 历史欧洲武术",
            summary:
                "围绕长剑基础、历史技法拆解、距离判断和安全对抗，" +
                "把欧洲武术从文献转化为可训练的运动能力。",
            ctaLabel: "查看 HEMA 训练",
            ctaHref: "#training",
            imageKey: "hero",
            points: [
                {
                    title: "长剑基础",
                    text: "握持、站架、步法、切击线路、距离控制和基础攻防。"
                },
                {
                    title: "技法拆解",
                    text: "从历史文献出发，把动作还原为明确的训练任务。"
                },
                {
                    title: "安全对抗",
                    text: "在护具、规则和教练监督下，逐步进入轻量到正式强度的对练。"
                }
            ]
        }
    ],
    training: {
        heading: "训练路径",
        summary: "新人可以从零基础体验开始，再按兴趣进入汉服展示或 HEMA 对抗训练。",
        items: [
            {
                title: "入门体验",
                text: "完成安全说明、基础动作和社群规则介绍，确认适合自己的参与方式。"
            },
            {
                title: "专项分流",
                text: "根据兴趣选择汉服文化训练、HEMA 长剑训练，或同时参与两条主线。"
            },
            {
                title: "周期练习",
                text: "通过固定训练主题推进动作稳定性、距离感、体能和活动呈现能力。"
            },
            {
                title: "复盘交流",
                text: "保留训练记录和反馈空间，方便成员提问、约练和持续进步。"
            }
        ]
    },
    schedule: {
        heading: "时间安排",
        summary: "具体场次会根据场地和成员情况更新，体验需提前预约。",
        items: [
            { label: "常规训练", value: "每周训练时间待补" },
            { label: "新人体验", value: "可提前预约，具体场次待补" },
            { label: "训练地点", value: "福建地区训练点待补" }
        ]
    },
    safety: {
        heading: "安全优先，循序进入对抗",
        summary: "无论是文化展示还是武术训练，现场都会先处理边界、装备和动作风险。",
        points: [
            "新人先完成基础动作、距离感和装备说明，不直接进入高强度对抗。",
            "HEMA 对练需遵守护具、武器、强度和停止口令要求。",
            "训练中如有身体不适、装备问题或动作风险，应立即暂停。"
        ]
    },
    join: {
        heading: "加入训练群",
        body:
            "欢迎汉服文化爱好者、HEMA 新人和有训练经验的成员预约体验。" +
            "真实联系方式暂未公开，可将微信群二维码、报名表或邮箱补充到这里。",
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
