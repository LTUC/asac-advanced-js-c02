'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./middleware/error.js');
const notFound = require('./middleware/404.js');
const authRouter = require('./auth/router.js');
const additionalRoutes = require('./additional-routes.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors({ exposedHeaders: 'auth' }));
app.use(morgan('dev'));

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRouter);
app.use(additionalRoutes);

// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
