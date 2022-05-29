'use strict';
const express = require('express');
const stamper = require('../middlewares/stamper');
const notFoundHandler = require('../handlers/404');
const errorHandler = require('../handlers/500');

const app = express();

app.get("/", (req, res) => {
    res.status(200).send('hello ');
});

app.get("/data", (req, res) => {
    res.json({
        id: 1,
        name: 'ahmad helwa',
        email: 'ahmad.h@gmail.com'
    });
});
app.get('/test', stamper, (req, res) => {
    res.json({
        id: 2,
        name: 'test',
        email: 'test@gmail.com',
        time: req.timeStamp
    });
});
app.get('/bad', (req, res) => {
    let num = 10;
    let result = num.forEach((x) => {
        console.log(x);
    });
    res.status(500).send(result);
})

app.use('*', notFoundHandler);
app.use(errorHandler);

function start(port) {
    app.listen(port, () => {
        console.log(`i'm listening on port${port}`);
    });
}
module.exports = {
    app: app,
    start: start,
}