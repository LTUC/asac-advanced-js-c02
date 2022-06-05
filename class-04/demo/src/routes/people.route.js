"use strict";
const express = require("express");
//in this line we are taking the routing functionality from express
const { People } = require("../models/index.js");
const peopleRouter = express.Router();
//add routes
peopleRouter.get("/", home);
peopleRouter.get("/people", getPeople);
peopleRouter.get("/people/:id", getOnePerson);
peopleRouter.post("/people", createPerson);
peopleRouter.put("/people/:id", updatePerson);
peopleRouter.delete("/people/:id", deletePerson);

async function home(req, res) {
    res.status(200).send("hi");
}
async function getPeople(req, res) {
    //SELECT * from People;
    const peopleResult = await People.findAll();
    res.status(200).json(peopleResult);
}
async function getOnePerson(req, res) {
    let personId = parseInt(req.params.id);
    let person = await People.findOne({ where: { id: personId } });
    res.status(200).json(person);
}
async function createPerson(req, res) {
    let newPerson = req.body;
    let person = await People.create(newPerson);
    res.status(201).json(person);
}
async function updatePerson(req, res) {
    let personId = parseInt(req.params.id);
    let updatePerson = req.body;
    let foundPerson = await People.findOne({ where: { id: personId } });
    let updatedPerson = foundPerson.update(updatePerson);
    res.status(201).json(updatedPerson);
}
async function deletePerson(req, res) {
    let personId = parseInt(req.params.id);
    let deletePerson = await People.destroy({ where: { id: personId } });
    res.status(204).json(deletePerson);
}

module.exports = peopleRouter;


