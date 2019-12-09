// AOP Method Definitions
// related to prop values
Schema.virtual('AOP_Example')
	.get(function () {
		if (this.someProp) {
			return (...args) => {
				// some code
			};
		}
		if (this.otherProp) {
			return (...args) => {
				// OTHER code
			};
		}
		return (...args) => {
			// DEFAULT code
		};
	});