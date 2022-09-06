'use strict';

import App from './app';
import config from './app/config/config';
import RoutePath from './app/const/routePath';

console.log('Starting User-API Dev Server...');

const devServerPort: number = +config?.NODE_LOCAL_PORT;
const environment: string = config?.NODE_ENV;
const HealthRoutePath: string = RoutePath.HEALTH;

if (devServerPort && environment) {
    App.listen(devServerPort, () => {
        console.log(`App environment: ${environment}`);
        console.log(`App is running on port: ${devServerPort}`);
        console.log(`Check health: localhost:${devServerPort}${config.ROUTE_PATH}${HealthRoutePath}`);
    }).on('error', (error: Error) => {
        if (error) {
            const errorMessage = `An error occurred while starting the dev-server: 
            ${error.message}`;
            console.error(errorMessage);
        }
    });
} else {
    const errorMessage = 'An error occurred. Please check whether you have mentioned dev-server-port and environment';
    console.error(errorMessage);
}
