'use strict';
const Users = require("../models/users.model");
function bearer(req, res, next) {
    if (req.headers.authorization) {
        // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaWhhYiIsImlhdCI6MTY1NTA0ODcxMX0.ZEiWN5JiWGvGFr4s3Q6NRLGMHahoTOV3OkiXLfJTvhk
        const bearerToken = req.headers.authorization.split(" ")[1];
        Users.authenticateBearer(bearerToken)
            .then((userData) => {
                req.user = userData;
                next();
            })
            .catch(() => {
                next("Invalid Token");
            })
    }
}

module.exports = bearer;