'use strict';

import request from 'supertest';
import app from '../app';
import UserModel from '../app/data/model/UserModel';
import { closeConnection } from '../app/data/db/connector';
import { UserType } from '../app/type/userType';
import { hashPassword } from '../app/util/passwordUtil';

let id;
let token;
const username = 'someuser';
const userPassword = 'abCq2&!Ms';

describe('TDD for user creation', () => {
    beforeAll(() => {
        (async () => {
            const hashedPassword = 'asdadadadasdasdadadss';
            UserModel.create({
                firstName: 'Thathsara',
                lastName: 'Raviraj',
                email: 'thathsara@gmail.com',
                role: UserType.CUSTOMER,
                username: 'someuser',
                password: hashedPassword
            });
        })();
    });

    describe('POST/health', () => {
        it('Authenticate user and sign him in', () => {
              
        });
    });

    afterAll(() => {
        (async () => {
            UserModel.deleteMany();
            await closeConnection();
        })();
    });

});
