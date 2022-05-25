'use strict';

const express = require('express');

const token = require('./auth/middleware/bearer.js');
const permissions = require('./auth/middleware/acl.js');

const router = express.Router();

/*
  - `router.get('/public')` should be visible by anyone
  - `router.get('/private')` should require only a valid login
  - `router.get('/readonly')` should require the `read` capability
  - `router.get('/create)` should require the `create` capability
  - `router.put('/update)` should require the `update` capability
  - `router.patch('/delete)` should require the `update` capability
*/

router.get('/public', routeHandler);
router.get('/private', token, routeHandler);
router.get('/secret', token, routeHandler);
router.get('/read', token, permissions('read'), routeHandler);
router.post('/add', token, permissions('create'), routeHandler);
router.put('/change', token, permissions('update'), routeHandler);
router.delete('/remove', token, permissions('delete'), routeHandler);

function routeHandler(req, res) {
  res.status(200).send('Access Granted');
}

module.exports = router;
