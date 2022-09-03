'use strict';

import UserServiceError from './error/UserServiceError';

export type BuildErrorMessageFunc = 
    (arg0: UserServiceError, arg1: string) => string;

export type BuildSuccessMessageFunc =
    (arg0: string) => string;
