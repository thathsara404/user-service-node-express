'use strict';

import ErrorType from '../const/errorType';
import { HTTPServerError } from '../const/httpCode';
import { SendErrorResponseFunc } from '../type/errorBuilderMiddlewareType';
import { ErrorResponseBuilderResponse } from '../type/responseBuilderType';
import { errorResponseBuilder } from '../util/responseBuilder';

/**
 * Build error response and send
 * @param {UserServiceError} error UserService error object
 * @param {Response} res Response object
 * @returns {void}
 */
const sendErrorResponse: SendErrorResponseFunc = (error, res) => {
    const finalErrorObject: ErrorResponseBuilderResponse = 
        errorResponseBuilder(error);
    switch (error.name) {
        case ErrorType.USER_REGISTRATION_ERROR:
            return res.status(error.code).json(finalErrorObject);
        case ErrorType.USER_RETRIEVAL_ERROR:
            return res.status(error.code).json(finalErrorObject);
        default:
            return res.status(HTTPServerError.INTERNAL_SERVER_ERROR_CODE).
                json(HTTPServerError.INTERNAL_SERVER_ERROR_MESSAGE);
    }
};

export default sendErrorResponse;
