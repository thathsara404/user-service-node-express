'use strict';

import { IUser } from '../const/UserType';

export type CreateUserFunc = (user: IUser) => Promise<IUser | undefined>;
