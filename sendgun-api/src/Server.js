import assert from 'assert'
import express from 'express'
import bodyParser from 'body-parser'
/** 
 *  Logging & validation around start / stop of server port
 */
class Server {
    constructor({router}) {
        assert(router.configure) 
        assert(router && router.configure, "Must supply a router")
        this.router = router;
        this.start = this.start.bind(this);
        this.close = this.close.bind(this);
    }

    start(port) {

        console.log(`Server starting... (port: ${port})`)
        
        var app = express();

        app.use(bodyParser.json({ type: 'application/json' }))

        this.router.configure(app);

        return new Promise((resolve, reject) => {
            assert(port === parseInt(port, 10), "must supply a port number")
            assert(port > 0 && port < 65535, "must supply a port number between 0-65535");
            this.httpServer = app.listen(port, e => e ? reject(e) : resolve())
        })
        .then(()=> console.log('Server started successfully'))
    }

    close() {
        console.log(`Starting stopping`);
        return new Promise((resolve, reject) =>
            this.httpServer.close(e=> e ? reject(e) : resolve()) 
        )
        .then(()=> console.log('Server stopped.'))
    }
}

export default Server