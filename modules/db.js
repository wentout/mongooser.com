'use strict';

const e = process.e;
const log = require('modules/log');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const
	Mockgoose = require('mockgoose').Mockgoose,
	mockgoose = new Mockgoose(mongoose);

// this works bad with current versions : .then() falls
mockgoose.prepareStorage();

const MAX_RETRY_COUNT = 5;
var retryCount = 0;

const checkIsMocked = () => {
	if (! mockgoose.helper.isMocked()) {
		setTimeout(checkIsMocked, 1000);
		return;
	}
	log('And Mocked...');
	e.modelsNames.forEach((schemaName) => {
		const schema = require(`model/${schemaName}`);
		const model  = mongoose.model(schemaName, schema);
		e.m[schemaName] = model;
		// global listener, if any
		process.emit('ModelCreation', schemaName, model);
		// namespaced listener, for exact hooks
		process.emit(`ModelCreation.${schemaName}`, model);
	});
	log('Connected!');
	process.emit('sayToRun', 'dbReady');
};

var connected = false;
const connectAndRetry = () => {
	mongoose
		.connect('mongodb://localhost/holyjs', {
		})
		.then(() => {
			connected = true;
			log('Connected to HolyJS Mockgoose Shim');
			checkIsMocked();
		})
		.catch((error) => {
			// there can be compilation errors
			// invoked by mongoose|mockgoose
			// and somehow they digging here...
			if (connected) {
				log.error(error);
				return;
			}
			retryCount++;
			if (retryCount == MAX_RETRY_COUNT) {
				log.error('db connect error', error);
				process.emit('dbConnectionFail');
				return;
			}
			setTimeout(connectAndRetry, 1000);
		});
};

setTimeout(connectAndRetry, 3000);

module.exports = {
	Mockgoose, mockgoose, mongoose
};
	
	
