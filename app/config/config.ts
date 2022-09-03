'use strict';

const {
    NODE_ENV,
    NODE_LOCAL_PORT,
    ROUTE_PATH
} = process.env;

const config = {
    NODE_ENV: NODE_ENV || 'development',
    NODE_LOCAL_PORT: NODE_LOCAL_PORT || '8000',
    ROUTE_PATH: ROUTE_PATH || '/user-api-dev'
};

export default config;
