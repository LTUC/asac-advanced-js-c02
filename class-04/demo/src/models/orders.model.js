'use strict';
// table schema
const Orders = (sequelize, DataTypes) => {
    sequelize.define("Orders", {
        content: {
            // dataTypes
            // https://sequelize.org/v5/manual/data-types.html
            type: DataTypes.STRING,
            // constraints
            // https://sequelize.org/v6/manual/validations-and-constraints.html
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
        }
    })
}

module.exports = Orders;