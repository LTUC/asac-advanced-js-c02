'use strict';
require("dotenv").config();

const express = require("express");
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
const basic = require("./middlewares/basic");
const bearer = require("./middlewares/bearer");


app.post("/signin", basic, async (req, res) => {
    res.status(200).json(req.user);
});

app.post("/signup", async (req, res) => {
    try {

        // we gonna read from the form in the frontend when the user click on sign up
        let username = req.body.username;
        let password = await bcrypt.hash(req.body.password, 10);
        // console.log('username', username);
        // console.log('password', password);
        const record = await users.create({
            username: username,
            password: password,
        });
        res.status(201).json(record);
        // res.json(record);
    } catch (e) {
        throw new Error("signup error");
    }
});


app.get('/myorders', bearer, (req, res) => {
    res.json({
        'message': 'You are authorized to view the user orders',
        'user': req.user
    });
});
module.exports = app;