'use strict';
require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");
const POSTGRES_URI = process.env.DATABASE_URL;
const sequelize = new Sequelize(POSTGRES_URI, {});

module.exports = { sequelize, DataTypes };