'use strict';

const clc  = require('cli-color');
const util = require('util');
const conf = require('conf');

const traceCaller = (n) => {
	const stack = (new Error()).stack;
	if( isNaN( n ) || n < 0) {
		n = 3;
	}
	return stack.split('\n').slice(n).join('\n');
};

const inspectOptions = conf.inspect;
const inspect = (arg) => {
	return (typeof arg == 'string') ?
		arg : arg.map((a) => {
			return (typeof a == 'string') ? a : util.inspect(a, inspectOptions);
		});
};

const log = function (...arg) {
	console.log.apply(null, inspect(arg));
};

log.trace = function (...arg) {
	console.log(`${clc.bgBlue('d')}\n${clc.blue(traceCaller())}`);
	console.log.apply(null, inspect(arg));
};

log.error = function (...arg) {
	console.log(`${clc.bgRed('e')} Error:\n${clc.red(traceCaller())}`);
	console.log.apply(null, inspect(arg));
};

log.alarm = function (msg) {
	console.log(`${clc.bgRed('A')}larm : ${clc.red(msg)}`);
};

module.exports = log;
