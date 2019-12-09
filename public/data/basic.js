	const mongoose = require('mongoose');
	
	const Review = new mongoose.Schema(
		
	// schemaDescriptionObject
	{
		text    : String,
		value   : Number,
		service : {
			type : String,
			enum : ['red', 'green', 'blue']
		}
	},
	
	// schemaCreationOptions
	{
		minimize         : false,
		autoIndex        : conf.db.autoIndex,
		timestamps       : {
			createdAt : 'createAt',
			updatedAt : 'updateAt'
		}
	});
