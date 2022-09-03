'use strict';

import { BuildErrorMessageFunc, BuildSuccessMessageFunc } from '../type/logMessageBuilderType';

/**
 * Generate error log message
 * @param {UserServiceError} error Error object
 * @param {string} routePath Route path that error occurred
 * @returns {string} Error log message
 */
export const buildErrorMessage: BuildErrorMessageFunc = (error, routePath) => {
    return `Failed to complete ${routePath} due to error ${error.message}.`;
};

/**
 * Generate route is being hit log
 * @param {string} routePath Route path that error occurred
 * @returns {string} Success log message
 */
export const buildInfoMessageRouteHit: BuildSuccessMessageFunc = (routePath) => {
    return `${routePath} route is being called.`;
};
