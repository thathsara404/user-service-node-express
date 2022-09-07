'use strict';

import { IUser, IUserDTO } from '../const/UserType';

export type CreateUserFunc = (user: IUser) => Promise<IUser | undefined>;

export type GetUserByFirstNameFunc = (firstName: string) => Promise<IUser>;

export type GetAllUsersReturnType = {
    records: Array<IUser>,
    totalPages: number,
    currentPage: number
};
export type GetAllUsersFunc = (page?: number, limit?: number) => Promise<GetAllUsersReturnType>;
