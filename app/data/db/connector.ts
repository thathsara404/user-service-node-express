'use strict';

import mongoose from 'mongoose';
import config from '../../config/config';
import LogType from '../../const/logType';
import { Logger } from '../../log/logger';
import { HTTPServerError } from '../../const/httpCode';
import { buildErrorMessage } from '../../util/logMessageBuilder';
import UserServiceError from '../../type/error/UserServiceError';
import ErrorType from '../../const/errorType';
import { ISSUE_FOUND_WHILE_CONNECTING_DB_MESSAGE } from '../../const/errorMessage';

const Logging = Logger(__filename);

// Mongo DB Connection
export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(prepareDBConnectionURL(), {
            autoIndex: true
        });
    } catch (error) {
        const err = error as Error;
        const dbError = new UserServiceError(ErrorType
            .DATABASE_ERROR, ISSUE_FOUND_WHILE_CONNECTING_DB_MESSAGE, err.
            message, HTTPServerError.INTERNAL_SERVER_ERROR_CODE);
        Logging.log(buildErrorMessage(dbError, 'Database'), LogType.ERROR);
        throw dbError;
    }
};

export const prepareDBConnectionURL = (): string => {
    const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DOCKER_PORT, MONGODB_DATABASE } = config.DB;
    const databaseURL: string = 'mongodb://'.concat(`${MONGODB_USER}:${MONGODB_PASSWORD}`).
        concat(`@${MONGODB_HOST}:${MONGODB_DOCKER_PORT}`).
        concat(`/${MONGODB_DATABASE}?authSource=admin`);
    return databaseURL;
};

