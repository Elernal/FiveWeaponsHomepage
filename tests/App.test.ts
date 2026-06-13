import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "../src/App.vue";

interface MockLoadedImage {
    alt: string;
    src: string;
}

const loggerMocks = vi.hoisted(() => ({
    error: vi.fn(),
    info: vi.fn()
}));

const imageLoaderMocks = vi.hoisted(() => ({
    loadImage: vi.fn<(_path: string, _alt: string) => Promise<MockLoadedImage>>()
}));

vi.mock("../src/utils/logger", () => ({
    logger: loggerMocks
}));

vi.mock("../src/utils/imageLoader", () => imageLoaderMocks);

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
        loggerMocks.error.mockClear();
        loggerMocks.info.mockClear();
        imageLoaderMocks.loadImage.mockReset();
        imageLoaderMocks.loadImage.mockImplementation((path: string, alt: string) => {
            return Promise.resolve({
                alt,
                src: `/FiveWeaponsHomepage/${path}`
            });
        });
    });

    it("渲染现代竞技风首页核心内容", async () => {
        const wrapper = mount(App);

        await waitForAsyncRender();

        expect(wrapper.text()).toContain("福建五兵团练营");
        expect(wrapper.text()).toContain("汉服文化训练");
        expect(wrapper.text()).toContain("HEMA 历史欧洲武术");
        expect(wrapper.text()).toContain("训练路径");
        expect(wrapper.text()).toContain("加入训练群");
    });

    it("异步加载汉服和 HEMA 图片资源", async () => {
        mount(App);

        await waitForAsyncRender();

        expect(imageLoaderMocks.loadImage).toHaveBeenCalledWith(
            "images/hero-home-background.png",
            expect.stringContaining("主页背景图")
        );
        expect(imageLoaderMocks.loadImage).toHaveBeenCalledWith(
            "images/hanfu-culture-training.png",
            expect.stringContaining("汉服")
        );
        expect(imageLoaderMocks.loadImage).toHaveBeenCalledWith(
            "images/hero-hema-recruit.png",
            expect.stringContaining("HEMA")
        );
    });

    it("图片异步加载失败时仍保留正文内容", async () => {
        imageLoaderMocks.loadImage.mockRejectedValue(new Error("load failed"));

        const wrapper = mount(App);

        await waitForAsyncRender();

        expect(wrapper.text()).toContain("汉服文化训练");
        expect(wrapper.text()).toContain("HEMA 历史欧洲武术");
        expect(wrapper.find(".site-logo").exists()).toBe(false);
        expect(wrapper.find(".focus-card").exists()).toBe(true);
        expect(loggerMocks.error).toHaveBeenCalled();
    });
});
