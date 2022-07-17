'use strict';
const dynamoose = require('dynamoose');
const contactsSchema = new dynamoose.Schema({
    'id': String,
    'name': String,
    'phone': String,
})

const contactModel = dynamoose.model('contacts', contactsSchema);
exports.handler = async (event) => {
    // queryStringParameters
    let { id, name, phone } = event.queryStringParameters;
    let newContact = { id, name, phone };
    let response = { statusCode: null, body: null };
    try {
        let newRecord = await contactModel.create(newContact);
        response.statusCode = 200;
        response.body = JSON.stringify(newRecord);

    } catch (error) {
        response.statusCode = 500;
        response.body = JSON.stringify(error.message)
    }

    return response;
}