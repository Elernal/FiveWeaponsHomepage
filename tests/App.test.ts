import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../src/App.vue";

/**
 * 等待 Vue 挂载后的异步任务完成。
 *
 * @returns {Promise<void>} 等待任务。
 */
async function waitForAsyncRender(): Promise<void> {
    await Promise.resolve();
    await Promise.resolve();
}

describe("App", () => {
    beforeEach(() => {
        vi.stubGlobal("scrollTo", vi.fn());
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("渲染参考图对应的首页核心模块", async () => {
        const wrapper = mount(App);

        await waitForAsyncRender();

        expect(wrapper.text()).toContain("福建五兵");
        expect(wrapper.text()).toContain("HEMA 历史剑术俱乐部");
        expect(wrapper.text()).toContain("新人路径");
        expect(wrapper.text()).toContain("本月活动");
        expect(wrapper.text()).toContain("训练装备");
        expect(wrapper.text()).toContain("课程体系");
        expect(wrapper.text()).toContain("兵器知识");
    });

    it("可以切换到 HEMA、汉服武备和活动相册视图", async () => {
        const wrapper = mount(App);

        await wrapper.get("nav").findAll("button")[1].trigger("click");
        expect(wrapper.text()).toContain("什么是 HEMA");
        expect(wrapper.text()).toContain("兵器训练方向");

        await wrapper.get("nav").findAll("button")[2].trigger("click");
        expect(wrapper.text()).toContain("汉服相关介绍图片展示");
        expect(wrapper.text()).toContain("展示内容");

        await wrapper.get("nav").findAll("button")[3].trigger("click");
        expect(wrapper.text()).toContain("总体活动图片展示");
        expect(wrapper.text()).toContain("近期活动");
    });

    it("活动相册支持按分类筛选", async () => {
        const wrapper = mount(App);

        await wrapper.get("nav").findAll("button")[3].trigger("click");
        await wrapper.findAll(".filter-tabs button")[1].trigger("click");

        const captions = wrapper.findAll(".gallery-grid figcaption").map((item) => item.text());

        expect(captions).toContain("07.03长剑基础课");
        expect(captions).toContain("07.17技术复盘");
        expect(captions).not.toContain("07.06汉服武备开放日");
    });

    it("使用迁移后的真实图片资源和单行品牌页脚", async () => {
        const wrapper = mount(App);

        await waitForAsyncRender();

        expect(wrapper.find("img").attributes("src")).toContain("assets/club-logo-source.png");
        expect(wrapper.find(".footer-brand strong").text()).toBe("福建五兵团练营");
        expect(wrapper.find(".footer-brand span").exists()).toBe(false);
    });
});
