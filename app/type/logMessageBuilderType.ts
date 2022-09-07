'use strict';

export type BuildErrorMessageFunc = 
    (arg0: Error, arg1: string) => string;

export type BuildSuccessMessageFunc =
    (arg0: string, arg1: string) => string;
