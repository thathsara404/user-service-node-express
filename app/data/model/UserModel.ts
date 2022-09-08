'use strict';

import { model } from 'mongoose';
import { IUser } from '../../type/userType';
import userSchema from '../schema/UserSchema';

const MODEL_NAME = 'User';
const UserModel = model<IUser>(MODEL_NAME, userSchema);
export default UserModel;
