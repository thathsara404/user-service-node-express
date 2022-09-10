'use strict';

import request from 'supertest';
import app from '../app';

describe('TDD for user creation', () => {
    it('Health route', () => {
        (async () => {
            const response = await request(app).get('/user-api-dev/health').send();
            expect(response.body.success)
                .toEqual('User-API is up and running...' );
        })();
    });
});
