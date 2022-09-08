'use strict';

import { BuildErrorMessageFunc, BuildSuccessMessageFunc } from '../type/logMessageBuilderType';

/**
 * Generate error log message
 * @param {UserServiceError} error Error object
 * @param {string} action Action failed
 * @returns {string} Error log message
 */
export const buildErrorMessage: BuildErrorMessageFunc = (error, action) => {
    return `Failed to complete ${action} due to error ${error.message}.`;
};

/**
 * Generate route is being hit log message
 * @param {string} routePath Route path that error occurred
 * @param {sting} userId User Identifier
 * @returns {string} Success log message
 */
export const buildInfoMessageRouteHit: BuildSuccessMessageFunc = (routePath, userId) => {
    return `${routePath} route is being called by user ${userId}.`;
};

/**
 * Generate process completed log message
 * @param {string} process Process user that completed
 * @param {string} userId User identification 
 * @returns {string} Success log message
 */
export const buildInfoMessageUserProcessCompleted: BuildSuccessMessageFunc = (process, username) => {
    return `Request by ${username} has been completed of processing ${process}.`;
};
