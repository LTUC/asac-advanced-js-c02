'use strict';

const AWS = require('aws-sdk');

const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
    const myResponseBody = JSON.stringify(event);
    console.log('reading event is working!!!', myResponseBody);


    // TODO implement
    const response = {
        statusCode: 200,
        body: `All is working \n ${myResponseBody}`,
    };
    return response;
};
