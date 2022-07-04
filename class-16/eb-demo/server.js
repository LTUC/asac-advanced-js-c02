"use strict";

const express = require("express");
const PORT = process.env.PORT || 8080;
const app = new express();

app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.status(200).send("pizza time");
});

app.listen(PORT, () => {
    console.log(`server is working on ${PORT}`);
});