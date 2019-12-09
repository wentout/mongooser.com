baseSchema.path('nesteds')
	// nested discriminators defs
	.discriminator('one', nestedOne)
	.discriminator('two', nestedTwo);
	
// type can be one or two
baseSchema.methods.setNested = 
	(type) => {
		// this is just an example
		baseSchema.nested.push({
		
			// discriminatorKey
			__t : type
			
		});
	};
