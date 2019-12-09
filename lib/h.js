'use strict';

const isFullArray = (arr) => {
	if (Array.isArray(arr) && arr.length) {
		return true;
	}
	return false;
};

const checkExists = function (obj) {
	const props = Array.prototype.slice.call(arguments, 1)
		.reduce((props, arg) => props.concat(arg), []);
	
	let pathObj = obj;
	for (let i = 0, n = props.length; i < n; ++i) {
		const prop = props[i];
		if (pathObj[prop] || (i == (n-1) && (pathObj[prop] !== undefined))) {
			pathObj = pathObj[prop];
		} else {
			return false;
		}
	}
	return true;
};

const getByPath = (obj, path) => {
	
	const props = path
		.replace(/\[(\w+)\]/g, '.$1')
		.replace(/^\./, '')
		.split('.');
	
	for (let i = 0, n = props.length; i < n; ++i) {
		const prop = props[i];
		if (typeof obj === 'object' && obj && prop in obj) {
			obj = obj[prop];
		} else {
			return undefined;
		}
	}
	return obj;
};

const hashify = (arr, value) => {
	value = (typeof value == 'undefined') ? true : value;
	return arr.reduce((o, d) => {
		o[d] = value;
		return o;
	}, {});
};


// about to remove of JS Floating points Errors
const rmFpErr = (num) => {
	return parseFloat(num.toFixed(1));
};

module.exports = {
	isFullArray,
	checkExists,
	getByPath,
	hashify,
	rmFpErr
};