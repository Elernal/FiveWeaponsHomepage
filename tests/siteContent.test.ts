import { describe, expect, it } from "vitest";
import { siteContent } from "../src/content/siteContent";

describe("siteContent", () => {
    it("包含官网必要区块", () => {
        expect(siteContent.hero).toBeDefined();
        expect(siteContent.intro).toBeDefined();
        expect(siteContent.training.length).toBeGreaterThan(0);
        expect(siteContent.schedule.length).toBeGreaterThan(0);
        expect(siteContent.safety.points.length).toBeGreaterThan(0);
        expect(siteContent.join.contacts.length).toBeGreaterThan(0);
        expect(siteContent.footer).toBeDefined();
    });

    it("首屏 CTA 使用加入训练群", () => {
        expect(siteContent.hero.primaryCta).toBe("加入训练群");
    });

    it("联系方式使用清晰占位内容", () => {
        const contactText = siteContent.join.contacts.map((item) => item.value).join(" ");

        expect(contactText).toContain("待补");
    });
});
