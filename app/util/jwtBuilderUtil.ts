'use strict';

import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { JWTClaims } from '../type/jwtClaimType';
import { GenerateTokenFunc } from '../type/tokenGenerator';

export const generateJWT: GenerateTokenFunc = (claimData) => {
    const claims: JWTClaims = {
        time: new Date(),
        exp: (Math.floor(Date.now() / 1000) + (60 + 60)) * +config.JSON_WEB_TOKEN_EXP_HOURS,
        roles: [claimData.role],
        id: claimData._id
    };
    const token: string = jwt.sign(claims, config.JSON_WEB_TOKEN_SECRET);
    return token;
};
