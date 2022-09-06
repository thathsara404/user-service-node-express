'use strict';

import { ObjectId } from 'mongoose';

export enum UserType {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER'
}

export interface IUser {
    id?: ObjectId
    firstName: string,
    lastName: string,
    role: UserType,
    username?: string,
    password?: string
}
