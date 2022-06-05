"use strict";
const express = require("express");

//in this line we are taking the routing functionality from express

const { People } = require("../models/index.js");


const peopleRouter = express.Router();
//add routes
peopleRouter.get("/people", getPeople);
peopleRouter.get("/people/:id", getOnePerson);
peopleRouter.post("/people", createPerson);
peopleRouter.put("/people/:id", updatePerson);
peopleRouter.delete("/people/:id", deletePerson);
// to add functionality we need to add
async function getPeople(req, res) {
    //get me everything it might be an array of objects
    //findAll means go to the database and return them all behind the scenes it will do SELECT * FROM people;
    // console.log(People);
    const allPeople = await People.findAll();
    res.status(200).json(allPeople);
}
//if we want to find one

async function getOnePerson(req, res) {
    //just make sure to parse it into int because it will be a number but in string format
    const personId = parseInt(req.params.id);
    // because findOne can have more than one condition we gonna do it like
    let person = await People.findOne({ where: { id: personId } });
    res.status(200).json(person);
}

// for adding new record
async function createPerson(req, res) {
    //adding a person to DB or File or whatever
    //regarding the success status for the post it is not 200 it's from 200's family it's 201 once you added something and it's successfully created
    let newPerson = req.body;
    let person = await People.create(newPerson);
    res.status(201).json(person);
}

async function updatePerson(req, res) {
    //just make sure to parse it into int because it will be a number but in string format
    let personId = parseInt(req.params.id);
    let updatePerson = req.body; //the one that the form will send to us from the frontend
    //to update the person i need to find it first then update it
    let foundPerson = await People.findOne({ where: { id: personId } });
    if (foundPerson) {

        let updatedPerson = await foundPerson.update(updatePerson);
        res.status(201).json(updatedPerson);
    } else {
        // throw new Error('there is not such id');
        res.status(404);
    }
}
async function deletePerson(req, res) {
    //just make sure to parse it into int because it will be a number but in string format
    let personId = parseInt(req.params.id);
    let deletePerson = await People.destroy({ where: { id: personId } });

    //if we have the name id instead of personId we can use a short cut
    //   let deletePerson = await People.destroy({ where: { id } });

    res.status(204).json(deletePerson); //it will return the id of the deleted person
}
module.exports = peopleRouter;