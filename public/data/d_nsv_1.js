nestedOne.virtual('some')
	.get(function () {
		if (
			// parent !!!
			this.parent.prop
			==
			'some check'
		) {
			// wired !
			return 'wired'
		}
	})
	.set(function (value) {
		// ... etc
	});