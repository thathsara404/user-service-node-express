'use strict';

import UserServiceError from './error/UserServiceError';

export interface ErrorResponseBuilderResponse {
    error: string
}
export type ErrorResponseBuilderFunc = 
    (arg0: UserServiceError) => ErrorResponseBuilderResponse;

export type SuccessResponseBuilderFunc<T> =
    (arg0: T | Array<T>) => {data: T | Array<T>}

