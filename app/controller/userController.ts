'use strict';

import UserModel from '../data/model/UserModel';
import UserServiceError from '../type/error/UserServiceError';
import { CreateUserFunc } from '../type/userControllerType';
import { IUser } from '../const/UserType';

export const createUser: CreateUserFunc = async (user) => {
    try {
        const userExtracted: IUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            username: user.username,
            password: user.password
        };
        const userModel = new UserModel(userExtracted);
        const data = await userModel.save();
        return data;
    } catch (error) {
        const errorObject = error as UserServiceError;
        throw errorObject;
    }
};
