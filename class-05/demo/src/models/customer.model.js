'use strict';
const Customer = (sequelize, DataType) =>
    sequelize.define('customers', {
        name: {
            type: DataType.STRING,
            allowNull: false,
        }
    });

module.exports = Customer;

