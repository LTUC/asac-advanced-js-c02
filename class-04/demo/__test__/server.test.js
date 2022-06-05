const { app } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(app);
const { db } = require('../src/models');
beforeAll(async () => {
    await db.sync();
});
describe("", () => {
    test('response like 404 for invalid routes ', async () => {
        const res = await mockRequest.get('/blabla');
        expect(res.status).toBe(404);
    })
    test('can add a person', async () => {
        const res = await mockRequest.post('/people').send({
            firstName: "shihab",
            lastName: "ehshtaiwi"
        })
        expect(res.status).toBe(201);
    })
    test('can read all people', async () => {
        const res = await mockRequest.get('/people');
        expect(res.status).toBe(200);
    })
    test('can read one person', async () => {
        const res = await mockRequest.get('/people/1');
        expect(res.status).toBe(200);
    })
    test('can update one person', async () => {
        const res = await mockRequest.put('/people/1');
        expect(res.status).toBe(201);
    })
    test('can delete one person', async () => {
        const res = await mockRequest.delete('/people/1');
        expect(res.status).toBe(204);
    })

});
afterAll(async () => {
    await db.drop();
})
