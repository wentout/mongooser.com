const Schema = mongoose.Schema;

const nestedBase = new Schema({
	// some props
});

const baseSchema = new Schema({
	nesteds : [nestedBase]
});

const nestedOne = new Schema({
	// some props
});
const nestedTwo = new Schema({
	// some props
});
