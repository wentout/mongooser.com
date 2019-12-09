'use strict';

const paths = require('./paths');
const env   = require('./env');

module.exports = {
	// enabled only for dev environment by default
	enabled : env.dev,
	path    : `${paths.tmp}/repl.sock`,
	hist    : `${paths.tmp}/hist.data`
};
