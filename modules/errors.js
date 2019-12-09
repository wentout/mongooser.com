'use strict';

const conf = require('conf');
const log  = require('modules/log');
const down = require('modules/down');

process.once('SIGUSR2', () => {
	process.emit('finishProcess', 'SIGUSR2');
});

process.once('SIGTERM', () => {
	process.emit('finishProcess', 'SIGTERM');
});

// additional ctrl + c
var sigingCount = 0;
process.on('SIGINT', () => {
	sigingCount++;
	if (sigingCount > 1) {
		process.exit(1);
	}
	process.emit('finishProcess', 'SIGINT');
});

process.on('uncaughtException', (error) => {
	log.error('Uncaught Exception', { error });
	process.emit('finishProcess', 'UncaughtException');
});

process.on('deprecation', (message) => {
	if (conf.env.dev) {
		log(message);
	}
});

process.once('dbConnectionFail', () => {
	down('DB Connection Error!');
});
