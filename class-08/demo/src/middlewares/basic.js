'use strict';

const Users = require('../models/users.model');
const base64 = require('base-64');

function basic(req, res, next) {
    if (req.headers.authorization) {
        let basicHeaderParts = req.headers.authorization.split(" ");
        let encodedValue = basicHeaderParts.pop();
        let decodedValue = base64.decode(encodedValue);
        // let username = decodedValue.split(":")[0];
        // let password = decodedValue.split(":")[1];
        // or we can use destructuring of an array
        let [username, password] = decodedValue.split(":");
        Users.authenticateBasic(username, password)
            .then((validUser) => {
                req.user = validUser;
                // console.log('/////////////////////////', req.user)
                next();
            })
            .catch((err) => {
                next("Invalid Signin");
            })
    }
}

module.exports = basic;