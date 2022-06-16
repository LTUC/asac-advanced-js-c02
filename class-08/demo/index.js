"use strict";
const server = require('./src/server');
const { sequelize } = require('./src/models/index');


// let's connect the database
sequelize
    .sync()
    .then(() => {
        server.listen(3000, () => {
            console.log("running on 3000");
        });
    })
    .catch((e) => {
        throw new Error("error in app");
    });