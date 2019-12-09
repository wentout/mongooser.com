#!/usr/bin/env node

'use strict';

const conf = require('./conf').repl;
const SOCKET_FILE_PATH = require('path')
	.join(process.cwd(), conf.path);

require('./lib/repl_sockets')
	.client(SOCKET_FILE_PATH);