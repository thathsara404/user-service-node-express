'use strict';

import * as express from 'express';
import config from './app/config/config';
import { connectToMongoDB } from './app/data/db/connector';
import sendErrorResponse from './app/middleware/errorBuilderMiddleware';
import validateJWT from './app/middleware/jwtTokenValidationMiddleware';
import healthRoute from './app/route/healthRoute';
import userRoute from './app/route/userRoute';
import UserServiceError from './app/type/error/UserServiceError';
import * as cors from 'cors';

const app = express();

// Connect to the database
(async () => {
    await connectToMongoDB();
})().catch(error => {
    process.exit(1);
});

// CORS
const acceptedOrigins = process.env.ORIGINS 
    || ['http://localhost:80', 'http://localhost:3000'];
app.use(cors({
    origin: acceptedOrigins,
    optionsSuccessStatus: 200
}));

// Auth token validation
app.use((req, res, next) => {
    validateJWT(req, res, next);
});

// Parses incoming requests with JSON payloads (body-parser)
app.use(express.json());
// Parses incoming requests with HTML Form (body-parser) 
app.use(express.urlencoded({ extended: true }));

// Consume API Routes
app.use(config.ROUTE_PATH, healthRoute);
app.use(config.ROUTE_PATH, userRoute);

// Consume Error Handler middleware
app.use((err: UserServiceError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    sendErrorResponse(err, res);
});

const App = app;
export default App;
