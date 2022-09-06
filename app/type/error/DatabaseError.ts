'use strict';

import ErrorType from '../../const/errorType';
import UserServiceError from './UserServiceError';

class DatabaseError extends Error implements UserServiceError {
    code: number;

    name: string;

    message: string;

    stack: string;

    constructor (message: string, stack: string, code: number) {
        super();
        this.name = ErrorType.DATABASE_ERROR;
        this.message = message;
        this.stack = stack;
        this.code = code;
    }
}

export default DatabaseError;
