'use strict';

import UserServiceError from './error/UserServiceError';
import { UserLoginResponse } from './responseType';
import { IUser, IUserDTO } from './userType';

export type CreateUserFunc = (user: IUser) => Promise<IUser>;

export type GetUserByFirstNameFunc = (firstName: string) => Promise<IUser>;

export type UserLoginFunc = (username: string, password: string) => Promise<UserLoginResponse>;

export enum UpdateFuncStatus {
    UPDATED = 'UPDATE',
    CREATED = 'CREATED'
}
export type UserDeleteFunc = (userId: string) => Promise<void>;

export type UserUpdateFunc = (userId: string, user: IUser) => Promise<UpdateFuncStatus>;

export type UserFindAndUpdateFunc = (userId: string, user: IUser) => Promise<IUser | null>;

export type UserSaveFunc = (user: IUser) => Promise<IUser>;

export type UserPatchFunc = (userId: string, user: IUserDTO) => Promise<UpdateFuncStatus>;

export type GetAllUsersReturnType = {
    records: Array<IUser>,
    totalPages: number,
    currentPage: number
};
export type GetAllUsersFunc = (page?: number, limit?: number) => Promise<GetAllUsersReturnType>;

export type ServiceErrorBuilderFunc = (errorMessage: string) => void;

export type ValidatorErrorBuilderFunc = (error: Error, errorMessage: string) => UserServiceError;
