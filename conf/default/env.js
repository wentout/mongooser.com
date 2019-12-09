'use strict';

const NODE_ENV    = process.env.NODE_ENV    || 'development';
const SERVER_PORT = process.env.SERVER_PORT || 8000;

module.exports = {
	get NODE_ENV () {
		return NODE_ENV;
	},
	get SERVER_PORT () {
		return SERVER_PORT;
	},
	get dev () {
		return this.NODE_ENV == 'development';
	},
	pid : process.pid
};