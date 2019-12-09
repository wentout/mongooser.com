'use strict';

const e = process.e;

const handler = (req, res) => {
	if (error) {
		e.log.error('review report error', error);
		return res.status(500).end();
	}
	res.json('');
};

module.exports = handler;
