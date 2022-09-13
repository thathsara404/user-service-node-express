'use strict';

export interface UserLoginResponse {
    id: string,
    token: string,
    firstName: string,
    lastName: string,
    role: string,
    email: string
}
