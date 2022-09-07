'use strict';

import * as Bcrypt from 'bcryptjs';
import { CompareFunc, HashFunc } from '../type/passwordHashBuilderType';

const SALT_ROUNDS = 10;

export const hashPassword: HashFunc = async (password) => {
    const salt: string = await Bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await Bcrypt.hash(password, salt);
    return hashedPassword;
};

export const compareHash: CompareFunc = async (password, hashedPassword) => {
    const isCorrect = await Bcrypt.compare(password, hashedPassword);
    return isCorrect;
};
