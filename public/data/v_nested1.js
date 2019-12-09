const Schema = mongoose.Schema;
const NestedSchema = new Schema({
	name : {
		type : String,
	}
	// ... other props
});
const MySchema = new Schema({
	array : [NestedSchema],
	// ... other props
});

NestedSchema.pre('save', function () {
// here we can check array changes, but
// it will be better to check 4 real ->
});