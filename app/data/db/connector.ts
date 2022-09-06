'use strict';

import mongoose from 'mongoose';
import config from '../../config/config';
import LogType from '../../const/logType';
import { Logger } from '../../log/logger';
import { HTTPServerError } from '../../const/httpCode';
import DatabaseError from '../../type/error/DatabaseError';
import { buildErrorMessage } from '../../util/logMessageBuilder';

const Logging = Logger(__filename);
const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DOCKER_PORT, MONGODB_DATABASE } = config.DB;

const databaseURL: string = 'mongodb://'.concat(`${MONGODB_USER}:${MONGODB_PASSWORD}`).
    concat(`@${MONGODB_HOST}:${MONGODB_DOCKER_PORT}`).
    concat(`/${MONGODB_DATABASE}?authSource=admin`);
console.log(databaseURL);
console.log(databaseURL);
// Mongo DB Connection
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(databaseURL, {
            autoIndex: true
        });
    } catch (error) {
        const dbError: DatabaseError = 
            new DatabaseError(
                HTTPServerError.DATABASE_ERROR_MESSAGE, error as string, HTTPServerError.INTERNAL_SERVER_ERROR_CODE); 
        Logging.log(buildErrorMessage(dbError, 'Database'), LogType.ERROR);
        throw dbError;
    }
};

export default connectToMongoDB;