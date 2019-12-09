		if (this.someProp && value.prop) {
			return (...args) => {
				// oneElse code
			};
		}
		
		// and this can be continued
		// to nested dependencies !!!
		
		if (someExternalDependendCheck) {
			// some else code
		}
		
		return (...args) => {
			// DEFAULT code
		};
	});