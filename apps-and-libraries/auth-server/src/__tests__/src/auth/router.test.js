'use strict';

process.env.SECRET = 'foobar';

const jwt = require('jsonwebtoken');
const supergoose = require('@code-fellows/supergoose');

const server = require('../../../src/app.js').server;

const mockRequest = supergoose(server);

const SECRET = process.env.SECRET || 'supersecret';

let users = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
  editor: { username: 'editor', password: 'password', role: 'editor' },
  user: { username: 'user', password: 'password', role: 'user' },
};

describe('Auth Router', () => {

  Object.keys(users).forEach(userType => {

    describe(`${userType} users`, () => {

      let id;

      it('can create one', () => {
        return mockRequest.post('/signup')
          .send(users[userType])
          .then(results => {
            var token = jwt.verify(results.body.token, SECRET);
            id = token.id;
            expect(token.id).toBeDefined();
          });
      });

      it('can signin with basic', () => {
        return mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password)
          .then(results => {
            var token = jwt.verify(results.body.token, SECRET);
            expect(token.id).toEqual(id);
          });
      });

    });

  });

});
