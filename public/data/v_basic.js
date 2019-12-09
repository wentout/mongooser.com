// mongoose doc, describing virtuals 

schema.virtual('fullname')
	.get(function () {
		const it = this.name;
		return `${it.first} ${it.last}`;
	})
	.set(function (v = 'first last') {
		[
			this.name.first,
			this.name.last
		] = v.split(' ');
	});