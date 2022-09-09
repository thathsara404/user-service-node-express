'use strict';

import { IUser } from '../type/userType';
import { PrepareDetailsToSendArrayFunc, PrepareDetailsToSendFunc } from '../type/userDetailBuilder';

/**
 * Filter data to send
 * @param {IUser} user User details
 * @returns {IUserDTO}  Data to send
 */
export const prepareUserDetailsToSend: PrepareDetailsToSendFunc = (user) => {
    const filteredData = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
    };
    return filteredData;
};

/**
 * Filter data to send
 * @param {Array<IUser>} users User details array
 * @returns {Array<IUserDTO>}  Data array to send
 */
export const prepareUserArrayToSend: PrepareDetailsToSendArrayFunc = (users) => {
    const userDataPrepared: Array<IUser> = [];
    users.forEach(user => {
        const filteredData = prepareUserDetailsToSend(user);
        userDataPrepared.push(filteredData);
    });
    return userDataPrepared;
};
