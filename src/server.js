require('dotenv').config();
const express = require('express');
const routes = require('./api/routes');
const development = require('./development/routes');
const path = require('path');
const morgan = require('morgan');
const systemMiddleware = require('./api/middleware/system');

const app = express();

app.use(morgan('tiny'));

app.use('/development', development);
app.use('/api', routes);
app.use('/', express.static(path.join(__dirname, '../dist')));
app.get('/character*', function(request, response, next) {
	response.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.use(systemMiddleware.notFoundHandler);
app.use(systemMiddleware.errorHandler);

module.exports = app;
