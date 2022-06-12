'use strict';
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const POSTGRES_URI = "postgres://localhost:5432/shihab";
const sequelize = new Sequelize(POSTGRES_URI, {});
const base64 = require("base-64");
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const users = sequelize.define("users", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

app.post("/signup", async (req, res) => {
    try {
        let username = req.body.username;
        let password = await bcrypt.hash(req.body.password, 10);

        console.log('username', username);
        console.log('password', password);

        const record = await users.create({
            username: username,
            password: password,
        })
        res.status(201).json(record);

    } catch (e) {
        throw new Error('signup error');
    }
});

app.post("/signin", async (req, res) => {
    if (req.headers.authorization) {
        //Basic YWhtYWQ6YWhtYWQxMjM=
        let basicHeaderParts = req.headers.authorization.split(" ");
        //basicHeaderParts = ['Basic','YWhtYWQ6YWhtYWQxMjM=']

        let encoded = basicHeaderParts[1];
        //encoded = 'YWhtYWQ6YWhtYWQxMjM='

        let decoded = base64.decode(encoded);
        //decoded = "username:password"
        let username = decoded.split(":")[0];
        let password = decoded.split(":")[1];

        /* let [username,password] = decoded.split(":");*/
        try {
            const user = await users.findOne({ where: { username: username } });
            const valid = await bcrypt.compare(password, user.password);
            if (valid) {
                res.status(200).json({
                    user
                });
            } else {
                res.status(500).send("wrong username or password");
            }
        } catch {
            res.status(500).send("app error");
        }
    }
});

sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log("running on 3000");
        });
    })
    .catch((e) => {
        throw new Error("error in app");
    });
