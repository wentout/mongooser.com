'use strict';

const mongoose = require('mongoose');
const conf     = require('conf');

const Schema = new mongoose.Schema({
	report : Number,
}, {
	minimize         : false,
	autoIndex        : conf.db.autoIndex
});

module.exports = Schema;
