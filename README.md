# code-challenge

## Description

This project built by [Nest](https://github.com/nestjs/nest) framework, and dockerize the project and database

## Installation

```bash
$ pnpm install
```

# Running the app

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

open the watch mode and access `//localhost:3000//api/doc` path, access the api document

```bash
$ pnpm dev
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
