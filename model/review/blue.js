'use strict';

const mongoose = require('mongoose');
const conf     = require('conf');

const Schema = new mongoose.Schema({
	runs : String
}, {
	minimize         : false,
	autoIndex        : conf.db.autoIndex
});

module.exports = Schema;