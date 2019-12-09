
const mongoose = require('mongoose');
	
const Review = new mongoose.Schema({
	...
});
Review.virtual('state').get(function () {
	// everything you need to store
	// before any modifications
	// ... you are free to add your code
	return this.toObject();
});

Review.post('init', function (next) {
	this.initialState = this.state;
});

