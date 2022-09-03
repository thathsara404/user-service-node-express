'use strict';

import UserServiceError from './error/UserServiceError';

export interface ErrorResponseBuilderResponse {
    error: string
}
export type ErrorResponseBuilderFunc = 
    (arg0: UserServiceError) => ErrorResponseBuilderResponse;

export interface SuccessResponseBuilderResponse {
    data: object
}
export type SuccessResponseBuilderFunc =
    (arg0: object) => SuccessResponseBuilderResponse

