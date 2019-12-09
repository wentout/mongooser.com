// discriminator ONE

const schemaOne = new Schema({
	// some props
});

schemaOne.methods.sameNameMethod = 
	function () {
		// some code
	};

model.discriminator('one', schemaOne);