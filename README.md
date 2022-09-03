# USER-SERVICE-REST-API
User Service REST API

# Technical Stack & External Dependencies 
- Express
    - yarn add express : Node API framework
- ES-Lint
    - yarn add --dev eslint (dev dependency) : give syntax rules
    - yarn add --dev @typescript-eslint/eslint-plugin : TypeScript lint rules definition
    - yarn add --dev @typescript-eslint/parser : parser
- Nodemon
    - yarn add --dev install nodemon : restart the server if changes are applied to the /app directory. Configured with nodemon.json file. This is applied only for "yarn watch" command
- TypeScript
    - yarn add --dev ts-node : TypeScript execution engine
    - yarn add --dev typescript : TypeScript language
    - yarn add --dev @types/body-parser : type definition
    - yarn add --dev @types/express : type definition
    - yarn add --dev @types/node : type definition
- Winston
    - yarn add winston: Error logger
- Jest
    - yarn add jest
    - yarn add -D ts-jest@27.1.5:  Jest to test projects written in TypeScript
- env-cmd
    - yarn add --dev env-cmd: to manage different levels of environment variables while building and running the app locally
- husky
    - yarn add -D husky: to easily initiate git hooks
- joi
    - yarn add joi: To perform router validation efficiently
- moment
    - yarn add moment-timezone: to perform time zones related calculations accurately

# Steps to run manually
| Step  | Instructions                                | Description                                                                                               |
| ----- |:--------------------------------------------|:--------------------------------------------------------------------------------------------------------- |
| 1     | > yarn install | This command will install the dependencies. |
| 2     | > yarn build | This command will build the User Service REST API. |
| 3     | > yarn watch | This command will run the build and re-start the server automatically. |
| 4     | check console | Check the console to get the health route. Also you can check the API spec for more details on routs. |

# Steps to run with Docker-Compose
| Step  | Instructions                                | Description                                                                                               |
| ----- |:--------------------------------------------|:--------------------------------------------------------------------------------------------------------- |
| 1     | docker compose --env-file .env.dev -f docker-compose-dev.yml up | Access the project folder with the terminal and run the command. This command will build the Docker image of the application and will start the application container. Besides that, it will initiate a MySQL container in the local Docker.|
| 2     | check console | Check the console to get the health route. Also you can check the API spec for more details on routs. |
| 3     | connect MySQL | You can use a tool like Debeaver to connect the docker MySQL. |

# Best Practices
- make sure your node version is >= 14
- make sure to implement type safety in the BFF
- make sure to mention all the external dependencies and the purpose of the dependency under the Technical Stack & External Dependencies in this file
- make sure your IDE supports ESLint
- make sure there is no any Lint rule violation after your development
- make sure tto follow the TDD
- make sure to follow the existing error handling approach