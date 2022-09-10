'use strict';

import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import { CONTENT_TYPE_REQUIRED, USER_EMAIL_REQUIRED, USER_FIRST_NAME_REQUIRED, 
    USER_ID_REQUIRED_IN_PATH, 
    USER_LAST_NAME_REQUIRED, USER_PASSWORD_REQUIRED, USER_ROLE_REQUIRED, USER_USERNAME_REQUIRED } 
    from '../const/errorMessage';
import LogType from '../const/logType';
import { UserType } from '../type/userType';
import { Logger } from '../log/logger';
import { buildErrorMessage } from '../util/logMessageBuilder';
import { validatorErrorBuilder } from '../util/serviceErrorBuilder';

const Logging = Logger(__filename);

// Common header validation middleware
export const validateHeader = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        headers: {
            'content-type': Joi.string().valid('application/json').required().error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, CONTENT_TYPE_REQUIRED); })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// UserId as parameter validation middleware 
export const validateParamUserId = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        params: {
            userId: Joi.string().required().error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_ID_REQUIRED_IN_PATH); })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// User login request boy validator
export const validateUserLoginRequestBody = (req: Request, res: Response, next: NextFunction) => {
    console.log('------>>>', req.body);
    const validationCriteria = Joi.object({
        body: {
            username: Joi.string().required().max(20).error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_USERNAME_REQUIRED); }),
            password: Joi.string().required().max(50).error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_PASSWORD_REQUIRED); })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// User patch request body validator
export const validateUserPatchRequestBody = (req: Request, res: Response, next: NextFunction) => {
    // User patch payload schema. No field required. But passed fields should have valid data.
    const userCreatePayloadValidationCriteria = Joi.object({
        body: {
            firstName: Joi.string().max(50).error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_FIRST_NAME_REQUIRED); }),
            lastName: Joi.string().max(50).error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_LAST_NAME_REQUIRED); }),
            email: Joi.string().email().max(50).error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_EMAIL_REQUIRED); }),
            role: Joi.string().valid(UserType.ADMIN, UserType.CUSTOMER).error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_ROLE_REQUIRED); }),
            username: Joi.string().max(20).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_USERNAME_REQUIRED);
            }),
            password: Joi.string().max(50).pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_PASSWORD_REQUIRED); })
        }
    });
    validateRequest(req, next, userCreatePayloadValidationCriteria);
};

// User create payload schema
export const userCreatePayloadValidationCriteria = Joi.object({
    body: {
        firstName: Joi.string().required().max(50).error((error) => {
            const err = error as Error | unknown;
            return validatorErrorBuilder(err as Error, USER_FIRST_NAME_REQUIRED);
        }),
        lastName: Joi.string().required().max(50).error((error) => {
            const err = error as Error | unknown;
            return validatorErrorBuilder(err as Error, USER_LAST_NAME_REQUIRED);
        }),
        email: Joi.string().required().max(50).email().error((error) => {
            const err = error as Error | unknown;
            return validatorErrorBuilder(err as Error, USER_EMAIL_REQUIRED);
        }),
        role: Joi.string().required().valid(UserType.ADMIN, UserType.CUSTOMER).error((error) => {
            const err = error as Error | unknown;
            return validatorErrorBuilder(err as Error, USER_ROLE_REQUIRED);
        }),
        username: Joi.string().required().max(20).error((error) => {
            const err = error as Error | unknown;
            return validatorErrorBuilder(err as Error, USER_USERNAME_REQUIRED);
        }),
        password: Joi.string().required().max(50).pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).error((error) => {
            const err = error as Error | unknown;
            return validatorErrorBuilder(err as Error, USER_PASSWORD_REQUIRED);
        })
    }
});
// User create request body validator
export const validateCreateUserRequestBody = (req: Request, res: Response, next: NextFunction) => {
    validateRequest(req, next, userCreatePayloadValidationCriteria);
};

// Options for validate action
const options: {[key: string]: boolean} = {
    abortEarly: false,
    allowUnknown: true
};

// Validate object against the schema
export const validator = (data: object, validationCriteria: Joi.Schema) => {
    const { error } = validationCriteria.validate(data, options);
    if (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'validate params'), LogType.ERROR);
        throw err;
    }
};

// Execute validator for routers
const validateRequest = (req: Request, next: NextFunction, schema: Joi.Schema) => {
    validator(req, schema);
    next();
};

// Execute validator for functions
export const validateData = (dataToValidate: object, schema: Joi.Schema) => {
    validator(dataToValidate, schema);
};
