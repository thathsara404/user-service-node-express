'use strict';

import mongoose, { model } from 'mongoose';
import { UserFindAndUpdateFunc, UserSaveFunc } from '../../type/userServiceType';
import { IUser } from '../../type/userType';
import userSchema from '../schema/UserSchema';

const MODEL_NAME = 'User';
export const UserModel = model<IUser>(MODEL_NAME, userSchema);

/**
 * Find one and update wrapper
 * @param {string} userId Unique identifier of user
 * @param {IUser} user New user data 
 * @returns {IUser | null} Returns null if update doesn't happen. If update success, return IUser
 */
export const findOneAndUpdate: UserFindAndUpdateFunc = async (userId, user) => {
    try {
        const dataReceived: IUser = {
            firstName: user?.firstName,
            lastName: user.lastName,
            role: user.role,
            email: user.email,
            username: user.username,
            password: user.password
        };
        const userIdAsObjectId = new mongoose.Types.ObjectId(userId);
        const filter = {
            _id: userIdAsObjectId
        };
        const userFound: IUser | null = await UserModel.findById(filter);
        const userData = {
            firstName: userFound?.firstName,
            lastName: userFound?.lastName,
            role: userFound?.role,
            username: userFound?.username,
            password: userFound?.password
        };
        if (userFound) {
            // Update the document in an atomic way.
            const newUserData = { ...userData, ...dataReceived };
            await UserModel.updateOne(filter, newUserData);
            return newUserData;
        }
        return null;
    } catch (error) {
        throw error;
    }
};

/**
 * Save user object wrapper
 * @param {IUser} user New user data 
 * @returns {IUser} Returns IUser object
 */
export const saveUser: UserSaveFunc = async (user) => {
    try {
        const userModel = new UserModel(user);
        const result = await userModel.save();
        return result;
    } catch (error) {
        throw error;
    }
};
