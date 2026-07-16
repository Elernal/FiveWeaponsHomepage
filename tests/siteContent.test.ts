import { describe, expect, it } from "vitest";
import { siteContent } from "../src/content/siteContent";

describe("siteContent", () => {
    it("包含现代竞技风首页必要区块", () => {
        expect(siteContent.title).toBe("福建五兵 HEMA 历史剑术俱乐部");
        expect(siteContent.subtitle).toBe("FIVE WEAPONS MILITIA BARRACK");
        expect(siteContent.hero).toBeDefined();
        expect(siteContent.focusModules.length).toBe(2);
        expect(siteContent.training.items.length).toBeGreaterThan(0);
        expect(siteContent.schedule.items.length).toBeGreaterThan(0);
        expect(siteContent.safety.points.length).toBeGreaterThan(0);
        expect(siteContent.join.contacts.length).toBeGreaterThan(0);
        expect(siteContent.footer).toBeDefined();
    });

    it("包含汉服和 HEMA 双主线模块", () => {
        const moduleHeadings = siteContent.focusModules.map((item) => item.heading);
        const navigationLabels = siteContent.navigation.map((item) => item.label);

        expect(moduleHeadings).toContain("汉服文化训练");
        expect(moduleHeadings).toContain("HEMA 历史欧洲武术");
        expect(navigationLabels).toEqual(["汉服", "HEMA", "训练", "日程", "加入"]);
    });

    it("汉服和 HEMA 模块配置了可访问图片信息", () => {
        expect(siteContent.assets.heroBackground.path).toBe("images/hero-home-background.png");
        expect(siteContent.assets.heroBackground.alt).toContain("主页背景图");
        expect(siteContent.assets.hanfu.path).toBe("images/hanfu-culture-training.png");
        expect(siteContent.assets.hanfu.alt).toContain("汉服");
        expect(siteContent.assets.hero.alt).toContain("HEMA");
        expect(siteContent.assets.logo.path).toBe("images/logo-five-weapons.jpg");
    });

    it("联系信息使用清晰占位内容", () => {
        const contactText = siteContent.join.contacts.map((item) => item.value).join(" ");

        expect(contactText).toContain("待补");
    });

    it("不再保留旧的外部标识内容", () => {
        const serializedContent = JSON.stringify(siteContent);

        expect(serializedContent).not.toContain("Black Tigers");
        expect(serializedContent).not.toContain("logo-black-tigers");
    });
});
