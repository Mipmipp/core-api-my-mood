# My Mood | Core API

The My Mood Core API is a project specifically designed for users to track their mood over time. It utilizes security policies to ensure that only authenticated users can access their resources. The API allows users to create tracks to record their mood at different points in time. The user entity has a one-to-many relationship with the track entity for efficient mood tracking. Protected routes and decorators are implemented to enhance security and user experience, making it a reliable platform for mood tracking and management.

## Contents

1. [Tech stack](#tech-stack)
2. [Getting started](#getting-started)
3. [Testing and Mocking](#testing-and-mocking)
4. [Requirements](#requirements)
   - [Project configuration](#project-configuration)
   - [Running the app](#running-the-app)
   - [Running tests](#running-tests)
5. [Documentation](#documentation)
   - [Project structure](#project-structure)
   - [Entity relationship diagram](#entity-relationship-diagram)
   - [Postman collection](#postman-collection)

# Tech stack

The Tech Stack section provides an overview of the technologies used in this project. It includes:

- [NestJS](https://docs.nestjs.com/): A progressive Node.js framework for building efficient and scalable server-side applications.
- [TypeORM](https://typeorm.io/): An ORM (Object-Relational Mapping) library that simplifies the management of database operations in TypeScript and JavaScript.
- [MySQL](https://dev.mysql.com/doc/): A popular open-source relational database management system.
- [SQlite](https://www.sqlite.org/docs.html): A self-contained, serverless, and zero-configuration database engine. It is used for testing purposes.

Additionally, the following libraries are used for authentication:

- [JSON Web Tokens (JWT)](https://jwt.io/): A standard for securely representing claims between two parties.
- [Passport.js](http://www.passportjs.org/): A simple, unobtrusive authentication middleware for Node.js.
- [Bcrypt](https://www.npmjs.com/package/bcrypt): A library for hashing and salting user passwords.

For testing, the project utilizes:

- [Jest](https://jestjs.io/): A delightful JavaScript testing framework with a focus on simplicity.
- [Supertest](https://www.npmjs.com/package/supertest): A high-level abstraction for testing HTTP servers, making it easier to test API endpoints.

# Testing and Mocking

The project is fully tested with integration tests using Supertest and Jest. Additionally, services are mocked to isolate dependencies and simulate external systems. This ensures the reliability and maintainability of the API.
Here are some key metrics for the code coverage:

- Statements: `95% (475/500)`
- Branches: `71.73% (33/46)`
- Functions: `94.39% (78/81)`
- Lines: `96.29% (421/446)`

# Getting started

## Requirements

| Tecnhnology | Version |
| ----------- | ------- |
| Node        | 18.18.0 |
| NPM         | 9.8.1   |

## Project configuration

- Step one.
  Clone the project.

```bash
  git clone https://github.com/Mipmipp/core-api-my-mood.git

  cd core-api-my-mood

  npm i

  npm run prepare
```

- Step two.
  Create `.env` file and copy the content of `.env.dist` file on this.

- Step three.
  Dowload and configure docker [here](https://www.docker.com/get-started/).

## Running the app.

```bash
  docker compose up
  npm run start:dev
```

## Running Tests

The project includes automated tests and a GitHub Actions CI/CD workflow to ensure code quality.

To run tests in the console:

```bash
  npm run test
```

# Documentation

In this section, you can find the project documentation to quickly get started.

## Project structure.

This project follows a Clean Architecture style, specifically the Hexagonal Architecture pattern.
For more information, please refer to the following link: https://madewithlove.com/blog/hexagonal-architecture-demystified/

## Entity relationship diagram:

The following is the entity relationship diagram for the Core API (source [here](https://github.com/Mipmipp/core-api-my-mood/blob/main/docs/erd/core-api.erd.drawio)):

![ERD](https://github.com/Mipmipp/core-api-my-mood/blob/main/docs/erd/core-api.erd.png)

## Postman collection

The project includes a Postman Collection located [here](https://github.com/Mipmipp/core-api-my-mood/blob/main/docs/postman/core_api_my%20mood.postman_collection.json).
