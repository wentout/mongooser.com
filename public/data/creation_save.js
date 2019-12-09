
var s = new e.m.review({
	name   : 'some person',
	value  : 'everything is good',
	report : 3
});

s.save((err, answer) => {
	
	// and here we will find
	error == null;
	answer == {
		name     : 'some person',
		value    : 'everything is good',
		report   : 3,
		_id      : '5aa6f04624d65e23b20f97b8',
		service  : 'red',
		createAt : '2018-03-12T21:25:30.695Z',
		updateAt : '2018-03-12T21:25:30.695Z',
		__v      : 0
	};
});

