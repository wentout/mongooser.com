nestedTwo.virtual('some')
	.get(function () {
		if (
			// parent !!!
			this.parent.prop
			==
			'some other check'
		) {
			return () => {
				// any code
				// you can imagine
				// for this
			}
		}
	})