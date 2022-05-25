'use strict';

require('@code-fellows/supergoose');
const auth = require('../../../src/auth/middleware/basic.js');
const Users = require('../../../src/auth/models/users-model.js');

let users = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
  editor: { username: 'editor', password: 'password', role: 'editor' },
  user: { username: 'user', password: 'password', role: 'user' },
};

beforeAll(async (done) => {
  await new Users(users.admin).save();
  await new Users(users.editor).save();
  await new Users(users.user).save();
  done();
});

describe('Auth Middleware', () => {

  // admin:password: YWRtaW46cGFzc3dvcmQ=
  // admin:foo: YWRtaW46Zm9v

  let errorObject = 'Invalid Login';

  describe('user authentication', () => {

    it('fails a login for a user (admin) with the incorrect basic credentials', () => {

      let req = {
        headers: {
          authorization: 'Basic YWRtaW46Zm9v',
        },
      };
      let res = {};
      let next = jest.fn();

      return auth(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith(errorObject);
        });

    }); // it()

    it('logs in an admin user with the right credentials', () => {

      let req = {
        headers: {
          authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
        },
      };
      let res = {};
      let next = jest.fn();

      return auth(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith();
        });

    }); // it()

  });

});
