# API
A Web REST API service serves app functionalities

# 1. Setup development
* Install `nvm` to use and switch specific node version 
* Use `node` LTS (v16.13.0) for local development by command `nvm install --lts`
* Install `yarn` v1.22.4 or newer

# 2. Launch in local 
1. Install dependencies (do frequently on fetching new code): `yarn --frozen-install`
2. Run app by `yarn dev`. It auto loads `.env` if available.

# 3. Workflows

## 3.1 Other commands

```
yarn dev  #Start API server in local
yarn lint
yarn fix-lint
```

## 3.2 Develop in local

Running API locally requires below parameters to be set explicitly:
- Update later.

## 3.3 Run HTTP API

`yarn dev`

## 3.4. API Documentation

- Run `npm i api-doc -g` to install apidoc library
- Run command `yarn docs` to generate api document at location `doc/index.html`

## 3.4. API Documentation

## 3.5 Migration Database

- Install modules: `npm i sequelize sequelize-cli -g`
- Move to api repo.
- Use node v16.x: `nvm use 16`
- Create new database by running sql scripts in `src/utils/database/initializations` or create a Postgres db with below configs:
```
  Database name: lettutor
  Host: 127.0.0.1
  Port: 5432
```
- To migrate DB: `npx sequelize-cli db:migrate`
- To undo the latest migration: `npx sequelize-cli db:migrate:undo`
- To undo all migrations: `npx sequelize-cli db:migrate:undo:all`

- To seed all data: `npx sequelize-cli db:seed:all`
- To undo the latest seed: `npx sequelize-cli db:seed:undo`
- To undo all seeds: `npx sequelize-cli db:seed:undo:all`