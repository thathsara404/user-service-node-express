'use strict';

export type HashFunc = (arg0: string) => Promise<string>;

export type CompareFunc = (arg0: string, arg1: string) => Promise<boolean>;
