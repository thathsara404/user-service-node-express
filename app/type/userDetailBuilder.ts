'use strict';

import { IUser } from '../const/UserType';

export type PrepareDetailsToSendFunc = (arg0: IUser) => IUser;

export type PrepareDetailsToSendArrayFunc = (arg0: Array<IUser>) => Array<IUser>;
