const bunyan = require('bunyan');

const log = bunyan.createLogger({
	name: 'AppLog'
});

module.exports = log;
