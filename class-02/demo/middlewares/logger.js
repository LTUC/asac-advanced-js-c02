'use strict';
const logger = (req, res, next) => {
    // console.clear();
    console.log('Request: ', req.method, req.path);
    next();
}

module.exports = logger;