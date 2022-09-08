'use strict';

export interface JWTClaims {
    time: Date,
    exp: number,
    roles: Array<string>
    id: string
}

