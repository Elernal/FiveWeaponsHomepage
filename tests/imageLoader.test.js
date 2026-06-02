import { afterEach, describe, expect, it, vi } from "vitest";
import { getPublicAssetPath, loadImage } from "../src/utils/imageLoader.js";
import { logger } from "../src/utils/logger.js";

class MockImage {
    /**
     * 创建图片 mock。
     */
    constructor() {
        this.alt = "";
        this.listeners = {};
    }

    /**
     * 记录图片事件监听。
     *
     * @param {string} type 事件类型。
     * @param {Function} handler 事件回调。
     * @returns {void}
     */
    addEventListener(type, handler) {
        this.listeners[type] = handler;
    }

    /**
     * 设置图片地址并触发 mock 事件。
     *
     * @param {string} value 图片地址。
     */
    set src(value) {
        this.currentSource = value;

        if (value.includes("broken")) {
            this.listeners.error();
            return;
        }

        this.listeners.load();
    }

    /**
     * 读取当前图片地址。
     *
     * @returns {string} 图片地址。
     */
    get src() {
        return this.currentSource;
    }
}

describe("imageLoader", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("根据 BASE_URL 拼接 public 图片路径", () => {
        const assetPath = getPublicAssetPath("images/demo.png", "/FiveWeaponsHomepage/");

        expect(assetPath).toBe("/FiveWeaponsHomepage/images/demo.png");
    });

    it("成功时异步返回图片对象", async () => {
        vi.stubGlobal("Image", MockImage);

        const image = await loadImage("images/demo.png", "测试图片");

        expect(image.alt).toBe("测试图片");
        expect(image.src).toBe(`${import.meta.env.BASE_URL}images/demo.png`);
    });

    it("失败时记录 logger 错误", async () => {
        vi.stubGlobal("Image", MockImage);
        const errorSpy = vi.spyOn(logger, "error").mockImplementation(() => {});

        await expect(loadImage("images/broken.png", "错误图片")).rejects.toThrow("图片加载失败");
        expect(errorSpy).toHaveBeenCalledOnce();
    });
});
