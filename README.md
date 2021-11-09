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

## 3.5 Linting code and fix eslint

- Run `npm i eslint -g` to install eslint
- Run command `yarn lint` to check the rule or `yarn fix-lint` to fix all fixable errors/warnings
