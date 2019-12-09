const ReviewModel =
	mongoose.model('review', Review);
const review = new ReviewModel({
	...
});

// ... modifications

review.save(error => {
	if (error) {
		// if we need, we can return
		// to our initial state!
		review = new ReviewModel(
			review.initialState
		);
	}
});