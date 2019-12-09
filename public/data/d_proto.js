	// this points to new discriminatorModel()
	// therefore it is model instance, and
	const BaseModel = this.parent();

	// and 
	discriminatorModel
		[ 'find' || 'findOne' || 'update' || 'stream' || 'cursor' ]()
	// and so on and in deepth are tied to 
		{ [ discriminatorKey  ] : [ discriminatorValue ] }

	// where
	const discriminatorMapping = BaseModel.schema.discriminatorMapping,
	      discriminatorKey     = discriminatorMapping.key,
	      discriminatorValue   = discriminatorMapping.value;
