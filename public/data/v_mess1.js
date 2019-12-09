Schema.virtual('AOP_IF_MESS')
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
		if (this.anotherCase) {
			return (...args) => {
				// OTHER code
			};
		}