'use strict';

const
	cwd = process.cwd(),
	p   = require('path'),
	pj  = p.join,
	pjc = pj.bind(p, cwd);


const
	paths = {
		default : pjc('conf', 'default/'),
		local   : pjc('conf', process.env.CONFIF_FILE || 'local')
	};

const
	configs = {
		// default configuration file, use for git commits
		defaults : require(paths.default),
		// local configuration file, use for dev settings
		local    : require(paths.local),
		cwd
	};

// so we override of conf/defaults with conf/local as "dev" config
// and added both to the exported value if to respect differs
// and we are able to override local file with process.env['CONFIF_FILE']
// to use for different environments for example using PM2

module.exports =
	Object.assign({}, configs,
		configs.defaults, configs.local);