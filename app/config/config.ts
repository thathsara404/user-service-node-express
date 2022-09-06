'use strict';

const {
    NODE_ENV,
    NODE_LOCAL_PORT,
    ROUTE_PATH,
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_HOST,
    MONGODB_DOCKER_PORT,
    MONGODB_DATABASE
} = process.env;

const config = {
    NODE_ENV: NODE_ENV || 'development',
    NODE_LOCAL_PORT: NODE_LOCAL_PORT || '8000',
    ROUTE_PATH: ROUTE_PATH || '/user-api-dev',
    DB: {
        MONGODB_USER: MONGODB_USER || 'root',
        MONGODB_PASSWORD: MONGODB_PASSWORD || '123456',
        MONGODB_HOST: MONGODB_HOST || 'mongodb',
        MONGODB_DOCKER_PORT: MONGODB_DOCKER_PORT || 27017,
        MONGODB_DATABASE: MONGODB_DATABASE || 'user_service'
    }
};

export default config;
