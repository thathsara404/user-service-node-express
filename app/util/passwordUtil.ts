'use strict';

import * as Bcrypt from 'bcrypt';
import { HashFunc } from '../type/passwordHashBuilderType';

const SALT_ROUNDS = 10;

export const hashPassword: HashFunc = async (password): Promise<string> => {
    const salt: string = await Bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await Bcrypt.hash(password, salt);
    return hashedPassword;
};
