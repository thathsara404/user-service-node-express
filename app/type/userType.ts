'use strict';

import { ObjectId } from 'mongoose';

export enum UserType {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER'
}

export interface IUser {
    _id?: ObjectId
    firstName: string,
    lastName: string,
    role: UserType,
    email: string,
    username?: string,
    password?: string
}
export interface IUserDTO {
    id?: ObjectId
    firstName?: string,
    lastName?: string,
    role?: UserType,
    email?: string,
    username?: string,
    password?: string
}
