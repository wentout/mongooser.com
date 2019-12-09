'use strict';

const loadedAt = Date.now();

const 
	cluster = require('cluster'),
	PROCESS_LABEL =
		`Process PID -> ${process.pid} ` +
		(cluster.isMaster ? '' : `\nCluster Worker -> ${cluster.worker.id} `);

// config collector for this project
const conf = require('./conf');
// interactive console to review what is going on
const repl = require('./modules/repl');

// process errors interceptors
require('./modules/errors');

// extremely simple logger
const log  = require('modules/log');

// process shutdown starter
const down = require('./modules/down');

repl.addContext('conf', conf);
repl.addContext('down', down);

// just saying something we are here
log('\n');
if (conf.env.dev) {
	// if dev-mode then saying when
	log(new Date().toString());
}

// to show which mode is used
log(`Run app for : ${conf.env.NODE_ENV}`);

// model names to grep
const modelsNames = [ 'review' ];

const e = {
	
	// external libs
	async  : require('async'),
	moment : require('moment'),
	
	// our dependencies
	conf, log, down, repl, loadedAt,
	h      : require('./lib/h'),
	
	// const
	modelsNames,
	// storage : models
	m : {},
	// itself
	mongoose : require('mongoose')
};
process.e = e;


// HTTP
e.requestHandler = require('modules/requestHandler');
// it needs e.requestHandler to load
e.httpServer     = require('modules/httpServer');

// database connection, uses mongoose && mockgoose
e.db = require('./modules/db');
repl.addContext('e', e);

// method which starts everything
const start = () => {
	e.startedAt = Date.now();
	log(`\nEverything Started ${e.startedAt - e.loadedAt} ms!`);
	log(`${PROCESS_LABEL}\n`);
	repl.init();
};

// necessary points to acheive before we can run
const partsToCollectBeforRun = e.h.hashify([
	'dbReady',
	'httpServerInitDone'
]);
process.on('sayToRun', (name) => {
	if (! partsToCollectBeforRun[name]) {
		return;
	}
	delete partsToCollectBeforRun[name];
	if (! e.h.isFullArray(Object.keys(partsToCollectBeforRun))) {
		start();
	}
});

