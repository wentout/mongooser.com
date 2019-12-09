'use strict';

const conf           = require('conf');
const mongoose       = require('mongoose');
const mongooseHelper = require('lib/mongooseHelper');
// const addToSchema    = mongooseHelper.addToSchema;
// const _require       = mongooseHelper._require('review');

const Mixed  = mongoose.Schema.Types.Mixed;

const nestedBase = new mongoose.Schema({
	name  : String
}, { _id: false });

const Review = new mongoose.Schema({
	name    : String,
	value   : String,
	service : String,
	test    : [nestedBase]
}, {
	minimize         : false,
	autoIndex        : conf.db.autoIndex,
	discriminatorKey : 'service',
	timestamps       : {
		createdAt : 'createAt',
		updatedAt : 'updateAt'
	}
});

const nestedOne = new mongoose.Schema({
	name  : String,
	value : Number
}, { _id: false });
nestedOne.virtual('sss').get(function () {
	return this.name + this.value;
});

const nestedTwo = new mongoose.Schema({
	name  : String,
	value : Number,
	z     : Boolean
}, { _id: false });
nestedTwo.virtual('zzz').get(function () {
	return this.name + this.value;
});

Review.path('test').discriminator('one', nestedOne);
Review.path('test').discriminator('two', nestedTwo);


const fs = require('fs');
Review.static.types = {};
process.on('ModelCreation.review', (it) => {
	// discriminators init
	it.typeSchemas = fs.readdirSync('model/review')
		.reduce((arr, file) => {
			if (/\.js$/i.test(file)) {
				arr.push(file.replace(/\.js$/i, ''));
			}
			return arr;
		}, [])
		.reduce((ts, type) => {
			const path = `${__dirname}/review/${type}`;
			console.log(path)
			ts[type] = require(path);
			const dr = it.discriminator(type, ts[type]);
			// const dr = it.discriminator(type, {});
			Review.static.types[type] = dr;
			return ts;
		}, {});
	
});

Review.statics.demoSaveShow = () => {
	var s = new e.m.review({
		name   : 'some person',
		value  : 'everything is good',
		report : 3
	});
	s.save((err, answer) => {
		debugger;
	});
};

module.exports = Review;
