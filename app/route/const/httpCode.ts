'use strict';

export enum HTTPServerError {
    INTERNAL_SERVER_ERROR_CODE = 500,
    INTERNAL_SERVER_ERROR_MESSAGE= 'Internal Server Error',

    NOT_IMPLEMENTED_CODE = 501,
    NOT_IMPLEMENTED_MESSAGE = 'Not Implemented',
}

export enum HTTPUserError {
    BAD_REQUEST_CODE = 400,
    BAD_REQUEST_MESSAGE = 'Bad Request',

    UNAUTHORIZED_CODE = 401,
    UNAUTHORIZED_MESSAGE = 'Unauthorized',

    FORBIDDEN_CODE = 403,
    FORBIDDEN_MESSAGE = 'Forbidden',

    NOT_FOUND_CODE = 404,
    NOT_FOUND_MESSAGE = 'Not Found',

    METHOD_NOT_ALLOWED_CODE = 405,
    METHOD_NOT_ALLOWED_MESSAGE = 'Method Not Allowed'
}

export enum HTTPRedirection {

}

export enum HTTPSuccess {
    OK_CODE = 200,
    OK_MESSAGE = 'Ok',

    CREATED_CODE = 201,
    CREATED_MESSAGE = 'Created',

    NO_CONTENT_CODE = 204,
    NO_CONTENT_MESSAGE = 'No Content'
}
