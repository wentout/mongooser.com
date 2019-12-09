// discriminator TWO

const schemaTwo = new Schema({
	// some props
});

schemaTwo.methods.sameNameMethod = 
	function () {
		// ! some OTHER code !
	};

model.discriminator('two', schemaTwo);