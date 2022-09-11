'use strict';

import request from 'supertest';
import app from '../app';
import { UserModel } from '../app/data/model/UserModel';
import { disconnect } from '../app/data/db/connector';
import { UserType } from '../app/type/userType';
import { hashPassword } from '../app/util/passwordUtil';

let id;
let token;
const username = 'someuser';
const userPassword = 'abCq2&!Ms';

describe('User-Service: uer specific routes TDD', () => {

    beforeAll(async () => {
        // Create initial user to write test
        const hashedPasswd = await hashPassword(userPassword);
        await UserModel.create({
            firstName: 'Thathsara',
            lastName: 'Raviraj',
            email: 'thathsara@gmail.com',
            role: UserType.CUSTOMER,
            username: username,
            password: hashedPasswd
        });
    });

    afterAll(async () => {
        await UserModel.deleteMany();
        await disconnect();
    });

    /**
     * Login functionality
     */
    describe('POST/login', () => {
        // Happy path login 
        it('It should authenticate user and sign him in while sending the access token', async () => {
            const credentials = {
                'username': username,
                'password': userPassword
            };
            const response = await request(app)
                .post('/user-api-dev/login')
                .set('content-type', 'application/json')
                .send(credentials);
            expect(response.statusCode).toEqual(200);
            expect.objectContaining({
                accessToken: response.body.accessToken
            });
            token = response.body.data.token;
        });
        // Negative test login
        it('It should be a bad-request response for user login when password is missing', async () => {
            const credentials = {
                username: username
            };
            const response = await request(app)
                .post('/user-api-dev/login')
                .set('content-type', 'application/json')
                .send(credentials);
            expect(response.statusCode).toEqual(400);
            expect(response.body).toEqual(
                expect.objectContaining({
                    error: 'Please provide a valid password'
                })
            );
        });

    });

    /**
     * Signup functionality
     */
    describe('POST/users', () => {
        // Happy path create
        it('It should create a new user', async () => {
            const user = {
                'firstName': 'John',
                'lastName': 'Silva',
                'role': UserType.CUSTOMER,
                'email': 'johnsilva@gmail.com',
                'password': userPassword,
                'username': 'johnsil'
            };
            const response = await request(app)
                .post('/user-api-dev/users')
                .set('content-type', 'application/json')
                .send(user);
            expect(response.statusCode).toEqual(201);
            expect(response.body).toEqual(expect.objectContaining({}));
        });
        // Negative test user create
        it('It should be a bad request response for user create when email is missing', async () => {
            const user = {
                'firstName': 'John',
                'lastName': 'Silva',
                'role': UserType.CUSTOMER,
                'password': userPassword,
                'username': 'johnsil'
            };
            const response = await request(app)
                .post('/user-api-dev/users')
                .set('content-type', 'application/json')
                .send(user);
            expect(response.statusCode).toEqual(400);
            expect(response.body).toEqual(
                expect.objectContaining({
                    error: 'Please provide a valid email'
                })
            );
        });
    });

    /**
     * Get user by first name or with pagination
     */
    describe('GET/users/:firstName', () => {
        // Happy path get user
        it('It should get user details by user firstName', async () => {
            const response = await request(app)
                .get('/user-api-dev/users/?firstName=Thathsara')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();
            expect(response.statusCode).toEqual(200);
            id = response.body.data._id;
            expect(response.body.data.firstName).toEqual('Thathsara');
            expect(response.body.data.email).toEqual('thathsara@gmail.com');
        });
        // Negative test get user
        it('It should give user not found status', async () => {
            const response = await request(app)
                .get('/user-api-dev/users/?firstName=NoName')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();
            expect(response.statusCode).toEqual(404);
            expect(response.body).toEqual(expect.objectContaining({}));
        });
        // Happy path get users with default pagination
        it('It should give first ten users if exist as an array', async () => {
            const response = await request(app)
                .get('/user-api-dev/users')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();
            expect(response.statusCode).toEqual(200);
            expect(Array.isArray(response.body.data.records)).toBe(true);
        });
    });

    /**
     * Put user data
     */
    describe('PUT/users/:userId', () => {
        // Happy path create
        it('It should create a new user since userId does not exist', async () => {
            const user = {
                'firstName': 'Max',
                'lastName': 'Clerk',
                'role': UserType.ADMIN,
                'email': 'maxcl@gmail.com',
                'password': userPassword,
                'username': 'maxcl'
            };
            const response = await request(app)
                .put('/user-api-dev/users/631d7fd22dc34bd2863cb74b')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(user);
            expect(response.statusCode).toEqual(201);
            expect(response.body).toEqual(expect.objectContaining({}));
        });
        // Happy path update existing data
        it('Update existing user record (role -> ADMIN)', async () => {
            const user = {
                'firstName': 'Thathsara',
                'lastName': 'Udugamala',
                'email': 'thathsara@gmail.com',
                'role': UserType.ADMIN,
                'username': username,
                'password': userPassword
            };
            const response = await request(app)
                .put(`/user-api-dev/users/${id}`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(user);
            expect(response.statusCode).toEqual(204);
            expect(response.body).toEqual(expect.objectContaining({}));
        });
    });

    /**
     * DELETE user by userId
     */
    describe('DELETE/users/:userId', () => {
        // Happy path get user
        it('It should delete user details by userId', async () => {
            const response = await request(app)
                .delete(`/user-api-dev/users/${id}`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();
            expect(response.statusCode).toEqual(204);
        });
    });

});
