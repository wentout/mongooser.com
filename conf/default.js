'use strict';

const conf = {
	shutdownWaitTimeout : 180000
};

module.exports = Object.assign(conf, require('./default'));
