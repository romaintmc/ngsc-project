NestJS architecture for generic integration of sensor with HATEOAS suggestions​

## Description

The purpose of this API is to facilitate communication with a decentralized network of sensors. 
It allows to retrieve data from various sensors (geolocation, type, etc.) and offers suggestions based on queries made through specialized services.

## Project setup

```bash
$ 
$ npm install curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
$ # Download and install Node.js (you may need to restart the terminal)
$ nvm install 20
$ npm i -g @nestjs/cli
$ npm install exceljs 
$ npm i @nestjs/microservices
$ npm i mqtt
$ npm i net
$ sudo apt install mariadb-server
```

## Install the database

Use the script 'script.sql' the scripts folder to setup the database
You can use the 'insertdata.sql' if you want to use data to test the application

## Environment variables

Create and complete the .env file with database connection information by following the example below :

```bash
DB_NAME=dbnameexample
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=dbusernameexample
DB_PASSWORD=dbpwdexample
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Test the endpoints with Postman

If you are using VSCode, install the Postman extension
You can import the HTTP requests in the postman folder, and test the GET localhost:3000/sensors

## Available features

-Get data of all sensors (+suggestions)
-Get data of one sensor by id (+suggestions)
-Get data of all sensors by location (+suggestions)
-Get data of all sensors by type (+suggestions)
-Create new sensor
-Update existing sensor
-Delete existing sensor

## Technologies used

-NestJS framework
-MySQL Database
-MQTT
-net