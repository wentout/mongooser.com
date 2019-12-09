'use strict';

const clc  = require('cli-color');

const
	e = process.e,
	app = e.requestHandler,
	log = (message) => e.log(`${clc.bgBlue(' ')} ${clc.blue('HTTP Server info')} : ${message}`);

const SHUTDOWN_NAME = 'HTTP Server';

const
	HTTP_PORT       = app.get('port'),
	EXIT_TIMEOUT    = app.get('exitTimeout'),
	REQUEST_TIMEOUT = app.get('requestTimeout');

const
	SOCKETS        = Symbol('server sockets'),
	NEED_BREAK     = Symbol('need to shudtown server'),
	IS_SOCKET_BUSY = Symbol('is socket busy'),
	
	http = require('http'),
	httpServer = new http.Server();

httpServer[SOCKETS] = new Set();
httpServer[NEED_BREAK] = false;

httpServer
	.on('listening', () => {
		const address = httpServer.address();
		log(`port ${clc.green(address.port)}`);
		process.emit('sayToRun', 'httpServerInitDone');
	})
	.on('close', ()=> {
		log(`All connections are closed`);
	})
	.on('connection', (socket)=> {
		httpServer[SOCKETS].add(socket);
		socket.once('close', () => {
			httpServer[SOCKETS].delete(socket);
		});
		socket.on('timeout', () => {
			socket.destroy();
		});
		// socket.on('error', (error) => {	});
		// socket.on('end', () => {});
	})
	.on('request', (req, res)=> {
		
		const started = Date.now();
		
		const socket = req.socket;
		socket[IS_SOCKET_BUSY] = true;
		
		const resClose = () => {
			socket[IS_SOCKET_BUSY] = false;
			// if we need to break all connections
			// we will close socket after all requests
			if (httpServer[NEED_BREAK]) {
				socket.destroy();
			}
			const status = 
				clc[res.statusCode == 200 ? 'green' : 'red']
					(res.statusCode);
			e.log(`${clc.bgGreen(' ')} ${req.method} ${req.url || '/'} ${status} ${Date.now() - started} ms`);
		};
		
		res.once('finish', resClose);
		res.once('close', resClose);
		
		res.setTimeout(REQUEST_TIMEOUT, () => {
			e.log(`${clc.bgRed(' ')} socket timeout reached ${req.url}`);
		});
		
		app(req, res);
	});

process.emit('registerShutdownModule', SHUTDOWN_NAME);
const masterExitNotify = () => {
	e.down.allow(SHUTDOWN_NAME);
};

const onFinishProcess = (reason) => {
	
	httpServer[NEED_BREAK] = true;
	
	log(`Stop : "${reason}".`);
	log(`About to wait and close ${httpServer[SOCKETS].size} connections.`);
	
	setTimeout(() => {
		e.log.red('HTTP Server : Shutdown timeout reached. Immediate exit !!!');
		masterExitNotify();
	}, EXIT_TIMEOUT).unref();
	
	httpServer.getConnections((error) => {
		if (error) {
			e.log.red(`HTTP Server : Get connections error : ${error}`);
			return masterExitNotify();
		}
		httpServer[SOCKETS].forEach((socket) => {
			// Closing all Free Sockets
			if (! socket[IS_SOCKET_BUSY]) {
				socket.destroy();
			}
		});
		httpServer.close((error) => {
			if (error) {
				e.log.red(`HTTP Server : Close Error: ${error}`);
			}
			masterExitNotify();
		});
	});
};

process.on('finishProcess', onFinishProcess);

// === Run Server, Run! ===
module.exports = {
	server : httpServer,
	stop   : onFinishProcess
};

process.on('sayToRun', (name) => {
	if (name == 'dbReady') {
		httpServer.listen(HTTP_PORT);
	}
});
