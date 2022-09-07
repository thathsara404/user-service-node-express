'use strict';

import { Router, Request, Response, NextFunction } from 'express';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { buildErrorMessage, buildInfoMessageRouteHit } from '../util/logMessageBuilder';
import RoutePath from '../const/routePath';
import { HTTPSuccess } from '../const/httpCode';
import { createUser, getUserByFirstName, getUsers } from '../controller/userController';
import { successUserResponseBuilder } from '../util/responseBuilder';
import { validateCreateUserRequestBody, validateHeader } from '../middleware/requestParamValidatorMiddleware';
import { IUser } from '../const/UserType';

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
router.get(UserRoutePath, validateHeader, (req: Request, res: Response, next: NextFunction): void => {
    const username = req.username as string;
    (async () => {
        Logging.log(buildInfoMessageRouteHit(UserRoutePath, username), LogType.INFO);
        const userFirstName = req.query.firstName as string;
        if (userFirstName) {
            const userData = await getUserByFirstName(userFirstName);
            res.status(HTTPSuccess.OK_CODE).json(successUserResponseBuilder(userData));
            return;
        }
        const pageCount: number = +(req.query?.pageCount?.toString() ?? 0);
        const limitPerPage: number = +(req.query?.limitPerPage?.toString() ?? 0);
        const users = await getUsers(pageCount, limitPerPage);
        res.status(HTTPSuccess.OK_CODE).json(successUserResponseBuilder(users));
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, UserRoutePath), LogType.ERROR);
        next(err);
    });
});

/**
 * Add new user
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
// eslint-disable-next-line max-len
router.post(UserRoutePath, validateHeader, validateCreateUserRequestBody, (req: Request, res: Response, next: NextFunction): void => {
    (async () => {
        const user = req.body as IUser;
        await createUser(user);
        res.sendStatus(HTTPSuccess.CREATED_CODE);
    })().catch(error => {
        next(error);
    });
});

export default router;
