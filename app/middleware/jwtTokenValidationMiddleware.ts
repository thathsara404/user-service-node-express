'use strict';

import { Request, Response, NextFunction } from 'express';
import { Logger } from '../log/logger';
import config from '../config/config';
import * as jwt from 'jsonwebtoken';
import ErrorType from '../const/errorType';
import { USER_ACCESS_TOKEN_INVALID_MESSAGE } from '../const/errorMessage';
import { HTTPUserError } from '../const/httpCode';
import UserServiceError from '../type/error/UserServiceError';
import RoutePath from '../const/routePath';
import { JWTClaims } from '../type/jwtClaimType';
import { buildInfoMessageUserProcessCompleted } from '../util/logMessageBuilder';
import LogType from '../const/logType';

const Logging = Logger(__filename);

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
    if (req.path !== `${config.ROUTE_PATH}${RoutePath.LOGIN}` &&
        req.path !== `${config.ROUTE_PATH}${RoutePath.HEALTH}` &&
        (req.path !== `${config.ROUTE_PATH}${RoutePath.USERS}` && req.method !== 'POST')) {
        const authHeader = req.headers.authorization as string;
        const [authType, authToken] = authHeader.split(' ');
        if (authType && authType === 'Bearer') {
            jwt.verify(authToken, config.JSON_WEB_TOKEN_SECRET, (
                error, decode) => {
                if (error) {
                    throw new UserServiceError(
                        ErrorType.USER_UNAUTHORIZED, USER_ACCESS_TOKEN_INVALID_MESSAGE, '', HTTPUserError.
                            UNAUTHORIZED_CODE);
                }
                const claims = decode as JWTClaims;
                const userId = claims.id;
                req.role = claims.roles;
                req.userId = userId;
                Logging.log(buildInfoMessageUserProcessCompleted('Authorization', userId), LogType.INFO);
            });
        } else {
            throw new UserServiceError(
                ErrorType.USER_UNAUTHORIZED, USER_ACCESS_TOKEN_INVALID_MESSAGE, '', HTTPUserError.
                    UNAUTHORIZED_CODE);
        }
    }
    next();
};

export default validateJWT;
