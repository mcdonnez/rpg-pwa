const http = require('http');
const log = require('./log');
const serverConfig = require('../server');
const port = process.env.PORT || 8080;
/**
 * Create HTTP server
 */
log.info(`Starting on port ${port}`);

const server = http.createServer(serverConfig);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
process.on('SIGTERM', () => {
	log.info('SIGTERM Recieved, Healthcheck disabled');
});

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	// Handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES': {
			log.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		} case 'EADDRINUSE': {
			log.error(bind + ' is already in use');
			process.exit(1);
			break;
		} default: {
			throw error;
		}
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	log.info('Listening on ' + bind);
}
