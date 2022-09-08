'use strict';

import UserModel from '../data/model/UserModel';
import UserServiceError from '../type/error/UserServiceError';
import { CreateUserFunc, GetAllUsersFunc, GetUserByFirstNameFunc, UpdateFuncStatus, UserLoginFunc, UserUpdateFunc }
    from '../type/userServiceType';
import { IUser } from '../type/userType';
import { USER_CREDENTIAL_INVALID_MESSAGE, USER_DATA_CONFLICT_MESSAGE, USER_NOT_FOUND_ERROR_MESSAGE } 
    from '../const/errorMessage';
import { Logger } from '../log/logger';
import { buildErrorMessage } from '../util/logMessageBuilder';
import ErrorType from '../const/errorType';
import LogType from '../const/logType';
import { HTTPUserError } from '../const/httpCode';
import { compareHash, hashPassword } from '../util/passwordUtil';
import { prepareUserArrayToSend, prepareUserDetailsToSend } from '../util/userDetailBuilder';
import { generateJWT } from '../util/jwtBuilderUtil';
import mongoose, { ObjectId } from 'mongoose';
import { serviceErrorBuilder } from '../util/serviceErrorBuilder';

const Logging = Logger(__filename);

/**
 * Create new user
 * @param {IUserDTO} user User object
 * @returns {Promise<IUser>} Promise for user data
 */
export const createUser: CreateUserFunc = async (user) => {
    try {
        const password = user.password as string;
        const hashedPassword = await hashPassword(password);
        const userExtracted: IUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            username: user.username,
            password: hashedPassword
        };
        const userModel = new UserModel(userExtracted);
        const data = await userModel.save();
        return data;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'createUser'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get user data by user first name
 * @param {string} firstName User first name
 * @returns {Promise<IUser>} Promise for user data
 */
export const getUserByFirstName: GetUserByFirstNameFunc = async (firstName) => {
    try {
        const userData = await UserModel.findOne({ 'firstName': firstName }).exec();
        if (userData) {
            return prepareUserDetailsToSend(userData);
        }
        throw new UserServiceError(
            ErrorType.USER_RETRIEVAL_ERROR, USER_NOT_FOUND_ERROR_MESSAGE, '', HTTPUserError.NOT_FOUND_CODE);
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'getUserByFirstName'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get all users with pagination
 * If no pagination info supplied, defaults will be applied
 * @param {number} page No of pages requested
 * @param {number} limit Limit per page
 * @returns {Promise<Promise<{records: Array<IUser>,
 * totalPages: number,currentPage: number>>} Promise for user data
 */
export const getUsers: GetAllUsersFunc = async (page, limit) => {
    try {
        const resultPage = page || 1;
        const resultLimit = limit || 10;

        const users: Array<IUser> = await UserModel.find()
            .limit(resultLimit)
            .skip((resultPage - 1) * resultLimit)
            .exec() as Array<IUser>;
        const count = await UserModel.countDocuments().exec();
        const filteredUserDetails = prepareUserArrayToSend(users);
        if (Array.isArray(users) && users.length > 0) {
            const response = {
                records: filteredUserDetails,
                totalPages: Math.ceil(count / resultLimit),
                currentPage: resultPage
            };
            return response;
        }
        throw new UserServiceError(
            ErrorType.USER_RETRIEVAL_ERROR, USER_NOT_FOUND_ERROR_MESSAGE, '', HTTPUserError.NOT_FOUND_CODE);
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'getUsers'), LogType.ERROR);
        throw error;
    }
};

/**
 * User login and if success, send JWT access token
 * @param {string} username User's username
 * @param {string} password User's password
 * @returns {Promise<UserLoginResponse>} Promise for user data
 */
export const userLogin: UserLoginFunc = async (username, password) => {
    try {
        const userByUsername = await UserModel.findOne({ 'username': username }).exec() as IUser;
        if (userByUsername) {
            const isValidPassword = await compareHash(password, userByUsername.password as string);
            if (isValidPassword) {
                const claims = {
                    role: userByUsername.role,
                    _id: userByUsername._id as unknown as string
                };
                const successResponse = { token: generateJWT(claims) };
                return successResponse;
            }
        }
        throw new UserServiceError(
            ErrorType.USER_SIGN_IN_ERROR, USER_CREDENTIAL_INVALID_MESSAGE, '', HTTPUserError.UNAUTHORIZED_CODE);
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'userLogin'), LogType.ERROR);
        throw error;
    }
};

/**
 * User update
 * @param {string} userId User's unique identifier
 * @param {IUser} user User data
 * @returns {Promise<IUser | null>} Promise for user data
 */
export const updateUser: UserUpdateFunc = async (userId, user) => {
    try {
        const dataReceived: IUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
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
            const newUserData = { ...userData, ...dataReceived };
            await UserModel.updateOne(filter, newUserData);
            return UpdateFuncStatus.UPDATED;
        }
        dataReceived['_id'] = userId as unknown as ObjectId;
        const userModel = new UserModel(dataReceived);
        await userModel.save();
        return UpdateFuncStatus.CREATED;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'updateUser'), LogType.ERROR);
        throw error;
    }
};
