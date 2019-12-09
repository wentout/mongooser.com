Schema.virtual('AOP_Example')
	.set(function (value) {
		
		// dependent behaviour 1
		if (this.someProp) {
			this.storage =
				value*this.someProp;
		}
		
		// dependent behaviour 2
		if (this.otherProp) {
			this.storage =
					value*100;
		}
		
		// default
		this.storage = value;
	});
