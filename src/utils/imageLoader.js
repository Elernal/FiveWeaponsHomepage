import { logger } from "./logger.js";

/**
 * 根据 Vite base 拼接 public 资源路径。
 *
 * @param {string} assetPath
 * public 目录下的相对路径。
 * @param {string} baseUrl
 * Vite 注入的基础路径。
 * @returns {string} 可用于浏览器访问的资源路径。
 */
export function getPublicAssetPath(assetPath, baseUrl = import.meta.env.BASE_URL) {
    return `${baseUrl}${assetPath}`;
}

/**
 * 异步加载图片，失败时记录项目日志。
 *
 * @param {string} assetPath
 * public 目录下的相对路径。
 * @param {string} alt
 * 图片替代文本。
 * @returns {Promise<HTMLImageElement>}
 * 加载完成的图片元素。
 */
export function loadImage(assetPath, alt = "") {
    const source = getPublicAssetPath(assetPath);

    return new Promise((resolve, reject) => {
        const image = new Image();
        image.alt = alt;

        image.addEventListener("load", () => {
            resolve(image);
        });

        image.addEventListener("error", () => {
            const error = new Error(`图片加载失败：${source}`);
            logger.error("图片加载失败", { source, alt, error });
            reject(error);
        });

        image.src = source;
    });
}
