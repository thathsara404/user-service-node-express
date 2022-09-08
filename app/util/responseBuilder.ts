'use strict';

import { IUser } from '../type/userType';
import { ErrorResponseBuilderFunc, SuccessResponseBuilderFunc } from '../type/responseBuilderType';
import { GetAllUsersReturnType } from '../type/userServiceType';
import { UserLoginResponse } from '../type/responseType';

/**
 * Generate error response
 * @param {UserServiceError} error Error object
 * @returns {ErrorResponseBuilderResponse} Error response
 */
export const errorResponseBuilder: ErrorResponseBuilderFunc = (error) => {
    return { error: error.message };
};

/**
 * Generate success response for user data
 * @param {object} data Built response
 * @returns {SuccessResponseBuilderResponse} Success response
 */
export const successUserResponseBuilder: SuccessResponseBuilderFunc<IUser |
    GetAllUsersReturnType | UserLoginResponse> = (data) => {
        return { data: data };
    };

