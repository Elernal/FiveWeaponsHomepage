/**
 * 输出错误日志，方便集中替换为更完整的项目日志库。
 *
 * @param {string} message 错误说明。
 * @param {unknown} details 错误详情。
 * @returns {void}
 */
function logError(message: string, details: unknown): void {
    console.error(`[FiveWeaponsHomepage] ${message}`, details);
}

/**
 * 输出普通信息日志。
 *
 * @param {string} message 信息说明。
 * @param {unknown} details 信息详情。
 * @returns {void}
 */
function logInfo(message: string, details: unknown): void {
    console.info(`[FiveWeaponsHomepage] ${message}`, details);
}

export interface Logger {
    error: (message: string, details: unknown) => void;
    info: (message: string, details: unknown) => void;
}

export const logger: Logger = {
    error: logError,
    info: logInfo
};
