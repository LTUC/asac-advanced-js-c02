'use strict';
const { app } = require('../src/server'); // destructing assignment 
const supertest = require('supertest');
const mockRequest = supertest(app);
// console.log('************************************');
// console.log(mockRequest);
// console.log('************************************');

const { db } = require('../src/models/index');

// before any of the test create a connection
beforeAll(async () => {
    await db.sync();
});

describe('Web server', () => {
    // Check if 404 is handled 

    it('Should respond with 404 status on an invalid route', async () => {
        const response = await mockRequest.get('/foo');
        expect(response.status).toBe(404);
    });

    // test if can create a person
    it('can add a person', async () => {
        const response = await mockRequest.post('/customer').send({
            name: 'shihab',
        });
        expect(response.status).toBe(201);
    });

    // test if can read
    it('can get all people', async () => {
        const response = await mockRequest.get('/customer');
        expect(response.status).toBe(200);

    });
    // test if can update a person
    it('can update a record', async () => {
        const response = await mockRequest.put('/customer/1');
        expect(response.status).toBe(201);
    });
    // test if can delete a person
    it('can delete a record', async () => {
        const response = await mockRequest.delete('/customer/1');
        expect(response.status).toBe(204);
    });
});
// after all the tests are done
afterAll(async () => {
    await db.drop();
});