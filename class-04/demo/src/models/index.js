'use strict';
require('dotenv').config();

// if (process.env.NODE_ENV === "test") {
//     const POSTGRES_URI = "sqlite:memory:";
// } else {
//     const POSTGRES_URI = process.env.DATABASE_URL;
// }

const POSTGRES_URI = process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;


const { Sequelize, DataTypes } = require("sequelize");


let sequelizeOptions = process.env.NODE_ENV === "production" ? {
    dialectOptions: {
        ssl: {
            //Secure Sockets Layer
            require: true,
            rejectUnauthorized: false,
        },
    },
} : {}

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const People = require('./people.model');

//this step is used to do the connection
module.exports = {
    db: sequelize,
    People: People(sequelize, DataTypes),
}