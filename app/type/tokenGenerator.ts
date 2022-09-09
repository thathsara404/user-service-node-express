'use strict';

import { IUser } from './userType';

export type GenerateTokenFunc = (claims: Omit<Record<keyof IUser, string>,
     'password' | 'username' | 'firstName' | 'lastName' | 'email'>) => string;

export type validateTokenFunc = (path: string) => boolean;
