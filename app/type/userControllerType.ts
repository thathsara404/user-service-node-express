'use strict';

import { UserLoginResponse } from './responseType';
import { IUser } from './userType';

export type CreateUserFunc = (user: IUser) => Promise<IUser | undefined>;

export type GetUserByFirstNameFunc = (firstName: string) => Promise<IUser>;

export type UserLoginFunc = (username: string, password: string) => Promise<UserLoginResponse>;

export type GetAllUsersReturnType = {
    records: Array<IUser>,
    totalPages: number,
    currentPage: number
};
export type GetAllUsersFunc = (page?: number, limit?: number) => Promise<GetAllUsersReturnType>;
