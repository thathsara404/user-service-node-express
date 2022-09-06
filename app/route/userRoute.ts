'use strict';

import { Router, Request, Response, NextFunction } from 'express';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { buildErrorMessage, buildInfoMessageRouteHit } from '../util/logMessageBuilder';
import { successResponseBuilder } from '../util/responseBuilder';
import RoutePath from '../const/routePath';
import { HTTPSuccess } from '../const/httpCode';
import UserServiceError from '../type/error/UserServiceError';

const router = Router();
const Logging = Logger(__filename);

const UserRoutePath: string = RoutePath.USERS;

/**
 * Get multiple users / user by first name
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
router.get(UserRoutePath, (req: Request, res: Response, next: NextFunction): void => {
    try {
        Logging.log(buildInfoMessageRouteHit(UserRoutePath, 'user@mail.com'), LogType.INFO);
        res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder({
            name: 'thathsara'
        }));
    } catch (error) {
        const errorLogMessage = buildErrorMessage(error as UserServiceError, UserRoutePath);
        Logging.log(errorLogMessage, LogType.ERROR);
        next(error);
    }
});

/**
 * Add new user
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
router.post(UserRoutePath, (req: Request, res: Response, next: NextFunction): void => {
    (async () => {
        await new Promise(resolve => {
            resolve({});
        });
        res.send();
    })().catch(error => {
        next(error);
    });
});

export default router;
