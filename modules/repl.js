'use strict';

const conf = require('conf').repl;

const SOCKET_FILE_PATH = require('path')
	.join(process.cwd(), conf.path);

const HISTORY_FILE_PATH = require('path')
	.join(process.cwd(), conf.hist);

const context = {};

const methods = {
	get context () {
		return context;
	},
	addContext (name, what) {
		context[name] = what;
	},
	remContext (name) {
		delete context[name];
	}
};

const repl = Object.assign({}, methods);

const init = () => {
	require('lib/repl_sockets')
		.server(SOCKET_FILE_PATH, {
			context,
			useGlobal   : true,
			historyPath : HISTORY_FILE_PATH
		}, (socket, r) => {
			repl.socket = socket;
			repl.r = r;
		});
	delete methods.addContext;
	delete methods.remContext;
};

module.exports = Object.assign(repl, { init });
