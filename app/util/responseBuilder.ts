'use strict';

import { ErrorResponseBuilderFunc, SuccessResponseBuilderFunc } from '../type/responseBuilderType';

/**
 * Generate error response
 * @param {UserServiceError} error Error object
 * @returns {ErrorResponseBuilderResponse} Error response
 */
export const errorResponseBuilder: ErrorResponseBuilderFunc = (error) => {
    return { error: error.message };
};

/**
 * Generate success response
 * @param {object} data Built response
 * @returns {SuccessResponseBuilderResponse} Success response
 */
export const successResponseBuilder: SuccessResponseBuilderFunc = (data) => {
    return { data: data };
};
