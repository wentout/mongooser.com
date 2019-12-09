	// ( modelName, Schema )
	const model = mongoose.model('review', Review);
	
	const newReview = new mongoose.model('review', {
		text    : 'very good',
		value   : 10,
		service : 'red'
	});
	
	newReview.save(console.log);
	
	mongoose.model('review').findOne({
		
		text    : 'very good',
		value   : 10
		
	}, (err, it) => {
		if (err) {
			// error control code
			return;
		}
		console.log(util.inspect(it));
	});