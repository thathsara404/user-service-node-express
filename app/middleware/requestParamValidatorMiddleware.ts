'use strict';

import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import { USER_INVALID_REQUEST_MESSAGE } from '../const/errorMessage';
import ErrorType from '../const/errorType';
import { HTTPUserError } from '../const/httpCode';
import LogType from '../const/logType';
import { UserType } from '../type/userType';
import { Logger } from '../log/logger';
import UserServiceError from '../type/error/UserServiceError';
import { buildErrorMessage } from '../util/logMessageBuilder';

const Logging = Logger(__filename);

export const validateHeader = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        headers: {
            'content-type': Joi.string().valid('application/json').required()
        }
    });
    validateRequest(req, next, validationCriteria);
};

export const validateUserLoginRequestBody = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        body: {
            username: Joi.string().required().empty(''),
            password: Joi.string().required().empty('')
        }
    });
    validateRequest(req, next, validationCriteria);
};

export const validateCreateUserRequestBody = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        body: {
            firstName: Joi.string().required().empty(''),
            lastName: Joi.string().required().empty(''),
            role: Joi.string().required().empty('').valid(UserType.ADMIN, UserType.CUSTOMER),
            username: Joi.string().required().empty('').email(),
            password: Joi.string().required().empty('').pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        }
    });
    validateRequest(req, next, validationCriteria);
};

export const validateRequest = (req: Request, next: NextFunction, schema: Joi.Schema) => {
    const options: {[key: string]: boolean} = {
        abortEarly: false,
        allowUnknown: true
    };
    const { error } = schema.validate(req, options);
    if (error) {
        const err = error as Error;
        const errorDetails: string = error.details[0].message;
        Logging.log(buildErrorMessage(err, 'validate request params'), LogType.ERROR);
        throw new UserServiceError(
            ErrorType.USER_INVALID_REQUEST, USER_INVALID_REQUEST_MESSAGE, errorDetails, HTTPUserError.BAD_REQUEST_CODE);
    } else {
        next();
    }
};
