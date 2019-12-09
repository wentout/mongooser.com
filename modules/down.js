'use strict';

const conf = require('conf');
const log  = require('modules/log');

const makeShutdown = () => {
	log('Successfull Shutdown...\n');
	setTimeout(process.exit.bind(process, 0), 3000);
};

// service down processes
process.once('beforeExit', () => {
	log('Was excited. Goodbye...');
});

process.once('exit', () => {
	log('Exit now...');
});

// PM2 messages
process.on('message', (msg) => {
	if (msg == 'shutdown') {
		process.emit('finishProcess', 'MASTER sent shutdown');
	}
});

const shutdownAnswerModules = [];
process.on('registerShutdownModule', (moduleName) => {
	shutdownAnswerModules.push(moduleName);
});

var finishProcessStarted = false;
process.on('finishProcess', (reason) => {
	log('\n***\n');
	log('Service Finish by:\n', reason, '\n');
	if (! finishProcessStarted) {
		finishProcessStarted = true;
		// will wait this time before down
		setTimeout(
			process.exit.bind(process, 1),
			conf.shutdownWaitTimeout
		).unref();
	}
	if (! shutdownAnswerModules.length) {
		makeShutdown();
		return;
	}
});

// modules, who notified about themselves they are downed
const shutdownReports = [];
const direct = (message) => {
	process.emit('finishProcess', `Direct Down : ${message}` || 'Direct Shutdown Call');
};
const allow = (moduleName, cb, supposeIamTheDestroyer) => {
	log('Module Stopped: ', moduleName);
	shutdownReports.push(moduleName);
	if (supposeIamTheDestroyer) {
		log('Module Supposed itself as Uncaughtist >>> ', moduleName);
	}
	if (typeof cb == 'function') {
		cb();
	}
	if (shutdownReports.length == shutdownAnswerModules.length) {
		makeShutdown();
	}
};

module.exports = {
	direct,
	allow
};
