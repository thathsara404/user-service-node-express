'use strict';

import UserServiceError from './error/UserServiceError';
import { UserLoginResponse } from './responseType';
import { IUser } from './userType';

export type CreateUserFunc = (user: IUser) => Promise<IUser>;

export type GetUserByFirstNameFunc = (firstName: string) => Promise<IUser>;

export type UserLoginFunc = (username: string, password: string) => Promise<UserLoginResponse>;

export enum UpdateFuncStatus {
    UPDATED = 'UPDATE',
    CREATED = 'CREATED'
}
export type UserUpdateFunc = (userId: string, user: IUser) => Promise<UpdateFuncStatus>;

export type GetAllUsersReturnType = {
    records: Array<IUser>,
    totalPages: number,
    currentPage: number
};
export type GetAllUsersFunc = (page?: number, limit?: number) => Promise<GetAllUsersReturnType>;

export type ServiceErrorBuilderFunc = (errorMessage: string) => void;
