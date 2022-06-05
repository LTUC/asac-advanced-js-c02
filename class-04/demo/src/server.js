'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();
const peopleRotes = require("./routes/people.route.js")

const notFoundHandler = require("./handlers/404");
const serverErrorHandler = require('./handlers/500');



app.use(express.json());

app.use(peopleRotes);

app.use("*", notFoundHandler);
app.use(serverErrorHandler);


function start(PORT) {
    app.listen(PORT, () => {
        console.log(`Listen and running on PORT ${PORT}`);
    })
}

module.exports = {
    app: app,
    start: start
}