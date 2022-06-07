'use strict';
const Order = (sequelize, DataType) =>
    sequelize.define('orders', {
        name: {
            type: DataType.STRING,
            allowNull: false,
        },
        customerId: {
            type: DataType.INTEGER,
            allowNull: false,
        }
    });

module.exports = Order;

