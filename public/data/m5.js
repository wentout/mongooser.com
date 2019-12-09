mongoose.Query.prototype._stream = mongoose.Query.prototype.stream;

// stream wrapper for hidden cursor using instead, working code
mongoose.Query.prototype.stream = function (...args) {
	const cursor = mongoose.Query.prototype.cursor.call(this, ...args);
	const cursorOn = cursor.on;
	
	// need to cast other 'close' instead of 'end'
	cursor.on = function (eventName, ...args) {
		if (eventName == 'close') {
			eventName = 'end';
		}
		return cursorOn.call(this, eventName, ...args);
	};
	return cursor;
};
