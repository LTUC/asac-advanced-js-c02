"use strict";
const express = require("express");

//in this line we are taking the routing functionality from express

const { CustomerTable } = require("../models/index.js");


const customerRouter = express.Router();
//add routes
customerRouter.get("/customer", getCustomer);
customerRouter.get("/customer/:id", getOneCustomer);
customerRouter.post("/customer", createCustomer);
customerRouter.put("/customer/:id", updateCustomer);
customerRouter.delete("/customer/:id", deleteCustomer);
// to add functionality we need to add
async function getCustomer(req, res) {
    let customer = await CustomerTable.read();
    res.status(200).json(customer);
}
//if we want to find one

async function getOneCustomer(req, res) {
    const customerId = parseInt(req.params.id);
    let customer = await CustomerTable.read(customerId);
    res.status(200).json(customer);
}

// for adding new record
async function createCustomer(req, res) {
    let newCustomer = req.body;
    let customer = await CustomerTable.create(newCustomer);
    res.status(201).json(customer);
}

async function updateCustomer(req, res) {
    let customerId = parseInt(req.params.id);
    let updateCustomer = req.body;
    let foundCustomer = await CustomerTable.read(customerId);
    if (foundCustomer) {
        let updatedCustomer = await foundCustomer.update(updateCustomer);
        res.status(201).json(updatedCustomer);
    }
}
async function deleteCustomer(req, res) {

    let customerId = parseInt(req.params.id);
    let deleteCustomer = await CustomerTable.delete(customerId);
    res.status(204).send('record deleted');
}
module.exports = customerRouter;