'use strict';

import { Router, Request, Response, NextFunction } from 'express';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { buildErrorMessage, buildInfoMessageRouteHit } from '../util/logMessageBuilder';
import { successResponseBuilder } from '../util/responseBuilder';
import RoutePath from './const/routePath';
import { HTTPSuccess } from './const/httpCode';
import UserServiceError from '../type/error/UserServiceError';

const router = Router();
const Logging = Logger(__filename);

const HealthRoutePath: string = RoutePath.HEALTH;

/**
 * Health route
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
router.get(HealthRoutePath, (req: Request, res: Response, next: NextFunction): void => {
    try {
        Logging.log(buildInfoMessageRouteHit(HealthRoutePath), LogType.INFO);
        const response: object = { success: 'User-API is up and running...' };
        res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(response));
    } catch (error) {
        const errorLogMessage = buildErrorMessage(error as UserServiceError, HealthRoutePath);
        Logging.log(errorLogMessage, LogType.ERROR);
        next(error);
    }
});

export default router;
