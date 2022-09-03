'use strict';

import { Response } from 'express';
import UserServiceError from './error/UserServiceError';

export type SendErrorResponseFunc =
    (arg0: UserServiceError, arg1: Response) => void;
