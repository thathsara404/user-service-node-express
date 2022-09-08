'use strict';

import { IUser } from './userType';

export type GenerateTokenFunc = (claims: Omit<Record<keyof IUser, string>,
     'password' | 'username' | 'firstName' | 'lastName'>) => string;

export type validateTokenFunc = (path: string) => boolean;
