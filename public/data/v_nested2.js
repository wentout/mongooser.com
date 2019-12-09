MySchema.virtual('nested')
	.get(function () {
		return this.array
			.map(prop => {
				prop.name
			}).join('\n');
	})
	.set(function (values) {
		if (Array.isArray(values)) {
			v.forEach(prop => {
				// validation is here
				this.array.push(prop);
			});
		}
		this.markModified('array');
	});
