
const services = [
	'red', 'green', 'blue'
];

const Review = new mongoose.Schema({
	service : {
		type : String,
		enum : services
	}
}, {
	// discriminator casting
	// runs from this property !
	discriminatorKey : 'service'
});

