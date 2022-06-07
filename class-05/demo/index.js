"use strict";
// like PORT=3000
//if you gonna use .env you need to require it and then use it otherwise it will not work so be careful
require("dotenv").config(); //this line must be before using process.env.PORT or that will cause a problem so put it at the top level of the file
let PORT = process.env.PORT || 3030;
const server = require("./src/server");
// server.start(3000); //or you can add the port to the .env file

// if we want to access the models we can do it like

// const everything = require("./models/index.js");
// everything.db
//   .sync()
//   .then(() => {
//     server.start(PORT);
//   })
//   .catch(console.error);

// or we can use destructuring
const { db } = require("./src/models/index");

// we can do this
// const { start } = require('./server');

db.sync()
    .then(() => {
        // start();
        server.start(PORT);
    })
    .catch(console.error);