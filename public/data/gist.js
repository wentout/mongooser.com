const MONGOOSE_PULL_6100 = (baseModel, discriminatorSchema, value) => {
	const discriminatorModelName = `${baseModel.modelName || baseModel.name}.${value}`;
	const dcr = baseModel.discriminator(discriminatorModelName, discriminatorSchema);
	dcr.schema.discriminatorMapping.value = value;
	const schema = baseModel.discriminators[value].schema;
	const key = schema.options.discriminatorKey;
	schema.remove(key).add({
		[key] : {
			default : value,
			select  : true,
			set     : function(newName) {
				if (newName === value) return value;
				throw new Error('Can\'t set discriminator key "' + key + '"');
			},
			$skipDiscriminatorCheck  : true,
			[schema.options.typeKey] : String
		}
	});
	return dcr;
};