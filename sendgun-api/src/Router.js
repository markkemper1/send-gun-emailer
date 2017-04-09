import assert from 'assert'
/**
    Connects routing with controller actions
*/
class Router {

    constructor({messagesController}) {
        assert(messagesController && messagesController.send, "must supply a messagesController with a 'send' method")
        this.messagesController = messagesController;
        this.configure = this.configure.bind(this);
    }

    configure(app) {
        app.post('/api/email', this.messagesController.send);
        app.get('/', (_, res) => { res.status(200); res.send("PONG"); res.end() });
    }
}

export default Router;