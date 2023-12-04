# code-challenge

## Description

This project built by [Nest](https://github.com/nestjs/nest) framework, and dockerize the project and database

## Installation

```bash
$ pnpm install
```

## Running the app

use [Docker](https://www.docker.com/) to build all app

```bash
$ docker compose up
```

and if you want to develop, use `pnpm` to start this project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm dev
$ pnpm start: dev

# production mode
$ pnpm run start:prod
```

## Document

open the watch mode and access `localhost:3000//api/doc` path, access the api document

```bash
$ pnpm dev
```

## Stories

1. Use `/init` interface to create seed data
2. Use `/auth/login` to login, and if username and password are correct, it will return a JWT token
3. if username is incorrect, it will return `User not exist`, and if password is incorrect, it will return `Password error`
4. When a user has an incorrect password and tries 3 times in 5 minutes, they will be blocked. and it will return `User has been blocked`

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
