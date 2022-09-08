'use strict';

import { Schema } from 'mongoose';
import { IUser } from '../../type/userType';

const UserSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true },
    username: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true }
});

export default UserSchema;
