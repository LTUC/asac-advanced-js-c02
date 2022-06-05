//this is gonna be very simple example
"use strict";

// Our table schema
const People = (sequelize, DataTypes) =>
    sequelize.define("people", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        lastName: {
            type: DataTypes.STRING,
        },
    });

module.exports = People;


// the error is here => {
// no need to the {}
// }
// const People = (sequelize, DataTypes) => {
//     sequelize.define("People", {
//         firstName: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         lastName: {
//             type: DataTypes.STRING,
//         },
//     });
// };
// module.exports = People;