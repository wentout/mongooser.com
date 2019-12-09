'use strict';

const env   = require('./env');

module.exports = {
	// HTTP Server port, defaults to 8000
	port           : env.SERVER_PORT,
	// time to wait for response ends
	// before shuting down the server directly
	exitTimeout    : 5000,
	// time to wait for request response, 29s
	requestTimeout : 29000
};
