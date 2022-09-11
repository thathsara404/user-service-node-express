# USER-SERVICE-REST-API
User Service REST API
- Open API Specification : https://app.swaggerhub.com/apis-docs/THATHSARARAVIRAJ/User-API/1.0.0

# Technical Stack & External Dependencies 
- Express
    - yarn add express : Node API framework
- bcrypt
    - yarn add bcrypt : Password hashing and salting
- cors
    - yarn add cors : Enable CORS
- jsonwebtoken
    - yarn add jsonwebtoken : Integrate Bearer token
- Mongoose
    - yarn add mongoose : Integrate ODM with MongoDB
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
    - yarn add --dev @types/bcryptjs : type definition
    - yarn add --dev @types/cors : type definition
    - yarn add --dev @types/jsonwebtoken : type definition
- Winston
    - yarn add winston: Error logger
- Jest
    - yarn add jest --dev
    - yarn add -D ts-jest :  Jest to test projects written in TypeScript
- Babel-Jest
    - yarn add babel-jest --dev : Jest tool to compile ES6 syntax
- Babel
    - yarn add @babel/preset-env --dev : Jest need a compiler for ES6 syntax
- TS-Test
    - yarn add ts-jest --dev : Jest need a Typescript transpiler
- Supertest
    - yarn add supertest --dev
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
| 4     | check console | Check the console to get the health route. Also you can check the API spec for more details on routs. And make sure you have setup a Mongo DB locally with the relevant user data in configs |

# Steps to run with Docker-Compose
| Step  | Instructions                                | Description                                                                                               |
| ----- |:--------------------------------------------|:--------------------------------------------------------------------------------------------------------- |
| 1     | docker compose --env-file .env.dev -f docker-compose-dev.yml up --build | Access the project folder with the terminal and run the command. This command will build the Docker image of the application and will start the application container. Besides that, it will initiate a MySQL container in the local Docker.|
| 2     | check console | Check the console to get the health route. Also you can check the API spec for more details on routs. |
| 3     | connect MySQL | You can use a tool like DBeaver to connect the docker MySQL. |

# Steps to run unit test
| Step  | Instructions                                | Description                                                                                               |
| ----- |:--------------------------------------------|:--------------------------------------------------------------------------------------------------------- |
| 1     | "docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=testUser -e MONGO_INITDB_ROOT_PASSWORD=test mongo" | Unit tests have been written in Jest and Supertest. Super test provides a high-level abstraction for testing REST-Full APIs. Supertest needs a database instance while it running. So spin up a docker mongo container with the command given. |
| 2     | yarn test | After setting up the Mongo docker container, This command will run the unit tests. |
# Best Practices
- make sure your node version is >= 14
- make sure to implement type safety in this module
- make sure to mention all the external dependencies and the purpose of the dependency under the Technical Stack & External Dependencies in this file
- make sure your IDE supports ESLint (install ESLint extension)
- make sure there is no any Lint rule violation after your development
- make sure to follow the TDD
- make sure to follow the existing error handling approach

# Dev, make your test easy
- Developers can consume /manual-test-rest/manual-test-user-route.txt to test REST API with VSCode Rest Client  