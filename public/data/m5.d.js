// single point of responsibility and abstration
// used for discriminators creation from all other code
const MY_CODE_AFTER_PULL_6100 = (baseModel, discriminatorSchema, value) => {
	
	const parentModelName = baseModel.modelName || baseModel.name;
	
	// for example, casting discriminator model name to Parent.Nested
	const discriminatorName = `${parentModelName}.${value}`;
	
	// discriminator creation, !!! using code of 6100 merge request !!!
	const d = baseModel.discriminator(discriminatorName, discriminatorSchema, value);
	
	// take care of Legacy Code, which uses old named discriminators
	baseModel.discriminators[value] = d;
	
	return d;
};
