'use strict';

const e = process.e;
const conf = e.conf;

const express = require('express');
const app = express();

app.set('port', conf.http.port);
app.set('exitTimeout', conf.http.exitTimeout);
app.set('requestTimeout', conf.http.requestTimeout);

app.disable('x-powered-by');

app.use((req, res, next) => {
	next();
});

const publicPath = `${e.conf.cwd}/${conf.paths.public}/`;
app.use(express.static(publicPath));
app.use(require('serve-favicon')(`${publicPath}/favicon.ico`));

const routes = require('routes');

Object.keys(routes).forEach((point) => {
	Object.keys(routes[point]).forEach((path) => {
		const url = `/${point}/${path}`;
		const rfn = routes[point][path];
		e.log('>>>', url, rfn);
		app.get(url, rfn);
	});
});

module.exports = app;
