// connect init must now emit event, and only then models can be created
process.emit('mongooseInitialConnectDone');

process.once('mongooseInitialConnectDone', () => {
	// ... all initial code
	
	const models = Object.keys({
		'ModelName' : 'path/to/schema'
		// ... other models
	}).reduce((models, ModelName, idx, definitions) => {
		const ModelSchema = require(definitions[ModelName]);
		models[ModelName] = mongoose.model(ModelName, ModelSchema);
		return models;
	}, {});
});

