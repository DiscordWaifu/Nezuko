const WebSocketServer = require('ws');

class NezukoSocketServer extends WebSocketServer.Server {
    constructor(options = { port: 8080 }) {
        super(options)
    }
}