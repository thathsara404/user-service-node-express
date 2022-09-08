'use strict';

import { USER_DATA_CONFLICT_MESSAGE } from '../const/errorMessage';
import ErrorType from '../const/errorType';
import { HTTPUserError } from '../const/httpCode';
import UserServiceError from '../type/error/UserServiceError';
import { ServiceErrorBuilderFunc } from '../type/userServiceType';

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
