
	const subSchema = new mongoose.Schema({
		nestedPropOne : {
			type : String,
		},
		nestedPropTwo : {
			...
		},
		...
	});

	const MySchema = new mongoose.Schema({
		array : [subSchema],
	});

	subSchema.path('nestedPropOne')
		.validate(val => { /* works */ })
		