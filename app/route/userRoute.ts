'use strict';

import { Router, Request, Response, NextFunction } from 'express';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { buildErrorMessage, buildInfoMessageRouteHit, buildInfoMessageUserProcessCompleted }
    from '../util/logMessageBuilder';
import { PathParam, RoutePath } from '../const/routePath';
import { HTTPSuccess } from '../const/httpCode';
import { createUser, deleteUser,
    getUserByFirstName, getUsers, patchUser, updateUser, userLogin } from '../service/userService';
import { successUserResponseBuilder } from '../util/responseBuilder';
import { validateCreateUserRequestBody, validateHeader, validateParamUserId,
    validateUserLoginRequestBody, validateUserPatchRequestBody } 
    from '../middleware/requestValidatorMiddleware';
import { IUser } from '../type/userType';
import { UserLoginResponse } from '../type/responseType';
import { UpdateFuncStatus } from '../type/userServiceType';

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
    const userId = req.userId as string;
    (async () => {
        Logging.log(buildInfoMessageRouteHit(req.path, userId), LogType.INFO);
        const userFirstName = req.query.firstName as string;
        if (userFirstName) {
            const userData = await getUserByFirstName(userFirstName);
            res.status(HTTPSuccess.OK_CODE).json(successUserResponseBuilder(userData));
            return;
        }
        const pageCount: number = +(req.query?.pageCount?.toString() ?? 0);
        const limitPerPage: number = +(req.query?.limitPerPage?.toString() ?? 0);
        const users = await getUsers(pageCount, limitPerPage);
        Logging.log(buildInfoMessageUserProcessCompleted('Filter', userId), LogType.INFO);
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
router.post(UserRoutePath, validateHeader, validateCreateUserRequestBody, (
    req: Request, res: Response, next: NextFunction): void => {
    (async () => {
        Logging.log(buildInfoMessageRouteHit(req.path, ''), LogType.INFO);
        const user = req.body as IUser;
        await createUser(user);
        res.sendStatus(HTTPSuccess.CREATED_CODE);
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, UserRoutePath), LogType.ERROR);
        next(error);
    });
});

/**
 * User login
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
router.post(RoutePath.LOGIN, validateHeader, validateUserLoginRequestBody, (
    req: Request, res: Response, next: NextFunction): void => {
    const userId = req.userId as string;
    (async () => {
        Logging.log(buildInfoMessageRouteHit(req.path, userId), LogType.INFO);
        const user = req.body as IUser;
        const loginResult: UserLoginResponse = await userLogin(user.username as string, user.password as string);
        Logging.log(buildInfoMessageUserProcessCompleted('Login', userId), LogType.INFO);
        res.status(HTTPSuccess.OK_CODE).json(successUserResponseBuilder(loginResult));
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, UserRoutePath), LogType.ERROR);
        next(error);
    });
});

/**
 * User update
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
router.put(RoutePath.USERS + PathParam.USER_ID, validateHeader, validateParamUserId, validateCreateUserRequestBody, (
    req: Request, res: Response, next: NextFunction): void => {
    const userId = req.userId as string;
    const pathParamUserId = req.params.userId;
    (async () => {
        Logging.log(buildInfoMessageRouteHit(req.path, userId), LogType.INFO);
        const user = req.body as IUser;
        const loginResult: UpdateFuncStatus = await updateUser(pathParamUserId, user);
        Logging.log(buildInfoMessageUserProcessCompleted('Update', userId), LogType.INFO);
        if (loginResult === UpdateFuncStatus.CREATED) {
            return res.sendStatus(HTTPSuccess.CREATED_CODE);
        }
        return res.sendStatus(HTTPSuccess.NO_CONTENT_CODE);
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, UserRoutePath), LogType.ERROR);
        next(error);
    });
});

/**
 * User patch
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
router.patch(RoutePath.USERS + PathParam.USER_ID, validateHeader, validateParamUserId, validateUserPatchRequestBody, (
    req: Request, res: Response, next: NextFunction): void => {
    const userId = req.userId as string;
    const pathParamUserId = req.params.userId;
    (async () => {
        Logging.log(buildInfoMessageRouteHit(req.path, userId), LogType.INFO);
        const user = req.body as IUser;
        const loginResult: UpdateFuncStatus = await patchUser(pathParamUserId, user);
        Logging.log(buildInfoMessageUserProcessCompleted('Patch', userId), LogType.INFO);
        if (loginResult === UpdateFuncStatus.CREATED) {
            return res.sendStatus(HTTPSuccess.CREATED_CODE);
        }
        return res.sendStatus(HTTPSuccess.NO_CONTENT_CODE);
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, UserRoutePath), LogType.ERROR);
        next(error);
    });
});

/**
 * User delete
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
router.delete(RoutePath.USERS + PathParam.USER_ID, validateHeader, validateParamUserId, (
    req: Request, res: Response, next: NextFunction): void => {
    const userId = req.userId as string;
    const pathParamUserId = req.params.userId;
    (async () => {
        Logging.log(buildInfoMessageRouteHit(req.path, userId), LogType.INFO);
        await deleteUser(pathParamUserId);
        Logging.log(buildInfoMessageUserProcessCompleted('Delete', userId), LogType.INFO);
        return res.sendStatus(HTTPSuccess.NO_CONTENT_CODE);
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, UserRoutePath), LogType.ERROR);
        next(error);
    });
});

export default router;
