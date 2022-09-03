'use strict';

import App from './app';
import config from './app/config/config';

console.log('Starting User-API Server...');

const serverPort: number = +config?.NODE_LOCAL_PORT;
const environment: string = config?.NODE_ENV;

if (serverPort && environment) {
    App.listen(serverPort, () => {
        console.log(`App environment: ${environment}`);
        console.log(`App is running on port: ${serverPort}`);
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
