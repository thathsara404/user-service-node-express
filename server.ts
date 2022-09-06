'use strict';

import App from './app';
import config from './app/config/config';
import RoutePath from './app/const/routePath';

console.log('Starting User-API Server...');

const serverPort: number = +config?.NODE_LOCAL_PORT;
const environment: string = config?.NODE_ENV;
const HealthRoutePath: string = RoutePath.HEALTH;

if (serverPort && environment) {
    App.listen(serverPort, () => {
        console.log(`App environment: ${environment}`);
        console.log(`App is running on port: ${serverPort}`);
        console.log(`Check health: localhost:${serverPort}${config.ROUTE_PATH}${HealthRoutePath}`);
    }).on('error', (error: Error) => {
        if (error) {
            const errorMessage = `An error occurred while starting the server: 
            ${error.message}`;
            console.error(errorMessage);
        }
    });
} else {
    const errorMessage = 'An error occurred. Please check whether you have mentioned server-port and environment';
    console.error(errorMessage);
}
