const express = require('express');
const routes = require('./api/routes');
const path = require('path');
const morgan = require('morgan');
const systemMiddleware = require('./api/middleware/system');

const app = express();

app.use(morgan('tiny'));

app.use('/api', routes);
app.use('/', express.static(path.join(__dirname, 'dist')));

app.use(systemMiddleware.notFoundHandler);
app.use(systemMiddleware.errorHandler);

module.exports = app;
