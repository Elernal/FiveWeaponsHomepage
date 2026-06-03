import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "../src/App.vue";

interface MockLoadedImage {
    alt: string;
    src: string;
}

const imageLoaderMocks = vi.hoisted(() => ({
    getPublicAssetPath: vi.fn((assetPath: string) => {
        return `/FiveWeaponsHomepage/${assetPath}`;
    }),
    loadImage: vi.fn<(_path: string, _alt: string) => Promise<MockLoadedImage>>()
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
        imageLoaderMocks.getPublicAssetPath.mockClear();
        imageLoaderMocks.loadImage.mockReset();
        imageLoaderMocks.loadImage.mockImplementation((path: string, alt: string) => {
            return Promise.resolve({
                alt,
                src: `/FiveWeaponsHomepage/${path}`
            });
        });
    });

    it("渲染官网核心内容", async () => {
        const wrapper = mount(App);

        await waitForAsyncRender();

        expect(wrapper.text()).toContain("福建五兵团练营");
        expect(wrapper.text()).toContain("加入训练群");
        expect(wrapper.text()).toContain("训练内容");
        expect(wrapper.text()).toContain("加入方式");
    });

    it("图片异步加载失败时仍保留正文内容", async () => {
        imageLoaderMocks.loadImage.mockRejectedValue(new Error("load failed"));

        const wrapper = mount(App);

        await waitForAsyncRender();

        expect(wrapper.text()).toContain("福建五兵团练营");
        expect(wrapper.text()).toContain("加入训练群");
        expect(wrapper.find(".site-logo").exists()).toBe(false);
        expect(wrapper.find(".hero-content-img").exists()).toBe(true);
    });
});
