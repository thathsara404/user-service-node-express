'use strict';

import * as Bcrypt from 'bcryptjs';
import { CompareFunc, HashFunc } from '../type/passwordHashBuilderType';

const SALT_ROUNDS = 10;

/**
 * Hash the plain password
 * @param {string} password User password
 * @returns {Promise<string>} Hashed password
 */
export const hashPassword: HashFunc = async (password) => {
    const salt: string = await Bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await Bcrypt.hash(password, salt);
    return hashedPassword;
};

/**
 * Compare the password hash and send result 
 * @param {string} password User password
 * @param {string} hashedPassword Hashed password stored in the database
 * @returns {Promise<boolean>} Is password correct or incorrect
 */
export const compareHash: CompareFunc = async (password, hashedPassword) => {
    const isCorrect = await Bcrypt.compare(password, hashedPassword);
    return isCorrect;
};
