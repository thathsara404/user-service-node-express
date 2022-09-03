'use strict';

import * as express from 'express';
import config from './app/config/config';
import sendErrorResponse from './app/middleware/errorBuilderMiddleware';
import healthRoute from './app/route/healthRoute';
import UserServiceError from './app/type/error/UserServiceError';

const app = express();

// Parses incoming requests with JSON payloads (body-parser)
app.use(express.json());
// Parses incoming requests with HTML Form (body-parser) 
app.use(express.urlencoded({ extended: true }));

// Consume API Routes
app.use(config.ROUTE_PATH, healthRoute);

// Consume Error Handler middleware
app.use((err: UserServiceError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    sendErrorResponse(err, res);
});

const App = app;
export default App;
