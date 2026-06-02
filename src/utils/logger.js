/**
 * 输出错误日志，方便集中替换为更完整的项目日志库。
 *
 * @param {string} message 错误说明。
 * @param {unknown} details 错误详情。
 * @returns {void}
 */
function logError(message, details) {
    console.error(`[FiveWeaponsHomepage] ${message}`, details);
}

/**
 * 输出普通信息日志。
 *
 * @param {string} message 信息说明。
 * @param {unknown} details 信息详情。
 * @returns {void}
 */
function logInfo(message, details) {
    console.info(`[FiveWeaponsHomepage] ${message}`, details);
}

export const logger = {
    error: logError,
    info: logInfo
};
