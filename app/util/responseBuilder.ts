'use strict';

import { IUser } from '../const/UserType';
import { ErrorResponseBuilderFunc, SuccessResponseBuilderFunc } from '../type/responseBuilderType';
import { GetAllUsersReturnType } from '../type/userControllerType';

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
export const successUserResponseBuilder: SuccessResponseBuilderFunc<IUser | GetAllUsersReturnType> = (data) => {
    return { data: data };
};
