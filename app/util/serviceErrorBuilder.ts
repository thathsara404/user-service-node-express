'use strict';

import { USER_DATA_CONFLICT_MESSAGE } from '../const/errorMessage';
import ErrorType from '../const/errorType';
import { HTTPUserError } from '../const/httpCode';
import UserServiceError from '../type/error/UserServiceError';
import { ServiceErrorBuilderFunc, ValidatorErrorBuilderFunc } from '../type/userServiceType';

/**
 * Build and throws custom errors based on the passed error
 * @param {string} error Error message
 * @throws {UserServiceError} Built error
 */
export const serviceErrorBuilder: ServiceErrorBuilderFunc = (claimData) => {
    if (claimData) {
        if (claimData.includes('E11000')) {
            throw new UserServiceError(
                ErrorType.USER_DATA_CONFLICT, USER_DATA_CONFLICT_MESSAGE, '', HTTPUserError.CONFLICT_ERROR_CODE);
        }
    }
};

/**
 * Build and return validator error
 * @param {Error} error Error object
 * @param {string} errorMessage Error message suppose to pass
 * @returns {UserServiceError} Built error
 */
export const validatorErrorBuilder: ValidatorErrorBuilderFunc = (error, message) => {
    if (error && message) {
        return new UserServiceError(ErrorType.
            USER_INVALID_REQUEST, message, error.message, HTTPUserError.
            BAD_REQUEST_CODE);
    }
    return new UserServiceError(ErrorType.
        USER_INVALID_REQUEST, message, '', HTTPUserError.
        BAD_REQUEST_CODE);
};

