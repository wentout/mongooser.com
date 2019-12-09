'use strict';

const conf = require('conf');

const addToSchema = (schemeObj, moduleObj) => {
	Object.keys(moduleObj).forEach((key) => {
		if (key == 'methods' || key == 'statics') {
			Object.assign( schemeObj[key], moduleObj[key] );
		} else if (key == 'virtuals') {
			Object.keys(moduleObj.virtuals).forEach((methodName) => {
				const fn = moduleObj.virtuals[methodName];
				let type = 'get'; // get or set
				const split = methodName.split('.');
				if (split.length == 2) {
					type = split[0];
					methodName = split[1];
				}
				schemeObj.virtual(methodName)[type](fn);
			});
		} else {
			schemeObj.statics[key] = moduleObj[key];
		}
	});
};

const _require = (namespace) => {
	const path = require('path');
	return (name) => {
		return require(path.join(conf.cwd, 'model', namespace, name));
	};
};

module.exports = {
	addToSchema,
	_require
};
