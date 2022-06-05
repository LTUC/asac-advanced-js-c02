"use strict"; // to use javascript in strict mode
require('dotenv').config();
const PORT = process.env.PORT || 3000;
// 1st level packages / i don't have to install anything because they are come with node

//for example
// const http = require("http");

// 3rd party packages
const express = require("express");
const app = express();


// local modules
const notFoundHandler = require("./handlers/404");
const errorHandler = require("./handlers/500");
const peopleRoutes = require("./routes/people.route.js");
//this is how we handle routes inside the server

//this to parse the data from the req.body
app.use(express.json());


//now we can use people routes from our module
//and if we have more we can do the same require them then use them
app.use(peopleRoutes);


//it should be at the end after all routes
app.use("*", notFoundHandler);

app.use(errorHandler); //it should be the last one after the *

// so if i want others to access my file i can do that easily using module like we can export anything number or [] or {} but usually we do exports {}'s
function start(PORT) {
    app.listen(PORT, () => {
        console.log(`Listen and Running on port ${PORT}`);
    });
}

module.exports = {
    app: app,
    start: start,
};