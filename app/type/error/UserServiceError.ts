'use strict';

import ErrorType from '../../const/errorType';
import IUserServiceError from '../userServiceErrorInterface';

class UserServiceError extends Error implements IUserServiceError {
    code: number;

    name: string;

    message: string;

    stack: string;

    constructor (message: string, stack: string, code: number) {
        super();
        this.name = ErrorType.USER_SERVICE_ERROR;
        this.message = message;
        this.stack = stack;
        this.code = code;
    }
}

export default UserServiceError;
