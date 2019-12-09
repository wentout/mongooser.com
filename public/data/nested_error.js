
	const MySchema = new mongoose.Schema({
		array : [{
			nestedPropOne : {
				type : String,
			},
			nestedPropTwo : {
				...
			},
			...
		}],
	});

	// Cannot read property
	// 'nestedPropOne' of undefined
	MySchema.path('array.nestedPropOne')
		.validate(val => {...})

