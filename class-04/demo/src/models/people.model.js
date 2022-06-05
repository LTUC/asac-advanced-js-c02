'use strict';
// table schema
const People = (sequelize, DataTypes) => {
    sequelize.define("People", {
        firstName: {
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

module.exports = People;