'use strict';

import request from 'supertest';
import app from '../app';
import UserModel from '../app/data/model/UserModel';
import { UserType } from '../app/const/UserType';
import mongoose from 'mongoose';
import { hashPassword } from '../app/util/passwordUtil';

let id;
let token;
const username = 'thathsara@gmail.com';
const userPassword = 'password';

describe('TDD for user creation', () => {
    beforeAll(async () => {

        console.log('Before All...');
        const hashedPassword = await hashPassword(userPassword);
        await UserModel.create({
            firstName: 'Thathsara',
            lastName: 'Raviraj',
            role: UserType.CUSTOMER,
            username: username,
            password: hashedPassword
        });
    });

    describe('POST/login', () => {
        // Happy path
        it('Authenticate user and sign him in', () => {
            (async () => {
                const credentials = {
                    username: username,
                    password: userPassword
                };
                const res = await request(app)
                    .post('/login')
                    .send(credentials);
                token = res.body.accessToken;
                id = res.body.id;
                expect(res.statusCode).toEqual(200);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        accessToken: res.body.accessToken,
                        id: res.body.data.id,
                        firstName: res.body.data.firstName,
                        lastName: res.body.data.lastName,
                        email: res.body.data.username,
                        role: res.body.data.role
                    })
                );
            })();
        });
        // Negative case
        it('Bad request response', () => {
            (async () => {
                const credentials = {
                    username: username
                };
                const res = await request(app)
                    .post('/login')
                    .send(credentials);
                expect(res.statusCode).toEqual(400);
                expect(res.body).toEqual(
                    expect.objectContaining({
                    })
                );
            })();
        });
    });

    describe('POST/users', () => {
        it('It should save a new user record', () => {
            (async () => {
                const userPassword = 'password';
                const user = {
                    firstName: 'Thathsara',
                    lastName: 'Raviraj',
                    role: UserType.CUSTOMER,
                    username: 'thathsara@gmail.com',
                    password: userPassword
                };
                const res = await request(app)
                    .post('/users')
                    .send(user);
                expect(res.statusCode).toEqual(201);
                expect(res.body).toEqual(
                    expect.objectContaining(any(Object))
                );
            })();
        });
    });

    describe('GET/users', () => {
        it('It should retrieve all users', () => {
            (async () => {
                const res = await request(app)
                    .get('/users')
                    .set('Authorization', `Bearer ${token}`);
                expect(res.statusCode).toEqual(200);
                expect(res.body).toEqual(
                    expect.objectContaining(any(Object))
                );
            })();
        });

    });

    describe('PATCH/users/:id', () => {
        it('It should patch relevant user data', () => {
            (async () => {
                const dataWantedToUpdate = {
                    firstName: 'Jackson'
                };
                const res = await request(app)
                    .patch(`/users/${id}`)
                    .set('Authorization', `Bearer ${token}`);
                expect(res.statusCode).toEqual(204);
                expect(res.body).toEqual(
                    expect.objectContaining(any(Object))
                );
            })();
        });
    });

    describe('UPDATE/users/:id', () => {
        it('It should update user data', () => {
            (async () => {
                const newUserData = {
                    firstName: 'Thathsara',
                    lastName: 'Raviraj',
                    role: UserType.CUSTOMER,
                    username: 'thathsara@gmail.com',
                    password: userPassword
                };
                const res = await request(app)
                    .put(`/users/${id}`)
                    .set('Authorization', `Bearer ${token}`);
                expect(res.statusCode).toEqual(204);
                expect(res.body).toEqual(
                    expect.objectContaining(any(Object))
                );
            })();
        });
    });

    describe('DELETE/users/:id', () => {
        it('It should delete user data', () => {
            (async () => {
                const res = await request(app)
                    .delete(`/users/${id}`)
                    .set('Authorization', `Bearer ${token}`);
                expect(res.statusCode).toEqual(204);
                expect(res.body).toEqual(
                    expect.objectContaining(any(Object))
                );
            })();
        });
    });

    afterAll(async () => {
        await UserModel.deleteMany();
        mongoose.disconnect();
    });
}
);
