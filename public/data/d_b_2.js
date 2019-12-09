// default discriminatorKey
util.inspect(
	schema.discriminatorMapping
);

// will output
{
	key    : '__t',
	value  : null,
	isRoot : true
};

model.discriminator(
	// IMPORTANT !!!
	services.indexOf(type) > -1 
)