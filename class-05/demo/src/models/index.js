"use strict";
require('dotenv').config();

// Connects to our database depending on the URI as an environmental variable
// console.log(process.env.NODE_ENV);
const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
// const POSTGRES_URI = process.env.DATABASE_URL;
//we gonna use these things from the sequelize package
// const { Sequelize, DataTypes } = require("sequelize");
const { Sequelize, DataTypes } = require("sequelize");
// >>>>> here <<<<<
const people = require("./people.model.js");
const customerModel = require('./customer.model');
const orderModel = require('./order.model');
const Collection = require('./lib/collection')


// our connection object
// We will configure our connection options for production
let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        }
        : {};

// let sequelizeOptions =
//     process.env.NODE_ENV === "production"
//         ? {
//             dialect: 'postgres',
//             protocol: 'postgres',
//             dialectOptions: {
//                 ssl: true,
//                 native: true
//             }
//         } : {};

// we are going to use this to connect to Postgres
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
//now we have our connection
// let sequelize = new Sequelize(POSTGRES_URI, {});
// after that we gonna exports from this file

const customerTable = customerModel(sequelize, DataTypes);
const orderTable = orderModel(sequelize, DataTypes);

const customerCollection = new Collection(customerTable);
const orderCollection = new Collection(orderTable);


customerTable.hasMany(orderTable, {
    foreignKey: "customerId",
    sourceKey: "id"
});

orderTable.belongsTo(customerTable, {
    foreignKey: "customerId",
    targetKey: "id",
});

module.exports = {
    db: sequelize,
    People: people(sequelize, DataTypes),
    CustomerTable: customerCollection,
    OrderTable: orderCollection,
};